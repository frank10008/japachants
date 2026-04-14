import json

def t(meaning):
    """Return a translation string, validating length."""
    if meaning is None:
        return ""
    m = meaning.strip()
    if len(m) > 250:
        # truncate to last word boundary
        m = m[:247] + "..."
    return m

# ===================================================
# CHANT 0: sri-satyanarayana-puja (379 verses)
# ===================================================

def meanings_satyanarayana():
    """Build id->meaning map for all 379 verses."""
    m = {}
    
    # V1: section header
    m[37954] = ""  # pūrvāṅga pūjā — section label
    
    # V2: invocation salutations
    m[37955] = "Salutations to the great lord of Ganas, to the Gurus, and to Hari — Om."
    
    # V3: purification mantra
    m[37956] = "Whether one is pure or impure, or in whatever state one may be, whoever remembers Pundarikaksha (Vishnu) becomes pure inwardly and outwardly."
    
    # V4: prayer — ganapati dhyana
    m[37957] = "We meditate on Vishnu, clothed in white, with the colour of the moon, four-armed and with a serene countenance, to remove all obstacles."
    
    # V5: Vac sukta — goddess of speech
    m[37958] = "The gods brought forth the goddess of speech; many forms of living beings speak her. May she, sweet and pleasing, come to us."
    
    # V6: auspiciousness prayer
    m[37959] = "By constant remembrance of the auspicious Shiva and the all-beneficent goddess, may we always be freed from all sins."
    
    # V7: muhurta shloka
    m[37960] = "This very moment is auspicious, this very day is auspicious; may the strength of stars, moon, learning, and divine power all be auspicious now."
    
    # V8: guru mantra
    m[37961] = "The Guru is Brahma, the Guru is Vishnu, the Guru is the great Lord Shiva; the Guru is verily the Supreme Brahman — salutation to that Guru."
    
    # V9: protection for Vishnu's devotees
    m[37962] = "They have gain, they have victory — when can defeat touch them? — for in whose hearts the dark-hued lotus-eyed Lord dwells, the people rejoice."
    
    # V10: sharana mantra
    m[37963] = "O auspicious one, most auspicious of all auspicious things, O Shiva who fulfils all desires, O Gouri who grants refuge, O three-eyed Narayani — salutation to you."
    
    # V11: paired deity invocations
    m[37964] = "Salutation to Lakshmi-Narayana together, to Uma-Maheshvara together, to Vani-Hiranyagarbha together, and to all pairs of divine consorts."
    
    # V12: lamp invocation
    m[37965] = "O lamp, you are of the form of Brahman, lord of all lights, the imperishable — grant us good fortune, and be pleased to dwell here as I offer worship."
    
    # V13: achamana — ritual sipping of water with Vishnu's names
    m[37966] = ""  # repeated name-by-name offering — ritual chrome
    
    # V14: ghost dispersal
    m[37967] = "Let the ghosts and demons who are burdens on the earth rise up and depart — we perform this worship without obstruction from them."
    
    # V15: pranayama — seven vyahritis
    m[37968] = ""  # Om bhuh bhuvah svah mahah janah tapah satyam — ritual pranayama, chrome
    
    # V16: sankalpa
    m[37969] = ""  # personal resolve text — ritual chrome
    
    # V17: instruction line
    m[37970] = ""  # parenthetical instruction
    
    # V18: instruction line
    m[37971] = ""
    
    # V19: kalasha instructions
    m[37972] = ""  # ritual instruction prose
    
    # V20: kalasha mantra
    m[37973] = "Vishnu abides in the mouth of the pot, Rudra in the neck, Brahma at the base, and all the sacred waters in its belly — may the divine mothers also dwell here."
    
    # V21: water purification mantra (RV)
    m[37974] = "The purified Soma flows through the pots, is sprinkled and poured, and grows through the hymns and sacrifices."
    
    # V22: waters as the universal
    m[37975] = "Water is all this universe; all beings are water; the life-breath is water, the animals are water, food is water — all is pervaded by water."
    
    # V23: sacred river invocation
    m[37976] = "O Ganga, Yamuna, Godavari, Sarasvati, Narmada, Sindhu, and Kaveri — may all your waters be present in this water."
    
    # V24: invocation instruction
    m[37977] = ""  # mixed instruction/mantra, chrome
    
    # V25: conch preparation instruction
    m[37978] = ""  # ritual instruction
    
    # V26: conch deity mantra
    m[37979] = "The moon and sun are the deities of the conch; Varuna dwells within; Prajapati on the back — thus one should know the conch."
    
    # V27: conch names
    m[37980] = ""  # list of name-offerings, chrome
    
    # V28: bell-ringing instruction
    m[37981] = ""  # brief mantra + chrome
    
    # V29: bell purpose mantra
    m[37982] = "I ring this bell at the outset to summon the gods and to drive away the demons, so that the worship may proceed auspiciously."
    
    # V30: Ganapati invocation instruction
    m[37983] = ""  # instruction
    
    # V31: prana pratishtha mantra (RV)
    m[37984] = "O lord of life, restore sight to us, restore breath to us here; may we see the sun long, with joy and with life, O Asuaniti."
    
    # V32: Ganapati dhyana
    m[37985] = "We meditate upon the four-armed lord of golden-yellow colour, holding noose and goad, the god who is the master, son of the one whose vehicle is the lion."
    
    # V33: Agajanana shloka
    m[37986] = "We worship the one-tusked Ganapati, who is like the sun to the lotus-face of the daughter of the mountain, worshipped day and night."
    
    # V34: Vedic Ganapati mantra
    m[37987] = "We call upon you, O lord of Ganas, the sage among sages, unequalled in fame, most wise — may you come to us with blessings."
    
    # V35-44: upachara offerings to Ganapati (chrome — repeated formula)
    for vid in range(37988, 37998):
        m[vid] = ""
    
    # V45: aabharana offering
    m[37998] = ""
    
    # V46: flower offering — list of names
    m[37999] = ""  # list of Ganapati names with namah, chrome
    
    # V47: incense mantra
    m[38000] = "This incense, born of forest plants, blended with many divine fragrances, is agreeable to all the gods — accept it, O lord."
    
    # V48: lamp mantra
    m[38001] = "This lamp combined with ghee and three wicks is dear to us — accept this auspicious lamp offered with devotion."
    
    # V49: instruction
    m[38002] = ""
    
    # V50: naivedya — Gayatri
    m[38003] = ""  # Gayatri mantra used as naivedya invocation — chrome ritual use
    
    # V51: tambula mantra
    m[38004] = "O lord, accept this betel offered with areca nut, camphor, betel leaves, and pearl powder as my offering of tambula."
    
    # V52: nirajana — Purusha sukta opening
    m[38005] = "I know that great Purusha, bright as the sun, beyond darkness, through whom alone one crosses death — there is no other path."
    
    # V53: mantrapushpa — Ganapati names
    m[38006] = "Sumukha, Ekadanta, Kapila, Gajakarnaka, Lambodara, Vikata, Vighnaraja, Guhya — these eight names of Ganesha ward off all fear."
    
    # V54: pradakshina mantra
    m[38007] = "Whatever sins have been committed in this life and in past lives — all of them perish by the merit of circumambulation."
    
    # V55: royal services offering
    m[38008] = ""  # chrome
    
    # V56: kshama prarthana
    m[38009] = "By whose mere remembrance and by the utterance of whose name, all deficiencies in tapas, puja, and rituals become complete — salutation to that lord."
    
    # V57: completion declaration
    m[38010] = ""  # ritual declaration
    
    # V58: auspiciousness declaration
    m[38011] = ""  # ritual declaration
    
    # V59: tirtham mantra
    m[38012] = "This water removes untimely death, cures all diseases, and destroys all accumulated sins — this is the holy water of Sri Mahaganapati."
    
    # V60: udvāsana — Yajnena yajna
    m[38013] = "The gods worshipped sacrifice with sacrifice — those were the first dharmas. Through these, the great ones reached heaven."
    
    # V61: shanti
    m[38014] = ""  # Om shanti x3 — chrome
    
    # V62: section header
    m[38015] = ""
    
    # V63: sankalpa repeat
    m[38016] = ""  # ritual sankalpa text
    
    # V64: instruction
    m[38017] = ""
    
    # V65: Varuna puja
    m[38018] = "O Varuna, hear my call in the middle, and be gracious — I who desire your protection come to you."
    
    # V66: Brahman mantra
    m[38019] = "Brahman was born first of all, shining forth from the primal waters — in him reside all the gods."
    
    # V67: section label
    m[38020] = ""
    
    # V68: Ganapati
    m[38021] = "We call upon you, O lord of Ganas, the sage among sages, unequalled in fame — may you come to us with every blessing."
    
    # V69: Brahma
    m[38022] = "O Brahma, lord of the gods, sage of sages, great bull among the powerful, eagle of eagles — you are the swiftly flying bird of all."
    
    # V70: Vishnu
    m[38023] = "Vishnu strode through this universe in three steps, planting his foot in the highest place; from there all beings dwell in safety."
    
    # V71: Rudra
    m[38024] = "To Rudra who is the perceiver, the most generous, the mightiest — may we utter the prayer that is most healing to the heart."
    
    # V72: Gauri
    m[38025] = "Gauri, measuring and shaping the waters, moves as one-footed, two-footed, four-footed, eight-footed, nine-footed — the thousand-syllabled mantra is hers."
    
    # V73: panchalokapala offering
    m[38026] = ""  # chrome — upachara list
    
    # V74: section header
    m[38027] = ""
    
    # V75: Surya mantra
    m[38028] = "Moving along the path of truth with his golden car, the god Savitr brings together both the immortal and the mortal."
    
    # V76: Surya description + offerings
    m[38029] = ""  # chrome
    
    # V77: Agni mantra
    m[38030] = "We choose Agni as our messenger, as the all-knowing priest of sacrifice, as the one who performs this yagna with great wisdom."
    
    # V78: Rudra mantra
    m[38031] = "To Rudra who is the perceiver, most generous, mightiest — may we utter the most healing word to the heart."
    
    # V79: Chandra mantra
    m[38032] = "O Soma, expand and come to us from every direction with your strength — be the source of nourishment and vitality."
    
    # V80: Chandra description
    m[38033] = ""  # chrome
    
    # V81: waters mantra
    m[38034] = "Soma told me that within the waters dwell all healing medicines, and Agni who benefits all, and the waters themselves."
    
    # V82: Gauri mantra (repeat)
    m[38035] = "Gauri measures and shapes the waters, one-footed, two-footed, four-footed — she of the thousand-syllabled mantra."
    
    # V83: Angaraka/Mars mantra
    m[38036] = "Agni is the head of heaven, the lord and keeper of earth — he imparts offspring and vital seed."
    
    # V84: Angaraka description
    m[38037] = ""  # chrome
    
    # V85: Angaraka offering mantra
    m[38038] = "O bountiful earth, be gentle and without thorns; a wide abode — grant us happiness all around."
    
    # V86: field deity mantra
    m[38039] = "O lord of the field, we win you over just as one tames a mare — nourish us, animals and men, and be merciful."
    
    # V87: Budha/Mercury mantra
    m[38040] = "Awaken, O Agni — arise; unite with what was done and what was given; let those who have gathered here be with you."
    
    # V88: Budha description
    m[38041] = ""  # chrome
    
    # V89: Vishnu mantra (repeat)
    m[38042] = "Vishnu strode through this universe in three steps, planting his foot in the highest place; from there, O Vishnu, your footfall grants protection."
    
    # V90: Purusha mantra
    m[38043] = "The Purusha has a thousand heads, a thousand eyes, a thousand feet — encompassing the earth on all sides, he extends ten fingers beyond it."
    
    # V91: Brihaspati mantra
    m[38044] = "O Brihaspati, what you have — shining, exceeding whatever is worthy — grant it to your devotees abundantly as brilliance among men."
    
    # V92: Brihaspati description
    m[38045] = ""  # chrome
    
    # V93: Brahman mantra (repeat)
    m[38046] = "Brahman was born first of all, shining from the primal waters — he holds the wisdom of all creation."
    
    # V94: Indra-Maruts mantra
    m[38047] = "O Indra with the Maruts, drink this Soma here as you drank at Sharyata's place — under your guidance and your wisdom."
    
    # V95: Shukra/Venus mantra
    m[38048] = "The bright one is one, the sacrificial-worthy one is another — the two days of equal form, like the sky, are light."
    
    # V96: Shukra description
    m[38049] = ""  # chrome
    
    # V97: Indrani mantra
    m[38050] = "I have heard Indrani is the most blessed of these women, the one whose husband will never die in old age."
    
    # V98: Indra-Maruts (repeat)
    m[38051] = "O Indra with the Maruts, drink this Soma here as at Sharyata — led by your guidance."
    
    # V99: Shani/Saturn mantra
    m[38052] = "May Agni be peaceful for us with all fires, the sun bless us, and the wind blow peacefully for us."
    
    # V100: Shani description
    m[38053] = ""  # chrome
    
    # V101: Yama mantra
    m[38054] = "Press Soma for Yama, offer the oblation to Yama — sacrifice goes to Yama with Agni as its messenger."
    
    # V102: Prajapati mantra
    m[38055] = "O Prajapati, none other than you encompasses all these born things — may those things we desire, for which we pour the oblation, be ours."
    
    # V103: Rahu mantra
    m[38056] = "With what wonderful, ever-increasing aid, O Indra, are you always our companion — with what most powerful help?"
    
    # V104: Rahu description
    m[38057] = ""  # chrome
    
    # V105: Rahu offering mantra
    m[38058] = "This spotted cow strode forward, came to her mother once again, and turned back toward her father — toward the light."
    
    # V106: serpent mantra (Rahu association)
    m[38059] = "Salutation to the serpents who are everywhere on earth, who are in the atmosphere, who are in the sky — to them all reverence."
    
    # V107: Ketu mantra
    m[38060] = "Making the darkness bright as a banner, O Maruts, you rose with the dawns — the one who fashions signs."
    
    # V108: Ketu description
    m[38061] = ""  # chrome
    
    # V109: Ketu offering mantra
    m[38062] = "O brilliant one, most brilliant of all, grant us brilliant dominion; bestow on us the shining and beautiful moon."
    
    # V110: Brahma mantra (repeat)
    m[38063] = "O Brahma, lord of gods, sage of the wise, great bull among the mighty — you who fly as the eagle, grant us great wealth."
    
    # V111: navagraha offering declaration
    m[38064] = ""  # chrome declaration
    
    # V112: navagraha prasada
    m[38065] = ""  # chrome
    
    # V113: section header
    m[38066] = ""
    
    # V114: Indra
    m[38067] = "We call upon Indra from all sides for these people — may he be ours alone."
    
    # V115: Agni
    m[38068] = "We choose Agni as our divine messenger and all-knowing priest for this sacrifice."
    
    # V116: Yama
    m[38069] = "Press Soma for Yama, offer the oblation to Yama — sacrifice goes to Yama with Agni as its messenger."
    
    # V117: Nirriti
    m[38070] = "Let Nirriti, who brings misfortune and evil, not strike us from above or below — let her depart with craving."
    
    # V118: Varuna
    m[38071] = "O Varuna, hear this our prayer in the middle, and be gracious — we come to you seeking protection."
    
    # V119: Vayu
    m[38072] = "O Vayu, lord of truth, son-in-law of Tvashtr — we choose your mighty protection."
    
    # V120: Kubera
    m[38073] = "Soma gives the cow, Soma gives the swift horse, Soma gives the hero fit for action — Soma gives wealth to the one who sits and to the one who moves."
    
    # V121: Ishana
    m[38074] = "We call upon the lord and master of all that moves and is still, to enliven our thoughts and for our protection."
    
    # V122: ashtadikpala offering
    m[38075] = ""  # chrome
    
    # V123: ashtadikpala prasada
    m[38076] = ""  # chrome
    
    # V124: section header
    m[38077] = ""
    
    # V125: milk — panchamrita mantra
    m[38078] = "O Soma, expand and come to us from all sides with your potency — may you nourish us."
    
    # V126: yogurt mantra
    m[38079] = "I have made Dadikravan run — the swift, powerful horse; may he perfume our mouths and prolong our lives."
    
    # V127: ghee mantra
    m[38080] = "You are bright, you are light, you are radiant — may the divine Savitr purify you with his perfect purifier."
    
    # V128: honey mantra
    m[38081] = "May sweet winds blow for the one who lives by truth; may the rivers flow sweet; may all our herbs be sweet."
    
    # V129: sugar mantra
    m[38082] = "Flow sweetly for heavenly birth, sweetly for Indra of good invocation, sweetly for Mitra and Varuna."
    
    # V130: coconut water mantra
    m[38083] = "Whatever fruit-bearing or fruitless, flowerless or flowering trees there are — may Brihaspati release us from all that binds."
    
    # V131: instruction line
    m[38084] = ""
    
    # V132: instruction line
    m[38085] = ""
    
    # V133: Narayana Gayatri
    m[38086] = "We know Narayana, we meditate on Vasudeva — may Vishnu inspire us forward. Salutation to the great Purusha."
    
    # V134: invocation declaration
    m[38087] = ""  # ritual prose
    
    # V135: prana pratishtha opening
    m[38088] = ""  # technical mantra header
    
    # V136: kara nyasa
    m[38089] = ""  # nyasa — ritual gesture assignment, chrome
    
    # V137: anga nyasa
    m[38090] = ""  # chrome
    
    # V138: Lakshmi dhyana
    m[38091] = "She who rides a vessel on the red ocean, seated on a red lotus, holding noose, sugarcane bow and flower arrows — the divine Tripurasundari in meditation."
    
    # V139: Vishnu dhyana
    m[38092] = "We meditate on Vishnu of peaceful form, resting on the serpent, the lotus-navelled lord of the gods, the sky-like, cloud-coloured auspicious one."
    
    # V140: mantra line
    m[38093] = ""  # bija mantra sequence, chrome
    
    # V141: prana pratishtha mantra
    m[38094] = "O lord of life, restore our sight, restore the breath of life to us here — may we long behold the sun in bliss."
    
    # V142: sannidhi prayer
    m[38095] = "O lord of all worlds, remain present in this pot with loving grace for the duration of the puja."
    
    # V143: invocation with retinue
    m[38096] = ""  # ritual invocation
    
    # V144: Satyanarayana dhyana
    m[38097] = "We meditate on Satyanarayana who is beyond the three qualities yet endowed with all three, lord of the worlds, three-world ruler, adorned with the Kaustubha gem."
    
    # V145: avahana — Purusha sukta opening
    m[38098] = "The Purusha has a thousand heads, a thousand eyes, a thousand feet — encompassing the earth from all sides, he exceeds it by ten fingers."
    
    # V146: asana
    m[38099] = "The Purusha is all this, all that was and all that shall be; he is also the lord of immortality who grows through what is nourished by food."
    
    # V147: padya
    m[38100] = "So great is his glory, and yet the Purusha is greater still — all beings are one foot of him."
    
    # V148: arghya
    m[38101] = "Three-quarters of the Purusha rose upward; one-quarter of him became all this here again — from there he moved outward in all directions."
    
    # V149: achamaniya
    m[38102] = "From that Purusha, Virat was born; from Virat the Purusha was born again — born, he extended beyond the earth both behind and before."
    
    # V150: snanam
    m[38103] = "When the gods performed the sacrifice with Purusha as the oblation — spring was its ghee, summer was the fuel, and autumn the offering."
    
    # V151: panchamrita snanam
    m[38104] = "O Soma, expand and come from all sides with your potency — be the source of food and the giver of nourishment."
    
    # V152-156: panchamrita mantras (repeat)
    m[38105] = "I have made Dadikravan run, the strong victorious horse — make our mouths fragrant and prolong our lives and breath."
    m[38106] = "You are brightness, you are light, you are splendour — may divine Savitr purify you with his perfect purifier."
    m[38107] = "May sweet winds blow for those who live by truth; may the rivers flow sweet; may all herbs be sweet to us."
    m[38108] = "Flow sweetly for the divine-born, sweetly for Indra worthy of invocation, sweetly for Mitra and Varuna."
    m[38109] = "Whatever fruit-bearing and fruitless trees there are, flowering or not — may Brihaspati release us from all that binds."
    
    # V157: clean water bath
    m[38110] = "O waters that are full of bliss — you strengthen us and give great vigour for our delight."
    
    # V158: snanam shloka
    m[38111] = "With sacred water kept in golden vessels, fragrant and moist with the grace of the gods — I offer this bath as prescribed, O lord of lords."
    
    # V159: river bath
    m[38112] = "Accept this pure water brought from all rivers for your bath, O lord of gods, given by me, O lord of the gods."
    
    # V160: instruction
    m[38113] = ""
    
    # V161: cloth — Purusha sukta
    m[38114] = "Seven were its enclosings and thrice seven were the sticks of fuel laid — when the gods performed the sacrifice and bound the Purusha as the beast."
    
    # V162: sacred thread
    m[38115] = "They sprinkled the Purusha, the sacrifice, born first, with sacred water on the sacrificial grass — the gods, the seers, and the Sadhyas performed the sacrifice."
    
    # V163: gandha
    m[38116] = "From that all-completed sacrifice was gathered the mixed ghee — he made the animals of the air, the forest, and the village."
    
    # V164: ornaments
    m[38117] = "From that all-completed sacrifice arose the verses and chants; the metres arose from it; the sacrificial formulas were born from it."
    
    # V165: flowers
    m[38118] = "From that arose horses and all animals with teeth on both jaws; cows arose from it; from it were born goats and sheep."
    
    # V166: anga puja — list
    m[38119] = ""  # chrome — list of body part worship
    
    # V167: ashtottara namaarchana
    m[38120] = ""  # chrome — 108 names
    
    # V168: dhupam — Purusha sukta
    m[38121] = "Into how many parts was the Purusha apportioned? What was his mouth called? What were his arms, his thighs, and his feet?"
    
    # V169: deepam
    m[38122] = "The Brahmin was his mouth, his arms were the Kshatriya, his thighs are the Vaishya, and the Shudra was born from his feet."
    
    # V170: naivedyam
    m[38123] = "The moon was born from his mind, the sun from his eyes, Indra and Agni from his mouth, and Vayu from his breath."
    
    # V171: food offering
    m[38124] = "In a golden plate inlaid with gems, I offer cooked foods smeared with cow-ghee, and various edibles, eatables, lickables, and drinkables."
    
    # V172: naivedya declaration
    m[38125] = ""  # chrome
    
    # V173: Gayatri (repeat)
    m[38126] = ""  # chrome
    
    # V174: tambula — Purusha sukta
    m[38127] = "From his navel arose the atmosphere; the sky arose from his head; from his feet came the earth, from his ears the directions."
    
    # V175: nirajana
    m[38128] = "I know that great Purusha, radiant as the sun, beyond all darkness — I know him, and only by knowing him does one cross death."
    
    # V176: protection mantra
    m[38129] = "Protect my progeny, O noble one, for immortal life — protect those already born and those yet to be born, for the immortal realm."
    
    # V177: fire protection
    m[38130] = "Do not harm us, O Jatavedas — neither cow, horse, man nor the whole world. Come, O fire, shining one; let Shri not abandon us."
    
    # V178: nirajana prayer
    m[38131] = "O lord of the gods, accept this five-wicked lamp I offer, this gift of massed radiance — accept it."
    
    # V179: nirajana declaration
    m[38132] = ""  # chrome
    
    # V180: mantrapushpa — Vishnu
    m[38133] = "Dhata proclaimed this in the beginning; Shakra knowing it from all four directions proclaimed it; by knowing it one goes to the immortal realm."
    
    # V181: mantrapushpa declaration
    m[38134] = ""  # chrome
    
    # V182: pradakshina namaskara shloka
    m[38135] = "Whatever sins have been committed in this life and in past lives — all of them perish through the merit of circumambulation."
    
    # V183: pradakshina prayer
    m[38136] = "I will circumambulate to remove all confusion; O great lord, lift me from the ocean of this worldly existence."
    
    # V184: sashtanga namaskara
    m[38137] = "With chest, head, gaze, mind, speech, feet, hands, and ears — this is the eightfold prostration offered to you."
    
    # V185: sarvopachara
    m[38138] = ""  # chrome
    
    # V186: kshama prarthana (repeat)
    m[38139] = "By whose mere remembrance or utterance of the name, whatever is lacking in tapas, puja, or rites becomes complete — salutation to that god."
    
    # V187: completion declaration
    m[38140] = ""  # chrome
    
    # V188: instruction (sit down)
    m[38141] = ""
    
    # V189: prarthana
    m[38142] = "O infallible Pundarikaksha, slayer of demons, Hrishikesha, lord of the world, lord of speech — I bow to you always in devotion, O Narayana."
    
    # V190: prarthana continued
    m[38143] = "I bow always with devotion to Narayana — in all dangerous, calamitous, and terrible situations, oppressed by enemies, protect me, O lord."
    
    # V191: prarthana declaration
    m[38144] = ""  # chrome
    
    # V192: phalam (fruit offering prayer)
    m[38145] = "O god, this fruit I have placed before you — may I and all my family obtain the fruit of our hearts' desires in this life and the next."
    
    # V193: section header — katha
    m[38146] = ""
    
    # V194: Ganesha invocation
    m[38147] = ""  # chrome
    
    # V195: chapter header
    m[38148] = ""
    
    # V196: Vyasa's setting — sages at Naimisharanya
    m[38149] = "Once in Naimisharanya, the sages headed by Shaunaka all asked the learned Suta, who had come to them."
    
    # V197: sages' question
    m[38150] = "What is the desired fruit obtained by a vow or by austerity? We all wish to hear all this in detail from you."
    
    # V198: Suta's answer
    m[38151] = "The blessed Kamalapati was himself questioned by Narada — and what the god told that divine sage, hear that now."
    
    # V199: Narada's wandering
    m[38152] = "Once Narada the yogi, wishing to bless others, wandered through various worlds and came to the mortal world."
    
    # V200: seeing suffering souls
    m[38153] = "There he saw all the people afflicted by various sorrows, born in various wombs, toiling under the burden of their own deeds."
    
    # V201: Narada's reflection
    m[38154] = "How can the certain destruction of their suffering be brought about? Thinking thus in his mind, he went to the realm of Vishnu."
    
    # V202: vision of Narayana
    m[38155] = "There he saw Narayana the god, white in complexion, four-armed, adorned with conch, discus, mace, lotus, and forest garland."
    
    # V203: Narada's praise
    m[38156] = "Seeing that lord of lords, he began to praise him. Narada said: Salutation to you who transcend all speech and mind."
    
    # V204: stotram continues
    m[38157] = "To you who are the first origin of all, who destroy the anguish of your devotees — Vishnu heard the prayer and spoke to Narada."
    
    # V205: Vishnu asks
    m[38158] = "The blessed Lord said: Why have you come here? What is in your mind? Tell me, O blessed one."
    
    # V206: Narada's reply
    m[38159] = "Narada said: All people in the mortal world are afflicted with various sorrows, born in various births, they are burned by their own deeds."
    
    # V207: Narada's request
    m[38160] = "O lord, how can their suffering be ended by an easy means? Tell me this — if you have compassion for me, I wish to hear it all."
    
    # V208: Vishnu's approval
    m[38161] = "The blessed Lord said: Well asked, dear son, out of desire to bless the people — by performing which one is freed from delusion."
    
    # V209: the vow is great
    m[38162] = "There is a most meritorious vow, rare even in heaven and on earth — out of love for you, dear son, I shall now reveal it."
    
    # V210: Satyanarayana vrat
    m[38163] = "Whoever performs the vow of Satyanarayana properly shall immediately obtain happiness in this very life."
    
    # V211: Narada asks details
    m[38164] = "Narada said: What is its fruit, what is the procedure, and how is this vow to be done? Please tell me all this in detail."
    
    # V212: Vishnu's answer — blessings
    m[38165] = "The blessed Lord said: It removes sorrow and grief, and increases wealth and grain."
    
    # V213: vow details
    m[38166] = "It brings good fortune and progeny, and bestows victory everywhere. Whatever mortal, with devotion and faith, on whatever day..."
    
    # V214: evening worship
    m[38167] = "...worships Satyanarayana at the close of day, together with Brahmins and kinsmen, with devotion and righteousness..."
    
    # V215: offering details
    m[38168] = "...should offer naivedya with devotion — a quarter-filled measure of the finest foods: banana fruit, ghee, milk, and wheat flour."
    
    # V216: alternative offerings
    m[38169] = "In the absence of these, rice flour or sugar or jaggery may be used — a quarter portion of all eatables mixed together may be offered."
    
    # V217: feeding Brahmins
    m[38170] = "Give dakshina to a Brahmin after hearing the story along with others; then together with family and Brahmins..."
    
    # V218: conclude with joy
    m[38171] = "...one should eat the prasada with devotion, perform singing and dancing, and then return to one's own home — thus Satyanarayana fulfils all desires."
    
    # V219: fruits in Kali age
    m[38172] = "If a human being acts thus, the fulfilment of all wishes will certainly come to pass — especially in the Kali age this is an easy means."
    
    # V220: chapter colophon 1
    m[38173] = "Colophon: Thus ends the first chapter of the Satyanarayana vrata-katha in the Reva-khanda of the Skanda Purana."
    
    # V221: chapter 2 header
    m[38174] = ""
    
    # V222: Suta continues
    m[38175] = "Suta said: Now I will tell further about what was done by whom in former times, O twice-born — there was once a poor Brahmin in the pleasant city of Kashi."
    
    # V223: seeing the Brahmin
    m[38176] = "Tormented every day by hunger and thirst, he wandered on the earth. Seeing that miserable Brahmin, the Lord took the form of an old Brahmin."
    
    # V224: the question
    m[38177] = "That old Brahmin asked the twice-born with respect: For what reason, O wise one, do you wander constantly on the earth suffering so?"
    
    # V225: Brahmin's answer
    m[38178] = "The Brahmin said: I am a very poor Brahmin wandering on the earth for alms."
    
    # V226: guidance given
    m[38179] = "If you know the means, please tell me with compassion, O lord. The old Brahmin said: Vishnu Satyanarayana fulfils all desires."
    
    # V227: instruction to worship
    m[38180] = "O Brahmin, perform this best of vows — by doing it one is freed from all sorrow and attains great happiness."
    
    # V228: the old Brahmin disappears
    m[38181] = "Having carefully explained the procedure of the vow to the Brahmin, Satyanarayana in the old Brahmin's form disappeared right there."
    
    # V229: Brahmin resolves to do vow
    m[38182] = "He thought: I will perform that vow as told by the old Brahmin. Having resolved thus, the Brahmin that night could not sleep."
    
    # V230: next morning
    m[38183] = "Then rising early in the morning and resolving to perform the Satyanarayana vrat, the Brahmin went out to beg."
    
    # V231: abundant gifts received
    m[38184] = "On that very day the Brahmin obtained abundant wealth. With that, together with his family, he performed the vow of Satya."
    
    # V232: freed from all suffering
    m[38185] = "That best of Brahmins became freed from all sorrow and endowed with all prosperity through the power of that vow."
    
    # V233: monthly practice
    m[38186] = "From that time forward, he performed the vow every month. Having thus performed this vow of Narayana, the best of Brahmins..."
    
    # V234: liberation attained
    m[38187] = "...freed from all sins, attained the hard-to-reach liberation. When a Brahmin performs this vow on this earth..."
    
    # V235: instant result
    m[38188] = "...at that very moment all the sorrow of the man is destroyed. Thus Narayana told this to Narada."
    
    # V236: narrative continues
    m[38189] = "I have told you all this, O Brahmins — what more shall I tell you? The sages said: Hearing this from the Brahmin, we wish to know more."
    
    # V237: next story — Suta
    m[38190] = "Suta said: Hear, all you sages, of the vow by which what was done on earth came to pass. Once that best of Brahmins..."
    
    # V238: woodcutter arrives
    m[38191] = "...together with family and kinsmen, rose up to perform the vow. At that very time a woodseller came to that place."
    
    # V239: woodcutter enters Brahmin's house
    m[38192] = "Having left the wood outside, he came to the Brahmin's house. Thirsty and parched, seeing the Brahmin performing the vow..."
    
    # V240: woodcutter's question
    m[38193] = "...he bowed to the Brahmin and asked him: What is being done here? What fruit is obtained by it? Tell me fully."
    
    # V241: Brahmin explains
    m[38194] = "The Brahmin said: This is the Satyanarayana vow — giver of all that is desired. By its grace all my wealth came back to me."
    
    # V242: woodcutter takes prasada
    m[38195] = "Knowing this vow, the woodcutter was very happy. He drank the water and ate the prasada, and went to the village."
    
    # V243: woodcutter's resolution
    m[38196] = "He thought about Lord Satyanarayana in his mind: Whatever I get for selling wood in the village today..."
    
    # V244: vow promised
    m[38197] = "...with that very money I will perform this excellent vow of the true god. Having resolved thus in his mind, the woodcutter carried the wood on his head."
    
    # V245: abundant payment
    m[38198] = "He went to the pleasant city where wealthy people dwell. On that day he received double the price for the wood."
    
    # V246: buying offerings
    m[38199] = "Then with a joyful heart he bought ripe banana fruit, sugar, ghee, milk, and wheat flour."
    
    # V247: vow performed
    m[38200] = "Mixing them together with a quarter portion, he went home and invited his family to perform the vow according to the rules."
    
    # V248: fruits of the vow
    m[38201] = "By the power of that vow he became endowed with sons and wealth — he enjoyed happiness in this world..."
    
    # V249: chapter colophon 2
    m[38202] = "Colophon: Thus ends the second chapter of the Satyanarayana vrata-katha in the Reva-khanda of the Skanda Purana."
    
    # V250: chapter 3 header
    m[38203] = ""
    
    # V251: Suta continues — king story
    m[38204] = "Suta said: I will tell again — hear, O best of sages. In former times there was a king named Ulkamukhah."
    
    # V252: king's virtues
    m[38205] = "He had conquered his senses, spoke the truth, visited temples every day, and made gifts to Brahmins to keep them content."
    
    # V253: his wife
    m[38206] = "His wife, charming and lotus-faced, was truly virtuous — she observed the vow of Satyanarayana on the bank of the Bhadrasila river."
    
    # V254: a merchant arrives
    m[38207] = "At that time a wealthy merchant came there with many riches for trade."
    
    # V255: merchant meets king
    m[38208] = "Mooring his boat at the bank, he went to the king. Seeing the king performing a vow, he asked with humility."
    
    # V256: merchant's question
    m[38209] = "The merchant said: O king, what are you doing with such a devoted heart? Make it known fully — I wish to hear."
    
    # V257: king answers
    m[38210] = "The king said: O merchant, worship of Vishnu of incomparable splendour is being performed — the vow together with my kinsmen for sons and grandsons."
    
    # V258: merchant's interest
    m[38211] = "Hearing the king's words, the merchant said with respect: Tell me all about it, O king — I too will perform it."
    
    # V259: merchant's desire for progeny
    m[38212] = "I also have no offspring — certainly from this a son will be born. Then returning from trade, he came home joyfully."
    
    # V260: telling his wife
    m[38213] = "He told his wife everything about the vow that grants progeny. He said: I will perform the vow when I get progeny."
    
    # V261: wife becomes pregnant
    m[38214] = "Thus the honest merchant spoke to his wife Lilavati. On a certain day his wife Lilavati, the good one..."
    
    # V262: wife's devotion
    m[38215] = "...with a heart united with her husband in joy, was devoted to dharma, and by the grace of Satyanarayana his wife became pregnant."
    
    # V263: daughter born
    m[38216] = "In the tenth month a gem of a daughter was born to her — she grew day by day like the moon in the bright fortnight."
    
    # V264: daughter named Kalavati
    m[38217] = "She was named Kalavati and the naming ceremony was performed. Then Lilavati spoke sweet words to her husband."
    
    # V265: wife reminds husband of vow
    m[38218] = "Why have you not performed the vow you pledged long ago? The merchant said: I will perform it at the time of her marriage."
    
    # V266: husband reassures wife
    m[38219] = "Having thus reassured his wife, he went to the city. Kalavati the daughter grew up in her father's house."
    
    # V267: suitor found
    m[38220] = "The merchant, seeing the daughter grown, consulted with friends in the city and quickly sent a messenger to seek a match."
    
    # V268: messenger's mission
    m[38221] = "Find a worthy bridegroom for this girl's marriage. The messenger went as directed and came to the golden city."
    
    # V269: merchant's son brought
    m[38222] = "From there he brought one son of a merchant — seeing that handsome and virtuous boy..."
    
    # V270: wedding conducted
    m[38223] = "...together with kinsmen and friends, with great joy in his heart, he gave his daughter to the merchant's son according to the rites."
    
    # V271: vow forgotten again
    m[38224] = "Then by the force of his misfortune, the excellent vow was forgotten by him — even at the time of her wedding, it was not performed."
    
    # V272: merchant departs for trade
    m[38225] = "Then in due time, skilled in his own duties, the merchant quickly went for trade together with his son-in-law."
    
    # V273: journey to Ratnasarapura
    m[38226] = "Going to the pleasant Ratnasarapura near the sea, the merchant with his excellent son-in-law engaged in trade."
    
    # V274: Satyanarayana's curse
    m[38227] = "The two of them went to the city of king Chandraketu. At that very time Satyanarayana..."
    
    # V275: punishment given
    m[38228] = "...seeing that he had broken his pledge, gave him a terrible, harsh and painful curse — great suffering."
    
    # V276: king's thief
    m[38229] = "On a certain day a thief stole from the king's treasury and came right to the spot where the two merchants were staying."
    
    # V277: merchants implicated
    m[38230] = "Afterwards, the guards in pursuit, terrified, placed the stolen wealth right there and quickly fled."
    
    # V278: merchants arrested
    m[38231] = "Then the king's messengers came to where the good merchant was. Seeing the king's wealth there, they arrested both merchants."
    
    # V279: merchants brought to king
    m[38232] = "Running joyfully, they told the king: Two thieves have been brought — look and command."
    
    # V280: king imprisons them
    m[38233] = "The king commanded that they both be firmly bound and thrown into the great dungeon."
    
    # V281: wives robbed at home
    m[38234] = "By the maya of the true god, the words of both were not heard. Therefore the king Chandraketu seized all their wealth."
    
    # V282: family suffers at home
    m[38235] = "Because of the curse, their wives at home were also greatly distressed — a thief stole everything in the house."
    
    # V283: Lilavati wanders
    m[38236] = "Afflicted with ailments, tormented by hunger and thirst — with mind bent on finding food, she wandered about."
    
    # V284: finds a vow being performed
    m[38237] = "On a certain day, afflicted with hunger, she went to a Brahmin's house — there she saw the vow of Satyanarayana being performed."
    
    # V285: takes prasada and prays
    m[38238] = "Sitting and hearing the story, she prayed for a boon; then having eaten the prasada, she returned home at night."
    
    # V286: mother asks daughter
    m[38239] = "The mother spoke to her daughter Kalavati lovingly: Where did you stay at night? What is in your mind?"
    
    # V287: daughter answers
    m[38240] = "The daughter Kalavati quickly answered her mother: At a Brahmin's house, mother, I saw a vow being performed — the giver of all desired things."
    
    # V288: mother resolved to do vow
    m[38241] = "Hearing her daughter's words, she rose up to perform the vow. Joyfully the merchant's wife performed the Satyanarayana vow..."
    
    # V289: praying for husbands' return
    m[38242] = "...she herself, that virtuous one, performed it with family and kinsmen; may the husband and son-in-law quickly return home."
    
    # V290: prayer for forgiveness
    m[38243] = "Please forgive the offence of my husband and son-in-law. Pleased by this vow, Satyanarayana..."
    
    # V291: dream to king
    m[38244] = "...showed a dream to king Chandraketu the best of kings: Release the two merchants in the morning, O best of kings."
    
    # V292: king's dream warning
    m[38245] = "All the wealth that was seized by you now — give it back; otherwise I will destroy you."
    
    # V293: king wakes and acts
    m[38246] = "Having spoken thus to the king, the lord became inaccessible in meditation. Then at the break of dawn..."
    
    # V294: king announces
    m[38247] = "...he sat in his assembly and told the people about the dream: Quickly release those two great men who are bound."
    
    # V295: merchants freed
    m[38248] = "Hearing the king's words, they freed the two great men and brought them before the king, who asked them humbly."
    
    # V296: merchants released
    m[38249] = "The two merchant princes were brought, released from iron chains. Then the two great men bowed to king Chandraketu."
    
    # V297: king speaks
    m[38250] = "Remembering what had happened before, the two spoke without fear or agitation. The king seeing the merchant sons spoke."
    
    # V298: king reassures them
    m[38251] = "It was by God's will that great suffering came; now there is no more fear. Then, released from the chains, they had haircuts and other rites."
    
    # V299: king honours merchants
    m[38252] = "The king gave them clothes and ornaments, satisfied them, and honoured the two merchant sons with kind words."
    
    # V300: wealth returned double
    m[38253] = "Whatever wealth had been brought and taken from them, he gave it back doubled, and then the king said: Go, O merchant, to your own home."
    
    # V301: merchants depart
    m[38254] = "Bowing to the king they said: We may go by your grace. Having said this, the two great merchants went to their own home."
    
    # V302: chapter colophon 3
    m[38255] = "Colophon: Thus ends the third chapter of the Satyanarayana vrata-katha in the Reva-khanda of the Skanda Purana."
    
    # V303: chapter 4 header
    m[38256] = ""
    
    # V304: merchant sets out
    m[38257] = "Suta said: The merchant set out on his journey with auspicious omens, gave wealth to Brahmins, and set off."
    
    # V305: Satyanarayana tests merchant
    m[38258] = "When the merchant had gone some distance, the lord Satyanarayana, wishing to test him, asked the merchant: What is in your boat?"
    
    # V306: merchant's proud answer
    m[38259] = "Then those two merchants, intoxicated with pride, laughing, replied: O mendicant, why do you ask — what is it to you?"
    
    # V307: the contents declared
    m[38260] = "There are only leaves and vines in my vessel — nothing else. Hearing this harsh and lying reply, may it be as you say."
    
    # V308: mendicant withdraws
    m[38261] = "Having said this, the mendicant quickly went away from his presence. Going some distance, he stood near the sea."
    
    # V309: merchant discovers
    m[38262] = "When the mendicant had gone, the merchant completed his daily rites; then looking up at the vessel he was greatly astonished."
    
    # V310: merchant faints
    m[38263] = "Seeing indeed only leaves and vines, the merchant fell to the ground in a faint. Regaining consciousness, he was tormented with grief."
    
    # V311: son-in-law speaks
    m[38264] = "Then the husband of his daughter said these words: Why do you grieve? The curse was given by the mendicant..."
    
    # V312: seek forgiveness
    m[38265] = "...he can certainly do everything here, there is no doubt. So let us go to his feet and seek his grace."
    
    # V313: merchant approaches mendicant
    m[38266] = "Hearing the son-in-law's words, he went to his presence; seeing the mendicant with devotion, he bowed and spoke."
    
    # V314: merchant's plea
    m[38267] = "Forgive my offence, what was said in your presence — having bowed again and again thus, he was overwhelmed with great grief."
    
    # V315: God speaks to merchant
    m[38268] = "Seeing him lamenting, the mendicant spoke: Do not weep — hear my words; you who turned away from my worship..."
    
    # V316: more reproach then blessing
    m[38269] = "...by my command you foolish one received repeated sufferings. Hearing the word of the blessed Lord, he began to praise."
    
    # V317: merchant's prayer
    m[38270] = "The merchant said: All, from Brahma onwards, the dwellers in the three heavens — even they are deluded by your maya and do not know your qualities and form."
    
    # V318: confession
    m[38271] = "I am a fool who does not know you, deluded by your maya — be gracious; I will worship you with what wealth I have."
    
    # V319: boon restored
    m[38272] = "Earlier all the wealth — bring it back; protect me who have taken refuge in you. Hearing these devoted words, the lord was pleased."
    
    # V320: Hari disappears; wealth restored
    m[38273] = "Having given the desired boon, Hari disappeared right there. Then boarding the vessel and seeing all his wealth restored..."
    
    # V321: worship performed
    m[38274] = "...by the grace of the true god, my desire is fulfilled. Saying this, with his kinsmen he performed the worship duly."
    
    # V322: journey home
    m[38275] = "He became fully satisfied by the grace of Satyanarayana. Having secured the vessel with care, he set out toward his own land."
    
    # V323: sends a messenger ahead
    m[38276] = "The merchant told his son-in-law: Look at my jewel-city — he sent a messenger ahead as keeper of his own wealth."
    
    # V324: messenger brings news
    m[38277] = "That messenger went to the city and saw the merchant's wife and reported to her the desired message."
    
    # V325: merchant arrives
    m[38278] = "Near the city, the merchant arrived with his son-in-law, family members, and much wealth."
    
    # V326: wife hears news and worships
    m[38279] = "Hearing the words from the messenger's mouth, the virtuous woman was overjoyed. Performing the Satya puja, she told her daughter..."
    
    # V327: mother tells daughter to wait
    m[38280] = "I will go quickly and come back — go to meet the merchant soon. Hearing the mother's words, the daughter finished the vow and..."
    
    # V328: daughter forgets prasada — husband disappears
    m[38281] = "...abandoning the prasada, she went to her husband. Displeased by this, Satyanarayana caused the husband to disappear."
    
    # V329: husband swallowed by the sea
    m[38282] = "With all his wealth he was submerged in the water. Then Kalavati, not seeing her husband..."
    
    # V330: daughter falls weeping
    m[38283] = "...weeping with great grief, she fell to the ground. Seeing the vessel in such a condition and the girl..."
    
    # V331: merchant is terrified
    m[38284] = "...with a frightened mind the merchant thought: What wonder has occurred here? While they pondered, the boatmen were confounded."
    
    # V332: wife laments
    m[38285] = "Then Lilavati, the daughter, seeing her, was distraught. She lamented with great grief and said these words to her husband."
    
    # V333: lament — why invisible
    m[38286] = "How did he become invisible along with the vessel now? I do not know by the negligence of which god did this calamity come."
    
    # V334: God's power
    m[38287] = "Who can understand the greatness of the true god? Having said this, she lamented; then her kinsmen gathered."
    
    # V335: daughter grieves
    m[38288] = "Then Lilavati held the daughter and wept. Then Kalavati, distressed at the loss of her husband..."
    
    # V336: daughter takes his sandals
    m[38289] = "...took his sandals and resolved in her mind to follow him. Seeing this conduct of the girl, the merchant and his wife..."
    
    # V337: father reflects
    m[38290] = "...scorched with great grief, the righteous man reflected: Was this seized by Satyanarayana? I wandered deluded by his maya."
    
    # V338: vow promised again
    m[38291] = "I will perform the Satya puja with full elaboration of wealth. Having said this, he summoned everyone and told them his intention."
    
    # V339: bowing to Satyanarayana
    m[38292] = "Bowing down to Satyanarayana on the ground again and again, the pleased Satyanarayana, protector of the afflicted..."
    
    # V340: God's explanation
    m[38293] = "...spoke this word compassionately to the devoted-hearted one: Your daughter abandoned the prasada and went to see her husband..."
    
    # V341: reason for punishment
    m[38294] = "...therefore the husband of that daughter certainly became invisible. Going home and taking the prasada, she will find her husband."
    
    # V342: daughter hears
    m[38295] = "The daughter, hearing such words in the sky, went quickly..."
    
    # V343: prasada taken; husband found
    m[38296] = "She quickly went home, ate the prasada, and coming back again she saw her husband and all the kinsmen."
    
    # V344: daughter urges father home
    m[38297] = "Then the daughter Kalavati said to her father: Now go home — why do you delay?"
    
    # V345: vow performed with joy
    m[38298] = "Hearing the daughter's words, the merchant was satisfied. He performed the worship of Satyanarayana duly."
    
    # V346: monthly vow kept
    m[38299] = "With wealth and kinsmen together he went to his own house, and performed the Satya vrat on every full moon and sankranti."
    
    # V347: liberation attained
    m[38300] = "Having enjoyed happiness in this world, at the end he went to the realm of truth."
    
    # V348: chapter colophon 4
    m[38301] = "Colophon: Thus ends the fourth chapter of the Satyanarayana vrata-katha in the Reva-khanda of the Skanda Purana."
    
    # V349: chapter 5 header
    m[38302] = ""
    
    # V350: new king's story
    m[38303] = "Suta said: Now I will tell another story — hear, O best of sages. There was a king called Tungadhvaja, a proud lord."
    
    # V351: king ignores the vow
    m[38304] = "Abandoning the prasada of Satyanarayana, he suffered misfortune. Once he went to the forest and killed many animals."
    
    # V352: king sees cowherds worshipping
    m[38305] = "Coming back and seeing a worship of Satya under a banyan tree, the satisfied cowherds were performing the vow with devotion."
    
    # V353: king's pride
    m[38306] = "The king seeing it proudly neither approached nor bowed to them. Then all the cowherds took the prasada near the king..."
    
    # V354: king spurns prasada
    m[38307] = "...and placed it; they all ate their fill and returned. Then the king, rejecting the prasada, suffered misfortune."
    
    # V355: king's hundred sons die
    m[38308] = "His hundred sons were lost, and all his wealth and grain as well. Satyanarayana destroyed all of it, I know for certain."
    
    # V356: king goes to the cowherds
    m[38309] = "So I will go to the very place where the god's worship takes place. Having resolved thus in his mind, he went to the cowherds' presence."
    
    # V357: king performs vow
    m[38310] = "Then he performed the worship of Satyanarayana together with the cowherds, with devotion and faith, in the proper manner."
    
    # V358: prosperity restored
    m[38311] = "By the grace of Satyanarayana he became endowed with sons and wealth. Having enjoyed happiness in this world, at the end he went to the realm of truth."
    
    # V359: phalashruti begins
    m[38312] = "Phalashruti: Whoever performs this very rare vow of Satya, and hears this holy story with devotion, obtains its fruit."
    
    # V360: specific blessings
    m[38313] = "Wealth and grain and all things will come to him by the grace of the true one. The poor man gains riches, the bound one is freed..."
    
    # V361: liberation for the fearful
    m[38314] = "...the fearful one is freed from fear — this is the truth, there is no doubt. Having enjoyed the desired fruit, at the end he goes to the realm of truth."
    
    # V362: summary of the vow
    m[38315] = "I have told you this Satyanarayana vrata, O Brahmins — by performing which, the human being is freed from all sorrows."
    
    # V363: especially in Kali
    m[38316] = "Especially in the Kali age, the Satya puja is fruitful. Some call the time by one name, calling Satya as God himself."
    
    # V364: many forms
    m[38317] = "Some call him Satyanarayana, others call him Satyadeva — taking many forms, he fulfils the desires of all."
    
    # V365: Satya's form in Kali
    m[38318] = "In the Kali age, the eternal one will appear as Satya in the vow-form. Vishnu assumed this form to grant the desires of all."
    
    # V366: reading this text
    m[38319] = "Whoever reads this daily and hears it, O best of sages — his sins perish by the grace of Satyanarayana."
    
    # V367: past births of vow-performers
    m[38320] = "Those who performed this vow of Satyanarayana in former times — I will now tell you about their subsequent births, O best of sages."
    
    # V368: Shatananda
    m[38321] = "Shatananda, the great wise one, was the Brahmin Sudama; meditating on Krishna in that life, he attained liberation."
    
    # V369: woodcutter becomes Guha
    m[38322] = "The wood-carrying tribal became king Guha; in that life, serving Sri Rama, he attained liberation."
    
    # V370: king Ulkamukhah
    m[38323] = "King Ulkamukhah became king Dasharatha; worshipping Shri Ranganatha, he attained Vaikuntha."
    
    # V371: merchant becomes Moradhvaja
    m[38324] = "The devout true merchant became the righteous Moradhvaja; he gave half his body to the lord and attained the highest state."
    
    # V372: king Tungadhvaja becomes Svayambhuva
    m[38325] = "King Tungadhvaja became Svayambhuva; having made all the Bhagavatas cross over, he attained the highest."
    
    # V373: cowherds attain Goloka
    m[38326] = "All the cowherds became dwellers in the Vraja mandala; having slain all the demons, they attained Goloka."
    
    # V374: chapter colophon 5
    m[38327] = "Colophon: Thus ends the fifth chapter of the Satyanarayana vrata-katha in the Reva-khanda of the Skanda Purana."
    
    # V375: instruction
    m[38328] = ""
    
    # V376: tirtham mantra
    m[38329] = "This removes untimely death, cures all diseases, and destroys all accumulated sins — this is the holy water of Sri Satyanarayana."
    
    # V377: kalasha udvasan
    m[38330] = "The gods worshipped sacrifice with sacrifice — those were the first of the dharmas; through these, the great ones attained heaven."
    
    # V378: concluding auspiciousness
    m[38331] = "May all auspicious things be. May all people be happy. Om peace peace peace."
    
    # V379: svasti
    m[38332] = ""  # svasti — auspicious sound
    
    return m

print("satyanarayana function defined OK")
