#!/usr/bin/env python3
import json

with open('/root/hetzner-aol/japachants/cache/batches/sonnet-05.json') as f:
    data = json.load(f)

# Build a lookup: id -> (slug, verse_number, sanskrit snippet)
all_verses = {}
for chant in data:
    for v in chant['verses']:
        all_verses[v['id']] = (chant['slug'], v['verse_number'], v['sanskrit'][:60])

print(f"Total verses: {len(all_verses)}")

# Print remaining chants' verse IDs in batches for translation
for chant in data:
    slug = chant['slug']
    if slug in ['ghantasala-bhagavad-gita', 'devi-mahatmyam-durga-saptasati-chapter-2', 'brahma-samhita']:
        continue
    print(f"\n{slug}")
    for v in chant['verses']:
        print(f"  {v['id']}: v{v['verse_number']}")
