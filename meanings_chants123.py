#!/usr/bin/env python3
# Ghantasala BG (24998-25215), Devi Mahatmyam ch2 (8499-8572), Brahma Samhita 1-38 (22384-22421)

GHANTASALA_BG = {
    # v1: opening dhyana sloka (Sanskrit)
    24998: "This Bhagavad Gita, made known by Bhagavan Narayana himself to Partha, woven by Vyasa into the Mahabharata — may I meditate on the Goddess who pours the nectar of non-duality.",
    # v2: Telugu intro
    24999: "The Bhagavad Gita is the complete essence of the Mahabharata — the teaching given to the devotee Arjuna is its summary.",
    # v3: Telugu commentary on scene
    25000: "On the battlefield, at Arjuna's request, Krishna halted the chariot; Arjuna saw fathers, teachers, and kinsmen arrayed on both sides and was overcome with grief.",
    # v4: BG 1.32 — Arjuna's despondency (Sanskrit)
    25001: "BG 1.32–35: I desire neither victory nor kingdom nor pleasures, O Krishna; what use is a kingdom to us, O Govinda, what use are enjoyments or life itself?",
    # v5: Telugu
    25002: "Unwilling to slay his own kin, Arjuna said 'I want neither victory nor royal happiness' and cast down his bow in grief.",
    # v6: BG 2.11 (Sanskrit)
    25003: "BG 2.11: You grieve for those who should not be grieved for, yet you speak words of wisdom; the wise grieve neither for the living nor for the dead.",
    # v7: Telugu
    25004: "It is wrong to grieve for those not worthy of grief; those who discern the self from the non-self do not grieve over impermanent bodies.",
    # v8: BG 2.13 (Sanskrit)
    25005: "BG 2.13: Just as boyhood, youth, and old age come to an embodied soul in this body, so too comes the attainment of another body; the steadfast man is not confused by this.",
    # v9: Telugu
    25006: "Just as childhood, youth, and old age pass for a being in the body, so too the passage to another body. The wise are not confused by this.",
    # v10: BG 2.22 (Sanskrit)
    25007: "BG 2.22: Just as a person puts on new garments giving up old ones, similarly the soul accepts new material bodies, giving up the old and useless ones.",
    # v11: Telugu
    25008: "Just as a person discards worn-out clothes and puts on new ones, the soul, discarding the worn-out body, takes on a new one.",
    # v12: BG 2.23 (Sanskrit)
    25009: "BG 2.23: The soul can never be cut by any weapon, nor burned by fire, nor moistened by water, nor withered by the wind.",
    # v13: Telugu
    25010: "The soul cannot be destroyed; no weapon can cut it, no fire burn it, no water wet it, no wind dry it.",
    # v14: BG 2.27 (Sanskrit)
    25011: "BG 2.27: For one who has taken birth, death is certain; and for one who is dead, birth is certain. Therefore, in this inevitable matter, you should not lament.",
    # v15: Telugu
    25012: "Death is inevitable for the born; birth is inevitable for the dead. This being unavoidable, one should not grieve.",
    # v16: BG 2.37 (Sanskrit)
    25013: "BG 2.37: Slain, you shall attain heaven; victorious, you shall enjoy the earth. Therefore arise, O son of Kunti, resolved to fight.",
    # v17: Telugu
    25014: "If you die in battle you gain a hero's heaven; if you win you enjoy the kingdom. Therefore O Arjuna, rise up resolved to fight.",
    # v18: BG 2.47 (Sanskrit)
    25015: "BG 2.47: You have a right to perform your prescribed duty, but you are not entitled to the fruits of action; never consider yourself the cause of the results, and never be attached to inaction.",
    # v19: Telugu
    25016: "You have the right to perform actions but not to their fruits; do not be the cause of results, nor be attached to inaction.",
    # v20: BG 2.56 (Sanskrit)
    25017: "BG 2.56: One whose mind is not shaken in sorrow, who does not yearn for pleasure, free from passion, fear, and anger — such a steadfast sage is said to be a muni of steady wisdom.",
    # v21: Telugu
    25018: "One who is not disturbed in sorrow, does not crave pleasure, and is free from attachment, fear, and anger — such a one of steady wisdom is called a muni.",
    # v22: BG 2.62 (Sanskrit)
    25019: "BG 2.62–63: Contemplating the objects of the senses, attachment to them arises; from attachment comes desire; from desire arises anger; from anger comes delusion, from delusion loss of memory, from loss of memory the ruin of reason, and from ruin of reason one perishes.",
    # v23: BG 2.63 continuation (Sanskrit)
    25020: "BG 2.63: From anger comes complete delusion, from delusion bewilderment of memory, from bewilderment of memory loss of intelligence, and from loss of intelligence one falls down.",
    # v24: Telugu
    25021: "Constant meditation on sense objects breeds attachment, attachment becomes desire, and that ends in anger — thus the chain of ruin unfolds.",
    # v25: BG 2.72 (Sanskrit)
    25022: "BG 2.72: That is the way of the spiritual and godly life. Having attained it, one is not bewildered; being established in it even at the time of death, one attains the liberation of Brahman.",
    # v26: Telugu
    25023: "One who lives in Brahman-awareness through right action reaches liberation and does not fall into the cycle of existence.",
    # v27: BG 3.3 (Sanskrit)
    25024: "BG 3.3: O blameless one, in this world two kinds of people were described by me previously — the path of knowledge for the contemplatives and the path of action for the active ones.",
    # v28: Telugu
    25025: "There are two paths: jnana-yoga for renunciants with self-knowledge, and karma-yoga for yogis with purified minds.",
    # v29: BG 3.14 (Sanskrit)
    25026: "BG 3.14: All living beings subsist on food grains, which are produced from rains. Rains develop from performance of yajna, and yajna is born of prescribed duties.",
    # v30: Telugu
    25027: "Living beings arise from food, food from rain, rain from yajna, yajna from karma — the wheel of creation.",
    # v31: BG 3.16 (Sanskrit)
    25028: "BG 3.16: O Partha, one who does not follow this prescribed duty of sacrifice established by Veda and who thus lives a sinful life, certainly lives in vain.",
    # v32: Telugu
    25029: "O Arjuna, one who does not follow this wheel of life established by the Lord lives a life of sense-indulgence and sin — in vain.",
    # v33: BG 3.21 (Sanskrit)
    25030: "BG 3.21: Whatever a great man does, common people follow. Whatever standard he sets, all the world pursues.",
    # v34: Telugu
    25031: "What the great do, others follow; what standard they set, the world adopts.",
    # v35: BG 3.30 (Sanskrit)
    25032: "BG 3.30: Dedicating all actions to me with full knowledge of me, free from desires and the sense of possessiveness, fight O Arjuna, without fever.",
    # v36: Telugu
    25033: "O Arjuna, dedicate all actions to me, be free from desire and ego, and without fever engage in battle.",
    # v37: BG 3.35 (Sanskrit)
    25034: "BG 3.35: It is far better to discharge one's prescribed duties, even imperfectly, than to perform the duties of another perfectly. Destruction in the line of one's own duty is better; the duty of another is full of danger.",
    # v38: Telugu
    25035: "Even an imperfect svadharma is better than another's well-performed dharma; death in one's own duty is better — another's duty is dangerous.",
    # v39: BG 3.38 (Sanskrit)
    25036: "BG 3.38: Just as fire is enveloped by smoke, as a mirror is covered by dust, and as an embryo is covered by the womb, so this living entity is covered by various degrees of desire.",
    # v40: Telugu
    25037: "As fire is covered by smoke, a mirror by dust, an embryo by the womb — so knowledge is covered by desire.",
    # v41: BG 4.1 (Sanskrit)
    25038: "BG 4.7–8: Whenever and wherever there is a decline in righteousness and an increase in unrighteousness, I manifest myself; to deliver the pious and to annihilate the miscreants, and to re-establish the principles of dharma, I appear millennium after millennium.",
    # v42: BG 4.8 (Sanskrit — continuation)
    25039: "BG 4.8: To deliver the pious and to annihilate the miscreants, as well as to re-establish the principles of religion, I myself appear millennium after millennium.",
    # v43: Telugu
    25040: "When dharma declines and adharma rises, Krishna takes birth age after age to protect the righteous, destroy the wicked, and re-establish dharma.",
    # v44: BG 4.10 (Sanskrit)
    25041: "BG 4.10: Being freed from attachment, fear, and anger, being fully absorbed in me and taking refuge in me, many, many persons in the past became purified by knowledge of me — and thus they all attained transcendental love for me.",
    # v45: Telugu
    25042: "Freed from attachment, fear, and anger, fixed in me — many in the past attained my nature through the fire of knowledge.",
    # v46: BG 4.11 (Sanskrit)
    25043: "BG 4.11: As all surrender unto me, I reward them accordingly. Everyone follows my path in all respects, O son of Pritha.",
    # v47: Telugu
    25044: "In whatever way people approach me, I accept them accordingly; in all paths, in all ways, they are following my path.",
    # v48: BG 4.19 (Sanskrit)
    25045: "BG 4.19: One is understood to be in full knowledge whose every endeavour is devoid of desire for sense gratification; he is said to be a worker for whom the fruitive results of work have been burned up by the fire of perfect knowledge.",
    # v49: Telugu
    25046: "One whose actions are free from desire and whose karma is burned by the fire of knowledge — such a one is called a pandit.",
    # v50: BG 4.24 (Sanskrit)
    25047: "BG 4.24: One who is absorbed in the Absolute Brahman — the act of offering is Brahman, the oblation is Brahman, offered by Brahman in the fire of Brahman; Brahman is attained by one who is thus absorbed.",
    # v51: Telugu
    25048: "The yajna vessel is Brahman, the oblation is Brahman, the fire is Brahman, the offerer is Brahman — one absorbed in Brahman reaches Brahman.",
    # v52: BG 4.39 (Sanskrit)
    25049: "BG 4.39: A faithful man who is absorbed in transcendence and who subdues his senses is eligible to achieve such knowledge; achieving knowledge one quickly attains the supreme spiritual peace.",
    # v53: Telugu
    25050: "One with faith and controlled senses gains knowledge, and having gained knowledge attains supreme peace.",
    # v54: Colophon verse (Telugu)
    25051: "Colophon: This concludes the instruction of Sri Krishna to Arjuna in the Gita-shastra on the topics up to and including Chapter 5 (Karma-Sannyasa Yoga).",
    # v55: BG 5.2 (Sanskrit)
    25052: "BG 5.2: Both renunciation of work and work in devotion are good for liberation. But, of the two, work in devotional service is better than renunciation of works.",
    # v56: Telugu
    25053: "Both karma-sannyasa and karma-yoga lead to liberation; but of the two, karma-yoga is superior to mere renunciation.",
    # v57: BG 5.10 (Sanskrit)
    25054: "BG 5.10: One who performs his duty without attachment, surrendering the results unto the Supreme Lord, is unaffected by sinful action, as the lotus leaf is untouched by water.",
    # v58: Telugu
    25055: "One who acts without clinging, offering results to Brahman, is not tainted by sin — like a lotus leaf untouched by water.",
    # v59: BG 5.16 (Sanskrit)
    25056: "BG 5.16: When, however, one is enlightened with the knowledge by which nescience is destroyed, then his knowledge reveals everything, as the sun lights up everything in the daytime.",
    # v60: Telugu
    25057: "When ignorance is destroyed by knowledge, that knowledge illuminates the supreme truth like the sun.",
    # v61: BG 5.18 (Sanskrit)
    25058: "BG 5.18: The humble sages, by virtue of true knowledge, see with equal vision a learned and gentle Brahmin, a cow, an elephant, a dog, and a dog-eater.",
    # v62: Telugu
    25059: "A true knower sees with equal eye a learned Brahmin, a cow, an elephant, a dog, and a dog-eater.",
    # v63: BG 5.23 (Sanskrit)
    25060: "BG 5.23: Before giving up this present body, if one is able to tolerate the urges of the material senses and check the force of desire and anger, he is well situated and is happy in this world.",
    # v64: Telugu
    25061: "Before leaving the body, one who can withstand the impulses of desire and anger is a yogi, a happy person in this world.",
    # v65: BG 5.28 (Sanskrit)
    25062: "BG 5.28: Shutting out all external sense objects, keeping the eyes and vision concentrated between the two eyebrows, suspending the inward and outward breaths within the nostrils, and thus controlling the mind, senses, and intelligence — the transcendentalist aiming at liberation becomes free from desire, fear, and anger.",
    # v66: Telugu
    25063: "Withdrawing the senses, fixing the gaze between the brows, balancing the breath — thus one becomes free of desire, fear, and anger.",
    # v67: BG 5.29 (Sanskrit)
    25064: "BG 5.29: A person in full consciousness of me, knowing me to be the ultimate beneficiary of all sacrifices and austerities, the Supreme Lord of all planets and demigods, and the benefactor and well-wisher of all living entities, attains peace from the pangs of material miseries.",
    # v68: Telugu
    25065: "Knowing me as the enjoyer of all sacrifices and austerities, the great lord of all worlds, and the well-wisher of all — one attains peace.",
    # v69: BG 6.2 (Sanskrit)
    25066: "BG 6.2: What is called renunciation is the same as yoga, for no one can become a yogi unless he renounces the desire for sense gratification.",
    # v70: Telugu
    25067: "What is called sannyasa is the same as yoga; no one becomes a yogi without renouncing sankalpa.",
    # v71: BG 6.17 (Sanskrit)
    25068: "BG 6.17: He who is regulated in his habits of eating, sleeping, recreation, and work can mitigate all material pains by practicing the yoga system.",
    # v72: Telugu
    25069: "For one who is disciplined in eating, recreation, and activities, yoga destroys all sorrow.",
    # v73: BG 6.19 (Sanskrit)
    25070: "BG 6.19: As a lamp in a windless place does not flicker — this simile is used for the controlled mind of a yogi who practices yoga in the technique of self-realization.",
    # v74: Telugu
    25071: "Like a lamp in a windless place not flickering, so the mind of a yogi in self-realization remains steady.",
    # v75: BG 6.29 (Sanskrit)
    25072: "BG 6.29: A true yogi observes me in all beings and also sees every being in me. Indeed, the self-realized person sees me, the same Supreme Lord, everywhere.",
    # v76: Telugu
    25073: "A yogi with equal vision sees all beings in himself and himself in all beings.",
    # v77: BG 6.35 (Sanskrit)
    25074: "BG 6.35: O mighty-armed son of Kunti, it is undoubtedly very difficult to curb the restless mind, but it is possible by suitable practice and by detachment.",
    # v78: Telugu
    25075: "Though the mind is difficult to restrain, O Arjuna, by practice and detachment it can be controlled.",
    # v79: BG 6.47 (Sanskrit)
    25076: "BG 6.47: And of all yogis, the one with great faith who always abides in me, thinks of me within himself, and renders transcendental loving service to me — he is the most intimately united with me in yoga and is the highest of all.",
    # v80: Telugu
    25077: "Among all yogis, the one who worships me with faith, his mind always on me — he is the best, the most united with me.",
    # v81: BG 7.3 (Sanskrit)
    25078: "BG 7.3: Out of many thousands among men, one may endeavour for perfection; and of those who have achieved perfection, hardly one knows me in truth.",
    # v82: Telugu
    25079: "Among thousands, one strives for perfection; among those perfected ones, hardly one truly knows me.",
    # v83: BG 7.4 (Sanskrit)
    25080: "BG 7.4: Earth, water, fire, air, ether, mind, intelligence, and false ego — all together these eight constitute my separated material energies.",
    # v84: Telugu
    25081: "The eight: earth, water, fire, wind, space, mind, intellect, and ego — these are my eight-fold material nature.",
    # v85: BG 7.7 (Sanskrit)
    25082: "BG 7.7: O conqueror of wealth, there is no truth superior to me. Everything rests upon me, as pearls are strung on a thread.",
    # v86: Telugu
    25083: "O Arjuna, nothing is higher than me; all this universe is strung on me as gems on a thread.",
    # v87: BG 7.8 (Sanskrit)
    25084: "BG 7.8: O son of Kunti, I am the taste of water, the light of the sun and the moon, the syllable om in the Vedic mantras; I am the sound in ether and ability in man.",
    # v88: Telugu
    25085: "In earth I am fragrance, in fire radiance, in all life their vitality, in ascetics their austerity — I am all these.",
    # v89: BG 7.14 (Sanskrit)
    25086: "BG 7.14: This divine energy of mine, consisting of the three modes of material nature, is very difficult to overcome. But those who have surrendered unto me can easily cross beyond it.",
    # v90: Telugu
    25087: "My divine Maya of the three gunas is difficult to cross; but those who surrender to me cross over it easily.",
    # v91: BG 7.16 (Sanskrit)
    25088: "BG 7.16: O best among the Bharatas, four kinds of pious men begin to render devotional service unto me — the distressed, the desirer of wealth, the inquisitive, and he who is searching for knowledge of the Absolute.",
    # v92: Telugu
    25089: "Four types approach me — the afflicted, the curious, the wealth-seeker, and the wise; all are meritorious souls.",
    # v93: BG 7.19 (Sanskrit)
    25090: "BG 7.19: After many births and deaths, he who is actually in knowledge surrenders unto me, knowing me to be the cause of all causes and all that is. Such a great soul is very rare.",
    # v94: Telugu
    25091: "After many births, the wise one who truly sees that Vasudeva is all takes refuge in me — such a great soul is very rare.",
    # v95: BG 8.5 (Sanskrit)
    25092: "BG 8.5: And whoever, at the time of death, gives up the body remembering me alone, reaches my nature; of this there is no doubt.",
    # v96: Telugu
    25093: "One who quits the body remembering me at the time of death attains my state — of this there is no doubt.",
    # v97: BG 8.9 (Sanskrit)
    25094: "BG 8.9–10: One should remember the Supreme Person as the one who knows everything, who is the oldest, who is the controller, who is smaller than the smallest, who is the maintainer of everything, who is beyond all material conception, who is inconceivable, and who is always a person.",
    # v98: BG 8.10 continuation (Sanskrit)
    25095: "BG 8.10: One who, at the time of death, fixes his life air between the eyebrows and in full devotion engages himself in remembering the Supreme Lord, will certainly attain to the Supreme Personality of Godhead.",
    # v99: Telugu
    25096: "By one-pointed meditation on the divine supreme Being with the life-breath fixed between the brows, one attains that highest person.",
    # v100: BG 8.21 (Sanskrit)
    25097: "BG 8.21: That which the Vedantists describe as unmanifest and infallible, that which is known as the supreme destination, that place from which, having attained it, one never returns — that is my supreme abode.",
    # v101: Telugu
    25098: "That supreme state described as the imperishable in Vedanta, from which there is no return — that is my supreme abode.",
    # v102: BG 8.26 (Sanskrit)
    25099: "BG 8.26: According to Vedic opinion, there are two ways of passing from this world — one in light and one in darkness. When one passes in light, he does not come back; when one passes in darkness, he returns.",
    # v103: Telugu
    25100: "Two eternal paths exist in the world: the light path leads to non-return; the dark path leads to rebirth.",
    # v104: BG 8.28 (Sanskrit)
    25101: "BG 8.28: A person who accepts the path of devotional service is not bereft of the results derived from studying the Vedas, performing austere sacrifices, giving charity, or pursuing philosophical and fruitive activities.",
    # v105: Telugu
    25102: "The yogi who does not seek fruit — through devotion he gains all that comes from Vedas, sacrifices, austerities, and charity, and he reaches the supreme abode.",
    # v106: BG 9.7 (Sanskrit)
    25103: "BG 9.7: O son of Kunti, at the end of the millennium all material manifestations enter into my nature, and at the beginning of another millennium, by my potency, I create them again.",
    # v107: Telugu
    25104: "At dissolution all beings enter into me; at the start of the new kalpa I project them all forth again.",
    # v108: BG 9.22 (Sanskrit)
    25105: "BG 9.22: But those who always worship me with exclusive devotion, meditating on my transcendental form — to them I carry what they lack, and I preserve what they have.",
    # v109: Telugu
    25106: "For one who always meditates on me with undivided devotion, I carry what is lacking and preserve what they have.",
    # v110: BG 9.26 (Sanskrit)
    25107: "BG 9.26: If one offers me with love and devotion a leaf, a flower, fruit, or water, I will accept it.",
    # v111: Telugu
    25108: "Whoever offers me with love a leaf, flower, fruit, or water — I accept that loving offering.",
    # v112: BG 9.34 (Sanskrit)
    25109: "BG 9.34: Engage your mind always in thinking of me, become my devotee, offer obeisances to me, and worship me. Being completely absorbed in me, surely you will come to me.",
    # v113: Telugu colophon
    25110: "Colophon: Chapters 1–9 conclude with the instruction on the path of surrender and total absorption in Krishna.",
    # v114: BG 10.6 (Sanskrit)
    25111: "This is the yoga-shastra with the essence of the Upanishads — here ends the instruction on karma-sannyasa yoga as taught by Sri Krishna to Arjuna.",
    25112: "BG 10.6: The seven great sages and before them the four other great sages and the Manus had come from my mind and from their descendants come all creatures in the world.",
    # v115: Telugu
    25113: "The seven great seers beginning with Kashyapa, the four (Sanaka etc.), and the Manus all arose from me; all creatures in this world are their descendants.",
    # v116: BG 10.9 (Sanskrit)
    25114: "BG 10.9: The thoughts of my pure devotees dwell in me, their lives are fully devoted to me, and they derive great satisfaction and bliss from always enlightening one another and conversing about me.",
    # v117: Telugu
    25115: "Pure devotees with minds on me, life given to me, ever informing each other and singing my glories are blissful.",
    # v118: BG 10.20 (Sanskrit)
    25116: "BG 10.20: I am the Self, O Gudakesha, seated in the hearts of all creatures; I am the beginning, the middle and the end of all beings.",
    # v119: Telugu
    25117: "I am the Self dwelling in all hearts; I am the beginning, middle, and end of all beings.",
    # v120: BG 10.22 (Sanskrit)
    25118: "BG 10.22: Of the Vedas I am the Sama Veda; of the demigods I am Indra, the king of heaven; of the senses I am the mind; and in living beings I am the living force (consciousness).",
    # v121: Telugu
    25119: "Among Vedas I am Sama Veda; among gods I am Indra; among senses the mind; among beings the consciousness.",
    # v122: BG 10.30 (Sanskrit)
    25120: "BG 10.30: Among the Daitya demons I am the devoted Prahlada, among subduers I am time, among beasts I am the lion, and among birds I am Garuda.",
    # v123: Telugu
    25121: "Among demons I am Prahlada; among measures I am time; among beasts I am the lion; among birds Garuda.",
    # v124: BG 10.41 (Sanskrit)
    25122: "BG 10.41: Know that all opulent, beautiful, and glorious creations spring from but a spark of my splendour.",
    # v125: Telugu
    25123: "Whatever is prosperous, powerful, and brilliant in the world — all that is but a spark of my glory.",
    # v126: BG 11.5 (Sanskrit)
    25124: "BG 11.5–6: O Partha, behold my hundreds and thousands of variegated divine forms, in various colours and shapes — behold all the divine forms!",
    # v127: Telugu
    25125: "O Arjuna, behold my divine forms in their hundreds and thousands, of many kinds, colours, and shapes.",
    # v128: BG 11.13 (Sanskrit)
    25126: "BG 11.13: Arjuna saw in the universal form of the Lord the unlimited expansions; he saw all the demigods, Brahma on the lotus seat, Shiva, all the sages, and all the divine serpents.",
    # v129: BG 11.16 continuation (Sanskrit)
    25127: "BG 11.16: Arjuna saw your form with many arms, bellies, mouths, and eyes — without beginning, middle, or end.",
    # v130: BG 11.25 continuation (Sanskrit)
    25128: "BG 11.25: O Lord, I see your mouths blazing like fires of destruction at the end of time — I lose my sense of direction and find no peace.",
    # v131: Telugu
    25129: "O Lord, all gods, all beings, Brahma, seers, serpents — all are terrified seeing your blazing fierce face.",
    # v132: Telugu
    25130: "O Lord, your universal form with its many arms and faces is boundless — I cannot find its end, middle, or beginning.",
    # v133: BG 11.32 (Sanskrit) — Arjuna-Krishna dialogue
    25131: "BG 11.32: The Lord said: I am time, the destroyer of all worlds, and I have come to destroy all people; even without your participation, all the soldiers standing in the opposing armies shall be slain.",
    # v134: Telugu
    25132: "O Arjuna, I am the mighty time that destroys worlds; all these warriors have already been slain by me — you are but the instrument.",
    # v135: BG 11.34 (Sanskrit)
    25133: "BG 11.34: Therefore arise, O Arjuna, and prepare to fight. Drona, Bhishma, Jayadratha, Karna, and the other great warriors have already been destroyed by me — you, as the instrument, can kill them all.",
    # v136: Telugu
    25134: "Drona, Bhishma, Jayadratha, Karna — all are already slain by me; you are merely the instrument; arise and win glory.",
    # v137: BG 11.45 (Sanskrit)
    25135: "BG 11.45–46: Arjuna said: Show me again your form as Vishnu, the four-armed form — I wish to see that gentle form wearing the helmet, holding the club, disc, and conch.",
    # v138: Telugu
    25136: "O Lord, show me again your gentle four-armed form with crown, mace, and discus — I was overwhelmed by the cosmic form.",
    # v139: BG 11.52 (Sanskrit)
    25137: "BG 11.52: The Lord said: My dear Arjuna, this form of mine you are now seeing is very difficult to behold. Even the gods are ever seeking to see this form.",
    # v140: Telugu
    25138: "O Arjuna, even the gods constantly seek to behold this form you have seen — it is not easily visible.",
    # v141: BG 12.2 (Sanskrit)
    25139: "BG 12.2: Those who fix their minds on my personal form and are always engaged in worshipping me with great and transcendental faith are considered by me to be the most perfect.",
    # v142: Telugu
    25140: "Those who worship me with mind fixed on my form with great faith are the most united with me in yoga.",
    # v143: BG 12.12 (Sanskrit)
    25141: "BG 12.12: Better than knowledge is meditation, better than meditation is renunciation of the fruits of action; by such renunciation one immediately attains peace.",
    # v144: Telugu
    25142: "Better than practice is knowledge; better than knowledge is meditation; better than meditation is renunciation of fruits — from renunciation, immediate peace follows.",
    # v145: BG 12.16 (Sanskrit)
    25143: "BG 12.16: My devotee who is not dependent on the ordinary course of activities, who is pure, expert, without cares, free from all pains, and not striving for some result, is very dear to me.",
    # v146: Telugu
    25144: "One who is desireless, pure, impartial, fearless, renouncing the fruits of all karma — such a devotee is dear to me.",
    # v147: BG 12.18-19 (Sanskrit)
    25145: "BG 12.18–19: One who is equal to friends and enemies, who is equipoised in honour and dishonour, heat and cold, happiness and distress — free from attachment, equal in praise and blame, silent, satisfied with anything, homeless, fixed in knowledge, engaged in devotional service — such a person is very dear to me.",
    # v148: BG 12.19 continuation (Sanskrit)
    25146: "BG 12.19: One who is equal in censure and praise, silent, content with anything, homeless, of steady mind, full of devotion — such a man is dear to me.",
    # v149: Telugu
    25147: "Equal in honour and dishonour, in friend and foe, free from attachment, equal in praise and blame, silent, content — such a devotee is dear to me.",
    # v150: BG 13.1–2 (Sanskrit)
    25148: "BG 13.1–2: O son of Kunti, this body is called the field; one who knows this body is called the knower of the field, by various sages.",
    # v151: Telugu
    25149: "O Arjuna, the body is called the field; one who knows it is the kshetrajna — so the learned say.",
    # v152: BG 13.11 (Sanskrit)
    25150: "BG 13.11: Constancy in self-knowledge, and seeing the aim of philosophical truth — all this is declared to be actual knowledge; what is contrary to this is declared to be ignorance.",
    # v153: Telugu
    25151: "Steadiness in self-knowledge and seeing the goal of truth — this is called knowledge; its opposite is ignorance.",
    # v154: BG 13.21 (Sanskrit)
    25152: "BG 13.21: Nature is said to be the cause of all material causes and effects, whereas the living entity is the cause of the various sufferings and enjoyments in this world.",
    # v155: Telugu
    25153: "Prakriti is the cause of all bodily joys and sorrows; the kshetrajna (soul) is the cause of its experience of them.",
    # v156: BG 13.28 (Sanskrit)
    25154: "BG 13.28: One who sees the Supreme Lord equally present everywhere, in every living being, does not degrade himself by his mind and thus approaches the transcendental destination.",
    # v157: Telugu
    25155: "One who sees the Supreme in all beings everywhere, without degrading himself by the mind — that one is the seer.",
    # v158: BG 13.32 (Sanskrit)
    25156: "BG 13.32: Those with the vision of eternity can see that the soul is transcendental, eternal, and beyond the modes of nature. Despite contact with the material body, the soul neither does anything nor is entangled.",
    # v159: Telugu
    25157: "O Arjuna, the Supreme Soul is without qualities and does not act even while dwelling in the body.",
    # v160: BG 13.34 (Sanskrit — final verse of ch13)
    25158: "BG 13.34: O son of Bharata, as the sun alone illuminates all this universe, so does the living entity, one within the field, illuminate the entire field by consciousness.",
    # v161: Telugu
    25159: "O Arjuna, just as the sun illuminates the whole world, the kshetrajna (soul) illuminates the whole field of the body.",
    # v162: Colophon for ch13 (Telugu)
    25160: "Colophon: This ends the teaching of Sri Krishna to Arjuna in the Gita-shastra entitled Vibhuti, Vishvarupa, and Kshetra-Kshetrajna Yoga, chapters 10–13.",
    # v163: BG 14.1 (Sanskrit)
    25161: "BG 14.1–2: O Partha, I shall again explain to you this supreme wisdom, the best of all knowledge; knowing this, all the sages have attained the highest perfection.",
    # v164: Telugu
    25162: "Knowing this supreme wisdom, the great seers attained the highest perfection and liberation.",
    # v165: BG 14.3 (Sanskrit)
    25163: "BG 14.3: The total material substance, called Brahman, is the source of birth, and it is that Brahman that I impregnate, making possible the births of all living beings, O son of Bharata.",
    # v166: Telugu
    25164: "O Arjuna, Prakriti is the great womb of all creatures; I am the seed-giving father.",
    # v167: BG 14.6 (Sanskrit)
    25165: "BG 14.6: O sinless one, the mode of goodness, being purer than the others, is illuminating, and it frees one from all sinful reactions. Those situated in that mode become conditioned by a sense of happiness and knowledge.",
    # v168: Telugu
    25166: "O Arjuna, among the three gunas, sattva is pure and illuminating; it binds by attachment to happiness and knowledge.",
    # v169: BG 14.7 (Sanskrit)
    25167: "BG 14.7: The mode of passion is born of unlimited desires and longings, O son of Kunti, and because of this the embodied living entity is bound to material fruitive actions.",
    # v170: Telugu
    25168: "O son of Kunti, rajas born of desire and attachment binds the soul to action.",
    # v171: BG 14.8 (Sanskrit)
    25169: "BG 14.8: O son of Bharata, know that the mode of darkness, born of ignorance, is the delusion of all embodied living entities. The results of this mode are madness, indolence, and sleep.",
    # v172: Telugu
    25170: "O Arjuna, tamas born of ignorance deludes all beings; it binds through heedlessness, laziness, and sleep.",
    # v173: BG 14.23 (Sanskrit)
    25171: "BG 14.23–24: He who does not hate illumination, attachment, and delusion when they are present or long for them when they disappear, who is unwavering and undisturbed through all these reactions, and who remains neutral, knowing the modes alone are active — such a one is said to have transcended the three modes of nature.",
    # v174: Telugu
    25172: "One who is equal in honour and dishonour, equal to friend and foe, transcending all reactions — such a one has gone beyond the three gunas.",
    # v175: BG 15.1 (Sanskrit)
    25173: "BG 15.1: The Supreme Lord said: It is said that there is an imperishable banyan tree that has its roots upward and its branches down and whose leaves are the Vedic hymns; one who knows this tree is the knower of the Vedas.",
    # v176: Telugu
    25174: "The eternal ashvattha tree with roots above and branches below — its leaves are the Vedas. One who knows this tree knows the Vedas.",
    # v177: BG 15.6 (Sanskrit)
    25175: "BG 15.6: That supreme abode of mine is not illumined by the sun or moon, nor by fire or electricity. Those who reach it never return to this material world.",
    # v178: Telugu
    25176: "My supreme abode transcends sun, moon, and fire — once reached, there is no return.",
    # v179: BG 15.14 (Sanskrit)
    25177: "BG 15.14: I am the fire of digestion in the bodies of all living entities, and I join with the air of life, outgoing and incoming, to digest the four kinds of foodstuff.",
    # v180: Telugu
    25178: "Dwelling in the bodies of living beings as the digestive fire, I digest the four kinds of food together with the prana and apana winds.",
    # v181: BG 16.1–3 (Sanskrit)
    25179: "BG 16.1–3: Fearlessness, purification of one's existence, cultivation of spiritual knowledge, charity, self-control, performance of sacrifice, study of the Vedas, austerity, and simplicity; nonviolence, truthfulness, freedom from anger, renunciation, tranquillity, aversion to faultfinding.",
    # v182: BG 16.4 (Sanskrit)
    25180: "BG 16.4: Pride, arrogance, conceit, anger, harshness, and ignorance — these qualities belong to those of demoniac nature, O son of Pritha.",
    # v183: Telugu
    25181: "O Arjuna, the divine endowments include courage, patience, fortitude, purity, and non-deception; the demoniac — pride, arrogance, anger, and delusion.",
    # v184: BG 16.21 (Sanskrit)
    25182: "BG 16.21: There are three gates leading to hell — lust, anger, and greed. Every sane man should give these up, for they lead to the degradation of the soul.",
    # v185: Telugu
    25183: "Desire, anger, and greed are the three gates of hell that destroy the soul — abandon them.",
    # v186: BG 16.23 (Sanskrit)
    25184: "BG 16.23: He who discards scriptural injunctions and acts according to his own whims attains neither perfection, nor happiness, nor the supreme destination.",
    # v187: Telugu
    25185: "One who ignores the shastras and acts by mere impulse attains neither perfection nor happiness nor the supreme.",
    # v188: BG 17.2 (Sanskrit)
    25186: "BG 17.2: The Supreme Personality of Godhead said: According to the modes of nature acquired by the embodied soul, one's faith can be of three kinds — in goodness, in passion, or in ignorance.",
    # v189: Telugu
    25187: "Faith born of past life's nature is of three kinds — sattvic, rajasic, and tamasic.",
    # v190: BG 17.4 (Sanskrit)
    25188: "BG 17.4: Men in the mode of goodness worship the demigods; those in the mode of passion worship the demons; and those in the mode of ignorance worship ghosts and spirits.",
    # v191: Telugu
    25189: "Sattva-types worship gods; rajo-types worship yakshas and demons; tamo-types worship ghosts and departed spirits.",
    # v192: BG 17.15 (Sanskrit)
    25190: "BG 17.15: Austerity of speech consists in speaking words that are truthful, pleasing, beneficial, and not agitating to others, and also in regularly reciting Vedic literature.",
    # v193: Telugu
    25191: "Speech that is non-disturbing, truthful, pleasing, and beneficial together with Vedic study — this is the austerity of speech.",
    # v194: BG 18.2 (Sanskrit)
    25192: "BG 18.2: The Supreme Lord said: The giving up of activities that are based on material desire is what great learned men call the renounced order of life; and giving up the results of all activities is what the wise call renunciation.",
    # v195: Telugu
    25193: "Sannyasa is the giving up of desire-based actions; tyaga is the renunciation of the fruits of all actions — so say the learned.",
    # v196: BG 18.12 (Sanskrit)
    25194: "BG 18.12: For one who is not renounced, the threefold fruits of action — desirable, undesirable, and mixed — accrue after death. But those who are in the renounced order of life have no such result to suffer or enjoy.",
    # v197: Telugu
    25195: "The non-renouncer receives the threefold fruit — pleasant, unpleasant, and mixed — after death; the true renouncer does not.",
    # v198: BG 18.30 (Sanskrit)
    25196: "BG 18.30: O son of Pritha, that understanding by which one knows what ought to be done and what ought not to be done, what is to be feared and what is not to be feared, what is binding and what is liberating, is in the mode of goodness.",
    # v199: Telugu
    25197: "O Arjuna, that buddhi which understands the paths of action and renunciation, what is duty and what is fear, bondage and liberation — that is sattvic buddhi.",
    # v200: BG 18.61 (Sanskrit)
    25198: "BG 18.61: The Supreme Lord is situated in everyone's heart, O Arjuna, and is directing the wanderings of all living entities, who are seated as on a machine made of the material energy.",
    # v201: Telugu
    25199: "The Lord is situated in all hearts, O Arjuna, directing all beings as if they were mounted on a machine.",
    # v202: BG 18.66 (Sanskrit)
    25200: "BG 18.66: Abandon all varieties of religion and just surrender unto me. I shall deliver you from all sinful reactions. Do not fear.",
    # v203: Telugu
    25201: "Surrendering all dharmas to me alone — I will free you from all sins; do not fear.",
    # v204: BG 18.68 (Sanskrit)
    25202: "BG 18.68: For one who explains this supreme secret to the devotees, pure devotional service is guaranteed, and at the end he will come back to me.",
    # v205: Telugu
    25203: "One who teaches this supreme secret to my devotees, having greatest devotion to me, will certainly come to me.",
    # v206: BG 18.72 (Sanskrit — Arjuna's question)
    25204: "BG 18.72: O Achyuta, has what I told you been heard by you with attentive mind? And has your ignorance and illusion now been dispelled?",
    # v207: Telugu — Arjuna's response
    25205: "O Dhananjaya, have you heard this supreme secret with concentrated mind? Has your ignorance born of confusion been destroyed?",
    # v208: Arjuna's affirmation (Telugu)
    25206: "O Krishna!",
    # v209: BG 18.73 (Sanskrit)
    25207: "BG 18.73: Arjuna said: My dear Krishna, O infallible one, my illusion is now gone. I have regained my memory by your mercy. I am now firm and free from doubt and am prepared to act according to your instructions.",
    # v210: Telugu
    25208: "O Achyuta, by your grace my ignorance has gone; I have regained my knowledge and am now without doubt, firm, and ready to act by your command.",
    # v211: BG 18.78 (Sanskrit — conclusion)
    25209: "BG 18.78: Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will also certainly be opulence, victory, extraordinary power, and morality.",
    # v212: Telugu
    25210: "Where Yogishvara Sri Krishna and the bow-bearing Arjuna are, there abide prosperity, victory, wealth, and righteous conduct.",
    # v213: Phalashruti (Sanskrit)
    25211: "Phalashruti: Whoever reads this holy Gita-shastra with care attains Vishnu's abode, free from fear and sorrow.",
    # v214: Telugu commentary
    25212: "Whoever reads the Gita shastra will be freed from fear, sorrow, and all such afflictions and will attain Vishnu's final state.",
    # v215: Final colophon (Telugu)
    25213: "Colophon: This concludes the instruction of Sri Krishna to Arjuna in the complete Gita-shastra on Gunaadhika, Moksha-sannyasa, and Bhakti Yoga.",
    # v216: Universal peace prayer (Sanskrit)
    25214: "Shanti mantra: Om, may all beings be happy; may all good things happen to all.",
    # v217: Vedic peace mantra (Sanskrit)
    25215: "Shanti mantra: Lead us from the unreal to the real; from darkness to light; from death to immortality. Om peace, peace, peace.",
}

