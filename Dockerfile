## Japa Chants — multi-stage build
## Stage 1: deps
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat python3 make g++ sqlite
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

## Stage 2: build
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat python3 make g++ sqlite gzip
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Repo ships the seed DB gzipped (db/chants.db.gz ≈ 18 MB) because the raw
# SQLite file is over GitHub's 100 MB limit. Decompress on build. If the .gz
# is missing (rare), fall back to a full scrape — hits vignanam.org and takes
# ~80 minutes for 1189 chants.
RUN if [ -f db/chants.db.gz ]; then \
      echo "Decompressing seed DB ($(stat -c%s db/chants.db.gz) bytes)"; \
      gunzip -kf db/chants.db.gz; \
      echo "Decompressed to $(stat -c%s db/chants.db) bytes"; \
    elif [ ! -s db/chants.db ]; then \
      echo "No seed DB — scraping from scratch (this takes ~80 minutes)"; \
      mkdir -p cache && npx tsx scripts/scrape-vignanam.ts || echo "scrape failed, continuing"; \
    fi
RUN node scripts/generate-icons.mjs
RUN npx next build

## Stage 3: runtime
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat sqlite
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV JAPA_DB_PATH=/app/db/chants.db

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Overwrite the traced db with the freshly-scraped one (ensures latest build is served)
COPY --from=builder --chown=nextjs:nodejs /app/db ./db

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
