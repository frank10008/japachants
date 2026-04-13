## Japa Chants — multi-stage build
## Stage 1: deps
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat python3 make g++ sqlite
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

## Stage 2: build
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat python3 make g++ sqlite
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# The repo ships a pre-populated db/chants.db (220 chants). To refresh it,
# re-run `npx tsx scripts/scrape-vignanam.ts --limit 220` locally and commit.
# If the DB is ever missing (e.g. a fresh clone that deleted it), fall back
# to scraping inside the build — this hits vignanam.org and takes ~15 min.
RUN if [ ! -s db/chants.db ]; then \
      echo "No seed DB found — scraping from scratch"; \
      mkdir -p cache && npx tsx scripts/scrape-vignanam.ts --limit 220 || echo "scrape failed, continuing"; \
    else \
      echo "Using committed seed DB ($(stat -c%s db/chants.db) bytes)"; \
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
