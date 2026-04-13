# SUPER PROMPT — Japa Chants App

Build a complete, deployed Sanskrit chant reader + japa counter web app. Work end-to-end: scaffold, scrape data, build UI, dockerize, and deploy to Coolify on Hetzner at **japachants.siddha.pro**.

## 1. Product

A mobile-first PWA that combines:
- A **chant library** sourced from vignanam.org (Sanskrit, Hindi, Tamil, English-transliteration only — skip all other languages)
- A **per-verse reading view** modeled on greenmesg.org — Sanskrit on top, tap to reveal transliteration + translation + meaning
- A **japa counter** in the visual style of japa108.com — large circular tap target, mala-bead progress ring, warm saffron palette

## 2. Tech stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- SQLite via better-sqlite3 (single file, ships in the Docker image)
- Zustand for client state
- Framer Motion for the tap-to-reveal animations
- Installable PWA via manifest + service worker
- Dockerfile + docker-compose.yml ready for Coolify deployment

## 3. Data layer

### Scraper: `scripts/scrape-vignanam.ts`
- Source: vignanam.org (AWS S3 + CloudFront), slugs discovered from sitemap.xml
- Four scripts: `samskritam` / `hindi` / `tamil` / `english` (IAST)
- Skip every other language
- 1 req/sec, exponential backoff
- HTML cached to `./cache/{lang}/{slug}.html`
- `--limit N` flag

### Schema (`db/schema.sql`)
```sql
CREATE TABLE chants (id, slug, title, category, deity, source_url);
CREATE TABLE verses (id, chant_id, verse_number, sanskrit, hindi, tamil, transliteration, meaning);
```

## 4. App structure
```
/                    Home — counter + featured chants
/library             Browse all, filter by deity/category, search
/chant/[slug]        Reading view (greenmesg-style)
/counter             Full-screen japa counter
/settings            Default script, target, haptics, theme
/about               Credits
```

## 5. Visual design

Palette: cream `#FAF5EC`, saffron `#E87722`, maroon `#7A1F1F`, gold `#C9A24A`, ink `#2B1810`.
Fonts: Noto Serif Devanagari, Noto Serif Tamil, Cormorant Garamond, Inter.
Motion: breath-paced 400-600ms eases.

## 6. Deployment

- Target: hetzner-aol (204.168.140.60), Coolify
- Domain: japachants.siddha.pro (A record already set)
- Persistent volume for SQLite db
- Auto-deploy on push to main