DEVI_MAHATMYAM = {
    8499: "Chapter title: The second chapter — the slaying of Mahisha's army.",
    8500: "Viniyoga/nyasa: Of this middle-charitra of the Saptashati — Vishnu is the seer, Ushnik is the meter, Sri Mahalakshmi is the deity, Shakambhari is the power, Durga is the seed.",
    8501: "Dhyana: Om — the Devi bearing rosary, axe, club, arrows, thunderbolt, lotus, bow, pot, staff, shakti, sword, shield, conch, and bell; with many weapons in her many hands — I meditate on that supreme Goddess.",
    8502: "The seer said:",
    8503: "Long ago, in a war between gods and demons, full a hundred years, when Mahisha was lord of the demons and Indra of the gods.",
    8504: "Then the mighty demons defeated the divine army; having conquered all the gods, Mahisha became Indra.",
    8505: "Then the defeated gods, led by Brahma the lotus-born, went to the place where Shiva and Vishnu (Garuda-bannered) abode.",
    8506: "The gods narrated to them both the full story of Mahisha's doings — the detailed account of the defeat of the divine host.",
    8507: "He himself had occupied the thrones of the sun, Indra, Agni, the wind, the moon, Yama, and Varuna, and of the others.",
    8508: "Ousted from heaven by the evil-natured Mahisha, all the hosts of gods wandered the earth like mortals.",
    8509: "Having heard what the gods reported, Vishnu and Shiva became filled with great anger, their brows knitted in a frown.",
    8510: "Then from the face of Vishnu — deeply wrathful — there issued a great radiance; and from Brahma's and Shiva's (faces) too.",
    8511: "From the bodies of Indra and the other gods there likewise issued an exceedingly great radiance; all that combined into one.",
    8512: "The gods saw a mass of light collected there, blazing like a mountain of fire, filling the three worlds with its brilliance.",
    8513: "That which was singular, born of the bodies of all the gods, blazing and pervading all the quarters — the Devi was born.",
    8514: "By Shiva's radiance her face came into being; by Yama's radiance her hair; by Vishnu's radiance her arms.",
    8515: "By the moon's radiance her two breasts; by Indra's radiance her waist; by Varuna's radiance her thighs and shanks.",
    8516: "By the earth-god's radiance her buttocks; by the radiance of Brahma her feet; by the sun-god's radiance her toes.",
    8517: "By the Vasus' radiance her fingers; by Kubera's radiance her nose; by Prajapati's radiance her teeth.",
    8518: "By Agni's radiance her three eyes came into being; her eyebrows from the two Twilights; her ears from the wind-god's radiance.",
    8519: "From the radiances of the other gods too were fashioned the auspicious Devi — the gods were overjoyed seeing her born from their combined radiance.",
    8520: "Shiva offered his trident drawn from his own trident; Vishnu produced a discus from his own discus by cleaving it.",
    8521: "Varuna gave her a conch; Agni gave a spear; Maruta gave a bow and two quivers full of arrows.",
    8522: "Indra, lord of gods, gave a thunderbolt produced from his vajra, and a bell taken from Airavata the elephant.",
    8523: "Yama gave her a staff from his own death-staff; Varuna, lord of waters, gave a noose.",
    8524: "Brahma, lord of beings, gave a rosary and a water-pot; Surya put his rays into all the pores of her skin.",
    8525: "Kala gave her a sword bright and sharp; a spotless shield; Vishvakarma gave an axe and various other weapons.",
    8526: "The ocean gave a garland of unfading lotuses; a necklace; and a never-aging crescent-gem for her crest.",
    8527: "Himavat gave her a lion as vehicle and various jewels; Kubera gave a drinking cup full of wine.",
    8528: "The sea gave a spotless pair of garments; divine earrings; half-moon and full-moon hair-adornments; bracelets for all her arms.",
    8529: "A brilliant necklace, two spotless anklets, the best of bracelets, and a gorgeous pair of armlets — Vishvakarma gave all these.",
    8530: "Similarly all the gods adorned that Devi with ornaments; the sages, thrilled with devotion, praised her — having made that adornment complete.",
    8531: "Mahisha's general, the great demon Chikshura, came to fight, and with him Chamara attended by troops of four-part armies.",
    8532: "Sixty thousand chariots belonging to Udagra came forward; Mahahanu with a million; and Asiloma with five million.",
    8533: "Baskala came with sixty million; Parivarita with an innumerable host of footsoldiers, elephants, horses, and chariots.",
    8534: "Bidalaksha came with seventy million; and the demon Durdhara came with sixty million.",
    8535: "And the greatly powerful Durgama came with sixty million; Durmukha with ten million; Dudarsha too with twelve million.",
    8536: "Thus many crores and millions of forces surrounded the Goddess; Mahisha himself came forward with an army of millions.",
    8537: "The Goddess then filled the three worlds with the twang of the bow and her bell; she filled the directions with the roar of her lion.",
    8538: "The reverberating sound of that lion's roar and the bow's twang and the bell together overwhelmed the armies and caused clamour.",
    8539: "Then Mahisha's armies, hearing that sound from all sides, surrounded the Goddess and the lion together.",
    8540: "At that time, for the sake of the gods, the Goddess emitted a great anger from her face and struck the forces with that.",
    8541: "From the Devi's breath of anger were born hundreds of thousands of warriors in armour; with axes, spears, and swords, those valiant ones fought against Mahisha's army.",
    8542: "The divine army was annihilated; some Devi-soldiers fought with iron maces, some with spears, some with swords.",
    8543: "Some struck down the enemies by drinking their blood; some of the Devi-warriors danced; and for a moment others smote each other.",
    8544: "Chitrasena was killed; Karalaksha was struck down in battle by Ugrasya; Asiloma fell by a spear.",
    8545: "The great demon Baskala was struck dead by the Goddess with a spear; Tamra and Andhaka were destroyed by her attendant hosts.",
    8546: "The great demon Ugrasya was killed by Kamabhairava; the demon Vaskala was torn asunder by a lion.",
    8547: "When she saw her army being slaughtered in battle thus, the great demon Mahisha ran to terrify the Devi's forces.",
    8548: "Some he struck with his mouth; some he trampled with his hooves; some with his tail lashed; some he tore with his horns.",
    8549: "Some he flung to the ground, some he made fall by roaring; others he pursued; others he turned and slaughtered.",
    8550: "Having slaughtered the Devi's army, the demon bore down on the Goddess herself with his great speed.",
    8551: "Then Chandika (Devi), filled with great anger, caused the ground to tremble under his rush. She lifted her trident.",
    8552: "She hurled it at Mahisha, and by the impact the trident caused the buffalo to fall.",
    8553: "Chandika caught him by the feet and, having dragged him through that battle, slew him by cutting off his head with a sword.",
    8554: "Then, having slain him, Chandika filled all three worlds with her roar — the earth trembled and the sky resounded.",
    8555: "Tumult arose everywhere; the ocean churned; the earth shook; the mountains tottered.",
    8556: "Overjoyed, the sages praised the Goddess; the gandharvas sang; the apsaras danced.",
    8557: "The gods all cried 'victory!' to Chandika who had slain Mahisha.",
    8558: "With the demons slain, the whole world became peaceful; the sky was pure and clear.",
    8559: "The gods who had been afflicted by the demons became free from all sorrow; full of devotion they bowed to the Goddess and praised her.",
    8560: "Salutation to the destroyer of the mightiest demons; salutation to her who is of the nature of the three worlds; salutation to the Goddess of all living beings.",
    8561: "Salutation to the one whose womb is Vishnu-maya; to the one who is intelligence by nature; salutation to the source of the universe; to the primordial cause without beginning.",
    8562: "You are primordial Nature and you create the world; you are the great power of illusion — you create, you sustain, and you destroy all this.",
    8563: "O Goddess, you are the eternal support of all existence; by you all this was spread out and sustained; you are the power that dissolves the universe at the end.",
    8564: "Salutation to you who are the great Goddess; whose form is the cosmos; who are the supreme Knowledge; the great night; all that is born from you.",
    8565: "You are eternal, you are the support, you are the source of all good; you alone art the cause of creation, preservation, and dissolution.",
    8566: "Salutation to you who are the great queen, full of joy; salutation to the lord's power; to the wonderful power; to the supreme ruler.",
    8567: "Whatever gods have praised you — by that praise we too praise you; grant us your protection, O Goddess.",
    8568: "You are the support of the moving and unmoving; you are the fire of time; you are the ultimate refuge; salutation to the supreme cause of all.",
    8569: "In this great battle the lion of the Goddess, shaking its mane, searched for the vital breaths of the enemy demons.",
    8570: "Thus the Goddess's soldiers and the demons fought a great battle; the gods who watched from heaven rained flowers upon them.",
    8571: "Colophon: Victory, victory — in the Markandeya Purana, in the Savarnika Manu's epoch, the second chapter of Devi Mahatmya entitled 'The slaying of Mahisha's army' is complete.",
    8572: "Ahuti: Om — I offer the great oblation to the Devi with all her limbs, weapons, power, retinue, and vehicle, the twenty-eight-lettered, Lakshmi-seed-natured.",
}

