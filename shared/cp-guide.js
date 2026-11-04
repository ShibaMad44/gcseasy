/* Conflict poetry (OCR "Towards a World Unknown", exams from 2024): poem-by-poem guide and the "pick your 3" planner.
   Written for GCSEasy, using a class revision guide as a reference. Quotes are kept short: check each against your anthology. */
(function(){
const TH={effects:"Effects of conflict on a person",change:"How conflict changes things",sympathy:"Sympathy for victims",kill:"Killing & violence",power:"Power & powerlessness",cause:"Questioning what people fight for",peace:"Wanting conflict to end",mind:"Internal conflict",nature:"Conflict with nature",guilt:"Guilt & responsibility",memory:"Memory & the past",identity:"Identity & belonging",family:"Family & relationships",faith:"Religion & faith"};
/* Real OCR part (b) questions (Conflict cluster). Themes that have been asked count double in the ranking. */
const PASTQ=[["2017","presents how conflict leads to killing","kill"],["2018","questions the things people fight for","cause"],["2019","presents the effects of conflict on a person","effects"],["Nov 2020","presents a conflict that leaves the speaker feeling powerless","power"],["2023","presents sympathy for those involved in conflict","sympathy"],["2024","presents the wish for an end to conflict","peace"],["2025","presents how conflict changes things","change"],["Sample paper","presents lives transformed by conflict","change"]];
const ASKED=new Set(PASTQ.map(x=>x[2]));
const P=[
{id:"envy",w:"Envy",who:"Mary Lamb (1809)",th:["mind","identity"],pt:["nature"],
 conflict:"Internal: a person at war with themselves because they want to be someone else.",
 big:"Envy is a conflict you cause yourself. Lamb uses a rose-tree that wishes it could grow other flowers to show that envious people can't see the value they already have.",
 form:"Short, regular rhyming lines, like a children's fable. The simple sound suits a clear moral lesson.",
 structure:"Example first (the rose-tree), then the lesson spelled out (envious people are like it), then hope: everyone can grow their own 'flower'.",
 q:[["This rose-tree is not made to bear","Opens with a plain fact: everything has its own nature. Wanting to be different is pointless."],
  ["The violet blue, nor lily fair","Other flowers aren't better, just different. Envy mistakes difference for being worse."],
  ["a blind and senseless tree","Envy makes you blind: you can't see your own 'red rose'. It's irrational."],
  ["All envious persons are","The turn from metaphor to people: the lesson is aimed straight at the reader."],
  ["Some pretty flower in their own mind","Hopeful ending: with 'care and culture' (effort) you can grow your own talent."]],
 notes:["The rose-tree is an extended metaphor (an allegory) for a person.", "Simple rhyme and regular rhythm make it a moral lesson, like a fable for children.", "'Care and culture' (effort) is the cure: improve what you have rather than envying others.", "The conflict is entirely inside the mind."],
 top:"Go beyond 'don't be jealous'. Argue that the conflict comes from a failure to see clearly, and that Lamb's answer is self-improvement, not wishing.",
 pairs:[["Boat Stealing","Nature used to teach a lesson about the self"],["There's a certain Slant of light","A conflict that happens entirely inside the mind"],["Honour Killing","Being true to your own nature instead of others' expectations"]]},
{id:"songs",w:"Songs for the People",who:"Frances E. W. Harper (1896)",th:["peace","sympathy"],pt:["cause","effects","change","power","faith"],
 conflict:"Between a suffering, divided world and the hope that art can heal and unite it.",
 big:"Harper wants poetry to replace violence as the thing that moves people. She borrows the energy of war ('battle-cry') and points it at peace and justice.",
 form:"Regular, song-like quatrains with rhyme and a strong beat, so it sounds like the hymns and songs it describes.",
 structure:"Moves from what the songs are for (everyone, young and old) to what they will do (comfort, wake people up) to a final vision of world peace.",
 q:[["Songs to stir like a battle-cry","War imagery reversed: the songs rouse people, but for peace."],
  ["Not for the clashing of sabres","Rejects violence directly: no swords, no 'carnage'."],
  ["more abundant life","A biblical phrase: the songs give life rather than take it."],
  ["songs for the weary","Admits the world's suffering and exhaustion; the hope isn't naive."],
  ["Till war and crime shall cease","The goal: a world without conflict, reached through changed hearts."]],
 notes:["The poem repeats 'Let me make the songs for…', building a chant of purpose.", "War words ('battle-cry', 'sabres') are taken over and redirected towards peace.", "It's inclusive: songs for the old and young, the weary, the oppressed.", "Harper was an abolitionist and campaigner, so poetry is a form of activism."],
 top:"Harper doesn't reject power; she redefines it. Shared music is a stronger force than armies. Context helps: she was an abolitionist and campaigner, so poetry is activism.",
 pairs:[["Flag","Two symbols that stir crowds: one towards war, one towards peace"],["The Destruction of Sennacherib","War's thrilling rhythm vs a song for peace"],["Lament","Poetry as a response to suffering"]]},
{id:"boat",w:"Boat Stealing (from The Prelude)",who:"William Wordsworth (1850)",th:["nature","mind","guilt","power","change","effects","memory"],pt:["family","faith"],
 conflict:"A boy against nature, and against his own conscience.",
 big:"A boy's confident theft of a boat turns to terror when a mountain seems to rise and chase him. Nature teaches him guilt and awe, and the experience changes how he sees the world.",
 form:"Blank verse (unrhymed iambic pentameter): serious and thoughtful, like an adult looking back.",
 structure:"Shifts from secret pleasure, to pride, to terror (the peak 'upreared its head'), to a long-lasting trouble in his mind. The peak is the turning point.",
 q:[["an act of stealth / And troubled pleasure","An oxymoron: excitement and guilt together from the start."],
  ["like a swan","At first the boat glides gracefully: he feels in control."],
  ["a huge peak, black and huge","Repetition of 'huge' shows nature's overwhelming size and power."],
  ["Strode after me","Personification: the mountain seems to chase and judge him like a living thing."],
  ["a trouble to my dreams","The conflict moves inside his mind and lasts for days."]],
 notes:["Blank verse gives a reflective, serious tone: an adult looking back.", "The mood shifts from pleasure, to pride, to terror, to lasting trouble.", "The mountain is personified as if alive and judging him: nature as a moral teacher.", "The ending moves the conflict into his mind: 'huge and mighty forms' trouble his dreams."],
 top:"The mountain stands for more than a mountain: conscience, God, nature's power and the boy's own imagination. Wordsworth turns a childish prank into a moral and spiritual education.",
 pairs:[["Envy","Nature as a moral teacher"],["The Destruction of Sennacherib","A power beyond humans humbles them"],["Papa-T","A childhood memory shaping the adult poet"]]},
{id:"slant",w:"There's a certain Slant of light",who:"Emily Dickinson (c.1861)",th:["mind","power","effects","faith","change"],pt:["nature"],
 conflict:"Inside the mind: an unexplained, crushing despair, and doubt about God.",
 big:"A particular winter light brings a pain that leaves no visible wound but changes a person inside. Suffering is invisible, spiritual and impossible to fight.",
 form:"Four short quatrains in hymn metre, broken up by dashes. It sounds religious, but the dashes stop it feeling calm or certain.",
 structure:"From the light, to the hurt it causes, to its effect on the landscape, to a final comparison with death.",
 q:[["Winter Afternoons","Cold, dying light at the end of the day and year: decline and sadness."],
  ["Heavenly Hurt","Pain seems to come from God: a spiritual conflict."],
  ["We can find no scar","The wound is invisible; nobody can see or treat it."],
  ["internal difference","The damage is inside: where 'the Meanings, are'."],
  ["An imperial affliction","Suffering rules like an emperor: grand, powerful and oppressive."]],
 notes:["Dashes break up the lines, creating hesitation and uncertainty.", "Hymn-like quatrains clash with the despair they describe.", "The pain leaves 'no scar': suffering that can't be seen or cured.", "Nature reacts ('the Landscape listens'), mirroring the speaker's mood."],
 top:"Perfect for internal conflict. Dickinson shows pain that can't be located or cured, so the mind becomes the battlefield.",
 pairs:[["Envy","Inner conflict, with very different tones"],["Boat Stealing","Nature changing someone's state of mind"],["Honour Killing","Oppression felt from the inside"]]},
{id:"senn",w:"The Destruction of Sennacherib",who:"Lord Byron (1815)",th:["kill","power","faith","change"],pt:["effects","sympathy","cause","nature"],
 conflict:"A mighty invading army against the power of God.",
 big:"The glittering Assyrian army looks unstoppable, but God's Angel of Death destroys it overnight. Human military power is impressive but fragile.",
 form:"Rhyming couplets in a galloping anapaestic rhythm that sounds like charging horses.",
 structure:"Starts with the army's splendour and movement, then flips to stillness and death. That sudden collapse mirrors the army's destruction.",
 q:[["like the wolf on the fold", "A powerful, predatory simile: the army seems unstoppable and the city helpless."], ["gleaming in purple and gold", "Royal colours of wealth and pride: they look magnificent."], ["Like the leaves of the forest when Summer is green", "Summer suggests life and health; the next stanza turns to autumn, so the army's fate turns too."], ["the Angel of Death spread his wings on the blast", "God's power arrives silently and can't be resisted."], ["the tents were all silent, the banners alone", "Empty and vacant: the silence after God's power creates horror."], ["melted like snow in the glance of the Lord", "Total, effortless destruction: one glance from God, and the mighty are weak."]],
 notes:["Summer to autumn: the two forest similes juxtapose an army flourishing and an army dying.", "Visceral imagery of the dead horse ('nostril all wide') and rider ('distorted and pale') makes death painful and real.", "'The widows of Ashur' show the sadness that conflict leaves behind at home.", "The idols broken 'in the temple of Baal': the survivors lose faith in their own gods.", "'Unsmote by the sword': nobody touched them. The army becomes passive and weak before God."],
 top:"Don't get carried away by the rhythm. Byron makes war sound exciting so that the collapse hits harder: pride before a fall.",
 pairs:[["Boat Stealing","A force beyond humans humbles them"],["Vergissmeinnicht","From military glory to a dead body"],["Songs for the People","War's music vs peace's music"]]},
{id:"wlh",w:"We Lived Happily during the War",who:"Ilya Kaminsky (2013, in Deaf Republic 2019)",th:["guilt","change","power"],pt:["cause","sympathy","kill","peace","effects","mind"],
 conflict:"Moral: ordinary people's comfort against other people's suffering.",
 big:"A confession. 'We' protested a little, but carried on living comfortably while our country bombed others. Comfort makes people morally deaf.",
 form:"Short, plain free verse. Nothing decorative, so there is nowhere to hide from the guilt.",
 structure:"The title runs into the poem. It moves from bombing to protest ('but not enough') to private comfort, ending with the country collapsing around them.",
 q:[["we / protested / but not enough", "'Protested' alone on its line looks small and insignificant; repeating 'not enough' shows how powerless their protest was."], ["around my bed America / was falling", "A metaphor for the moral fabric of the nation collapsing, while the speaker stays in bed."], ["invisible house by invisible house", "'House', not 'home': the victims are kept distant and dehumanised. Repetition makes the collapse endless and ignored."], ["I took a chair outside and watched the sun", "Guilty apathy: he is fine, and knows it."], ["our great country of money, we (forgive us)", "Repetition with variation shows greed as the motive; the brackets are an embarrassed, guilty aside."]],
 notes:["'And' opens the poem mid-thought, as if the argument has been going on for a long time.", "'They' is vague, so the poem could apply to many conflicts.", "'In the sixth month': the specific time shows it has gone on for ages.", "The final line is hypocritical: he lived 'happily' while others suffered.", "Free verse with little structure gives a stream-of-thought, confessional style."],
 top:"Push past 'the speaker feels guilty'. Kaminsky suggests war is kept going not just by soldiers, but by ordinary people choosing comfort over resistance. 'We' includes the reader.",
 pairs:[["Lament","Responsibility for distant suffering"],["What Were They Like?","Looking back at destruction from a distance"],["Flag","Conscience vs loyalty to a nation"]]},
{id:"flag",w:"Flag",who:"John Agard",th:["cause","power"],pt:["kill","guilt","mind","identity"],
 conflict:"Between a simple national symbol and the violence and division it causes.",
 big:"A flag is 'just a piece of cloth', yet it makes nations kneel, armies march and people kill and die. Agard shows how dangerous patriotism can be.",
 form:"A question-and-answer dialogue, like an interrogation. The simple pattern makes it memorable.",
 structure:"Each stanza asks what the flag is, then shows something worse it can do. It builds to a warning about losing your conscience.",
 q:[["What's that fluttering in a breeze?", "Light, calm and innocent at first: the flag seems harmless."], ["just a piece of cloth", "The refrain stresses how ordinary and meaningless the object really is."], ["that makes the guts of men grow bold", "Violent, bloody imagery: it pushes men to be 'brave' in war."], ["dares the coward to relent", "Personification: the flag has the power to bully and humiliate people into fighting."], ["outlive the blood you bleed", "The flag outlasts the people who die for it, as if it matters more than them."], ["Then blind your conscience to the end", "Nationalism makes us inhuman: loyalty overrides morality."]],
 notes:["The question-and-answer form builds a musical, chant-like rhythm; the answers are confident declaratives.", "'Brings a nation to its knees' suggests praying or begging: the flag demands worship.", "'Rising over a tent' makes it the focal point of a battlefield.", "'My friend' sounds casual and false, mocking the friendly tone of propaganda."],
 top:"Explore the disproportion: a tiny object controls huge emotions. The poem strips nationalism back until it looks both silly and deadly.",
 pairs:[["Songs for the People","Symbols that stir crowds, towards war or towards peace"],["Colonization in Reverse","Nation, belonging and who it includes"],["We Lived Happily during the War","Conscience vs national comfort"]]},
{id:"verg",w:"Vergissmeinnicht",who:"Keith Douglas (1943)",th:["kill","sympathy","effects","memory","change"],pt:["identity","family"],
 conflict:"War's dehumanising violence against the shared humanity of enemy soldiers.",
 big:"Returning to a battlefield, a soldier finds the decaying body of the German who shot at his tank, with a photo of his girlfriend Steffi. The enemy was a killer and a lover.",
 form:"Regular quatrains with a controlled rhyme. The calm, tight form makes the horror feel coldly observed.",
 structure:"From the battle, to the body, to the photo and its message, to the final image of love and death mixed together. The enemy slowly becomes a person.",
 q:[["the nightmare ground", "A metaphor: the battlefield is a site of trauma that haunts the speaker."], ["The frowning barrel of his gun", "Personification shifts the focus from human life onto the machinery of war."], ["the dishonoured picture of his girl", "The photo has been discarded and disrespected, like the soldier."], ["mocked at by his own equipment", "Personification: his equipment is 'hard and good' while he decays, so human life seems temporary and less valuable."], ["the burst stomach like a cave", "Visceral imagery: life has become empty and hollow."], ["the lover and killer are mingled", "After war it's impossible to tell the sides apart: everyone is affected equally."]],
 notes:["It's set three weeks after the battle, which subverts expectations and creates a desolate tone.", "Sibilance ('soldier sprawling in the sun') reflects the desert setting and slows the pace.", "'Look.' An imperative that forces the reader to see.", "'Copybook gothic script' shows the time and care Steffi took, which makes his death more dehumanising.", "'She would weep' is a turning point: imagining her grief heightens the horror.", "The detached, unemotional tone and unpredictable rhyme pattern make the horror feel coldly observed."],
 top:"It's all about duality. Douglas neither glorifies nor hates the enemy; he shows that the same man was killer and lover. Douglas was himself killed in 1944.",
 pairs:[["The Destruction of Sennacherib","Military display ending in death"],["Lament","Grief in the aftermath of war"],["Partition","Individual human stories inside a huge conflict"]]},
{id:"wwtl",w:"What Were They Like?",who:"Denise Levertov (1966)",th:["sympathy","effects","change","kill","memory","identity"],pt:["nature","guilt","power"],
 conflict:"War against a whole culture: the Vietnam War wipes out a people's way of life.",
 big:"Six questions about Vietnamese people are answered as if they've already vanished. War destroys not just lives but songs, ceremonies and memory.",
 form:"Numbered questions, then numbered answers, like a calm academic enquiry. The coldness makes the loss more chilling.",
 structure:"Neat, ordered questions; broken, sad answers. The answers keep repeating that nobody remembers.",
 q:[["use lanterns of stone?", "The questions present pre-war Vietnam as idyllic and peaceful."], ["Sir, their light hearts turned to stone.", "A metaphor for the heavy toll of conflict: the answers turn the questions' images into loss."], ["Sir, laughter is bitter to the burned mouth.", "Gustatory imagery and plosives: joy is poisoned by trauma."], ["It is not remembered. Remember,", "Caesura and repetition stress the need, and the effort, to remember."], ["When bombs smashed those mirrors", "The peaceful paddies were 'mirrors': war shatters a whole way of life."], ["It is silent now.", "Eliminating the people has eliminated their culture."]],
 notes:["Six numbered questions, like an interview, then six answers: the formal structure feels cold and distant.", "The semantic field of decorative nouns (bone, ivory, jade, silver) emphasises beauty and art.", "The questioner seems to have a western-centred view of culture; the answerer corrects him.", "'After their children were killed / there were no more buds': war ends innocence and life.", "'Perhaps' and 'Who can say?' show uncertainty: so much has been lost that nobody really knows."],
 top:"It's devastating because it sounds so calm. Levertov makes us feel how wrong it is to discuss a destroyed people like a museum exhibit.",
 pairs:[["Lament","War's damage to people and environment"],["We Lived Happily during the War","Distance from suffering and responsibility"],["Partition","A community torn apart"]]},
{id:"lament",w:"Lament",who:"Gillian Clarke (1991)",th:["sympathy","effects","change","nature","kill"],pt:["guilt","peace","power"],
 conflict:"War against the natural world, and the many innocent victims of the 1991 Gulf War.",
 big:"An elegy that lists victim after victim (turtles, birds, a soldier, a boy, the sea itself). War poisons whole systems, not just armies.",
 form:"A lament: a list, almost a prayer. Each stanza starts with 'For', so every victim is mourned.",
 structure:"Victims pile up stanza by stanza; the list suggests war's damage is too big to contain.",
 q:[["For the green turtle with her pulsing burden", "Each stanza begins 'For', dedicating it to a victim. 'Pulsing burden' turns new life into suffering."], ["her eggs laid in their nest of sickness", "An oxymoron: home is no longer safe."], ["For the cormorant in his funeral silk", "Oil-coated bird dressed as if mourning for nature."], ["For Ahmed at the closed border.", "Zooms in on one person: a claustrophobic image with no escape."], ["the boy fusilier who joined for the company", "'Boy' stresses how young soldiers are, and that they join for the wrong reasons."], ["the burnt earth and the sun put out", "Hellish, apocalyptic imagery; plosives extinguish light and hope."], ["For vengeance, and the ashes of language.", "The final line: in the face of so much destruction, words become meaningless."]],
 notes:["Birth and motherhood are juxtaposed with death and sickness.", "'The veil of iridescence' and 'the shadow on the sea' show oil smothering wildlife; sibilance sounds like the sea.", "'Uniform of fire': fire has become the weapon.", "'The whale struck dumb by the missile's thunder': nature silenced by war.", "'The stink of anger' suggests a toxic aftermath that lingers.", "Seven three-line stanzas, with the pace increasing as the list of victims grows."],
 top:"Avoid 'it's sad about animals'. Clarke shows war breaking everything: habitats, bodies, families and the planet, and asks who is responsible.",
 pairs:[["What Were They Like?","Aftermath and cultural or environmental loss"],["Songs for the People","Poetry responding to suffering"],["We Lived Happily during the War","Responsibility for distant war"]]},
{id:"cir",w:"Colonization in Reverse",who:"Louise Bennett (1966)",th:["identity","change","power"],pt:["memory"],
 conflict:"Between Britain as the old colonial power and the Jamaican people it once ruled.",
 big:"With comic delight, the speaker reports that Jamaicans are moving to England in huge numbers, 'colonizin' Britain in reverse. Humour turns history upside down.",
 form:"Written in Jamaican Patois with a ballad-like rhythm and rhyme: a lively spoken performance.",
 structure:"Starts with the joyful news, builds as more and more people leave, then ends wondering how England will cope.",
 q:[["What joyful news, Miss Mattie", "A joyous, conversational opening, but satirical: Jamaicans had been invited to come and help Britain."], ["Dem a pour out a Jamaica", "A flood metaphor: mass migration as an unstoppable, natural force."], ["An settle in de motherlan", "Ironic: Britain, the 'mother country', has to share itself now."], ["An tun history upside dung!", "The reversal of power structures."], ["De seat a de Empire", "Metonym for Britain: the centre of power is now the destination."], ["What a devilment a Englan!", "Comic 'retaliation' for colonial actions: Britain gets a taste of being colonised."]],
 notes:["It's a dramatic monologue in Patois, with a conversational, celebratory tone.", "Repetition ('By de hundred, by de tousan') emphasises the huge numbers migrating.", "'Like fire': migration spreads rapidly and wildly.", "Jane on the dole satirises stereotypes about immigrants.", "'Dem face war an brave de worse': Britain survived war, but can it survive this?"],
 top:"The comedy is strategic. Bennett uses humour and Patois to challenge the idea that Britain is the centre of the world, and to celebrate Caribbean voice.",
 pairs:[["Papa-T","Caribbean voice taking over British culture"],["Flag","National symbols and belonging"],["Thirteen","Race and belonging in Britain"]]},
{id:"thirteen",w:"Thirteen",who:"Caleb Femi (2020)",th:["power","effects","identity","sympathy","change"],pt:["family"],
 conflict:"A Black boy against the authorities and stereotypes that decide who he is.",
 big:"At thirteen, a boy is stopped by police just four minutes from home, wrongly suspected of a robbery. Society starts treating him as a threat before he has done anything; his childhood is taken away.",
 form:"Free verse in the second person ('you'), which makes it intimate and unsettling, like a warning.",
 structure:"Contrasts earlier innocence with sudden suspicion; the sense of a future already written for him.",
 q:[["You will be four minutes from home", "Second person makes it immediate and everyone's problem; 'home' shows safety being taken away."], ["cornered by an officer", "A predatory verb: the boy is trapped."], ["Thirteen, you'll tell him: you're thirteen.", "Repetition highlights how young he is."], ["patted on the shoulder", "Patronising: he's treated like a pet or small child."], ["He will see you powerless", "The boy has no power, and his life is in their control."], ["you will watch the two men cast lots for your organs", "A biblical metaphor: they gamble over him like soldiers over Jesus's clothes."], ["dying stars / on the verge of becoming black holes", "The extended star metaphor ends in annihilation: his future has been taken."]],
 notes:["The title reduces him to a number: dehumanising and anonymous, he could be any teenager.", "Enjambment and little punctuation show how fast things go wrong.", "Italics mark speech and memories.", "'An horizon in the east / of his smile': a sunrise metaphor of warmth and hope, now betrayed.", "'Fear condenses on your lips': fear becomes physical.", "Free verse reflects his lack of control."],
 top:"Explore the tragic irony: he is still a child, yet society reads him as a threat. Femi's cosmic images make prejudice feel enormous.",
 pairs:[["Colonization in Reverse","Race and identity in Britain"],["Flag","Power and obedience"],["Honour Killing","Identity forced on someone by others"]]},
{id:"papat",w:"Papa-T",who:"Fred D'Aguiar",th:["memory","identity","family"],pt:["power","cause","kill","change"],
 conflict:"Between the British imperial poem a grandfather recites and the Caribbean child who inherits it.",
 big:"The poet remembers his grandfather in Guyana reciting Tennyson's The Charge of the Light Brigade, which the child reimagines as an ambush in a colony. He honours that voice but turns the poem's message of obedience into creative disobedience.",
 form:"Free verse: it breaks away from Tennyson's tight, marching rhythm.",
 structure:"From battle sounds, to the grandfather's commanding performance, to the poet's own writing.",
 q:[["When Grandad recited the Tennyson learned at sea", "'Recited' suggests it's memorised by heart: the British poem is now part of the family's oral tradition."], ["companies of redcoats tin-soldiering it", "Symbols of imperial power reduced to toys: power is deconstructed."], ["picked off one by one", "The child reimagines the battle as an ambush in a colony, with the colonised winning."], ["If yu all don't pay me mind", "The shift into Patois marks a new voice taking over Tennyson's story."], ["All eyes on our sweet seasalter", "Nostalgic and affectionate: Papa-T as a traveller."], ["Noble six hundred: to hear, to disobey.", "'Hear' stresses sound and voice; 'disobey' invites rebellion, rewriting Tennyson's 'theirs not to reason why'."]],
 notes:["Papa-T could be the grandfather or Tennyson: both are patriarchs, one of the family, one of imperial poetry.", "The sounds of battle (panicky rattle, yelp) are plosive and violent, but the soldiers seem weak and out of their depth.", "His 'consonants stretched past recall' take the poem into an imaginative world beyond the original text.", "'The perfect-lined face of a blank page' startles: writing is shocking but awakening, and 'itching' makes it addictive."],
 top:"Argue that the poem both honours and resists Tennyson. D'Aguiar inherits the British canon, then gives it a Caribbean accent and questions its imperial values.",
 pairs:[["Colonization in Reverse","Taking control of British culture"],["Boat Stealing","Childhood shaping the adult"],["The Destruction of Sennacherib","Older poetry making war dramatic"]]},
{id:"honour",w:"Honour Killing",who:"Imtiaz Dharker",th:["identity","power","mind","faith","change"],pt:["cause","effects"],
 conflict:"A woman against the identities forced on her by country, religion, tradition and men.",
 big:"The speaker takes off layer after layer, like coats, that have controlled her. The shocking title is reversed: she 'kills' the false selves, not herself, and is free.",
 form:"Free verse in the first person: she refuses to be restricted, even by form.",
 structure:"A sequence of stripping away (coats, veils, rings, voices) towards a new, self-made identity at the end.",
 q:[["At last I'm taking off this coat", "A declarative opening: she takes agency and subverts expectations. She's been longing for this."], ["this black coat of a country", "Disillusionment: her country doesn't represent who she is."], ["I believed I had no choice", "She didn't realise she had a choice: patriarchal control is an illusion built on fear."], ["this black veil of faith / that made me faithless / to myself", "Criticises religion being used to control women and suppress their identity."], ["these lacy things / that feed dictator dreams", "Even intimate clothes feed a system of power and control."], ["I'm taking off this skin", "To be free she must leave her body, because a female body will always be tied to 'honour'."], ["at my new geography", "Finding an identity outside cultural 'honour': an act of liberation."]],
 notes:["An extended metaphor of taking off clothes: each layer is an identity forced on her.", "The repeated 'I'm taking off' is anaphora that builds her confidence.", "'The mangalsutra and the rings / rattling in a tin cup of needs / that beggared me': expensive gifts that actually impoverished her.", "'Let's see what I am in here': the ending is curious and hopeful.", "Context: Dharker wrote it after the honour killing of Samia Sarwar in 1999."],
 top:"Brilliant for identity and power. Dharker takes a phrase linked to patriarchal violence and makes it a metaphor for rejecting other people's expectations.",
 pairs:[["There's a certain Slant of light","Oppression felt within"],["Thirteen","Identity imposed by society"],["Colonization in Reverse","Reclaiming voice and power"]]},
{id:"partition",w:"Partition",who:"Sujata Bhatt",th:["guilt","sympathy","effects","memory","power","change","family"],pt:["cause","identity","mind","nature"],
 conflict:"The 1947 Partition of India, and a woman's guilt about not helping its victims.",
 big:"In 1947 the poet's mother, then nineteen, heard refugees crying at Ahmedabad railway station. Her aunt took them food and water; she was too afraid and stayed in the garden. Fifty years later she still feels guilty, and asks how a man who knew nothing of the country could divide it.",
 form:"Free verse that starts in the third person ('she') and then reveals the speaker is her daughter, as if the story is handed down.",
 structure:"The past (the garden, the cries, the aunt), then the present (the mother, now seventy, telling the story at midnight), ending with her angry question about who drew the border.",
 q:[["she could hear the cries of the people", "Auditory imagery: she is close to the suffering but sheltered from it in her garden."], ["a new sound added to the city", "The suffering feels endless and changes the whole city."], ["But she felt afraid", "A short line admitting her fear: the source of her lifelong survivor's guilt."], ["Even the birds sounded different", "After a caesura: nature itself seems corrupted and altered."], ["India was always there", "She pushes back against the colonial idea that India began in 1947."], ["a man / who knew nothing / about geography", "A rhetorical question: how could one colonial official cause so much suffering?"]],
 notes:["The garden should be a peaceful, safe place, but 'the shadows cast by the neem trees / brought no consolation'.", "Repetition ('each day') shows how the trauma keeps returning.", "She contrasts herself with her aunt's courage.", "'Midnight' and India being 'fifty' echo independence at midnight in 1947: a positive and a negative anniversary.", "The scattered, indented lines at the end mimic people scattered across a randomly drawn border.", "The ending is pensive and melancholy: regret and remorse."],
 top:"Show how Bhatt makes a huge historical event personal: we see Partition through one frightened girl's ears and her lifelong guilt. The ending turns anger on the politicians who drew the border.",
 pairs:[["We Lived Happily during the War","Guilt about not doing enough"],["What Were They Like?","A community damaged by political conflict"],["Papa-T","Memories handed down through a family"]]}
];
const ROLE={envy:"internal conflict and the self",songs:"wanting conflict to end, and sympathy",boat:"nature, powerlessness, guilt and change",slant:"internal conflict, powerlessness and faith",senn:"killing, God's power and change",wlh:"guilt and how war changes a country",flag:"questioning what people fight for, and power",verg:"killing, sympathy and memory",wwtl:"victims, effects, killing and memory",lament:"victims, effects and war against nature",cir:"identity, power and change",thirteen:"powerlessness, identity and sympathy",papat:"family, memory and identity",honour:"identity, power and the mind",partition:"guilt, sympathy, effects, family and memory"};
const CT={internal:["Internal",["envy","boat","slant","honour","partition","wlh"]],external:["Between people",["thirteen","honour","cir","papat","partition","flag"]],military:["Military / war",["senn","verg","wwtl","lament","papat","flag","wlh"]],global:["Global / political",["wlh","wwtl","lament","cir","partition","flag"]]};
window.CPG={TH,P,CT};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const byId=Object.fromEntries(P.map(p=>[p.id,p]));
const SH={envy:"Envy",songs:"Songs",boat:"Boat",slant:"Slant",senn:"Senn.",wlh:"WLH",flag:"Flag",verg:"Verg.",wwtl:"WWTL",lament:"Lament",cir:"Colon.",thirteen:"Thirteen",papat:"Papa-T",honour:"Honour",partition:"Partition"};
const KEY="eng-cp3-v1";let st={};try{st=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch(e){st={}}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
let pick=(st.pick||[]).filter(id=>byId[id]).slice(0,3),hide=!!st.hide;
const STOP=new Set("a an the and but or of to in on at is it i you he she we they be as by for with that this my your his her its our their me him us them so if not no do am are was were has have had will shall all one like".split(" "));
const qh=(q,on)=>on?q.split(/(\s+)/).map(t=>{if(!t.trim())return t;const m=t.match(/^([^A-Za-z0-9]*)(.*?)([^A-Za-z0-9]*)$/);if(!m[2]||STOP.has(m[2].toLowerCase())||m[2].length<3)return esc(t);return esc(m[1])+`<span class="nm" tabindex="0" role="button" aria-label="Hidden word: tap to reveal">${esc(m[2])}</span>`+esc(m[3])}).join(""):esc(q);
const wire=box=>box.querySelectorAll(".nm").forEach(n=>{const f=()=>n.classList.add("show");n.onclick=f;n.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();f()}}});
function poemHTML(p,on){return `<div class="cpg-big"><p><b>The conflict:</b> ${esc(p.conflict)}</p><p><b>Big idea:</b> ${esc(p.big)}</p></div>
 <div class="qth">${p.th.map(t=>`<span>${TH[t]}</span>`).join("")}${p.pt.map(t=>`<span>partly: ${TH[t]}</span>`).join("")}</div>
 <p><b>Form:</b> ${esc(p.form)}</p><p><b>Structure:</b> ${esc(p.structure)}</p>
 <h4>${p.q.length} quotes to learn</h4><ol class="cpg-q">${p.q.map(([q,s])=>`<li><blockquote>‘${qh(q,on)}’</blockquote><p>${esc(s)}</p></li>`).join("")}</ol>${p.notes?`<h4>More annotation points</h4><ul class="cpg-notes">${p.notes.map(n=>`<li>${esc(n)}</li>`).join("")}</ul>`:""}
 <p class="cpg-top"><b>For grade 8–9:</b> ${esc(p.top)}</p>
 <h4>Pairs well with</h4><ul>${p.pairs.map(([w,y])=>`<li><b>${esc(w)}</b>: ${esc(y)}</li>`).join("")}</ul>`}

function drawGuide(){const el=document.getElementById("cpguide");if(!el)return;
 el.innerHTML=`<div class="row cpg-bar"><button type="button" class="chip${hide?" on":""}" id="cpghide">Hide key words in quotes</button></div>`+
  P.map(p=>`<details class="rc cpg" data-id="${p.id}"><summary>${esc(p.w)} <span class="cpg-who">${esc(p.who)}</span></summary><div class="in">${poemHTML(p,hide)}</div></details>`).join("");
 document.getElementById("cpghide").onclick=()=>{hide=!hide;st.hide=hide;save();const open=[...el.querySelectorAll("details[open]")].map(d=>d.dataset.id);drawGuide();open.forEach(id=>el.querySelector(`details[data-id="${id}"]`).open=true);drawPick()};
 wire(el)}

/* ---- scoring ----
   Each poem is a strong (1) or partial (0.5) fit for each theme. For a trio, each theme scores
   half its best poem + half its second-best poem (the backup you need if the best one is the printed part (a) poem).
   Themes OCR has actually asked count double. Then the whole ranking is re-run 48 ways (changing those weights)
   and trios are ordered by how often they make the top 10: the most robust picks first. */
const TK=Object.keys(TH),NT=TK.length;
const fitBy=(id,t,pv)=>byId[id].th.includes(t)?1:byId[id].pt.includes(t)?pv:0;
const fit=(id,t)=>fitBy(id,t,.5);
const best=(ids,t)=>Math.max(0,...ids.map(id=>fit(id,t)));
const sc=(ids,wa,pv,bk)=>TK.reduce((a,t)=>{const f=ids.map(id=>fitBy(id,t,pv)).sort((x,y)=>y-x);return a+(ASKED.has(t)?wa:1)*((1-bk)*f[0]+bk*(f[1]||0))},0);
function stat(ids){const strong=TK.filter(t=>best(ids,t)===1).length,part=TK.filter(t=>best(ids,t)===.5).length,none=TK.filter(t=>!best(ids,t));
 const two=t=>ids.filter(id=>fit(id,t)>0).length>=2,dbl=TK.filter(two).length,askedB=[...ASKED].filter(two).length;
 const cov=ids2=>TK.filter(t=>ids2.some(id=>fit(id,t)>0)).length,covN=cov(ids),worst=ids.length===3?Math.min(...ids.map(x=>cov(ids.filter(y=>y!==x)))):covN;
 return {strong,part,none,dbl,askedB,covN,worst,base:sc(ids,2,.5,.5)}}
const ALL=[];for(let a=0;a<P.length;a++)for(let b=a+1;b<P.length;b++)for(let c=b+1;c<P.length;c++)ALL.push({ids:[P[a].id,P[b].id,P[c].id],hits:0});
let RUNS=0;for(const wa of [1,1.5,2,3])for(const pv of [.25,.5,.75])for(const bk of [0,.25,.5,.75]){RUNS++;
 ALL.forEach(t=>t.v=sc(t.ids,wa,pv,bk));[...ALL].sort((x,y)=>y.v-x.v).slice(0,10).forEach(t=>t.hits++)}
ALL.forEach(t=>{t.s=stat(t.ids);t.rob=Math.round(t.hits/RUNS*100)});
ALL.sort((x,y)=>y.hits-x.hits||y.s.base-x.s.base);
const rankOf=ids=>ALL.findIndex(t=>same(t.ids,ids))+1;
const TOP=ALL.slice(0,10);
const nm=id=>byId[id].w.replace(/ \(.*\)/,"");
const same=(a,b)=>a.length===b.length&&a.every(x=>b.includes(x));
const NA=ASKED.size;
const ctypes=ids=>`<span class="cp3-ct">${Object.values(CT).map(([l,ps])=>`<span class="${ids.some(id=>ps.includes(id))?"y":"n"}">${ids.some(id=>ps.includes(id))?"✓":"✗"} ${l}</span>`).join("")}</span>`;
const stats=(s,rob)=>`<span class="cp3-st"><b>${s.covN}</b> of ${NT} themes</span><span class="cp3-st"><b>${s.worst}</b> of ${NT} if one is printed</span><span class="cp3-st"><b>${s.dbl}</b> with a backup</span>${rob?`<span class="cp3-st cp3-rob">top 10 in <b>${rob}%</b> of checks</span>`:""}`;
function fourth(){if(pick.length!==3)return "";let b=null;P.forEach(p=>{if(pick.includes(p.id))return;const v=sc([...pick,p.id],2,.5,.5);if(!b||v>b.v)b={id:p.id,v}});
 const gain=TK.filter(t=>pick.filter(id=>fit(id,t)>0).length<2&&fit(b.id,t)>0).map(t=>TH[t]);
 return `<p class="cp3-four"><b>Want a 4th poem?</b> Learning 3 to 5 poems is usually recommended. The best one to add is <b>${nm(b.id)}</b>${gain.length?`: it gives you a backup for ${gain.slice(0,4).join(", ").toLowerCase()}${gain.length>4?" and more":""}`:""}.</p>`}
function swapTip(){if(pick.length!==3)return "";const r=rankOf(pick);const cur=ALL[r-1];let bestT=null;
 pick.forEach(out=>P.forEach(p=>{if(pick.includes(p.id))return;const ids=pick.map(x=>x===out?p.id:x),k=rankOf(ids);if(k<r&&(!bestT||k<bestT.k))bestT={out,inn:p.id,k}}));
 const head=`<p class="cp3-rk">Your trio ranks <b>#${r}</b> of ${ALL.length} possible trios.</p>`;
 if(!bestT)return head+`<p class="cp3-ok">No single swap would improve it. Great choice.</p>`;
 if(r<=10)return head+`<p class="cp3-ok">That's in the top 10: a strong choice. If you want the very best, swap <b>${nm(bestT.out)}</b> for <b>${nm(bestT.inn)}</b> (#${bestT.k}). <button type="button" class="linkbtn" id="cp3swap" data-o="${bestT.out}" data-i="${bestT.inn}">Make the swap</button></p>`;
 return head+`<p class="cp3-tip"><b>Better swap:</b> replace <b>${nm(bestT.out)}</b> with <b>${nm(bestT.inn)}</b> to move up to #${bestT.k}. <button type="button" class="linkbtn" id="cp3swap" data-o="${bestT.out}" data-i="${bestT.inn}">Make the swap</button></p>`}
let around=st.around&&byId[st.around]?st.around:"";
function trioCard(t,i,lab){return `<li><button type="button" class="cp3-trio${same(t.ids,pick)?" on":""}" data-ids="${t.ids.join(",")}"><span class="cp3-rank">${lab||(i===0?"Top pick":"#"+(i+1))}</span><b>${t.ids.map(nm).join(" · ")}</b><small>${t.ids.map(id=>`${nm(id)}: ${ROLE[id]}`).join(". ")}.</small><span class="cp3-sts">${stats(t.s,t.rob)}</span>${ctypes(t.ids)}</button></li>`}
function drawPick(){const el=document.getElementById("cp3");if(!el)return;
 const s=pick.length?stat(pick):null;const showAll=!!st.more;
 const ar=around?ALL.filter(t=>t.ids.includes(around)).slice(0,3):[];
 el.innerHTML=`<p class="qzlab">The strongest trios</p><ol class="cp3-trios">${TOP.slice(0,showAll?10:5).map((t,i)=>trioCard(t,i)).join("")}</ol>
 <button type="button" class="btn sm" id="cp3more">${showAll?"Show the top 5 only":"Show the top 10"}</button>
 <p class="qzlab">Build around a poem you like</p><div class="chips cp3-chips">${P.map(p=>`<button type="button" class="chip${around===p.id?" on":""}" data-a="${p.id}">${esc(nm(p.id))}</button>`).join("")}</div>
 ${around?`<ol class="cp3-trios">${ar.map(t=>trioCard(t,0,`Best with ${nm(around)} · #${rankOf(t.ids)} overall`)).join("")}</ol>`:""}
 <details class="rc cp3-how"><summary>How the ranking works, and real past questions</summary><div class="in">
 <p>Part (b) always asks about one idea, linked to the part (a) poem. These are OCR's real part (b) questions for the Conflict cluster:</p>
 <ul>${PASTQ.map(([y,q,t])=>`<li><b>${y}:</b> "…which ${q}" <span class="cp3-st">${TH[t]}</span></li>`).join("")}</ul>
 <p>Older papers used an earlier version of the cluster, but the question types still apply.</p>
 <p>Every poem is marked as a strong or partial fit for each of ${NT} themes. For each theme a trio scores half for its best poem and half for its second-best, because <b>the printed part (a) poem is often the best fit for that theme, and you can't reuse it</b> (in 2024 the theme was wanting conflict to end, and Songs for the People was the printed poem). Themes OCR has asked count double.</p>
 <p>Then we re-run the whole ranking ${RUNS} ways, changing how much past themes count, how much a partial fit is worth and how much a backup matters. Trios are ordered by how often they make the top 10, so the top picks hold up however you score them.</p>
 <p>Close scores are close calls: pick the poems you enjoy and can remember. The fits are our judgement, not OCR's.</p></div></details>
 <p class="qzlab">Or pick your own (up to 3)</p><div class="chips cp3-chips">${P.map(p=>`<button type="button" class="chip${pick.includes(p.id)?" on":""}" data-p="${p.id}" aria-pressed="${pick.includes(p.id)}">${esc(nm(p.id))}</button>`).join("")}</div>
 ${pick.length?`<div class="cp3-sum">${pick.length===3?`<div class="cp3-sts">${stats(s,ALL[rankOf(pick)-1].rob)}</div>${ctypes(pick)}${s.none.length?`<p class="cp3-miss">Not covered: ${s.none.map(t=>TH[t]).join(", ")}.</p>`:""}${swapTip()}${fourth()}`:`<span>Pick ${3-pick.length} more.</span>`}</div>
 <h3>Your 3 poems against every theme</h3>
 <div class="tbl"><table class="cp3-tab"><tr><th>Theme</th>${pick.map(id=>`<th>${SH[id]}</th>`).join("")}</tr>${TK.map(t=>{const n=pick.filter(id=>fit(id,t)>0).length;return `<tr class="${n>=2?"g2":n?"g1":"g0"}"><td>${TH[t]}${ASKED.has(t)?" <span class=\"cp3-asked\" title=\"Asked in a past paper\">★</span>":""}</td>${pick.map(id=>{const f=fit(id,t);return `<td>${f===1?"✓":f?"<small>partly</small>":""}</td>`}).join("")}</tr>`}).join("")}</table></div>
 <p class="cp3-key">✓ fits well · <small>partly</small> works but isn't the main focus · ★ asked in a past paper.<br><span class="g2">Green</span>: two or more of your poems fit, so you're safe even if one is the printed poem. <span class="g1">Amber</span>: only one fits. <span class="g0">Red</span>: none fit, so think about swapping a poem.</p>
 <h3>Your quotes to learn</h3><div class="row"><button type="button" class="chip${hide?" on":""}" id="cp3hide">Hide key words</button></div>
 ${pick.map(id=>{const p=byId[id];return `<div class="cp3-poem"><h4>${esc(p.w)}</h4><ol class="cpg-q">${p.q.map(([q,s])=>`<li><blockquote>‘${qh(q,hide)}’</blockquote><p>${esc(s)}</p></li>`).join("")}</ol></div>`}).join("")}`:`<p class="cp3-sum">Tap a trio above, or choose poems, to see which theme each one covers.</p>`}`;
 el.querySelectorAll("[data-ids]").forEach(b=>b.onclick=()=>{pick=b.dataset.ids.split(",");st.pick=pick;save();drawPick()});
 el.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{around=around===b.dataset.a?"":b.dataset.a;st.around=around;save();drawPick()});
 document.getElementById("cp3more").onclick=()=>{st.more=!st.more;save();drawPick()};
 el.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{const id=b.dataset.p;if(pick.includes(id))pick=pick.filter(x=>x!==id);else{if(pick.length>=3)pick.shift();pick.push(id)}st.pick=pick;save();drawPick()});
 const sw=document.getElementById("cp3swap");if(sw)sw.onclick=()=>{pick=pick.map(x=>x===sw.dataset.o?sw.dataset.i:x);st.pick=pick;save();drawPick()};
 const h=document.getElementById("cp3hide");if(h)h.onclick=()=>{hide=!hide;st.hide=hide;save();drawPick();const g=document.getElementById("cpghide");if(g)g.classList.toggle("on",hide)};
 wire(el)}
drawGuide();drawPick();
})();
