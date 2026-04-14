#!/usr/bin/env python3
"""Translate verses in batch-07.json to fresh literal English meanings via Claude API."""
import json, os, sys, time, re
from concurrent.futures import ThreadPoolExecutor, as_completed
import anthropic

# Load API key from /root/pa/.env
with open('/root/pa/.env') as f:
    for line in f:
        if line.startswith('ANTHROPIC_API_KEY='):
            os.environ['ANTHROPIC_API_KEY'] = line.strip().split('=', 1)[1].strip().strip('"').strip("'")
            break

IN_PATH = '/root/hetzner-aol/japachants/cache/batches/batch-07.json'
OUT_PATH = '/root/hetzner-aol/japachants/cache/batches/batch-07-out.json'
PROGRESS_PATH = '/root/hetzner-aol/japachants/cache/batches/batch-07-progress.json'

client = anthropic.Anthropic()
MODEL = 'claude-haiku-4-5'

SYSTEM_PROMPT = """You are an expert Sanskrit translator producing fresh, literal English meanings of stotra/upanishad/sutra verses. The user gives you a verse with its Sanskrit (Devanagari) and IAST transliteration, plus chant title and deity context.

OUTPUT RULES:
1. Produce ONE fresh literal English sentence (max two; 40-200 chars). Original wording, not memorised translations of any specific scholar.
2. Preserve imagery and semantics; do not flatten metaphor; do not invent.
3. For namavalis (lists of names with "namaH"), format: "Salutation to Name1 (meaning); to Name2 (meaning); ...".
4. Phalashruti verses: prefix with "Phala-shruti:". Colophon/iti markers: "Colophon:". Shanti mantras: "Shanti:".
5. If the line is purely meta (raga/tala/composer/language/section header) or unintelligible, output the empty string "".
6. If the verse is in Awadhi (Tulsidas Ramcharitmanas), Telugu (Annamayya/Tyagaraja keertanas), or another vernacular, still translate the gist literally — do NOT output empty.
7. Preserve deity context (e.g., for a Lakshmi stotram, "Lakshmi" not "the goddess").
8. Do NOT add commentary, do NOT explain, do NOT use quotation marks around your answer.
9. Output ONLY the meaning text on a single line. No prefix, no JSON, no "Meaning:".
"""

def translate_verse(chant_title, deity, slug, verse):
    sk = (verse.get('sanskrit') or '').strip()
    tr = (verse.get('transliteration') or '').strip()
    if not sk and not tr:
        return verse['id'], ''
    user = f"Chant: {chant_title}\nDeity: {deity}\nSlug: {slug}\nVerse #{verse['verse_number']}\n\nSanskrit:\n{sk}\n\nIAST:\n{tr}\n\nGive the literal one-sentence English meaning."
    for attempt in range(5):
        try:
            resp = client.messages.create(
                model=MODEL,
                max_tokens=400,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": user}],
            )
            text = resp.content[0].text.strip()
            # Strip surrounding quotes if model added them
            text = re.sub(r'^["\'`]+|["\'`]+$', '', text).strip()
            # Clamp length
            if len(text) > 400:
                text = text[:400].rsplit(' ', 1)[0] + '...'
            return verse['id'], text
        except Exception as e:
            wait = 2 ** attempt
            sys.stderr.write(f"[retry {attempt+1}] verse {verse['id']}: {e} — sleeping {wait}s\n")
            time.sleep(wait)
    return verse['id'], ''

def main():
    with open(IN_PATH) as f:
        data = json.load(f)

    # Resume support
    done = {}
    if os.path.exists(PROGRESS_PATH):
        with open(PROGRESS_PATH) as f:
            done = json.load(f)
        sys.stderr.write(f"Resuming with {len(done)} verses already translated.\n")

    tasks = []
    for chant in data:
        for v in chant['verses']:
            if str(v['id']) not in done:
                tasks.append((chant['title'], chant.get('deity', 'Misc'), chant['slug'], v))

    sys.stderr.write(f"Total chants: {len(data)} | tasks remaining: {len(tasks)}\n")

    results = dict(done)
    completed = 0
    start = time.time()
    SAVE_EVERY = 50

    with ThreadPoolExecutor(max_workers=20) as ex:
        futs = {ex.submit(translate_verse, t[0], t[1], t[2], t[3]): t for t in tasks}
        for fut in as_completed(futs):
            vid, meaning = fut.result()
            results[str(vid)] = meaning
            completed += 1
            if completed % SAVE_EVERY == 0:
                with open(PROGRESS_PATH, 'w') as f:
                    json.dump(results, f, ensure_ascii=False)
                elapsed = time.time() - start
                rate = completed / elapsed if elapsed else 0
                eta = (len(tasks) - completed) / rate if rate else 0
                sys.stderr.write(f"  {completed}/{len(tasks)}  ({rate:.1f}/s, ETA {eta/60:.1f}m)\n")

    # Final save of progress
    with open(PROGRESS_PATH, 'w') as f:
        json.dump(results, f, ensure_ascii=False)

    # Build output
    out = []
    for chant in data:
        out_verses = []
        for v in chant['verses']:
            out_verses.append({
                'id': v['id'],
                'verse_number': v['verse_number'],
                'meaning': results.get(str(v['id']), ''),
            })
        out.append({
            'slug': chant['slug'],
            'title': chant['title'],
            'verses': out_verses,
        })

    with open(OUT_PATH, 'w') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    in_count = sum(len(c['verses']) for c in data)
    out_count = sum(len(c['verses']) for c in out)
    empty = sum(1 for c in out for v in c['verses'] if not v['meaning'])
    sys.stderr.write(f"DONE: in={in_count} out={out_count} empty={empty}\n")

if __name__ == '__main__':
    main()
