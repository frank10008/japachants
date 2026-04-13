# DECISIONS.md

Running log of non-obvious decisions made during autonomous build.

## 2026-04-13 — Initial build

### D1. Next.js 16 instead of 15
`create-next-app@latest` pulled Next 16.2.3 (React 19). Spec said 15; 16 is fine — App Router is stable and the spec's constraints don't rely on 15-specific features. Noted.

### D2. Substitute slug for "vakratunda-mahakaya"
Spec listed `vakratunda-mahakaya` as a test chant. vignanam.org doesn't host Vakratunda Mahakaya as a standalone stotra (it's a 1-line dhyana shloka). Substituted `ganapati-prarthana-ghanapatham` (the same invocational role). Other 4 test slugs resolved to:
- `sree-maha-ganesha-pancharatnam`
- `shiva-tandava-stotram`
- `sri-mahishasura-mardini-stotram-ayigiri-nandini`
- `bhaja-govindam-moha-mudagaram`

### D3. Scraper uses sitemap.xml, not category pages
Category pages like `english/shiva-stotrams.html` return 403 from S3 (likely removed). The sitemap at `https://vignanam.org/sitemap.xml` is 2 MB, public, and contains **1195 stotras × 19 languages = 22,705 URLs**. We filter for the 4 target languages. This is cleaner and complete.

### D4. Parsing strategy
Container: `<div id="stext" class="stotramtext">`. Verses are `<p>` tags; lines within a verse are joined by `<br />`. Structure is identical across all 4 languages → verses align by index. Title comes from `<title>` tag, stripped to the part before ` - ` or ` | `.

### D5. Deity/category assignment
Sitemap has no deity metadata. Deity is inferred from slug tokens (`ganesha`, `shiva`, `krishna`, `vishnu`, `devi`, `hanuman`, `rama`, etc.) with a fallback of `misc`. Category = deity group (e.g., "Shiva Stotrams"). Good enough for MVP; can be refined later by parsing the homepage accordion structure.

### D6. PWA approach — native manifest + service worker, not next-pwa
`next-pwa` is unmaintained and does not support Next 16. Using a hand-written `public/manifest.json` + `public/sw.js` registered from layout. Cache-first for static assets + chant pages.

### D7. Dark mode via CSS `prefers-color-scheme`
No user toggle in MVP (can be added to /settings later). Spec mentions dark mode; we use media query with the indigo-deep/gold palette.

### D8. Dockerfile — scrape happens at build time
Stage 1 runs the scraper inside the image using a cached `cache/` directory (COPYed from repo if present, otherwise scraped fresh). Output DB is at `/app/db/chants.db`, mounted to a persistent volume in Coolify so re-deploys don't re-scrape unless the cache is bumped.

### D9. Deploy target = hetzner-aol
DNS `japachants.siddha.pro` already resolves to `204.168.140.60` (hetzner-aol). We deploy there, not on the primary (204.168.169.161). Local dev mirror lives at `/root/hetzner-aol/japachants/` on the primary; pushed via git to GitHub; Coolify on hetzner-aol pulls.

### D10. Sanskrit Chanting app (existing) stays running
`chanting.siddha.pro` — static nginx mantra app — is NOT touched. Japachants is net-new. Parallel for now; future decommission of the old one is a separate call.
