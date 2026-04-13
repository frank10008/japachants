#!/usr/bin/env tsx
/**
 * Re-classify chants that landed in "Misc" by broadening the deity regex.
 * Runs against the existing DB — no re-scrape needed.
 */
import path from "node:path";
import Database from "better-sqlite3";

const DB_PATH = path.join(process.cwd(), "db", "chants.db");

const RULES: { match: RegExp; deity: string; category: string }[] = [
  { match: /\b(annamayya|tallapaka)\b/i, deity: "Vishnu", category: "Annamayya Keerthanas" },
  { match: /\btyagaraja\b/i, deity: "Rama", category: "Tyagaraja Keerthanas" },
  { match: /\b(muthuswami|muthuswamy|dikshitar)\b/i, deity: "Devi", category: "Dikshitar Keerthanas" },
  { match: /\b(shyama|syama)-shastri\b/i, deity: "Devi", category: "Shyama Shastri Keerthanas" },
  { match: /\b(narayana|yesubai|purandara)-dasa\b/i, deity: "Vishnu", category: "Dasa Keerthanas" },

  { match: /(chandrasekhar|bilva|kasi-?vishwanath|kashi-?vishwanath|mahamrityunjaya|mahamritunjaya|shivashtakam|shiva-stuti|shiva-manasa|shiva-ashtakam|chandramauli|linga|ardhanareshwar|nataraj|bhairava|dakshinamurthy|kailasa|rudra|somanath|visheshwar)/i,
    deity: "Shiva", category: "Shiva Stotrams" },

  { match: /(nirvana-shatkam|atma-shatkam|atma-bodha|viveka|drg-drsya|advaita|upadesha|bhajagovindam|dakshinamurti-stotram|sankara|shankara|acharya)/i,
    deity: "Vedanta", category: "Shankara Works" },

  { match: /(ganga|yamuna|narmada|tulasi|kaveri|saraswati-nadi|godavari)/i,
    deity: "Rivers", category: "River Stotrams" },

  { match: /(lalitha|lalita|sri-chakra|navavarana|soundarya|ananda-lahari|devi-bhujanga|khadgamala)/i,
    deity: "Lalita", category: "Devi Stotrams" },
  { match: /(mookambika|meenakshi|kamakshi|kanyakumari|shakambari|raja-rajeshwari|chamunda|mahishamardini)/i,
    deity: "Devi", category: "Devi Stotrams" },
  { match: /(abhirami|abhiramy|abirami)/i, deity: "Devi", category: "Abhirami Stotrams" },
  { match: /(tiruppavai|thiruppavai|andal|godai)/i, deity: "Vishnu", category: "Alvar Compositions" },
  { match: /(divya-prabandha|alvar|tirumangai|tirumalisai|nammalvar|periyalvar)/i, deity: "Vishnu", category: "Alvar Compositions" },
  { match: /(tevaram|thevaram|thiruvasagam|thiruvachagam|appar|sundarar|sambandar|manikkavacakar|nayanmar)/i,
    deity: "Shiva", category: "Nayanar Compositions" },

  { match: /(balaji|venkateswara|venkatesa|seshadri|tiruvengada|tiruppati|tirumala)/i,
    deity: "Vishnu", category: "Venkateswara Stotrams" },
  { match: /(narasimha|nrsimha|nrisimha)/i, deity: "Vishnu", category: "Narasimha Stotrams" },
  { match: /(varadaraja|varada)/i, deity: "Vishnu", category: "Varadaraja Stotrams" },
  { match: /(ranganath|ranganatha)/i, deity: "Vishnu", category: "Ranganatha Stotrams" },
  { match: /(padmanabha)/i, deity: "Vishnu", category: "Padmanabha Stotrams" },

  { match: /(sudarshan|chakra)/i, deity: "Vishnu", category: "Sudarshana Stotrams" },
  { match: /(achyuta|achyutashtaka|vamana|trivikrama|upendra|daamodara|damodar)/i, deity: "Vishnu", category: "Vishnu Stotrams" },

  { match: /(gayatri|sandhya|arghya|upasthana|tarpana|yagnopavita|vedapatana)/i, deity: "Vedic", category: "Vedic Chants" },
  { match: /(ramayana|ayodhya|sundara-kanda|yudha-kanda|aranya-kanda|lanka)/i, deity: "Rama", category: "Ramayana" },
  { match: /(bhagavata|bhagavat|srimad)/i, deity: "Vishnu", category: "Bhagavata" },

  { match: /(shanti|swasti|mangala)/i, deity: "Vedic", category: "Peace Invocations" },
  { match: /(navagraha|graha)/i, deity: "Navagraha", category: "Navagraha Stotrams" },
  { match: /(medha-suktam|srisuktam|sri-suktam|bhu-suktam|sudarshana-kavacham|kavacham|kavacha)/i, deity: "Vedic", category: "Vedic Chants" },

  { match: /\b(rama|ram|raghu|raghava|sita-rama|sri-rama|kodanda|janaki)/i, deity: "Rama", category: "Rama Stotrams" },
  { match: /\b(krishna|keshava|madhava|govinda|gopala|kanha|vasudeva|giridhari|damodara|madhusudan|murari|yashoda)/i,
    deity: "Krishna", category: "Krishna Stotrams" },
  { match: /\b(vishnu|hari|narayana|achyuta)/i, deity: "Vishnu", category: "Vishnu Stotrams" },
];

function reclassify() {
  const db = new Database(DB_PATH);
  const misc = db.prepare("SELECT id, slug, title FROM chants WHERE deity = 'Misc'").all() as {
    id: number;
    slug: string;
    title: string;
  }[];
  console.log(`${misc.length} misc chants to reclassify...`);

  const update = db.prepare("UPDATE chants SET deity = ?, category = ? WHERE id = ?");
  let changed = 0;
  for (const c of misc) {
    const hay = `${c.slug} ${c.title}`.toLowerCase();
    for (const r of RULES) {
      if (r.match.test(hay)) {
        update.run(r.deity, r.category, c.id);
        changed++;
        break;
      }
    }
  }
  console.log(`Reclassified ${changed} of ${misc.length}.`);

  const breakdown = db.prepare("SELECT deity, COUNT(*) as n FROM chants GROUP BY deity ORDER BY n DESC").all();
  console.log("\nDeity distribution:");
  for (const row of breakdown as { deity: string; n: number }[]) {
    console.log(`  ${row.n.toString().padStart(4)} ${row.deity}`);
  }
}

reclassify();
