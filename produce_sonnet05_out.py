#!/usr/bin/env python3
"""Produce sonnet-05-out.json with meaning field added to every verse."""
import json, sys, os

# ---- load all meaning dicts ----
sys.path.insert(0, os.path.dirname(__file__))

from meanings_chants123 import GHANTASALA_BG, DEVI_MAHATMYAM, BRAHMA_SAMHITA
from meanings_part1 import BS_REMAINING
from meanings_part2 import KYTS_JATA, KYTS_18
from meanings_part3 import SHANI_CHALISA, SHIVA_PANCHAMRUTA
from meanings_part4 import AMBA_STAVAM, DEVI_APARAJITA
from meanings_part5 import CHANAKYA_12, CHANAKYA_16, PRASHNOPANISHAD, BG_DHYANA
from meanings_part6 import (DEVI_ASWADHATI, YAMA_KRUTA, KANNADA_GEETHE,
                              HIRANYA_GARBHA, NARAYANIYAM_40, NARAYANIYAM_83)
from meanings_part7 import (SANKATA_GANESHA, BRUHASPATI_KAVACHA, RAMA_DOOTHA,
                              AIKAMATYA, SRI_RAMA_PAADAMA, BG_CH12, ANNAMAYYA)

ALL_MEANINGS = {}
for d in [GHANTASALA_BG, DEVI_MAHATMYAM, BRAHMA_SAMHITA, BS_REMAINING,
          KYTS_JATA, KYTS_18, SHANI_CHALISA, SHIVA_PANCHAMRUTA,
          AMBA_STAVAM, DEVI_APARAJITA, CHANAKYA_12, CHANAKYA_16,
          PRASHNOPANISHAD, BG_DHYANA, DEVI_ASWADHATI, YAMA_KRUTA,
          KANNADA_GEETHE, HIRANYA_GARBHA, NARAYANIYAM_40, NARAYANIYAM_83,
          SANKATA_GANESHA, BRUHASPATI_KAVACHA, RAMA_DOOTHA, AIKAMATYA,
          SRI_RAMA_PAADAMA, BG_CH12, ANNAMAYYA]:
    ALL_MEANINGS.update(d)


def sanitize(m):
    """Return cleaned meaning string, hard-capping at 250 chars."""
    if m is None:
        return ""
    m = m.strip()
    if len(m) > 250:
        m = m[:247] + "..."
    return m


def main():
    in_path  = "/root/hetzner-aol/japachants/cache/batches/sonnet-05.json"
    out_path = "/root/hetzner-aol/japachants/cache/batches/sonnet-05-out.json"

    with open(in_path) as f:
        data = json.load(f)

    missing = []
    total   = 0
    output  = []

    for chant in data:
        out_chant = {k: v for k, v in chant.items() if k != "verses"}
        out_verses = []
        for v in chant["verses"]:
            total += 1
            vid = v["id"]
            meaning = ALL_MEANINGS.get(vid)
            if meaning is None:
                missing.append((chant["slug"], vid, v["verse_number"]))
                meaning = ""
            # build output verse (drop sanskrit + transliteration, add meaning)
            ov = {
                "id":           v["id"],
                "verse_number": v["verse_number"],
                "meaning":      sanitize(meaning),
            }
            out_verses.append(ov)
        out_chant["verses"] = out_verses
        output.append(out_chant)

    if missing:
        print(f"WARNING: {len(missing)} verses have no meaning:")
        for slug, vid, vn in missing[:30]:
            print(f"  {slug} id={vid} v{vn}")
    else:
        print("All meanings present.")

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"Written {total} verses to {out_path}")


if __name__ == "__main__":
    main()
