import json

def build_meanings():
    """Build a complete id->meaning dict for all 784 verses."""
    m = {}

    # ============================================================
    # CHANT 0: sri-satyanarayana-puja (379 verses, IDs 37954-38332)
    # ============================================================
    # Section labels / ritual instructions -> ""
    chrome = {
        37954, 37966, 37968, 37969, 37970, 37971, 37972,
        37980, 37981, 37983, 37988, 37989, 37990, 37991, 37992,
        37993, 37994, 37995, 37996, 37997, 37998, 37999,
        38002, 38003, 38008, 38010, 38011, 38013, 38014, 38015,
        38016, 38017, 38020, 38026, 38027, 38029, 38033,
        38037, 38039, 38041, 38045, 38048, 38049, 38053,
        38057, 38061, 38064, 38065, 38066, 38073, 38075,
        38076, 38077, 38084, 38085, 38086, 38087, 38088,
        38089, 38090, 38093, 38096, 38113, 38119, 38120,
        38125, 38126, 38132, 38134, 38138, 38140, 38141,
        38144, 38146, 38147, 38148, 38174, 38203, 38256,
        38302, 38328, 38332
    }
    for vid in chrome:
        m[vid] = ""

    m[37955] = "Salutations to the great lord of Ganas, to the Gurus, and to Hari — Om."
    m[37956] = "Whether one is pure or impure, or in whatever state one may be, whoever remembers the lotus-eyed Vishnu becomes inwardly and outwardly pure."
    m[37957] = "We meditate on Vishnu, clothed in white, moon-coloured and four-armed, with a serene face, to dispel all obstacles."
    m[37958] = "The gods gave birth to the goddess of speech; many forms of living creatures speak her. May she, sweet and pleasing, come to us."
    m[37959] = "By constant remembrance of the auspicious Shiva and the all-beneficent goddess, may we always be freed from all sins."
    m[37960] = "This moment is auspicious, this day is auspicious; may the strength of stars, moon, learning, and divine grace all be auspicious now."
    m[37961] = "The Guru is Brahma, the Guru is Vishnu, the Guru is the great Lord Shiva; the Guru is verily the Supreme Brahman — salutation to that Guru."
    m[37962] = "They have gain, they have victory — how can defeat touch those in whose hearts the dark lotus-eyed Lord dwells?"
    m[37963] = "O most auspicious of all auspicious things, O Shiva who fulfils all desires, O three-eyed Gouri who grants refuge, O Narayani — salutation to you."
    m[37964] = "Salutation to Lakshmi-Narayana together, to Uma-Maheshvara together, to Vani-Hiranyagarbha together, and to all divine consort pairs."
    m[37965] = "O lamp, you are Brahman in form, the imperishable lord of all lights — grant us good fortune and be pleased to dwell here."
    m[37967] = "Let the ghosts and demons who burden the earth rise up and depart — we perform this worship without obstruction from them."
    m[37973] = "Vishnu abides in the mouth of the pot, Rudra at the neck, Brahma at the base, and in its belly dwell all the sacred waters and the divine mothers."
    m[37974] = "Purified Soma flows through the vessels, is sprinkled and poured, and grows through hymns and sacrifices."
    m[37975] = "Water is all this universe; all beings are water; the life-breath is water, animals are water, food is water — all is pervaded by water."
    m[37976] = "O Ganga, Yamuna, Godavari, Sarasvati, Narmada, Sindhu, and Kaveri — may all your holy waters be present in this water."
    m[37977] = ""
    m[37978] = ""
    m[37979] = "The moon and sun are the deities of the conch; Varuna dwells within it; Prajapati on its back — thus is the conch to be known."
    m[37982] = "I ring this bell at the outset to summon the gods and drive away the demons, so that the worship may proceed without obstacle."
    m[37984] = "O lord of life, restore sight to us, restore the breath here — may we long see the sun in joy and in vigour."
    m[37985] = "We meditate upon Ganapati of golden-yellow colour, four-armed, holding noose and goad, the divine son of the one whose mount is the lion."
    m[37986] = "We worship the one-tusked Ganapati — like the sun to the lotus-face of the mountain's daughter — worshipped by night and day."
    m[37987] = "We call upon the lord of Ganas, the sage among sages, most famed, most wise — may he come to us with every blessing."
    m[38000] = "This incense, born of forest plants and blended with many divine fragrances, is agreeable to all gods — O lord, accept it."
    m[38001] = "This lamp combined with ghee and three wicks, dear to us — accept this auspicious lamp I offer with devotion."
    m[38004] = "O lord, accept this betel offered with areca nut, camphor, betel leaves, and pearl powder as my offering of tambula."
    m[38005] = "I know that great Purusha, radiant as the sun, beyond darkness — through knowing him alone does one cross death; there is no other path."
    m[38006] = "Sumukha, Ekadanta, Kapila, Gajakarnaka, Lambodara, Vikata, Vighnaraja, Guhya — these eight names of Ganesha ward off all fear."
    m[38007] = "Whatever sins have been committed in this life and in past lives — all of them perish through the merit of circumambulation."
    m[38009] = "By whose mere remembrance or utterance of the name, whatever is lacking in tapas, puja, or rites becomes complete — salutation to that lord."
    m[38012] = "This water removes untimely death, cures all diseases, and destroys all accumulated sins — this is the holy water of Sri Mahaganapati."
    m[38018] = "O Varuna, hear my call and be gracious to me in my need — I who desire your protection come to you."
    m[38019] = "Brahman was born first of all, shining forth from the primal waters — in him abide all the gods."
    m[38021] = "We call upon the lord of Ganas, sage among sages, most famed, most wise — may he come to us with every blessing."
    m[38022] = "O Brahma, lord of the gods, sage of sages, great bull among the powerful — you who fly as the eagle, be our guide."
    m[38023] = "Vishnu strode through this universe in three steps, planting his foot in the highest place — from there all beings dwell in safety."
    m[38024] = "To Rudra who is the perceiver, the most generous, the mightiest — may we utter the most healing word to the heart."
    m[38025] = "Gauri, measuring and shaping the waters, moves as one-footed, two-footed, four-footed, eight-footed, nine-footed — she of the thousand-syllabled mantra."
    m[38028] = "Moving along the path of truth, the god Savitr brings together both the immortal and the mortal in his golden car."
    m[38030] = "We choose Agni as our divine messenger and all-knowing priest to perform this sacrifice with great wisdom."
    m[38031] = "To Rudra who is the perceiver, most generous, mightiest — may we utter the most healing word to the heart."
    m[38032] = "O Soma, expand and come to us from all sides with your potency — be the fount of nourishment and vitality."
    m[38034] = "Soma told me that within the waters dwell all healing medicines, and the all-benefiting Agni, and the waters themselves."
    m[38035] = "Gauri measures and shapes the waters, one-footed, two-footed, four-footed — she of the thousand-syllabled mantra."
    m[38036] = "Agni is the head of heaven, lord and protector of earth — he imparts offspring and vital seed."
    m[38038] = "O bountiful earth, be gentle and without thorns, a wide abode — grant us happiness all around."
    m[38040] = "Awaken, O Agni — arise; unite with what was done and given; let those gathered here be with you."
    m[38042] = "Vishnu strode through this universe in three steps, planting his foot in the highest place; from there, O Vishnu, your step grants protection."
    m[38043] = "The Purusha has a thousand heads, a thousand eyes, a thousand feet — encompassing the earth on all sides, he extends ten fingers beyond it."
    m[38044] = "O Brihaspati, what you have — shining, exceeding all worthy things — grant it to your devotees as splendour among people."
    m[38046] = "Brahman was born first of all, shining from the primal waters — he holds the wisdom of all creation."
    m[38047] = "O Indra with the Maruts, drink this Soma here as you drank at Sharyata's place — under your guidance and wisdom."
    m[38050] = "I have heard that Indrani is the most blessed of women — the one whose husband shall never die in old age."
    m[38051] = "O Indra with the Maruts, drink this Soma here as at Sharyata — led by your guidance and power."
    m[38052] = "May Agni be peaceful for us with all fires; may the sun bless us; may the wind blow peacefully for us."
    m[38054] = "Press Soma for Yama; offer the oblation to Yama — sacrifice reaches Yama with Agni as its messenger."
    m[38055] = "O Prajapati, none other than you encompasses all born things — may those desires for which we pour the oblation be ours."
    m[38056] = "With what wonderful, ever-increasing help, O Indra — you are always our companion; with what most powerful aid?"
    m[38058] = "This cow strode forward, came to her mother once again, and turned back toward her father — toward the light."
    m[38059] = "Salutation to the serpents everywhere on earth, those in the atmosphere, those in the sky — to them all reverence."
    m[38060] = "Making the darkness bright as a banner, O lord, you rose with the dawns — the one who fashions signs in the sky."
    m[38062] = "O most brilliant one, grant us brilliant dominion — bestow on us the shining and beautiful moon."
    m[38063] = "O Brahma, lord of the gods, sage of the wise, great bull among the mighty — grant us great wealth."
    m[38067] = "We call upon Indra from all sides for these people — may he be ours alone."
    m[38068] = "We choose Agni as our divine messenger and all-knowing priest for this sacrifice."
    m[38069] = "Press Soma for Yama; offer the oblation to Yama — sacrifice goes to Yama with Agni as messenger."
    m[38070] = "Let Nirriti who brings misfortune not strike us from above or below — let her depart along with craving."
    m[38071] = "O Varuna, hear this prayer and be gracious — we come to you seeking protection."
    m[38072] = "O Vayu, lord of truth, son-in-law of Tvashtr — we choose your mighty protection."
    m[38074] = "We call upon the lord and master of all that moves and is still, to enliven our thoughts and for our protection."
    m[38078] = "O Soma, expand and come to us from all sides with your potency — nourish us and grant vitality."
    m[38079] = "I have made Dadikravan run, the swift powerful horse — may he perfume our mouths and prolong our lives."
    m[38080] = "You are bright, you are light, you are radiant — may the divine Savitr purify you with his perfect purifier."
    m[38081] = "May sweet winds blow for one who lives by truth; may the rivers flow sweet; may all our herbs be sweet."
    m[38082] = "Flow sweetly for the heavenly-born, sweetly for Indra worthy of invocation, sweetly for Mitra and Varuna."
    m[38083] = "Whatever fruit-bearing or fruitless, flowerless or flowering trees there are — may Brihaspati release us from whatever binds."
    m[38091] = "She who rides a vessel on the red ocean, seated on a red lotus, holding noose, sugarcane bow, and flower arrows — in that meditation, O divine Tripurasundari."
    m[38092] = "We meditate on Vishnu of peaceful form, resting on the serpent, lotus-navelled lord of the gods — sky-like, cloud-coloured, supremely auspicious."
    m[38094] = "O lord of life, restore our sight, restore the breath of life here — may we long behold the sun in joy and bliss."
    m[38095] = "O lord of all worlds, remain present in this vessel with loving grace for the entire duration of this worship."
    m[38097] = "We meditate on Satyanarayana who is beyond the three qualities yet endowed with them all, lord of the worlds, adorned with the Kaustubha jewel."
    m[38098] = "The Purusha has a thousand heads, a thousand eyes, a thousand feet — encompassing the earth on all sides, he exceeds it by ten fingers."
    m[38099] = "The Purusha is all this, all that was and shall be; he is also the lord of immortality who grows through what is nourished."
    m[38100] = "So great is his glory, and yet the Purusha is greater still — all beings are but one foot of him."
    m[38101] = "Three-quarters of the Purusha rose upward; one-quarter became all this here — from there he moved outward in all directions."
    m[38102] = "From that Purusha arose Virat; from Virat the Purusha was born again — born, he extended beyond the earth both behind and before."
    m[38103] = "When the gods performed sacrifice with Purusha as the oblation — spring was its ghee, summer was the fuel, autumn was the offering."
    m[38104] = "O Soma, expand and come from all sides with your potency — be the source of food and the giver of nourishment."
    m[38105] = "I have made Dadikravan run, the strong victorious horse — make our mouths fragrant and prolong our lives."
    m[38106] = "You are brightness, you are light, you are splendour — may divine Savitr purify you with his perfect purifier."
    m[38107] = "May sweet winds blow for those who live by truth; may rivers flow sweet; may all herbs be sweet to us."
    m[38108] = "Flow sweetly for the divine-born, sweetly for Indra worthy of invocation, sweetly for Mitra and Varuna."
    m[38109] = "Whatever fruit-bearing or fruitless trees there are — may Brihaspati release us from all that binds us."
    m[38110] = "O waters that are full of bliss — you strengthen and give great vigour for our delight."
    m[38111] = "With sacred water in golden vessels, fragrant and moist with divine grace — I offer this bath as prescribed, O lord of lords."
    m[38112] = "Accept this pure water brought from all rivers for your bath, O lord of gods, offered with devotion."
    m[38114] = "Seven were its enclosings and thrice seven were the sticks of fuel — when the gods bound the Purusha as the beast in the sacrifice."
    m[38115] = "They sprinkled the Purusha on the sacrificial grass — the gods, the seers, and the Sadhyas performed the sacrifice with him."
    m[38116] = "From the all-completed sacrifice was gathered the mixed ghee — he made from it the animals of the air, forest, and village."
    m[38117] = "From the all-completed sacrifice arose the verses and chants; the metres arose from it; the sacrificial formulas were born from it."
    m[38118] = "From that arose horses and all animals with teeth on both jaws; cows arose from it; from it were born goats and sheep."
    m[38121] = "Into how many parts was the Purusha apportioned? What was his mouth, his arms, his thighs, and his feet called?"
    m[38122] = "The Brahmin was his mouth, his arms were the Kshatriya, his thighs are the Vaishya, from his feet the Shudra was born."
    m[38123] = "The moon was born from his mind, the sun from his eyes, Indra and Agni from his mouth, Vayu from his breath."
    m[38124] = "In a golden plate inlaid with gems, I offer cooked foods smeared with ghee — edibles, eatables, lickables, and drinkables to the lord."
    m[38127] = "From his navel arose the atmosphere; the sky from his head; from his feet came the earth; from his ears the directions — thus the worlds were formed."
    m[38128] = "I know that great Purusha, radiant as the sun, beyond all darkness — only by knowing him does one cross death; there is no other path."
    m[38129] = "Protect my progeny for immortal life — protect those already born and those yet to be born, for the immortal realm."
    m[38130] = "Do not harm us, O Jatavedas — neither cow, horse, man, nor the world. Come, shining one, and let Shri not abandon us."
    m[38131] = "O lord of the gods, accept this five-wicked lamp I offer, this gift of massed radiance, given to you."
    m[38133] = "Dhata proclaimed this in the beginning; Shakra knowing it from all four directions proclaimed it — by knowing it one reaches the immortal realm."
    m[38135] = "Whatever sins have been committed in this or in past lives — all of them perish through the merit of circumambulation."
    m[38136] = "I circumambulate to remove all confusion — O great lord, lift me from this ocean of worldly existence."
    m[38137] = "With chest, head, gaze, mind, speech, feet, hands, and ears — this is the eightfold prostration I offer to you."
    m[38139] = "By whose mere remembrance or utterance of the name, whatever is lacking in tapas, puja, or rites becomes complete — salutation to that lord."
    m[38142] = "O infallible lotus-eyed one, slayer of demons, lord of the senses, lord of the world — I bow always with devotion to Narayana."
    m[38143] = "I bow always with devotion to Narayana — in dangerous, calamitous, and terrible situations, oppressed by enemies, protect me."
    m[38145] = "O god, this fruit I have placed before you — may I obtain the fruit of all my desires in this life and in the next."
    m[38149] = "Once at Naimisharanya, the sages headed by Shaunaka all gathered and asked the learned Suta who had come to them."
    m[38150] = "What desired fruit is obtained by a vow or by austerity? We all wish to hear all this in detail from you."
    m[38151] = "The blessed lord of the lotus was himself questioned by Narada — and what the god told that divine sage, hear it now."
    m[38152] = "Once Narada the yogi, wishing to bless others, wandered through various worlds and came to the mortal realm."
    m[38153] = "There he saw all the people afflicted by various sorrows, born in various births, toiling under the burden of their own deeds."
    m[38154] = "How can the certain destruction of their suffering be brought about? Thinking thus in his mind, he went to the realm of Vishnu."
    m[38155] = "There he saw Narayana the god, white in complexion, four-armed, adorned with conch, discus, mace, lotus, and forest garland."
    m[38156] = "Seeing that lord of lords, Narada began to praise him. He said: Salutation to you who transcend all speech and mind."
    m[38157] = "Salutation to you who are the first origin of all, who destroy the anguish of your devotees — Vishnu heard this and spoke to Narada."
    m[38158] = "The blessed Lord said: Why have you come here? What is in your mind? Tell me, O blessed one."
    m[38159] = "Narada said: All people in the mortal world are afflicted with various sorrows, born in various births, burned by their own deeds."
    m[38160] = "O lord, how can their suffering be ended by an easy means? Tell me this — I wish to hear all of it."
    m[38161] = "The blessed Lord said: Well asked, dear son, out of your desire to bless the world — by performing which one is freed from delusion."
    m[38162] = "There is a most meritorious vow, rare even in heaven and on earth — out of love for you, dear son, I shall reveal it."
    m[38163] = "Whoever performs the vow of Satyanarayana properly shall immediately obtain happiness in this very life."
    m[38164] = "Narada said: What is its fruit, what is the procedure, and by whom is this vow to be done? Please tell me everything in detail."
    m[38165] = "The blessed Lord said: It removes sorrow and grief, and increases wealth and grain."
    m[38166] = "It brings good fortune and progeny, and bestows victory everywhere — whatever mortal, with devotion and faith, on whatever day..."
    m[38167] = "...worships Satyanarayana at the close of day, together with Brahmins and kinsmen, with devotion and righteousness..."
    m[38168] = "...should offer naivedya with devotion — a quarter-filled measure of the finest foods: banana, ghee, milk, and wheat flour."
    m[38169] = "In the absence of these, rice flour or sugar or jaggery may be used — a quarter portion of all eatables mixed together may be offered."
    m[38170] = "Give a donation to a Brahmin after hearing the story with others; then together with family and Brahmins..."
    m[38171] = "...eat the prasada with devotion, perform singing and dancing, and then return to your own home — thus Satyanarayana fulfils all desires."
    m[38172] = "If a human being acts thus, the fulfilment of all wishes will certainly come to pass — especially in the Kali age this is an easy means."
    m[38173] = "Colophon: Thus ends the first chapter of the Satyanarayana vrata-katha in the Reva-khanda of the Skanda Purana."
    m[38175] = "Suta said: I will tell further about what was done by whom in former times — there was once a poor Brahmin in the pleasant city of Kashi."
    m[38176] = "Tormented every day by hunger and thirst, he wandered on the earth. Seeing that miserable Brahmin, the Lord took the form of an old Brahmin."
    m[38177] = "That old Brahmin asked the twice-born with respect: For what reason, O wise one, do you wander constantly on the earth suffering so?"
    m[38178] = "The Brahmin said: I am a very poor Brahmin wandering on the earth to beg for alms."
    m[38179] = "If you know the means, please tell me with compassion. The old Brahmin said: Vishnu Satyanarayana fulfils all desires."
    m[38180] = "O Brahmin, perform this best of vows — by doing it one is freed from all sorrow and attains great happiness."
    m[38181] = "Having carefully explained the procedure of the vow to the Brahmin, Satyanarayana in the form of the old Brahmin disappeared right there."
    m[38182] = "He thought: I will perform the vow as told by the old Brahmin. Having resolved thus, that night the Brahmin could not sleep."
    m[38183] = "Rising early in the morning and resolving to perform the Satyanarayana vrat, the Brahmin went out to beg."
    m[38184] = "On that very day the Brahmin obtained abundant wealth. With that, together with his family, he performed the vow of Satya."
    m[38185] = "That best of Brahmins became freed from all sorrow and endowed with all prosperity through the power of that vow."
    m[38186] = "From that time forward he performed the vow every month. Having thus performed this vow of Narayana, the best of Brahmins..."
    m[38187] = "...freed from all sins, attained the hard-to-reach liberation. When a Brahmin performs this vow on this earth..."
    m[38188] = "...at that very moment all the sorrow of the man is destroyed. Thus Narayana told all this to Narada."
    m[38189] = "I have told you all this, O Brahmins — what more shall I tell you? The sages said: Hearing this from the Brahmin, we wish to know more."
    m[38190] = "Suta said: Hear, all you sages, of the vow by which great things came to pass. Once that best of Brahmins..."
    m[38191] = "...together with family and kinsmen, rose up to perform the vow. At that very time a woodseller came there."
    m[38192] = "Having left the wood outside, he came to the Brahmin's house — thirsty and parched, seeing the Brahmin performing the vow..."
    m[38193] = "...he bowed to the Brahmin and asked: What is being done here? What fruit does one obtain? Tell me fully."
    m[38194] = "The Brahmin said: This is the Satyanarayana vow — giver of all that is desired. By its grace all my wealth came back."
    m[38195] = "Knowing this vow, the woodcutter was very happy. He drank water and ate the prasada, then went to the village."
    m[38196] = "He thought about Lord Satyanarayana in his mind: Whatever I get for selling wood in the village today..."
    m[38197] = "...with that very money I will perform this excellent vow. Having resolved thus, the woodcutter carried the wood on his head..."
    m[38198] = "...and went to the pleasant city where wealthy people dwell. On that day he received double the usual price for the wood."
    m[38199] = "Then with a joyful heart he bought ripe banana fruit, sugar, ghee, milk, and wheat flour."
    m[38200] = "Mixing them together with a quarter portion, he went home and invited his family to perform the vow according to the rules."
    m[38201] = "By the power of that vow he became endowed with sons and wealth — he enjoyed happiness in this world..."
    m[38202] = "Colophon: Thus ends the second chapter of the Satyanarayana vrata-katha in the Reva-khanda of the Skanda Purana."
    m[38204] = "Suta said: I will tell again — hear, O best of sages. In former times there was a king named Ulkamukhah."
    m[38205] = "He had conquered his senses and spoke the truth, visited temples daily, and gave wealth to Brahmins to keep them content."
    m[38206] = "His wife, charming and lotus-faced, was truly virtuous — she observed the vow of Satyanarayana on the bank of the Bhadrasila river."
    m[38207] = "At that time a wealthy merchant came there with many riches for trade."
    m[38208] = "Mooring his boat on the bank, he went to the king. Seeing the king performing a vow, he asked with humility."
    m[38209] = "The merchant said: O king, what are you doing with such a devoted heart? Make it fully known — I wish to hear."
    m[38210] = "The king said: O merchant, worship of Vishnu of incomparable splendour is being performed — the vow together with kinsmen for sons and grandsons."
    m[38211] = "Hearing the king's words, the merchant said with respect: Tell me all about it, O king — I too will perform it."
    m[38212] = "I also have no offspring — surely from this a son will be born. Then returning from his trade, he came home joyfully."
    m[38213] = "He told his wife everything about the vow that grants progeny. He said: I will perform the vow when I get progeny."
    m[38214] = "Thus the honest merchant spoke to his wife Lilavati. On a certain day his wife Lilavati, the virtuous one..."
    m[38215] = "...with a heart united in joy with her husband, was devoted to dharma — and by the grace of Satyanarayana she became pregnant."
    m[38216] = "In the tenth month a gem of a daughter was born to her — she grew day by day like the moon in the bright fortnight."
    m[38217] = "She was named Kalavati and the naming ceremony was performed. Then Lilavati spoke sweet words to her husband."
    m[38218] = "Why have you not performed the vow you pledged long ago? The merchant said: I will perform it at the time of her marriage."
    m[38219] = "Having thus reassured his wife, he went to the city. Kalavati the daughter grew up in her father's house."
    m[38220] = "The merchant, seeing the daughter grown, consulted with friends and quickly sent a messenger to seek a match."
    m[38221] = "Find a worthy bridegroom for this girl. The messenger went as directed to the golden city."
    m[38222] = "From there he brought one son of a merchant — seeing that handsome and virtuous boy..."
    m[38223] = "...together with kinsmen and friends, with great joy, he gave his daughter to the merchant's son according to the rites."
    m[38224] = "Then by the force of his misfortune, the excellent vow was forgotten by him — even at the time of her wedding it was not performed."
    m[38225] = "Then in due time, skilled in his own work, the merchant quickly set out for trade together with his son-in-law."
    m[38226] = "Going to the pleasant Ratnasarapura near the sea, the merchant with his excellent son-in-law engaged in trade."
    m[38227] = "The two of them went to the city of king Chandraketu. At that very time Satyanarayana..."
    m[38228] = "...seeing that he had broken his pledge, gave him a terrible, harsh and painful curse."
    m[38229] = "On a certain day a thief stole from the king's treasury and came right to the spot where the two merchants were."
    m[38230] = "Afterwards, the guards in pursuit, terrified, placed the stolen wealth right there and fled."
    m[38231] = "Then the king's messengers came to where the good merchant was — seeing the king's wealth there, they arrested both merchants."
    m[38232] = "Running joyfully, they told the king: Two thieves have been brought — look and command, O lord."
    m[38233] = "The king commanded that they both be firmly bound and thrown into the great dungeon."
    m[38234] = "By the maya of the true god, the words of both were not heard. Therefore king Chandraketu seized all their wealth."
    m[38235] = "Because of the curse, their wives at home were also greatly distressed — a thief stole everything that remained in the house."
    m[38236] = "Afflicted with ailments, tormented by hunger and thirst, with her mind bent on finding food, she wandered about."
    m[38237] = "On a certain day, afflicted with hunger, she went to a Brahmin's house — there she saw the vow of Satyanarayana being performed."
    m[38238] = "Sitting and hearing the story, she prayed for a boon; then having eaten the prasada she returned home at night."
    m[38239] = "The mother spoke lovingly to her daughter Kalavati: Where did you stay at night? What is in your mind?"
    m[38240] = "The daughter Kalavati quickly answered her mother: At a Brahmin's house, mother, I saw a vow being performed — the giver of all desired things."
    m[38241] = "Hearing her daughter's words, she rose up to perform the vow. Joyfully the merchant's wife began the Satyanarayana vow..."
    m[38242] = "...that virtuous one performed it with family and kinsmen, praying: May husband and son-in-law quickly come home."
    m[38243] = "Please forgive the offence of my husband and son-in-law. Pleased by this vow, Satyanarayana..."
    m[38244] = "...showed a dream to king Chandraketu, the best of kings: Release the two merchants in the morning."
    m[38245] = "All the wealth that was seized by you — give it all back; otherwise I will destroy you."
    m[38246] = "Having spoken thus to the king, the lord became unattainable in meditation. Then at the break of dawn..."
    m[38247] = "...he sat in his assembly and told the people about the dream: Quickly release those two great men who are bound."
    m[38248] = "Hearing the king's words, they freed the two great men and brought them before the king, who asked them humbly."
    m[38249] = "The two merchant princes were brought, released from iron chains. Then the two great men bowed to king Chandraketu."
    m[38250] = "Remembering what had happened before, the two spoke without fear or agitation. The king seeing the merchant sons spoke."
    m[38251] = "It was by God's will that great suffering came — now there is no more fear. Then, released from the chains, they had their rituals done."
    m[38252] = "The king gave them clothes and ornaments, satisfied them, and honoured the two merchant sons with generous words."
    m[38253] = "Whatever wealth had been taken from them was given back doubled, and then the king said: Go, O merchant, to your own home."
    m[38254] = "Bowing to the king they said: We go by your grace. Having said this, the two great merchants went to their homes."
    m[38255] = "Colophon: Thus ends the third chapter of the Satyanarayana vrata-katha in the Reva-khanda of the Skanda Purana."
    m[38257] = "Suta said: The merchant set out on his journey with auspicious omens, gave wealth to Brahmins, and set off."
    m[38258] = "When the merchant had gone some distance, the lord Satyanarayana, wishing to test him, asked: What is in your boat?"
    m[38259] = "Then those two merchants, intoxicated with pride, laughed and replied: O mendicant, why do you ask — what is it to you?"
    m[38260] = "There are only leaves and vines in my vessel. Hearing this harsh and lying reply — may it be as you say."
    m[38261] = "Having said this, the mendicant quickly went away. Going some distance, he stood near the sea."
    m[38262] = "When the mendicant had gone, the merchant completed his daily rites; then looking up at the vessel he was greatly astonished."
    m[38263] = "Seeing indeed only leaves and vines, the merchant fell to the ground in a faint. Regaining consciousness, he was tormented with grief."
    m[38264] = "Then the husband of his daughter said: Why do you grieve? The curse was given by the mendicant..."
    m[38265] = "...he can certainly accomplish everything — there is no doubt. So let us go to his feet and seek his grace."
    m[38266] = "Hearing the son-in-law's words, he went to the mendicant's presence; seeing the mendicant with devotion, he bowed and spoke."
    m[38267] = "Forgive my offence — what was said in your presence. Having bowed again and again thus, he was overwhelmed with grief."
    m[38268] = "Seeing him lamenting, the mendicant spoke: Do not weep — hear my words; you who turned away from my worship..."
    m[38269] = "...by my command, O foolish one, you received repeated suffering. Hearing the blessed Lord's words, he began to praise him."
    m[38270] = "The merchant said: All — even Brahma and all the heaven-dwellers — are deluded by your maya and do not know your qualities and form."
    m[38271] = "I am a fool who does not know you, deluded by your maya — be gracious; I will worship you with whatever wealth I have."
    m[38272] = "Restore all the wealth that was mine earlier — protect me who have taken refuge in you. Hearing these devoted words, the lord was pleased."
    m[38273] = "Having granted the desired boon, Hari disappeared right there. Then boarding the vessel and seeing all his wealth restored..."
    m[38274] = "...by the grace of the true god, my desire is fulfilled — saying this, together with his kinsmen he performed the worship duly."
    m[38275] = "He became fully satisfied by the grace of Satyanarayana. Having secured the vessel with care, he set out toward his own land."
    m[38276] = "The merchant told his son-in-law: Look at my jewel-city — and sent a messenger ahead as keeper of his wealth."
    m[38277] = "That messenger went to the city, saw the merchant's wife, and reported to her the happy news."
    m[38278] = "Near the city, the merchant arrived together with his son-in-law, family members, and much wealth."
    m[38279] = "Hearing the words from the messenger's mouth, the virtuous woman was overjoyed. Performing the Satya puja, she told her daughter..."
    m[38280] = "I will go quickly and come back — come to meet the merchant soon. Hearing the mother's words, the daughter completed the vow..."
    m[38281] = "...and abandoning the prasada, went to her husband. Displeased by this, Satyanarayana caused the husband to disappear."
    m[38282] = "With all his wealth he was submerged in the water. Then Kalavati, not seeing her husband..."
    m[38283] = "...weeping with great grief, fell to the ground. Seeing the vessel in such a state and the girl weeping..."
    m[38284] = "...the merchant, frightened at heart, thought: What wonder has happened here? While they pondered, all the boatmen were confounded."
    m[38285] = "Then Lilavati, seeing the daughter distraught, was filled with grief. She lamented and said these words to her husband."
    m[38286] = "How did he become invisible along with the vessel? I do not know by whose neglect this calamity has come."
    m[38287] = "Who can understand the greatness of the true god? Saying this, she lamented — then all her kinsmen gathered."
    m[38288] = "Then Lilavati held the daughter and wept. Then Kalavati, distressed at losing her husband..."
    m[38289] = "...took his sandals and resolved in her mind to follow him. Seeing this conduct of the girl, the merchant and his wife..."
    m[38290] = "...scorched with great grief, the righteous merchant reflected: Was this seized by Satyanarayana? I wandered, deluded by his maya."
    m[38291] = "I will perform the Satya puja with full elaboration of wealth. Having said this, he summoned everyone and told them his intention."
    m[38292] = "Bowing down to Satyanarayana on the ground again and again — the pleased Satyanarayana, protector of the afflicted..."
    m[38293] = "...spoke compassionately to the devoted one: Your daughter abandoned the prasada and went to see her husband..."
    m[38294] = "...therefore her husband became invisible. Going home and taking the prasada, she will find her husband."
    m[38295] = "The daughter, hearing such words in the sky, quickly went home..."
    m[38296] = "She quickly went home, ate the prasada, and coming back she saw her husband and all the kinsmen."
    m[38297] = "Then the daughter Kalavati said to her father: Now go home — why do you delay?"
    m[38298] = "Hearing the daughter's words, the merchant was satisfied. He performed the worship of Satyanarayana duly."
    m[38299] = "With wealth and kinsmen together he returned to his own house, and performed the Satya vrat on every full moon and sankranti."
    m[38300] = "Having enjoyed happiness in this world, at the end he went to the realm of truth."
    m[38301] = "Colophon: Thus ends the fourth chapter of the Satyanarayana vrata-katha in the Reva-khanda of the Skanda Purana."
    m[38303] = "Suta said: Now I will tell another story — hear, O best of sages. There was a proud king named Tungadhvaja."
    m[38304] = "Having abandoned the prasada of Satyanarayana, he suffered great misfortune. Once he went to the forest and killed many animals."
    m[38305] = "Coming back and seeing a worship of Satya being performed under a banyan tree, he saw the satisfied cowherds performing the vow with devotion."
    m[38306] = "The king, seeing it, proudly neither approached nor bowed. Then all the cowherds took the prasada near the king..."
    m[38307] = "...placed it before him; they all ate their fill and returned. Then the king, rejecting the prasada, suffered misfortune."
    m[38308] = "His hundred sons were lost, and all his wealth and grain as well — Satyanarayana destroyed all of it, I know for certain."
    m[38309] = "So I will go to the very place where the god's worship is taking place. Having resolved thus in his mind, he went to the cowherds."
    m[38310] = "Then he performed the worship of Satyanarayana together with the cowherds, with devotion and faith, in the proper manner."
    m[38311] = "By the grace of Satyanarayana he became endowed with sons and wealth. Having enjoyed happiness in this world, at the end he went to the realm of truth."
    m[38312] = "Phalashruti: Whoever performs this very rare vow of Satya and hears this holy story with devotion obtains its full fruit."
    m[38313] = "Wealth and grain and all things will come to him by the grace of the true one. The poor man gains riches, the bound one is freed..."
    m[38314] = "...the fearful one is freed from fear — this is the truth, there is no doubt. Having enjoyed the desired fruit, at the end he goes to the realm of truth."
    m[38315] = "I have told you this Satyanarayana vrata, O Brahmins — by performing which, the human being is freed from all sorrows."
    m[38316] = "Especially in the Kali age the Satya puja bears fruit. Some call time by one name, calling Satya as God himself."
    m[38317] = "Some call him Satyanarayana, others call him Satyadeva — taking many forms, he fulfils the desires of all."
    m[38318] = "In the Kali age the eternal one will appear as Satya in the vow-form. Vishnu assumed this form to grant all desires."
    m[38319] = "Phalashruti: Whoever reads this daily and hears it, O best of sages — his sins perish by the grace of Satyanarayana."
    m[38320] = "Those who performed this vow of Satyanarayana in former times — I will now tell you of their subsequent births, O best of sages."
    m[38321] = "Shatananda the great wise one was the Brahmin Sudama; meditating on Krishna in that life, he attained liberation."
    m[38322] = "The wood-carrying tribal became king Guha; in that life, serving Sri Rama, he attained liberation."
    m[38323] = "King Ulkamukhah became king Dasharatha; worshipping Shri Ranganatha, he attained Vaikuntha."
    m[38324] = "The devout merchant became the righteous Moradhvaja; he gave half his body to the lord and attained the highest state."
    m[38325] = "King Tungadhvaja became Svayambhuva; having led all the Bhagavatas across, he attained the highest realm."
    m[38326] = "All the cowherds became dwellers of the Vraja mandala; having slain all the demons, they attained Goloka."
    m[38327] = "Colophon: Thus ends the fifth chapter of the Satyanarayana vrata-katha in the Reva-khanda of the Skanda Purana."
    m[38329] = "This removes untimely death, cures all diseases, and destroys all accumulated sins — this is the sacred water of Sri Satyanarayana."
    m[38330] = "The gods worshipped sacrifice with sacrifice — those were the first of all dharmas; through these, the great ones attained heaven."
    m[38331] = "May all auspicious things be. May all people be happy. Om peace, peace, peace."

    # ============================================================
    # CHANT 1: Taittiriya Samhita (52 verses, IDs 18213-18264)
    # ============================================================
    m[18213] = ""  # title header
    m[18214] = ""  # invocation chrome
    m[18215] = "O rock and mountain, store your nourishment; let it dwell in wind, rain, and in Varuna's might — from water, let it flow into plants and into the sacred fire."
    m[18216] = "In the frog who dwells in the reed, in the river, in the fire — may the bile of the waters be cleared away and the frog's touch purify."
    m[18217] = "O shining Agni, bring here the gods; you are the navel of the earth, you protect — bring the sages with the soma."
    m[18218] = "O gods who dwell in water, in wood, on the ground, in sacred grass, who know all light — you are the givers of all."
    m[18219] = "Give breath, give downward breath, give the eye, give vigour — ward off whatever scorches us; give us life and let us not be afflicted."
    m[18220] = "The sage, the invoker who pours all these worlds as oblation — may he, with his desires, be swiftly gratified by our worship."
    m[18221] = "He who gives names to all the gods, who alone is — to that truth all other existences go; the many come to him and ask."
    m[18222] = "Beyond the earth, beyond the sky, beyond the gods and asuras in hiddenness — who is the womb first born, who of the waters, with his wisdom set it all in motion?"
    m[18223] = "The father of the eye and the mind, the intelligent one, smeared with ghee — he who set in motion the great one's creations, stretched out and set the highest dwelling."
    m[18224] = "What was the forest, what was the wood from which heaven and earth were shaped? O wise ones, ask with the mind — on what did he stand to build the worlds?"
    m[18225] = "May we invoke today with eager mind the swift horse born of the gods, the soul-yoked one that crosses all obstacles — may he who hears gladly grant us."
    m[18226] = "Lead him upward with ghee, O Agni — link him with wealth, progeny, and cattle at the fount of rivers."
    m[18227] = "Let the wise ones bring this Agni — be for us the most gracious, of fair face, and luminous."
    m[18228] = "The gods arrived holding the sacrifice in all directions; the sun's rays are spread with golden hair, and the glowing dawn lights from front and back."
    m[18229] = "The cloud-bull, ruddy in the east, goes to his watering — he rises, deep-voiced, as the golden-hued bull of the waters."
    m[18230] = "The swift honing bull, strong as a fighter, crasher against crashers, who shakes the peoples — the hundred-shouldered, driving the wagon through all..."
    m[18231] = "...routing the demons by his chariot, driving back the enemies, scattering the armies and grinding them down in battle."
    m[18232] = "The hero of a hundred powers — Indra, hard to shake, destroyer of armies, ready for battle — may our warriors be victorious, may the gods help us at our calls."
    m[18233] = "May our warriors be exalted; may the gods protect us at our callings. Excite the magnanimous and generous one..."
    m[18234] = "...let none of the horde be left untouched. With armour I cover your vital parts; may Soma protect you, and the sacrifice surround you."
    m[18235] = "Go forward in the eastern direction, knowing the path of Agni's Agni — spread on all sides; let all be purified."
    m[18236] = "The ones going toward the light do not look back — they ascend to heaven and the sky. Let those who perform sacrifice everywhere come here."
    m[18237] = "A hundred skulls, and a hundred life-breaths, and a thousand out-breaths — you are mistress of a thousand treasures; may vigour be ours."
    m[18238] = "Great earth, filled with milk — the seven fuels of Agni, seven tongues, seven seers, seven prized hymn-givers..."
    m[18239] = "He who conquers by right, who conquers by truth, who conquers in battle, well-arrayed, with an army not afar off and not far — may he be triumphant."
    m[18240] = "One who wears armour stands like a cloud in battle — the unpierceable one in the army's midst; neither wound nor weariness comes to him."
    m[18241] = "The bowstring reaching the ear carries them along like mothers — like a mother carrying children, the bowstrings carry the arrows."
    m[18242] = "They drone loudly with terrible crash, these arrows, pulled tight and drawn to the ear, streaking in all directions."
    m[18243] = "May the Soma-drinking fathers who are blissful, Heaven and Earth who bring no harm, and Pushan protect us on difficult paths."
    m[18244] = "He who smites at the flanks, who smites at the hind, comes from the horse and leaps out from the chariot."
    m[18245] = "Strength uplifted from the trees, drawn along together — the foamy, struggling might of the waters drives forward."
    m[18246] = "Rouse up your strength and vigour; beat down far away — crash down upon the adversaries."
    m[18247] = "When you first cried out at your birth, rising from the sea and the mountain — the eagle of the two worlds, you flew with speed and spread your wings."
    m[18248] = "They say you have three bonds in heaven — three bonds in heaven, three in the waters, and three in the ocean, O purifier."
    m[18249] = "I saw the bird flying in the sky; it flies forward, moving through the paths without dust, with no need of rest."
    m[18250] = "He has a golden horn and iron feet; he is swift as thought — Indra was his lower self; the gods set this up."
    m[18251] = "The goat, set before us, knowing heaven's treasure, looks toward it with a god-directed mind — the wise one set the arrow first."
    m[18252] = "May Mitra, Varuna, Aryaman, Ayu, Indra Ribhuksha, and the Maruts not harm us in our goings."
    m[18253] = "Whatever oblation belongs to the gods in due season, threefold among humans — may all those, having received their share, be satisfied."
    m[18254] = "Moving forward, my prayer has been placed in the gods' favour — as bees go to the flower, so this word ascends."
    m[18255] = "Like flies alighting, like chips on a hatchet, whatever was deposited by the sacrificial ladle, whatever may be in the hands of the slaughterer..."
    m[18256] = "...and those who see the ripening victim, those who say 'now it is fragrant, take it away' — those who smell its fragrance..."
    m[18257] = "...and what was eaten in the fire — all of it, O Brahman, do thou purify that for me."
    m[18258] = ""  # index list chrome
    m[18259] = ""  # index list chrome
    m[18260] = ""  # index list chrome
    m[18261] = ""  # index list chrome
    m[18262] = ""  # index list chrome
    m[18263] = ""  # Hari Om chrome
    m[18264] = ""  # colophon

    # ============================================================
    # CHANT 2: Sri Hari Vayu Stuti (46 verses)
    # ============================================================
    m[35567] = "May the fearsome nails of Narasimha — who rent like a blade through the golden armour and skull of Hiranya on his broad chest — protect us from the powerful elephant-army of the foes."
    m[35568] = "O lord of Lakshmi, seeing all around and measuring everything, I see no highest substance anywhere equal to you — you stand far above all as the supreme."
    m[35569] = "Victory to Anandatirtha, the venerable one supremely devoted to the feet of blessed Vishnu — lord of all three worlds — whose fame is the greatest in all ages."
    m[35570] = "He who grew in wisdom through tireless service that swiftly defeated the dense darkness of blind ignorance — whose eager roar of devotion drove away all fog of delusion..."
    m[35571] = "...the foremost conveyor and giver of qualities that bring birth, disease, body-affliction, separation, and attainment — he remained for a long time full of his task of giving."
    m[35572] = "Wishing to manifest the path of knowledge for this people soiled by the filth of Kali — venerable, praised by moon, Indra, Rudra, and Brahma alike..."
    m[35573] = "He who bore in his arm the blazing form bright as lightning, with its light filling all the space of the worlds — great, formidable Bhima, who rushed forward to face the enemies."
    m[35574] = "He of rising, ever-fresh and faultless wisdom, gleaming like a gem, with moonstone radiance pouring down — filled with the nectar of compassion-laughter that constantly calms the afflictions of samsara..."
    m[35575] = "Here at the crown of my head this folded salutation is firmly tied to you — you who cut the bonds of bondage and give happiness. To the giver of good things..."
    m[35576] = "Glorious one shining with cool, bright, cloudless rays like brilliant sunlight — with great elemental power, multiple sovereignties — lustrous, supremely radiant..."
    m[35577] = "Those who take refuge in this third of his revered forms, praised by noble faces of the gods — they shall shine with their own brilliance; in them this will shine forth."
    m[35578] = "The Maruts, carrying pleasant fragrance of jasmine and coral-flower, give joy slowly and gently — tenderly soothing those hearts..."
    m[35579] = "He with the dazzling intensity of blazing, loud-crackling heat and the sparks of flying lightning — bearing that iron-hard combat-array in the great battle..."
    m[35580] = "Here at the side of our teachers, who long meditated on Hari's feet — in the blessed circle of your presence I take my firm, trembling seat."
    m[35581] = "He who quickly seized those emaciated ones tormented by rough demons and their sharp claws, sunken in the blind well of existence — and threw them out..."
    m[35582] = "O mother, O wind-lord, O father, unequalled teacher, O brother, beloved kinsman — O lord, O innermost self of all, O unborn one..."
    m[35583] = "Because of Vishnu's supreme excellence over all, he holds the highest devotion to Vishnu, embraced by Shridhar and his consort — he is the foremost."
    m[35584] = "You gladden the knowers of truth who share in liberation — O teacher, in your gracious state of wisdom you maintain a hierarchy of mixed understanding..."
    m[35585] = "I salute him, praised as Hanuman, the great hero of mighty arms — your foremost avatar, together with the servants..."
    m[35586] = "You previously leaped over a mountain fifty thousand yojanas away, as long as it was needed to obtain the life-restoring herb — with ease..."
    m[35587] = "He was then cast away in sport by that incomparable one — a hundred yojanas high was that mountain, as wide as tall..."
    m[35588] = "Having seen the chest of the wicked overlord split open, the golden armour shattered, the heap of bones crushed and pressed into the golden mountain..."
    m[35589] = "Commanded by the Goddess, slayer of demons whom Brahma and Hara declared invincible — ever tender with compassion, with his arms alongside..."
    m[35590] = "He struck down enemies with the weapon of the many-footed, destroying all their power — with the noose of compassion for weeping Brahmins..."
    m[35591] = "Effortlessly crushing the bones of the aged Jarasandha in battle — you in your own sacrifice crushed the great aged one."
    m[35592] = "Your battle-cry shaking with furious laughter — roaring from the enemies with terrible arm — consuming vast armies of elephants in battle..."
    m[35593] = "Drive away instantly this ignorance that wearies and agitates my hard heart, this stupor, with the force of your wind-nature — and fill it with knowledge."
    m[35594] = "You were the eager servant of those two Brahmanic great beings — the ones spoken of by Kshatriyas and Brahmins — in the Kuru family."
    m[35595] = "When Bhima went to fetch the saugandhika flower, on the path he encountered the fine tail of Hanuman laid across..."
    m[35596] = "Quickly with swift power you swiftly subdued the many crores of the fierce, mad, strong, terrible, arrogant ones..."
    m[35597] = "The crooked-minded lord of those who depart from their bodies — angry, ruled only by wrath, one who acts perversely..."
    m[35598] = "Honoured by some who follow that hard-to-behold teaching and dismissed by others — those who say 'I am Brahman, I am without qualities, I know'..."
    m[35599] = "Those crying out in despair — helpless, overpowered by fear, their hopes cut — crying in misery over the destruction of their land..."
    m[35600] = "In all three of his avatars, unmoved and harmed mercilessly by enemies — all-knowing, all-powerful, ever acting..."
    m[35601] = "He whose gentle smile and beautiful light, sweet melodious speech flowing like nectar, pouring down in streams — soothing the sorrow of devoted, noble people..."
    m[35602] = "Of minds made beautiful by accumulated merits of good past deeds and excellent conduct — delighting in the highest, those of pure heart..."
    m[35603] = "Brahma seated on a jewelled throne lit with brilliant gleaming gems — Brahma who will be, you who are the future Brahma..."
    m[35604] = "With unceasing compassion, rescuing those submerged in this ocean of samsara, with its waves of birth, death, and hell — to them grant refuge..."
    m[35605] = "The precious heap of all shruti scattered and confused — like jewels grabbed randomly by the blind — gathering them for the good of the world..."
    m[35606] = "He who bore on his head the command impossible for others to bear — among the millions of rays in Krishna's crown — the unwearied servant of Krishna..."
    m[35607] = "Having been born in the pure field of the Brahmin settlement called Rajatapitha — even there born as a Brahmin..."
    m[35608] = "I salute you, the fully wise one served daily by hosts of gods — I salute you, the lord beloved of Shri and praised by the worthy."
    m[35609] = "I, a son of the Brahmin called Subrahmanva, supremely devoted to the lotus feet of Sri Keshavanandata — I glorify you here."
    m[35610] = "May the nails of Narasimha — who rent through the golden armour and skull-pile of Hiranya on his broad chest — protect us from the powerful, frenzied elephant-army of foes."
    m[35611] = "O lord of Lakshmi, seeing all around and measuring, I find no highest substance anywhere equal to you — you stand far above all as the supreme."
    m[35612] = "Colophon: Thus is completed the Vayu-stuti composed by the revered Trivikrama Panditacharya."

    # ============================================================
    # CHANT 3: Shiva Padadi Keshanta Varnana Stotram (42 verses)
    # ============================================================
    m[36063] = "May the auspicious one grant us blessings — he who plays in the pleasure grove of the divine hill, where the Vidyadhara women sport, in the grove of Kalpa trees on the rocky slope."
    m[36064] = "They say his true form is the essence of all divine wisdom; his arrow is the Sharnga-wielder's greatest work; his knowledge is the foremost..."
    m[36065] = "The remover of all fear for those who take refuge at the feet of all the gods — he who destroys the terrible demon-armies headed by Matanga in battle..."
    m[36066] = "He who lives at the edge of death's hand, a whetstone that sharpens enemies for slaughter — he who is the son of the best of family mountains at the appointed time."
    m[36067] = "Wishing to describe the glances of the daughter of the mountain, who rests at the shoulder of the god — her long, extremely noble eye-movements..."
    m[36068] = "With the fierce loud ringing of golden bells hanging around his throat — with his unceasing throat-sounds even..."
    m[36069] = "With the humming of bees drunk on the fragrant honey that trickles from the streams of intoxicating ichor — on the peak of Shiva's mountain..."
    m[36070] = "He who was born by the merits of the gods, in perfect agreement with both Shiva and Shakti, as one famed in virtue — at whose very hearing of the name..."
    m[36071] = "He who mounts the swift horse conquered by his vigorous speed, wearing flowing blue cloth — with swift hands..."
    m[36072] = "With both lotuses, with the pair of banana-stalk feet, the twin pot-like thighs of the lord of elephants, and the full moon's face..."
    m[36073] = "With his beautiful braid of hair rivalling the Yamuna's beautiful flowing current — that Vani who sweeps away all speech with its lotus-hand..."
    m[36074] = "At the beginning of dance, with the deep resonant tabla-beats struck by hand — he bestows the bliss of consciousness — great and excellent..."
    m[36075] = "Ornamented with pearl and ruby nets, the great hall looks beautiful — inlaid with priceless jewels all around in every direction..."
    m[36076] = "Splendid pillars made of Indra's finest gems fill the surrounding areas — shining staircases ascending..."
    m[36077] = "Placed in the centre of the hall, beautiful with footstools all around — pleasing, with four feet..."
    m[36078] = "The lord of the three worlds sitting on the throne — his two lotus-like feet resting on their own footstool — gently rubbed..."
    m[36079] = "He whose sound fully recites all the characteristics of Vedic speech — the mark of Lakshmi's enjoyment of happiness, the one with the bird banner..."
    m[36080] = "When the god's limbs of passion suddenly become like moths plunging into the fire of those eyes — drawing forth arrows from that enemy..."
    m[36081] = "Those two knees together shining with the most excellent arms of the lover of Mina-dwaja's daughter, like royal elephant-trunks around the body of the queen of bananas..."
    m[36082] = "Bound with a well-fastened, auspicious girdle-string of priceless jewels grasped by the hands — bright as milk..."
    m[36083] = "Flushed with the glow of the sun at evening twilight, deeply wrapped in shining silk — tender and charming..."
    m[36084] = "From the vortex of the navel, bearing the beauty of the welling new nine gems that fulfil desires — rising forward up from the belly..."
    m[36085] = "In the embraces of the mountain's daughter, smeared with Kashmir paste that clung from the hard breast-slopes — with saffron tint rising like morning sun..."
    m[36086] = "On the left side the beloved, shining with a lovely red lotus in her gesturing hands — the beauty of the left breast of the beloved..."
    m[36087] = "Shiva, agitated by the fear of her husband's disappearance — and even Vishnu, greatly distressed — causing all-world anguish..."
    m[36088] = "Marked by the tender tooth-imprints of the mountain king's daughter on his beautiful red-coral-bright lips — shining brilliantly and continuously..."
    m[36089] = "Her ears adorned with clusters of many jewels, she who is described — her face like an open golden lotus..."
    m[36090] = "Shining most brilliantly — from the joining of beautiful, beautiful gems and more gems, there rises a sharp ray like the blazing sun..."
    m[36091] = "Those two by whom the time of embodied beings is arranged, whose face is the face of all the gods — those of whom they say their form is the primordial word..."
    m[36092] = "The left face of the beloved who sits on the left side, of the dear one who bows with all heads — some other thing again, then another..."
    m[36093] = "In which the soft radiance of the half-moon pours down and banishes the darkness of bright moonstone — with the desire to apply Kashmir saffron..."
    m[36094] = "O lord, accept me too on your head as you accept Ganga — thus prays the blessed daughter of the sun..."
    m[36095] = "The hair fitted for adornment with ornaments — the garland of flowers cut by the good companion of the mountain's best daughter, woven into chains..."
    m[36096] = "I, the twisted, the stained, the dull-bodied one, have attained the status of crown-jewel through the power of service at your feet — O excellent one..."
    m[36097] = "Pervading the universe with the whiteness of fully blossomed jasmine flowers, circling in fullness — spreading out..."
    m[36098] = "Of the divine company seated at the sides of Shiva and the mountain-goddess in brilliant divine adornments — the friends of Rudrani, drunk with joy..."
    m[36099] = "Of those celestial beauties with most graceful forms devoted to their lord's service — the ornaments move, flowers at their curved lotus-faces..."
    m[36100] = "Expressing with the lovely vina-sounds the distinctive clarity of the vowels reaching their positions — the unbroken rhythm..."
    m[36101] = "Instantly filling the minds of living beings and the goddesses of speech with joy — with a pair of hands, the foremost lotus of awakening..."
    m[36102] = "From gods, demons, ancestors, sages' councils, siddhas, vidyadharas, sadhyas, and charanas — from all beings..."
    m[36103] = "Phalashruti: Whoever meditates thus every morning and daily recites this jewel of a hymn — what can we say of that person's fruit?"
    m[36104] = "Colophon: Thus is this stotram by Sri Shankaracharya, pupil of Sri Govinda Bhagavatpada, the supreme monk."

    # ============================================================
    # CHANT 4: Devi Mahatmyam Chapter 10 (35 verses)
    # ============================================================
    m[8926] = ""  # chapter title
    m[8927] = ""  # speaker label
    m[8928] = "Seeing his brother Nishumbha slain, equal in valour to his own life, and seeing his own army being killed, Shumbha rose up in fury."
    m[8929] = "O Durga, proud of the strength of others, do not be arrogant — you fight relying on the strength of others."
    m[8930] = ""  # speaker label
    m[8931] = "Here in this world I alone exist — who is a second apart from me? These wicked ones, O evil one, enter back into me — behold, my powers reabsorbed."
    m[8932] = "Then all those goddesses beginning with Brahmani entered into the body of that Goddess — and she alone remained."
    m[8933] = ""  # speaker label
    m[8934] = "I stood here in this universe with these many forms — now they have been withdrawn; I alone stand in the battle. Let not your anger be roused."
    m[8935] = ""  # speaker label
    m[8936] = "Then began the battle between the Goddess and Shumbha — both watched by all the gods and all the demons."
    m[8937] = "Their battle was fearsome, a rain of arrows and sharp weapons, and terrible missiles on both sides — filling the sky."
    m[8938] = "The divine weapons she shot by the hundreds — the demon-king broke them, blocking each one with the opposite weapon."
    m[8939] = "And the divine weapons sent by him — the supreme lady shattered them all, playfully, with a fierce exclamation of 'Hum.'"
    m[8940] = "Then the demon covered the goddess with hundreds of arrows; she grew enraged and cut his bow to pieces with her own arrows."
    m[8941] = "When his bow was cut, the demon-lord then raised a spear; she cut that too with her discus before it could descend."
    m[8942] = "Then picking up a sword and a shield bright as a hundred moons, he rushed at the goddess — the greatest of demon-lords."
    m[8943] = "As he flew at her, Chandika quickly shattered his sword with her swift arrows, and cut to pieces his shield."
    m[8944] = "His horse killed, his charioteer slain — instantly Chandika cut his sword; he seized a terrible mace, and Ambika..."
    m[8945] = "...shattered his mace with sharp arrows as he fell. He then rushed at her with a fist, intent on close combat."
    m[8946] = "That bull among demons brought his fist down on the chest of the goddess; she too struck him back on the chest with her palm."
    m[8947] = "Struck by the palm-blow, the demon-king fell flat on the earth; but then he rose again at once from the ground, just as suddenly."
    m[8948] = "Rising up and seizing the goddess aloft in his arms, he mounted the sky; there also she fought him unsupported."
    m[8949] = "Then the demon and Chandika fought each other in close combat in the sky — a battle that astonished the siddhas and great sages."
    m[8950] = "After long close combat with him, Ambika whirled him around and hurled him down to the earth."
    m[8951] = "Cast down to earth, he quickly raised his fist and rushed at Chandika, intending to kill her."
    m[8952] = "As he came, the goddess drove her spear through his chest and felled him — the lord of all demons — to the ground."
    m[8953] = "He fell lifeless to the earth, pierced by the Goddess's spear-point — shaking the entire earth with its seas and islands as he fell."
    m[8954] = "Then all the world became calm when that evil-natured one was slain — peace was restored everywhere and the sky cleared."
    m[8955] = "The bad-omen clouds and meteors that had arisen before ceased; the rivers flowed in their proper courses; auspicious signs appeared."
    m[8956] = "Then all the hosts of gods were filled with overflowing joy — the gandharvas sang sweetly..."
    m[8957] = "...others played music and the host of apsaras danced; the winds blew pure, the fires blazed brilliantly..."
    m[8958] = "...all the fires burned calmly; the tumult of all the directions was stilled."
    m[8959] = "Colophon: Thus in the Markandeya Purana, in the chapter of the Savarna Manu, in the Devi Mahatmyam, the tenth chapter called The Slaying of Shumbha."
    m[8960] = ""  # "ahuti" — ritual label

    # ============================================================
    # CHANT 5: Sri Rama Bhujanga Prayata Stotram (30 verses)
    # ============================================================
    m[16507] = "I meditate on that pure, supreme being of sat-chit-ananda, the ground of all qualities and himself beyond all support, the most excellent — the great one, pervading all."
    m[16508] = "The auspicious, eternal, single, all-pervading, called the ferryman — of the form of joy, formless, most worthy of honour — the great lord, the artist of time..."
    m[16509] = "The one whom Shiva chanted at the root of the ear at the hour of death in Kashi — 'Shiva, Rama, Rama, Rama' — that one, the supreme, the ferryman, I salute."
    m[16510] = "Seated in ease on the greatest gem throne at the base of the wish-granting tree, shining with the light of millions of suns — always attended by Janaki and Lakshmana..."
    m[16511] = "His lotus feet adorned with jingling gem-anklets — girded with a beautiful girdle and golden garment — adorned with a great gem necklace..."
    m[16512] = "With lips shining like the moon's nectar, brilliant as millions of rising suns and moons — with Brahma and other gods bowing before him..."
    m[16513] = "Enlightening those who stand before him with folded hands — Anjaneya and other devotees — with his pure wisdom-gesture — I worship him."
    m[16514] = "When death, coming near me with fierce anger, threatens me with his frightful messengers — O Ramachandra, reveal yourself then..."
    m[16515] = "Be present in your own inner shrine of my mind — be gracious, be gracious, O lord Ramachandra. Together with Saumitri..."
    m[16516] = "With the foremost of your devotees, the monkey-lords, and many armies, O Rama, be gracious. Salutation to you..."
    m[16517] = "You alone are my one supreme deity — I know nothing else as consciousness apart from you. From you all this arose..."
    m[16518] = "Salutation to him of sat-chit-ananda form — salutation to the god of gods, to Rama. Salutation to the lord of Janaki..."
    m[16519] = "Salutation to you who are accessible to those joined with devotion, salutation to you attainable only by an accumulation of merit — salutation to the one known by the Vedas..."
    m[16520] = "Salutation to the maker of the world, salutation to the destroyer of the world, salutation to the enjoyer of the world, salutation to the mother of the world — salutation to the witness of the world."
    m[16521] = "Salutation, salutation to you — expert in the full play, enjoyment, and measurement of all this creation — receive my mind as your own service."
    m[16522] = "Even a stone, O Rama, received consciousness by the merit of the dust of your lotus-feet. A man who knows your feet..."
    m[16523] = "O Ramachandra, those men who daily remember your pure, wonderful, and holy deeds — they are freed from becoming..."
    m[16524] = "He is holy, he is worthy, he is my refuge — the man who knows you, the crest jewel of the gods. Ever-formed..."
    m[16525] = "O Ramachandra, lord, with your fierce and blazing power, O overcomer of abundant enemy warriors — your strength..."
    m[16526] = "The fierce ten-headed one with his sons and allies, the lord of the demons in the midst of sea and fortress — confronting you..."
    m[16527] = "He who always drinks your nectar of 'Rama, Rama,' — the root of ever-streaming bliss — bowing, meditating..."
    m[16528] = "He who daily drinks your nectar of 'Rama, Rama,' the root of ever-streaming bliss — certainly he, daily bowing, is freed."
    m[16529] = "Not without Sita, not without the Kodanda bow, not worshipped by those without Saumitri's company, not those of mild valour — with the destroyer of Lanka, death himself..."
    m[16530] = "Not sitting without armour, not without the wisdom-gesture, not without revealing truth to Anjaneya and others — not without abundant fragrant flower-garlands..."
    m[16531] = "Not without fierce anger toward the ocean, not without matchless valour, not without the journey without a companion, not without the gentle smile..."
    m[16532] = "He who mutters 'Hare Rama, husband of Sita, enemy of Ravana, slayer of Khara, enemy of Mura, enemy of demons, beyond all' — carrying him along, taking him ever onward..."
    m[16533] = "Salutation to you, constantly honoured by Sumitra's son — salutation to you always worthy of praise as the joy of Kaikeyi — salutation to you always..."
    m[16534] = "Be gracious, be gracious, O one of fierce valour — be gracious, be gracious, O fierce destroyer of enemies — be gracious, be gracious..."
    m[16535] = "Phalashruti: He who daily reads with joy and devotion this Bhujanga-prayata, the essence of the Vedas, about Ramachandra — attains..."
    m[16536] = "Colophon: Thus is this Sri Rama Bhujanga-prayata Stotram composed by Sri Shankaracharya."

    # ============================================================
    # CHANT 6: Bhadrakali Ashtottara Satanama Stotram (25 verses)
    # ============================================================
    m[35444] = "Nandikeshvara speaks: I salute Bhadrakali — Virabhadra's Sati, the auspicious one, daughter of red-orange hue, the Shakti..."
    m[35445] = "Now the stotra: Bhadrakali, Kamarupa, Mahavidya, Yashasvini — she of great refuge, greatly blessed, the destroyer of Daksha's pride..."
    m[35446] = "Born of Rudra's wrath, Bhadra, Mudra, the auspicious one — Chandrika, she of the moon-face, red-eyed with rage..."
    m[35447] = "The subduer of Indra and other gods, the peaceful, adorned with a crescent of moon — the remover of devotees' suffering, the liberated, the giver of Chandika's joy..."
    m[35448] = "Saudamini, of nectar form, adorned with divine ornaments — Suvasini, of fair nose, knower of the three times, bearing the burden of all..."
    m[35449] = "All-knowing, sovereign of all worlds, born of divine descent, unborn herself — without qualities, without ego, the doer of good to all the worlds..."
    m[35450] = "Beloved of all worlds, Gouri, crusher of all arrogance — full of vigour, the great mother, brilliant as millions of suns..."
    m[35451] = "The giver of joy made by Virabhadra, the one served by heroes — praised by Narada and other sages, the eternal, the true, the ascetic..."
    m[35452] = "Of the nature of knowledge, beyond the arts, the giver of all desires to devotees — dwelling on Kailasa, fair, patient, Shri, all-giving..."
    m[35453] = "The siddha-vidya, the great power, the desirable, lotus-eyed — dear to the gods, the slayer of demons, the destroyer of Daksha's pride..."
    m[35454] = "The doer of Shiva's commands, the giver of Shaiva bliss — the destroyer of bonds of existence, the doer of auspicious sacrifice..."
    m[35455] = "Lambodari, Mahakali, of fearsome face, sovereign of the gods — the great sleep, the yoga-sleep, knowledge, speech, action..."
    m[35456] = "The giver of sons and grandsons, the virtuous one, the one who desires victory in war — the will of Shambhu, the ocean of grace, Chandi..."
    m[35457] = "Shobha, Bhagavati, Maya, Durga, the dark one, she whose movement is like the mind — she who moves in the sky, bearing a sword and discus, holding a spear..."
    m[35458] = "She of auspicious arrows, holding a power weapon, she who goes on foot everywhere, the supreme — the giver of success in austerity, the divine, the companion of Virabhadra..."
    m[35459] = "The giver of wealth and grain, the universal, the remover of mental impurity — the producer of good stars, the giver of lineage increase..."
    m[35460] = "Served by Brahma and other gods, the beloved of Shankara, one who speaks pleasingly — remover of ghosts, spirits, and demons, of auspicious mind..."
    m[35461] = "Dwelling in holy places, the directly manifest supreme lord — thus these hundred and eight names of Bhadrakali have been described."
    m[35462] = "Phalashruti: The goddess quickly bestows on whoever recites this — fame, long life, sons and grandsons, and great wealth."
    m[35463] = "On Tuesday or Friday, especially on the full moon — having bathed in the morning and performed daily duties..."
    m[35464] = "...having duly worshipped the blessed Bhadra in the temple of Virabhadra — whoever reads this divine hymn attains many pleasures."
    m[35465] = "The learned subduer of foes quickly attains the desired success. Or if one reads it at home, in the presence of Virabhadra's consort..."
    m[35466] = "...by this hymn performed duly, one attains all desires. His diseases perish quickly, and he attains yoga-siddhi."
    m[35467] = "Teach this hymn to the devotees of Sanatkumara — it is secret and essential, O all-knowing one..."
    m[35468] = "Colophon: Thus ends the Bhadrakali Ashtottara Shatanama Stotram."

    # ============================================================
    # CHANT 7: Sri Krishna Kruta Durga Stotram (21 verses)
    # ============================================================
    m[36208] = "Sri Krishna speaks: You alone are the universal mother, the primal nature, the sovereign — you alone are the primal one, the arranger of creation..."
    m[36209] = "For practical purposes you are with qualities, but in truth you are without qualities — you are of the form of supreme Brahman, the true, the eternal..."
    m[36210] = "Of the form of supreme light, the highest — with a body of favour to devotees — the form of all, the lord of all, the support of all, beyond the beyond..."
    m[36211] = "Of the nature of all seeds, worshipped by all, without support — all-knowing, good in all directions, the most auspicious of all..."
    m[36212] = "Of the nature of all intelligence, embodying all powers — the goddess who grants all knowledge, all-knowing, the knower of all..."
    m[36213] = "You are svaha in offerings to gods and svadha in offerings to ancestors — you yourself are dakshina in all gifts, and you are all powers..."
    m[36214] = "You are sleep, you are compassion, you are thirst, you are the self's beloved — hunger, patience, peace, sovereignty..."
    m[36215] = "Faith, nourishment, drowsiness, shame, splendour, compassion — the prosperity of the good, Shri, the knowledge..."
    m[36216] = "The form of love for the virtuous, the seed of strife among sinners — ever-active power, always all-knowing..."
    m[36217] = "The giver of her own rank to the gods, support and nurse, full of grace — for the benefit of all the gods, the destroyer of all demons..."
    m[36218] = "The yoga-sleep, the yoga-form, the bestower of yoga on yogins — of the form of siddhi for the perfected, the giver of siddhi, dear to the perfected..."
    m[36219] = "Maheshvari and Brahmani, Vishnu-maya and Vaishnavi — the giver of prosperity, Bhadrakali, the auspicious one to all the worlds..."
    m[36220] = "The village deity in every village, the household deity in every household — the fame of the good, their honour — you are also the slander of the wicked..."
    m[36221] = "In the great battle, the great pestilence, the destroyer of the wicked — of the form of protection for the good, acting like a mother..."
    m[36222] = "Always worshipped, praised, and hymned by Brahma and all others — of the nature of Brahmic wisdom for the Brahmins..."
    m[36223] = "The knowledge of those with knowledge, the wisdom of the intelligent good — of the nature of memory and intelligence, the essence of understanding..."
    m[36224] = "The form of royal valour for kings, the form of commerce for the Vaishyas — in creation, the form of creation; in protection, the form of protection..."
    m[36225] = "And at dissolution, you are the great pestilence — worshipped by all the worlds; the night of death, the great night, the night of delusion..."
    m[36226] = "You are my maya that is hard to cross, by which the whole world is deluded — by which even the learned man, deluded, seeks liberation..."
    m[36227] = "Phalashruti: Whoever reads this hymn of Durga composed by me — destroyer of difficulty — at time of worship, shall have success..."
    m[36228] = "Colophon: Thus in the Brahmavaivarta Purana, second Prakrti-khanda, in the dialogue of Narada and Narayana — this is the Durga Stotram composed by Krishna."

    # ============================================================
    # CHANT 8: Hanuman Kavacham (19 verses)
    # ============================================================
    m[23879] = ""  # technical header
    m[23880] = "He who leapt easily across the salty sea, who took away the fire of grief from Janaki — he brought that very fire back to Lanka; I bow to that Hanuman."
    m[23881] = "Swift as thought, equal in speed to the wind, conqueror of the senses, best among the wise — son of Vayu, foremost among the monkey-leaders — I bow to that Hanuman."
    m[23882] = "Bright as the rising sun, with noble arms of heroism — with the beauty of millions of Kandarpas, learned in all sciences..."
    m[23883] = "The delight of Sri Rama's heart, the wish-granting tree for devotees — I meditate on the son of Maruta, bearing fearlessness and boons in his arms."
    m[23884] = "Meditating on 'Sri Rama, Rama, Rama' — I rejoice in Rama, O Ramanama, delighting the mind — that Name equals a thousand Names."
    m[23885] = "May Vayusuta protect my feet; may the messenger of Rama protect my toes; may Harishvara protect my ankles; may the ocean-crosser protect my calves."
    m[23886] = "May Maruti protect my knees; may the destroyer of demons protect my thighs; may the diamond-bodied one protect my hips; may the world-renowned one protect my buttocks."
    m[23887] = "May Anjaneya protect my waist; may the life of Sumitra's son protect my navel; may the heart-dweller protect my belly; may Mahavira protect my heart."
    m[23888] = "May the tail-weaponed one protect my chest; may the one of immeasurable valour protect my breasts; may the conqueror of senses protect my sides; may the noble one protect my arms."
    m[23889] = "May the victorious one protect my hands; may Hanuman protect his finger-joints; may the future Brahma protect my back; may the destroyer of Lanka protect my shoulders."
    m[23890] = "May the best of the monkeys protect my throat; may the crusher of Ravana's pride protect my face; may the eloquent one protect my mouth; may the diamond-eyed one protect my eyes."
    m[23891] = "May the one who honours the Brahmastra always protect my brows; may the shape-shifter protect my cheeks; may the diamond-fronted one protect my forehead."
    m[23892] = "May the destroyer of Janaki's sorrow always protect my head; may the foremost of Sri Rama's devotees protect my entire body."
    m[23893] = "May the omniscient one protect me by day; may the great-famed one protect me at night; may the disciple of the sun protect me at both twilights."
    m[23894] = "May the one blessed with boons from Brahma and all the gods protect me unceasingly. Whoever daily recites and hears this kavacham..."
    m[23895] = "...attains long life, gains strength and vision. Those who recite this kavacham will have all the quarters under their feet."
    m[23896] = "I have explained to you in verse the full account of all this yourself, O Anjaneya — even for the people dear to you..."
    m[23897] = "Colophon: Thus ends the Sri Hanuman Kavacham."

    # ============================================================
    # CHANT 9: Sri Rudram Laghunyasam (17 verses)
    # ============================================================
    m[4212] = ""  # instruction
    m[4213] = "Meditate on Shiva: pure and brilliant as quartz crystal, with three eyes and five faces — bearing the Ganga, ten-armed, the lord of all beings..."
    m[4214] = "...with a blue throat, the crescent moon as his mark, a serpent as his sacred thread — wearing a tiger-skin as the upper garment, most worthy of honour..."
    m[4215] = "...bearing a water-vessel, a rosary, and a spear — blazing, with tawny matted locks raising a crest of flame..."
    m[4216] = "...mounted on the bull, bearing Uma as half his body — immersed in nectar and peace, of divine enjoyment and most worthy of honour."
    m[4217] = "...accompanied by deities of all directions, saluted by gods and demons alike — eternal, constant, pure, imperishable, full of divine luminance."
    m[4218] = ""  # instruction prose
    m[4219] = "Brahma stands in the sexual organ; Vishnu stands at the feet; Hara stands at the hands; in the arms..."
    m[4220] = "Agni is in my speech; speech is in my heart; the heart is in me; I am in the immortal; the immortal is in Brahman."
    m[4221] = ""  # technical header
    m[4222] = ""  # nyasa list chrome
    m[4223] = ""  # nyasa list chrome
    m[4224] = "Meditation: The light of consciousness flashing across from the depths of the underworld to the highest heaven — brilliant as pure crystal, blazing..."
    m[4225] = "He whose body pervades the cosmos, shining with the radiance of ash-smeared limbs, adorned with serpents — whose neck is dark, whose matted hair is coiled..."
    m[4226] = "We call upon the lord of Ganas, the sage among sages, most famed, most wise — the greatest, the most excellent, with wisdom."
    m[4227] = "May happiness come to me, and delight, and what is dear, and what is desired, and what I long for, and joy, and goodwill..."
    m[4228] = "Shanti mantra: Om peace, peace, peace."

    # ============================================================
    # CHANT 10: Mandukya Upanishad (15 verses)
    # ============================================================
    m[37124] = "Shanti mantra: May we hear with our ears what is auspicious, O gods; O you who are revered in sacrifice, may we see with our eyes what is auspicious."
    m[37125] = ""  # title
    m[37126] = "Hari Om. Om — this syllable is all this. An explanation of it follows: all that was, is, and shall be is Om; and whatever transcends the three times is also Om."
    m[37127] = "All this is indeed Brahman. This self is Brahman. This same self has four quarters."
    m[37128] = "The first quarter is Vaishvanara — whose field is the waking state, who is conscious of externals, with seven limbs and nineteen mouths, who enjoys gross objects."
    m[37129] = "The second is Taijasa — whose field is the dream state, who is conscious of internals, with seven limbs and nineteen mouths, who enjoys subtle objects."
    m[37130] = "Where one asleep desires no desire at all and sees no dream — that is deep sleep, where the sleeper becomes one mass of pure consciousness, full of joy, experiencing joy, whose mouth is thought alone."
    m[37131] = "He is the lord of all, the all-knowing, the inner controller, the source of all — the beginning and end of all beings."
    m[37132] = "Not conscious of internals, not conscious of externals, not conscious in both ways, not a mass of consciousness, not conscious and not unconscious — unseen, beyond the reach of ordinary transaction, ungraspable, without distinguishing marks..."
    m[37133] = "This same self, in relation to the syllable, is Om; and Om, in relation to the letters, is the quarters. The letters are the quarters: A, U, M."
    m[37134] = "Vaishvanara of the waking state is the letter A, the first quarter — from the two meanings of pervading and being first. He who knows this pervades and obtains all desires."
    m[37135] = "Taijasa of the dream state is the letter U, the second quarter — from the two meanings of excellence and being in between. He who knows this excels in knowledge..."
    m[37136] = "Prajna of deep sleep is the letter M, the third quarter — from the two meanings of measure and absorption. He who knows this measures all this world and becomes all."
    m[37137] = "The fourth is without a letter, beyond all transaction, the cessation of the phenomenal world, auspicious, the non-dual — thus Om is indeed the self. He who knows this enters the self with the self."
    m[37138] = "Colophon: Thus ends the Mandukya Upanishad."

    # ============================================================
    # CHANT 11: Gita Govinda Chapter 9 (13 verses)
    # ============================================================
    m[14353] = ""  # chapter header
    m[14354] = "Then the sakhi found Radha weary of love's longing, filled with grief of separation, drowned in despondency — with her mind occupied thinking of Hari's deeds..."
    m[14355] = ""  # song header
    m[14356] = "Hari is coming — the honey-wind is blowing; what greater happiness is there in this world, O sakhi? O Madhava..."
    m[14357] = "More heavy than the weight of a palm fruit — why do you make your pitcher-breasts fruitless now?"
    m[14358] = "How many times has this not been said to you, again and again, so recently? Do not reject Hari who is so exceedingly beautiful."
    m[14359] = "Why do you grieve, why do you cry in distress? The whole assembly of young women is laughing at you."
    m[14360] = "On a bed as cool as the petals of a wet lotus, behold Hari and let your eyes fulfil their purpose."
    m[14361] = "Why do you create such deep anguish in your mind? Listen to my word that removes all unwanted pain."
    m[14362] = "Let Hari come to you; let him speak so many sweet things — why do you make your heart so full of grief?"
    m[14363] = "This exquisitely graceful speech of Sri Jayadeva — may the deeds of Hari gladden the hearts of the discerning."
    m[14364] = "Where you are harsh toward the tender one, where you are stiff toward the one who bows, where you are full of passion yet show repugnance — where you turn away from the open-faced..."
    m[14365] = "Colophon: Thus ends the ninth canto called Manda Mukunda — the description of the Kalahantarita — in the Gita Govinda."

    # ============================================================
    # CHANT 12: Mundaka Upanishad 2.1 (12 verses)
    # ============================================================
    m[23729] = ""  # section header
    m[23730] = "This is the truth: as from a blazing fire thousands of sparks spring forth all of the same form, so from the imperishable various forms arise and return to it."
    m[23731] = "The divine, the formless Purusha — he is without and within, he is unborn — without life-breath, without mind, pure, and higher than the highest imperishable."
    m[23732] = "From him arise the vital breath, the mind, all the senses, space, air, fire, water, and earth that supports all."
    m[23733] = "Agni is his head; his eyes are the moon and sun; the directions are his ears, the Vedas his speech disclosed — the wind is his breath, his heart is the whole world..."
    m[23734] = "From him fire is kindled with the sun as its fuel; from the moon comes rain, and from rain comes herbs upon the earth — the male pours seed in the female..."
    m[23735] = "From him arise the Rig, the Sama, and the Yajus verses, the initiations and all sacrifices, the rites, the fees — the year, the sacrificer, and the worlds..."
    m[23736] = "From him are born the gods in many ways, the Sadhyas, human beings, cattle, and birds — the in-breath and out-breath, rice and barley, and tapas..."
    m[23737] = "From him arise the seven vital breaths, the seven flames, the seven kinds of fuel, the seven oblations — these seven worlds in which the vital breaths move..."
    m[23738] = "From him arise all the oceans and all the mountains, from him flow the rivers of every form, from him arise all plants and their juice..."
    m[23739] = "The Purusha alone is all this — action, austerity, and the supreme deathless Brahman. He who knows this, hidden in the cave of the heart, O good one, cuts asunder the knot of ignorance here."
    m[23740] = "Colophon: Thus ends the first section of the second Mundaka of the Mundaka Upanishad."

    # ============================================================
    # CHANT 13: Narayaniyam Dashaka 76 (11 verses)
    # ============================================================
    m[23437] = "Having gone to Sandipani — you, all-knowing, mastered all sixty-four arts in sixty-four days, together with Balarama and all the other arts."
    m[23438] = "Remembering the cowherd women filled to bursting with the weight of their love, you in your compassion, overcome, sent Uddhava..."
    m[23439] = "Uddhava reached Gokula at evening — the one who would spread your greatness — and comforted those gopas greatly with your news and your doings."
    m[23440] = "Seeing him adorned with divine dress and ornaments exactly like yours — remembering your sports again and again and crying aloud..."
    m[23441] = "Who is this, O Shri — sent mercilessly by your parents? Where is that lover of the city women? Alas, O Hari, who went away..."
    m[23442] = "Your face loosened from the rasa-dance, with the knot of your hair undone, with fine beads of effort-sweat rising — lovely, charming..."
    m[23443] = "With such and similar helpless words those gopas were agitated — Uddhava brought them back to their natural state with your message, and then..."
    m[23444] = "Day and night, along with chanting your songs, their every household task proceeds — your news alone spreads among them mutually..."
    m[23445] = "A friend of mine says: 'This one of mine who is most dear to Radha says this — why are you silent, O friend? Do not delay.'"
    m[23446] = "I shall come soon — a brief delay is only due to the weight of duty — even in separation, the firmness of my memory of you is possible..."
    m[23447] = "Thus the devotion to you unseen or unheard anywhere in all the worlds — what is the use of the floods of scripture? What is tapas here? The gopis have all this."

    # ============================================================
    # CHANT 14: Narayaniyam Dashaka 11 (10 verses)
    # ============================================================
    m[22773] = "As creation gradually expanded, once the divine Sanaka and his brothers, wishing to behold you, came to your Vaikuntha..."
    m[22774] = "...that dwelling of yours — incomparable, with many pleasant gardens, bowers of bliss, numberless ponds and gem-studded palaces..."
    m[22775] = "...Jaya and Vijaya, the two gatekeepers eager to see you and wishing to enter your abode, turned them back..."
    m[22776] = "...those two, O you of most fitting behaviour in Vaikuntha, were cursed to be born as demons — thus cursed..."
    m[22777] = "...knowing this, you yourself came out, O lotus-eyed one, together with Lakshmi, bearing Garuda on your shoulder..."
    m[22778] = "...having appeased the great sages who were praising you with hymns and having no other protector, those two attendants..."
    m[22779] = "...your two servants, born from Kashyapa, arose as two demon warriors from Diti — at the time of twilight..."
    m[22780] = "...one was Hiranyakashipu, the other was widely known as Hiranyaksha — both harboured enmity to you, their own master..."
    m[22781] = "...of these two, the great demon Hiranyaksha, rushing to battle without finding a match among enemies — your dear earth he dragged away..."
    m[22782] = "...then hearing from the lord of waters that you resembled him, he wandered searching for you — visible only to your devotees..."

    # ============================================================
    # CHANT 15: Narayaniyam Dashaka 48 (10 verses)
    # ============================================================
    m[23153] = "You were joyously praised by hosts of gods with generous and intoxicated voices, addressing you as Damodara — with a tender belly you yourself..."
    m[23154] = "One of Kubera's sons was called Nalakubara, the other was known as Manigriva — by the grace obtained from Maheshvara's worship..."
    m[23155] = "Indeed those two, wildly drunk, frequenting the divine river surrounded by many celestial women — naked..."
    m[23156] = "Even seeing Narada coming before them — though afraid and grabbing clothes — their minds blinded by intoxication, those two, your devotees..."
    m[23157] = "You two have been in the form of trees for a long time — after seeing Hari you will attain your own state; thus said Narada to them..."
    m[23158] = "Those two, now in the form of trees, were tied in that manner — and you, moving slowly with deliberate gait, the mortar tied to you..."
    m[23159] = "When those two trees were shattered by you, just at that moment, from within the tree trunks, with great brilliance the yaksha-bodies emerged..."
    m[23160] = "Even another devotee of yours will come here in due time — those two were indeed servants of Rudra; by the sage's grace..."
    m[23161] = "Then, as the terrible sound of the uprooted trees shook everything and all the cowherds fell down — your mother, greatly ashamed..."
    m[23162] = "The child between the trees, by Hari's grace, emerged unharmed. Saying this, the cowherds..."

    # ============================================================
    # CHANT 16: Narayaniyam Dashaka 93 (10 verses)
    # ============================================================
    m[23619] = "May I give up affection for relatives through your compassion — with my self absorbed in you — having abandoned everything, may I wander..."
    m[23620] = "Countless creatures exist subsisting only on food and drink, with minds fixed on that — being wiser than them..."
    m[23621] = "O all-pervading, when your compassion operates — who would not then find you the guru, even in the ways of the world? Even the earth, though overpowered by all..."
    m[23622] = "May I be pure, may I be holy — sweet like water, like fire may I not accept; nourishing all yet remaining apart..."
    m[23623] = "May I not be like the hunter who killed his son out of love, like a dove attached to its mate — may I bear what comes..."
    m[23624] = "May I not be bound as an elephant is bound by a herd-female; may I not accumulate wealth — it is for another to take away."
    m[23625] = "May I conduct myself with dignity cast aside, happily free of props as a young child, alone — like a single remaining bangle of a girl..."
    m[23626] = "Just as a spider makes and dissolves its web — from you come and in you dissolve all worlds — from the spider may I learn..."
    m[23627] = "Alas, alas — O lord of Guruvayur, leave this delusion of body; for whose love one is entangled in home, wealth, wife..."
    m[23628] = "If the delusion of body is too hard to overcome even now — then taking away all diseases, fix the most firm devotion..."

    # ============================================================
    # CHANT 17: Tripura Sundari Ashtakam (9 verses)
    # ============================================================
    m[35940] = "She who wanders through the kadamba forest, a cloud of sages in attendance, whose buttocks surpass the mountains, served by the celestial beauties — I worship Tripurasundari."
    m[35941] = "She who dwells in the kadamba forest, bearing a golden lute, adorned with a great gem necklace, whose face shines with the redness of wine — I worship Tripurasundari."
    m[35942] = "She who dwells in the kadamba forest's hall, her breast lit with its garland, her breasts compared to mountains, whose gracious wave comes with the teacher's grace — I worship."
    m[35943] = "She who dwells in the midst of the kadamba forest, seated in a golden circle, dwelling in the six lotuses, eternally praised by the perfected ones — I worship Tripurasundari."
    m[35944] = "She with the vina resting on her breast, adorned with curling locks, dwelling in the lotus, enemy of the crooked-minded — I worship Tripurasundari."
    m[35945] = "One should meditate on the first-blossomed one, dressed in blood-drop-dark garments, holding a wine-cup, intoxicated, swaying..."
    m[35946] = "She anointed with kumkuma, fragrant as musk touching her locks, with a gently smiling glance, bearing bow of sugarcane, arrow, noose, and goad — I worship Tripurasundari."
    m[35947] = "The hairdresser for Indra's ladies, skilled as a braided woman — she who is the devoted wife of the grandfather, adept in the various arts..."
    m[35948] = "Colophon: Thus ends the Tripura Sundari Ashtakam by the supreme monk Sri Shankaracharya, pupil of Sri Govinda Bhagavatpada."

    # ============================================================
    # CHANT 18: Ashtavakra Gita Chapter 19 (8 verses)
    # ============================================================
    m[20484] = "Janaka speaks: Having extracted the tongs of tattva-knowledge from the cave of the heart, I have pulled out the thorn of many varied deliberations..."
    m[20485] = "Where is dharma, where is desire, where is wealth, where is discrimination? Where is duality, where is non-duality? Where is this, where is that?"
    m[20486] = "Where is the past, where is the future, or even the present? Where is space? Where is eternity? Where are we standing now?"
    m[20487] = "Where is the self, where is the non-self, where is the good and evil as they are? Where is thought, where is beyond thought?"
    m[20488] = "Where is dream, where is deep sleep, or waking? Where is the fourth state? Where is fear? And where is my own nature?"
    m[20489] = "Where is the distant, where is the near? Where is outside, where is inside? Where is the gross, where is the subtle?"
    m[20490] = "Where is death, where is life? Where are the worlds, where are worldly concerns? Where is dissolution and where is samadhi for me in my own state?"
    m[20491] = "Enough with talk of the three ends of life, enough with talk of yoga — enough with talk of wisdom — for me who am at rest in myself."

    # ============================================================
    # CHANT 19: Datta Shodasi (6 verses, Telugu/Sanskrit mixed)
    # ============================================================
    m[32240] = "Refrain: Worship, worship Dattatreya — sat-chit-ananda, true guru, Datta of the sixteen avatars."
    m[32241] = "Verse: O Datta, slayer of the Kalagnishaman of Mahisapura, dwelling in the village of Proddutur, the king of yogis..."
    m[32242] = "He who plays in Vijayavada, with dark lotus eyes, dwelling in Machilipatnam — son of Atri and Anasuya..."
    m[32243] = "King of the tirthas of Rishikesh, the noble naked Datta, dwelling in Akividu, Vishvambara the avadhuta..."
    m[32244] = "O naked Datta deity of the Gandigunta region — the siddha-raja dwelling in the city of Cochin..."
    m[32245] = "O Datta, lord of Kashi at the birthplace of sat-chit-ananda — Datta Rameshvara on the eastern seashore..."

    # ============================================================
    # CHANT 20: Bhagavad Gita Chapter 18 (4 verses)
    # ============================================================
    m[31128] = ""  # chapter header
    m[31142] = "The seat of action, the doer, the various instruments, the many distinct acts — and the divine as the fifth: these are the five causes declared in the Sankhya teaching for the accomplishment of all action."
    m[31160] = "The intellect that, veiled in darkness, sees wrong as right and perceives all things inverted — that intellect, O Partha, is of tamas."
    m[31207] = "Colophon: Thus in the Mahabharata, the hundred-thousand-verse collection, in the Bhagavad Gita Upanishads of the Moksha-sannyasa Yoga — the eighteenth chapter ends."

    # ============================================================
    # CHANT 21: Bhagavad Gita Chapter 10 (3 verses)
    # ============================================================
    m[5790] = ""  # chapter header
    m[5821] = "Among the purifiers I am the wind; among weapon-bearers I am Rama; among fish I am the makara; among rivers I am the Jahnavi."
    m[5833] = "Colophon: Thus in the Bhagavad Gita Upanishads, Brahma-vidya, Yoga-shastra — the tenth chapter called Vibhuti Yoga ends."

    # ============================================================
    # CHANT 22: Bhagavad Gita Chapter 7 (2 verses)
    # ============================================================
    m[30763] = ""  # chapter header
    m[30794] = "Colophon: Thus in the Bhagavad Gita Upanishads, Brahma-vidya, Yoga-shastra, in the dialogue of Sri Krishna and Arjuna — the seventh chapter called Jnana Vijnana Yoga ends."

    # ============================================================
    # CHANT 23: Mrittika Suktam (2 verses)
    # ============================================================
    m[25530] = "The earth is the cow, the earth is the bearer, the supporter of the worlds — you were lifted up by the dark boar Krishna a hundred times..."
    m[25531] = "O earth, being established — drive away everything from me, O earth. By that which was struck, the sin is destroyed, O earth..."

    # ============================================================
    # CHANT 24-26: Annamayya kirtanas (Telugu — all chrome)
    # ============================================================
    m[7903] = ""  # Telugu raga notation + Telugu text
    m[7931] = ""  # Telugu text
    m[7965] = ""  # Telugu text

    return m


def build_output():
    with open('cache/batches/sonnet-03.json') as f:
        data = json.load(f)

    meanings = build_meanings()

    output = []
    missing = []

    for chant in data:
        out_chant = {
            "slug": chant["slug"],
            "title": chant["title"],
            "verses": []
        }
        for v in chant["verses"]:
            vid = v["id"]
            if vid not in meanings:
                missing.append(vid)
                meaning = None
            else:
                meaning = meanings[vid]
            out_chant["verses"].append({
                "id": vid,
                "verse_number": v["verse_number"],
                "meaning": meaning if meaning is not None else ""
            })
        output.append(out_chant)

    return output, missing


output, missing = build_output()

# Count stats
total = sum(len(c["verses"]) for c in output)
empty = sum(1 for c in output for v in c["verses"] if v["meaning"] == "")
filled = total - empty

print(f"Total verses: {total}")
print(f"Filled: {filled}")
print(f"Empty (chrome/ritual): {empty}")
print(f"Missing IDs: {len(missing)}")
if missing:
    print(f"Missing: {missing[:20]}")

with open('cache/batches/sonnet-03-out.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("Written: cache/batches/sonnet-03-out.json")
