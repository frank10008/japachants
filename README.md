# Japa Chants

A mobile-first PWA that combines a Sanskrit chant library with a japa mala counter.

- **Reading view** — Sanskrit-first, tap to reveal Hindi / Tamil / IAST transliteration
- **Counter** — 108-bead mala, haptic, long-press decrement, session history
- **Offline** — installable, works without network once chants are opened
- **Fast** — SQLite + static generation, no runtime JS for reading

Live at **[japachants.siddha.pro](https://japachants.siddha.pro)**.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · better-sqlite3 · Zustand · Framer Motion.

## Development

```bash
npm install
npx tsx scripts/scrape-vignanam.ts --limit 5   # seed a few chants
npm run dev
```

Open <http://localhost:3000>.

## Scraping

Texts come from [vignanam.org](https://vignanam.org), a public-domain Vaidika Vignanam project. The scraper reads `sitemap.xml`, caches raw HTML to `cache/{lang}/{slug}.html`, and populates SQLite.

```bash
# Five test chants
npx tsx scripts/scrape-vignanam.ts --only bhaja-govindam-moha-mudagaram,shiva-tandava-stotram

# Full run (220 stotras × 4 scripts, ~15 min on a cold cache)
npx tsx scripts/scrape-vignanam.ts --limit 220
```

Flags: `--limit N`, `--only slug1,slug2,...`, `--fresh` (bypass cache).

## Deployment

Containerized with a multi-stage Dockerfile; deployed via Coolify on a Hetzner box. DNS points `japachants.siddha.pro` to the server; Traefik labels in `docker-compose.yml` handle HTTPS.

```bash
docker compose build
docker compose up -d
```

The SQLite file lives under `/app/db` (mounted to a named volume so it survives redeploys).

## Credits

- [vignanam.org](https://vignanam.org) — chant texts
- [greenmesg.org](https://greenmesg.org) — reading layout inspiration
- [japa108.com](https://japa108.com) — counter design inspiration

All texts are public-domain shastra.