BRAHMA_SAMHITA = {
    22384: "Krishna, the supreme lord, whose form is being, consciousness, and bliss, who has no beginning yet is the beginning of all — that Govinda is the cause of all causes.",
    22385: "The supreme abode called Gokula is a great lotus of a thousand petals; its pericarp is the dhama; it arose from the infinite.",
    22386: "The pericarp is a great yantra of six corners, with a diamond axle-pin; the six-pronged six-petal arrangement is formed of Prakriti and Purusha together.",
    22387: "Its filaments are the portions of his portions; its petals are the abodes of the Shris.",
    22388: "Around it is the wonderful Shvetadvipa (white island), of the shape of a square — the four-form, four-dhama, fourfold abode of the four-limbed one.",
    22389: "Thus this god, full of light, ever-blissful, beyond the beyond — he the self-delighting one has no union with Prakriti.",
    22390: "For one who sports with Maya there is no separation from her; yet he who is the self revels with Rama (Shri), having abandoned time, in the desire to create.",
    22391: "Law itself is that Rama-devi, his beloved, who is subject to him at that time; her symbol is the blessed Shambhu, the eternal form of light.",
    22392: "These Maheshvari beings arose as both linga and yoni in nature.",
    22393: "This potent Purusha is Maheshvara himself in linga-form; within that linga the great Vishnu appeared — the witness-eye of the world.",
    22394: "Thousand-headed, thousand-eyed, thousand-footed, thousand-armed, universal-soul, thousand-rayed, thousand-sunned — that Purusha.",
    22395: "From that eternal Sankarshana-form, Narayana the Lord arose — the great lake of the Causal Ocean, of the form of Sankarshana.",
    22396: "In the pores of his body-hair (roma-bila) the seeds of Sankarshana came forth — golden eggs wrapped in the great elements.",
    22397: "Thus from a single portion entering each egg, Mahavishnu the thousand-headed universal soul, the eternal one, enters.",
    22398: "From his left side he emitted Vishnu; from his right, Prajapati; from the place of the hair-tuft, the light-linga-form of Shambhu.",
    22399: "This universe of the ego-nature arose from that.",
    22400: "Then while he sported in those three guise-forms, the divine Yoganidra (cosmic sleep) clung to him like his Shri (Lakshmi).",
    22401: "In the desire to create, from his navel issued a lotus; that golden-stalked lotus was the wonderful world of Brahma.",
    22402: "The tattvas, earlier established as the mutual causes of one another, were separated, each distinct, by absence of combination.",
    22403: "Having united those very elements, he himself entered the cave (heart); having entered the cave, the jiva-soul was bewildered.",
    22404: "He is eternal; the relation is eternal; and Prakriti is indeed the supreme one.",
    22405: "Thus from Hari's navel came a lotus joined to all souls; there Brahma arose, fourfold in Vedas and four-faced.",
    22406: "He, born by the Blessed Lord's power, urged at that very moment, turned his mind to creation, stimulated by previous impressions.",
    22407: "The divine Sarasvati spoke to him the sacred seed-mantra: Kamah Krishnaya, Govinda, he Gopijana, Vallabha.",
    22408: "Undertake austerity — through this austerity shall your success come.",
    22409: "Then for a long time he performed austerity, pleasing the imperishable Govinda — Krishna, the Shvetadvipa-lord, Goloka-dwelling, beyond the beyond.",
    22410: "Then the moving of the flute-sound, having the nature of the three Vedas, flashing and shining, swiftly entered the lotus-faces of the self-born.",
    22411: "Awakened by the three Vedas, Brahma — who had grasped the ocean of the true principles — then praised him with this hymn made of the essence of the Vedas.",
    22412: "I worship Govinda, the primeval Lord, who is tending cows that fulfill all desires in abodes built with spiritual gems, surrounded by millions of wish-fulfilling trees, always served with great reverence and affection by hundreds of thousands of Lakshmis.",
    22413: "I worship Govinda, the primeval Lord, playing his flute, with eyes like lotus petals, his head adorned with peacock feathers, his body of the hue of a raincloud and beauteous — his beauty captivating millions of Cupids.",
    22414: "I worship Govinda, the primeval Lord, whose garland of forest flowers sways to his flute and who wears jewelled ornaments, engaged in the sport of love, dark as a rain-cloud, charming in his three-curved posture.",
    22415: "I worship Govinda, the primeval Lord, whose every limb has all the functions of every sense organ — who eternally sees, sustains, and fashions the worlds — whose bliss is never broken even in the absence of worldly experience.",
    22416: "I worship Govinda, the primeval Lord, who is without duality, infallible, without beginning, of unlimited form, yet the primeval person full of eternal youth — difficult to know through the Vedas yet accessible to the pure devotee.",
    22417: "I worship Govinda, the primeval Lord — the realm of Vaikuntha to which the great sages travel in millions of years going at the speed of mind or of wind, yet there he exists as the Govinda-dhama beyond even that.",
    22418: "I worship Govinda, the primeval Lord, who alone through his single potency creates countless universes, who exists within each universe in every atom of the atoms, the Supreme Soul beyond all atoms.",
    22419: "I worship Govinda, the primeval Lord; men whose minds are saturated with divine love for him — even in their forms, thrones, ornaments, and vehicles — praise him through Vedic hymns.",
    22420: "I worship Govinda, the primeval Lord, by those of his own nature who are his plenary portions, worshipped in Goloka as the divine Lord of all with all opulence.",
    22421: "Those great souls who anoint their eyes with the salve of love, see always in their hearts that dark, beautiful, imperishable Shyamasundara — the very same Krishna.",
}
