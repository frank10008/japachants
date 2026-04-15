#!/usr/bin/env python3
"""Generate a PDF session summary and write it to public/session-summary.pdf."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    HRFlowable,
    KeepTogether,
)

OUT = "/root/hetzner-aol/japachants/public/session-summary.pdf"

# japa108 palette
GOLD = HexColor("#fbca08")
WARM = HexColor("#cf6300")
MAROON = HexColor("#ba791a")
BROWN = HexColor("#7c592c")
TEXT = HexColor("#575859")
BG_CREAM = HexColor("#fff3e7")

styles = getSampleStyleSheet()
title = ParagraphStyle(
    "Title",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=26,
    textColor=BROWN,
    spaceAfter=6,
    alignment=TA_LEFT,
    leading=30,
)
subtitle = ParagraphStyle(
    "Subtitle",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=10,
    textColor=TEXT,
    spaceAfter=18,
    leading=14,
)
h1 = ParagraphStyle(
    "H1",
    parent=styles["Heading1"],
    fontName="Helvetica-Bold",
    fontSize=13,
    textColor=BROWN,
    spaceBefore=14,
    spaceAfter=4,
    leading=16,
)
h2 = ParagraphStyle(
    "H2",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=10,
    textColor=WARM,
    spaceBefore=8,
    spaceAfter=2,
    leading=13,
)
body = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.5,
    textColor=TEXT,
    leading=13,
    spaceAfter=4,
)
bullet = ParagraphStyle(
    "Bullet",
    parent=body,
    leftIndent=14,
    bulletIndent=2,
    spaceAfter=2,
)


def hr():
    return HRFlowable(
        width="100%", thickness=1, color=GOLD, spaceBefore=6, spaceAfter=6
    )


def b(s):
    return Paragraph(s, bullet, bulletText="•")


doc = SimpleDocTemplate(
    OUT,
    pagesize=A4,
    leftMargin=22 * mm,
    rightMargin=22 * mm,
    topMargin=22 * mm,
    bottomMargin=20 * mm,
    title="Japa Chants — Session Summary",
    author="Krishi + Claude",
)

story = []

story.append(Paragraph("Japa Chants — Session Summary", title))
story.append(
    Paragraph(
        "A one-day build log of japachants.siddha.pro &mdash; "
        "a Sanskrit stotra library with word-by-word meanings, a japa108-style mala counter, "
        "and an Obsidian vault mirror. Built April 13&ndash;15, 2026.",
        subtitle,
    )
)
story.append(hr())

# ─────────────────────────────────────────────────────────────
story.append(Paragraph("What you asked for", h1))
story.append(
    Paragraph(
        "A mobile-first PWA that combines a Sanskrit chant reader with a japa mala counter. "
        "Reading view styled like greenmesg.org, counter like japa108.com. "
        "Scrape vignanam.org for Sanskrit/Hindi/Tamil/IAST. Deploy to Coolify on Hetzner at "
        "<b>japachants.siddha.pro</b>. Autonomous, end-to-end.",
        body,
    )
)

story.append(Paragraph("Phase 1 &mdash; Scaffold &amp; first deploy", h1))
story.append(Paragraph("Decisions before coding", h2))
story.append(b("Flagged two blockers: chanting.siddha.pro already exists; DNS points to hetzner-aol. You chose: new project, deploy to hetzner-aol."))
story.append(b("Probed vignanam.org: 1195 stotras in sitemap, single div#stext container, verses aligned by &lt;p&gt; index across all four languages."))
story.append(Paragraph("What landed", h2))
story.append(b("Next.js 16 + Tailwind v4 + SQLite + Zustand + Framer Motion scaffold."))
story.append(b("Scraper walked the sitemap, cached HTML, extracted verses. Seed of 220 chants first."))
story.append(b("Reading view, library, counter, PWA manifest, service worker, Docker multi-stage, Coolify deploy. Live within the first session."))

story.append(Paragraph("Phase 2 &mdash; Full scrape &amp; fact-checking", h1))
story.append(b("Full vignanam scrape: 1,189 chants, 35,001 verses across 4 scripts (~80 min cold)."))
story.append(b("Launched 3 parallel fact-check agents: integrity (found a 220-verse &lsquo;Browse Related Categories&rsquo; footer leak &mdash; fixed), Sanskrit content spot-check vs Wikisource (PASS), Tamil + IAST script audit (PASS)."))
story.append(b("Reclassified 216 chants that were miscategorised as &lsquo;Misc&rsquo;."))

story.append(Paragraph("Phase 3 &mdash; UI iterations", h1))
story.append(Paragraph("Mobile &amp; accessibility", h2))
story.append(b("Font-size scaler (5 steps), safe-area insets, 44px tap targets, bottom tab nav on mobile, viewport-sized counter circle."))
story.append(Paragraph("japa108 visual clone", h2))
story.append(b("Commissioned a UI designer agent to pull japa108.com&rsquo;s CSS and produce a diff-style spec."))
story.append(b("Applied the real japa108 palette: <b>#fff3e7</b> bg, <b>#fbca08</b> gold, <b>#7c592c</b> warm brown, <b>#cf6300</b> / <b>#cb9418</b> CTA gradient, <b>#575859</b> body text."))
story.append(b("Self-hosted the exact Helvetica Neue woff2 files and logo.png straight from japa108.com. Used everywhere &mdash; including the IAST transliteration &mdash; for one consistent font."))
story.append(Paragraph("Removed", h2))
story.append(b("The sticky None/Hindi/Tamil script toggle pill (repetitive)."))
story.append(b("The &lsquo;Begin japa with this mantra&rsquo; sticky CTA (overlapping content)."))
story.append(b("The inline word-by-word table per verse (you wanted word meanings only on tap)."))
story.append(b("Hindi as a script option entirely."))

story.append(Paragraph("Phase 4 &mdash; Word meanings", h1))
story.append(b("Scraped <b>greenmesg.org</b>&rsquo;s word-by-word dictionary (162 files). Parser bug fixed on the second pass (was dropping breakdown meanings)."))
story.append(b("Built <b>global_words</b> index: 10,051 unique Sanskrit words, 14,469 glosses &mdash; keyed by both normalized Devanagari AND each normalized IAST variant so tapping either the Sanskrit or transliteration word resolves to the same entry."))
story.append(b("Tappable words on Aditya Hrudayam: <b>852</b>. Hanuman Chalisa: <b>742</b>. Bhaja Govindam: <b>752</b>. Shiva Tandava: <b>404</b>."))
story.append(b("Popover layout matches greenmesg: DEVA (IAST): gloss on line 1, sub-word breakdown below, cross-chant &lsquo;also:&rsquo; glosses last."))

story.append(Paragraph("Phase 5 &mdash; Verse translations pipeline", h1))
story.append(b("Started with <b>377</b> verses translated from greenmesg prose blocks."))
story.append(b("Spawned 3 parallel public-domain scrapers: Wikipedia (2 chants), Wikisource (all 18 Bhagavad Gita chapters via Annie Besant 1922, Purusha Sukta via Griffith 1896, Ishopanishad via Max Müller 1879), gap analysis. Delivered <b>+1,453 verses</b>. QC agent verified 91% clean; fixed the remaining scraper chrome."))
story.append(b("LLM-assisted translation: first attempt dispatched 20 Opus subagents in parallel. 11 got rate-limited (429), 7 completed. Total kept: <b>~4,000 verses</b>."))
story.append(b("Pivoted to Sonnet 4.6, 3 workers per wave, 40 smaller batches. Classifier routes chants to Haiku (namavalis, ashtottaras) or Sonnet (Gitas, Upanishads, tantric)."))
story.append(b("<b>Current state: 15,483 / 34,182 verses (45%)</b>. 461 chants at 100% coverage. 520 chants have at least some sentence-level English."))
story.append(b("All 18 Bhagavad Gita chapters, Hanuman Chalisa, Shiva Tandava, Aditya Hrudayam, Bhaja Govindam, Uddhava Gita 11&ndash;31, Rama Charita Manasa Bala + Uttara kandas, Rudrashtakam, Shiva Mahimna, Kathopanishad, Kanakadhara are fully translated."))

story.append(Paragraph("Phase 6 &mdash; Polish &amp; extras", h1))
story.append(b("<b>Obsidian vault</b> export: 1,162 markdown files organized by deity, YAML frontmatter, Sanskrit + transliteration + Hindi + Tamil + English meanings + word glossary. Pushed to github.com/frank10008/japachants-vault (private)."))
story.append(b("<b>Dedupe</b>: removed 27 duplicate chants (18 Bhagavad Gita parayana copies + 9 misc), preserving the better-covered version."))
story.append(b("<b>Translation mode vs Chanting mode</b>: global setting + per-chant toggle. Chanting mode shows only one script (Sanskrit / Tamil / IAST) at 2.5&ndash;2.75 rem, no word-tapping, no meaning &mdash; distraction-free for recitation."))
story.append(b("<b>Favorites</b>: star any chant from the library or the chant header. &lsquo;Only my favorites&rsquo; filter. Persisted in localStorage."))
story.append(b("Locked light mode (no OS dark-mode override). Fixed toggle alignment + vibration test button. Deployed the japa108 logo to the header and home hero."))

story.append(Paragraph("Numbers", h1))
story.append(b("<b>1,162 chants</b> &middot; <b>34,182 verses</b> &middot; <b>4 scripts</b> per verse"))
story.append(b("<b>15,483 verse translations</b> (45% coverage) &middot; <b>461 chants at 100%</b>"))
story.append(b("<b>10,051 tappable Sanskrit words</b> in the global index"))
story.append(b("<b>~8M tokens consumed</b> today across Opus + Sonnet + Haiku + orchestration (~$100&ndash;120 of API-equivalent value, $0 on the Max plan)"))
story.append(b("Live at <b>japachants.siddha.pro</b>"))

story.append(Paragraph("Outstanding", h1))
story.append(b("~12,500 verses still untranslated (~18,699 counting ritual chrome that will stay empty). Overnight run cancelled per your instruction."))
story.append(b("~5% of the library is structurally untranslatable: Vedic jata-patha recitation blocks, Telugu Annamayya kirtanas with only rāga headers, ritual nyasa chrome."))
story.append(b("No in-app audio playback. No share-a-verse image card. No multi-device counter sync."))

doc.build(story)
print(f"Wrote {OUT}")
