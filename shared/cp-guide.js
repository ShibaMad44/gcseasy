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
 top:"Perfect for internal conflict. Dickinson shows pain that can't be located or cured, so the mind becomes the battlefield.",
 pairs:[["Envy","Inner conflict, with very different tones"],["Boat Stealing","Nature changing someone's state of mind"],["Honour Killing","Oppression felt from the inside"]]},
{id:"senn",w:"The Destruction of Sennacherib",who:"Lord Byron (1815)",th:["kill","power","faith","change"],pt:["effects","sympathy","cause","nature"],
 conflict:"A mighty invading army against the power of God.",
 big:"The glittering Assyrian army looks unstoppable, but God's Angel of Death destroys it overnight. Human military power is impressive but fragile.",
 form:"Rhyming couplets in a galloping anapaestic rhythm that sounds like charging horses.",
 structure:"Starts with the army's splendour and movement, then flips to stillness and death. That sudden collapse mirrors the army's destruction.",
 q:[["like the wolf on the fold","The army is a predator; the city is helpless sheep."],
  ["purple and gold","Rich, royal colours: wealth, power and pride."],
  ["the Angel of Death spread his wings","God's power arrives silently and is unstoppable."],
  ["the widows of Ashur are loud in their wail","War's suffering reaches home: the victims include families."],
  ["melted like snow in the glance of the Lord","A simile of total, effortless destruction: one look from God."]],
 top:"Don't get carried away by the rhythm. Byron makes war sound exciting so that the collapse hits harder: pride before a fall.",
 pairs:[["Boat Stealing","A force beyond humans humbles them"],["Vergissmeinnicht","From military glory to a dead body"],["Songs for the People","War's music vs peace's music"]]},
{id:"wlh",w:"We Lived Happily during the War",who:"Ilya Kaminsky (2013, in Deaf Republic 2019)",th:["guilt","change"],pt:["power","cause","sympathy","kill","peace","effects","mind"],
 conflict:"Moral: ordinary people's comfort against other people's suffering.",
 big:"A confession. 'We' protested a little, but carried on living comfortably while our country bombed others. Comfort makes people morally deaf.",
 form:"Short, plain free verse. Nothing decorative, so there is nowhere to hide from the guilt.",
 structure:"The title runs into the poem. It moves from bombing to protest ('but not enough') to private comfort, ending with the country collapsing around them.",
 q:[["during the war","The title is shocking: how can anyone be happy during a war?"],
  ["but not enough","The admission at the heart of the poem: protest without action."],
  ["forgive us","A small, guilty plea that interrupts the poem."],
  ["invisible house by invisible house","America falls house by house, unseen: the repetition makes collapse feel endless and ignored."],
  ["the city of money","Repeated 'money' shows comfort and wealth mattered more than people."]],
 top:"Push past 'the speaker feels guilty'. Kaminsky suggests war is kept going not just by soldiers, but by ordinary people choosing comfort over resistance. 'We' includes the reader.",
 pairs:[["Lament","Responsibility for distant suffering"],["What Were They Like?","Looking back at destruction from a distance"],["Flag","Conscience vs loyalty to a nation"]]},
{id:"flag",w:"Flag",who:"John Agard",th:["cause","power"],pt:["kill","guilt","mind","identity"],
 conflict:"Between a simple national symbol and the violence and division it causes.",
 big:"A flag is 'just a piece of cloth', yet it makes nations kneel, armies march and people kill and die. Agard shows how dangerous patriotism can be.",
 form:"A question-and-answer dialogue, like an interrogation. The simple pattern makes it memorable.",
 structure:"Each stanza asks what the flag is, then shows something worse it can do. It builds to a warning about losing your conscience.",
 q:[["outlive the blood you bleed","The flag lasts longer than the people who die for it."],
  ["just a piece of cloth","The refrain belittles the flag while showing its enormous power."],
  ["brings a nation to its knees","People bow to it: obedience and control."],
  ["dares the coward to relent","It shames people into fighting."],
  ["blind your conscience to the end","The warning: loyalty to a flag can override morality."]],
 top:"Explore the disproportion: a tiny object controls huge emotions. The poem strips nationalism back until it looks both silly and deadly.",
 pairs:[["Songs for the People","Symbols that stir crowds, towards war or towards peace"],["Colonization in Reverse","Nation, belonging and who it includes"],["We Lived Happily during the War","Conscience vs national comfort"]]},
{id:"verg",w:"Vergissmeinnicht",who:"Keith Douglas (1943)",th:["kill","sympathy","effects","memory","change"],pt:["identity","family"],
 conflict:"War's dehumanising violence against the shared humanity of enemy soldiers.",
 big:"Returning to a battlefield, a soldier finds the decaying body of the German who shot at his tank, with a photo of his girlfriend Steffi. The enemy was a killer and a lover.",
 form:"Regular quatrains with a controlled rhyme. The calm, tight form makes the horror feel coldly observed.",
 structure:"From the battle, to the body, to the photo and its message, to the final image of love and death mixed together. The enemy slowly becomes a person.",
 q:[["Vergissmeinnicht","German for 'forget me not': the title is a plea to remember, in the enemy's language."],
  ["Steffi","Naming her makes the dead soldier a real person with someone who loves him."],
  ["mocked at by his own equipment","Grim irony: his gear outlasts him and seems to laugh at him."],
  ["the swart flies move","Graphic decay: the poem refuses to make death heroic."],
  ["the lover and killer are mingled","One man is both; war can't erase his humanity."]],
 top:"It's all about duality. Douglas neither glorifies nor hates the enemy; he shows that the same man was killer and lover. Douglas was himself killed in 1944.",
 pairs:[["The Destruction of Sennacherib","Military display ending in death"],["Lament","Grief in the aftermath of war"],["Partition","Individual human stories inside a huge conflict"]]},
{id:"wwtl",w:"What Were They Like?",who:"Denise Levertov (1966)",th:["sympathy","effects","change","kill","memory","identity"],pt:["nature","guilt","power"],
 conflict:"War against a whole culture: the Vietnam War wipes out a people's way of life.",
 big:"Six questions about Vietnamese people are answered as if they've already vanished. War destroys not just lives but songs, ceremonies and memory.",
 form:"Numbered questions, then numbered answers, like a calm academic enquiry. The coldness makes the loss more chilling.",
 structure:"Neat, ordered questions; broken, sad answers. The answers keep repeating that nobody remembers.",
 q:[["What Were They Like?","The past tense already suggests they're gone."],
  ["lanterns of stone","Gentle cultural detail; the answers turn stone into hearts 'turned to stone'."],
  ["laughter is bitter to the burned mouth","Joy poisoned by trauma: an image of napalm."],
  ["It is not remembered","Repeated: the culture is erased from memory."],
  ["There is an echo yet","Only a trace remains, and then silence."]],
 top:"It's devastating because it sounds so calm. Levertov makes us feel how wrong it is to discuss a destroyed people like a museum exhibit.",
 pairs:[["Lament","War's damage to people and environment"],["We Lived Happily during the War","Distance from suffering and responsibility"],["Partition","A community torn apart"]]},
{id:"lament",w:"Lament",who:"Gillian Clarke (1991)",th:["sympathy","effects","change","nature","kill"],pt:["guilt","peace","power"],
 conflict:"War against the natural world, and the many innocent victims of the 1991 Gulf War.",
 big:"An elegy that lists victim after victim (turtles, birds, a soldier, a boy, the sea itself). War poisons whole systems, not just armies.",
 form:"A lament: a list, almost a prayer. Each stanza starts with 'For', so every victim is mourned.",
 structure:"Victims pile up stanza by stanza; the list suggests war's damage is too big to contain.",
 q:[["For the green turtle","Repeated 'For' (anaphora) dedicates each stanza to a victim."],
  ["her pulsing burden","The turtle's unborn young: war harms the future too."],
  ["the cormorant in his funeral silk","Oil-coated bird dressed for his own funeral."],
  ["the soldier with his uniform of fire","Human victims too: the soldier's uniform has become fire."],
  ["the ashes of language","The final line: war destroys words and communication, and maybe poetry itself."]],
 top:"Avoid 'it's sad about animals'. Clarke shows war breaking everything: habitats, bodies, families and the planet, and asks who is responsible.",
 pairs:[["What Were They Like?","Aftermath and cultural or environmental loss"],["Songs for the People","Poetry responding to suffering"],["We Lived Happily during the War","Responsibility for distant war"]]},
{id:"cir",w:"Colonization in Reverse",who:"Louise Bennett (1966)",th:["identity","change","power"],pt:["memory"],
 conflict:"Between Britain as the old colonial power and the Jamaican people it once ruled.",
 big:"With comic delight, the speaker reports that Jamaicans are moving to England in huge numbers, 'colonizin' Britain in reverse. Humour turns history upside down.",
 form:"Written in Jamaican Patois with a ballad-like rhythm and rhyme: a lively spoken performance.",
 structure:"Starts with the joyful news, builds as more and more people leave, then ends wondering how England will cope.",
 q:[["dem a pour out a Jamaica","Mass movement: Jamaicans leaving in huge numbers, like a flood."],
  ["Oonoo see de turnabout?","Direct address to the listener: power has turned around."],
  ["motherlan","Ironic: Britain was taught as the loving 'mother country'."],
  ["tun history upside dung","Sums up the reversal of power."],
  ["What a devilment a Englan!","Mock sympathy: Britain getting a taste of being colonised."]],
 top:"The comedy is strategic. Bennett uses humour and Patois to challenge the idea that Britain is the centre of the world, and to celebrate Caribbean voice.",
 pairs:[["Papa-T","Caribbean voice taking over British culture"],["Flag","National symbols and belonging"],["Thirteen","Race and belonging in Britain"]]},
{id:"thirteen",w:"Thirteen",who:"Caleb Femi (2020)",th:["power","effects","identity","sympathy","change"],pt:["family"],
 conflict:"A Black boy against the authorities and stereotypes that decide who he is.",
 big:"At thirteen, a boy is stopped by police just four minutes from home, wrongly suspected of a robbery. Society starts treating him as a threat before he has done anything; his childhood is taken away.",
 form:"Free verse in the second person ('you'), which makes it intimate and unsettling, like a warning.",
 structure:"Contrasts earlier innocence with sudden suspicion; the sense of a future already written for him.",
 q:[["thirteen","The age is a threshold between childhood and being seen as dangerous."],
  ["Don't you remember me?","The boy appeals to the officer as a child from the neighbourhood, but isn't seen."],
  ["supernovas","Brightness and potential that can be violently destroyed."],
  ["black holes","Erasure: the boy's identity disappears into others' fears."],
  ["cast lots for your organs","A biblical echo: like soldiers gambling over Jesus's clothes, others decide his fate."]],
 top:"Explore the tragic irony: he is still a child, yet society reads him as a threat. Femi's cosmic images make prejudice feel enormous.",
 pairs:[["Colonization in Reverse","Race and identity in Britain"],["Flag","Power and obedience"],["Honour Killing","Identity forced on someone by others"]]},
{id:"papat",w:"Papa-T",who:"Fred D'Aguiar",th:["memory","identity","family"],pt:["power","cause","kill","change"],
 conflict:"Between the British imperial poem a grandfather recites and the Caribbean child who inherits it.",
 big:"The poet remembers his grandfather in Guyana reciting Tennyson's The Charge of the Light Brigade, which the child reimagines as an ambush in a colony. He honours that voice but turns the poem's message of obedience into creative disobedience.",
 form:"Free verse: it breaks away from Tennyson's tight, marching rhythm.",
 structure:"From battle sounds, to the grandfather's commanding performance, to the poet's own writing.",
 q:[["Papa-T","The nickname blends grandfather and Tennyson: family and literature."],
  ["sweet seasalter","Affectionate, sensory, and linked to the ocean and migration."],
  ["Musket-clap and popping cannons","Battle as sound: the child hears and imagines the war through the recital."],
  ["to hear, to disobey","Reverses Tennyson's famous obedience: rebellion through listening and writing."],
  ["a blank page","Writing begins from memory and an inherited voice."]],
 top:"Argue that the poem both honours and resists Tennyson. D'Aguiar inherits the British canon, then gives it a Caribbean accent and questions its imperial values.",
 pairs:[["Colonization in Reverse","Taking control of British culture"],["Boat Stealing","Childhood shaping the adult"],["The Destruction of Sennacherib","Older poetry making war dramatic"]]},
{id:"honour",w:"Honour Killing",who:"Imtiaz Dharker",th:["identity","power","mind","faith","change"],pt:["cause","effects"],
 conflict:"A woman against the identities forced on her by country, religion, tradition and men.",
 big:"The speaker takes off layer after layer, like coats, that have controlled her. The shocking title is reversed: she 'kills' the false selves, not herself, and is free.",
 form:"Free verse in the first person: she refuses to be restricted, even by form.",
 structure:"A sequence of stripping away (coats, veils, rings, voices) towards a new, self-made identity at the end.",
 q:[["Honour Killing","A violent phrase about violence against women, turned into self-liberation."],
  ["this black coat of a country","Nationality as a heavy garment she didn't choose."],
  ["I'm taking off","Repeated: she actively frees herself, layer by layer."],
  ["I'm taking off this skin","Even her body's imposed identity is shed: a total remaking."],
  ["my new geography","The ending: she maps out her own new identity and place."]],
 top:"Brilliant for identity and power. Dharker takes a phrase linked to patriarchal violence and makes it a metaphor for rejecting other people's expectations.",
 pairs:[["There's a certain Slant of light","Oppression felt within"],["Thirteen","Identity imposed by society"],["Colonization in Reverse","Reclaiming voice and power"]]},
{id:"partition",w:"Partition",who:"Sujata Bhatt",th:["guilt","sympathy","effects","memory","power","change","family"],pt:["cause","identity","mind","nature"],
 conflict:"The 1947 Partition of India, and a woman's guilt about not helping its victims.",
 big:"In 1947 the poet's mother, then nineteen, heard refugees crying at Ahmedabad railway station. Her aunt took them food and water; she was too afraid and stayed in the garden. Fifty years later she still feels guilty, and asks how a man who knew nothing of the country could divide it.",
 form:"Free verse that starts in the third person ('she') and then reveals the speaker is her daughter, as if the story is handed down.",
 structure:"The past (the garden, the cries, the aunt), then the present (the mother, now seventy, telling the story at midnight), ending with her angry question about who drew the border.",
 q:[["She was nineteen-years-old then","Her youth explains her fear, and makes the memory more painful."],
  ["the cries of the people","Suffering is heard, not seen: she is close but doesn't act."],
  ["a new sound added to the city","Partition changes the whole city's atmosphere."],
  ["But she felt afraid","The short, plain line admits why she stayed away: the root of her guilt."],
  ["Even the birds sounded different","Nature itself seems changed by the conflict."]],
 top:"Show how Bhatt makes a huge historical event personal: we see Partition through one frightened girl's ears and her lifelong guilt. The ending turns anger on the politicians who drew the border.",
 pairs:[["We Lived Happily during the War","Guilt about not doing enough"],["What Were They Like?","A community damaged by political conflict"],["Papa-T","Memories handed down through a family"]]}
];
const ROLE={envy:"internal conflict and the self",songs:"wanting conflict to end, and sympathy",boat:"nature, powerlessness, guilt and change",slant:"internal conflict, powerlessness and faith",senn:"killing, God's power and change",wlh:"guilt and how war changes a country",flag:"questioning what people fight for, and power",verg:"killing, sympathy and memory",wwtl:"victims, effects, killing and memory",lament:"victims, effects and war against nature",cir:"identity, power and change",thirteen:"powerlessness, identity and sympathy",papat:"family, memory and identity",honour:"identity, power and the mind",partition:"guilt, sympathy, effects, family and memory"};
window.CPG={TH,P};
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
 <h4>5 quotes to learn</h4><ol class="cpg-q">${p.q.map(([q,s])=>`<li><blockquote>‘${qh(q,on)}’</blockquote><p>${esc(s)}</p></li>`).join("")}</ol>
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
 return {strong,part,none,dbl,askedB,base:sc(ids,2,.5,.5)}}
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
const stats=(s,rob)=>`${rob!=null?`<span class="cp3-st"><b>${rob}%</b> of checks in the top 10</span>`:""}<span class="cp3-st"><b>${s.askedB}</b> of ${NA} past question types with a backup</span><span class="cp3-st"><b>${s.strong}${s.part?` + ${s.part} partly`:""}</b> of ${NT} themes</span>`;
function swapTip(){if(pick.length!==3)return "";const r=rankOf(pick);const cur=ALL[r-1];let bestT=null;
 pick.forEach(out=>P.forEach(p=>{if(pick.includes(p.id))return;const ids=pick.map(x=>x===out?p.id:x),k=rankOf(ids);if(k<r&&(!bestT||k<bestT.k))bestT={out,inn:p.id,k}}));
 const head=`<p class="cp3-rk">Your trio ranks <b>#${r}</b> of ${ALL.length} possible trios.</p>`;
 if(!bestT)return head+`<p class="cp3-ok">No single swap would improve it. Great choice.</p>`;
 if(r<=10)return head+`<p class="cp3-ok">That's in the top 10: a strong choice. If you want the very best, swap <b>${nm(bestT.out)}</b> for <b>${nm(bestT.inn)}</b> (#${bestT.k}). <button type="button" class="linkbtn" id="cp3swap" data-o="${bestT.out}" data-i="${bestT.inn}">Make the swap</button></p>`;
 return head+`<p class="cp3-tip"><b>Better swap:</b> replace <b>${nm(bestT.out)}</b> with <b>${nm(bestT.inn)}</b> to move up to #${bestT.k}. <button type="button" class="linkbtn" id="cp3swap" data-o="${bestT.out}" data-i="${bestT.inn}">Make the swap</button></p>`}
let around=st.around&&byId[st.around]?st.around:"";
function trioCard(t,i,lab){return `<li><button type="button" class="cp3-trio${same(t.ids,pick)?" on":""}" data-ids="${t.ids.join(",")}"><span class="cp3-rank">${lab||(i===0?"Top pick":"#"+(i+1))}</span><b>${t.ids.map(nm).join(" · ")}</b><small>${t.ids.map(id=>`${nm(id)}: ${ROLE[id]}`).join(". ")}.</small><span class="cp3-sts">${stats(t.s,t.rob)}</span></button></li>`}
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
 ${pick.length?`<div class="cp3-sum">${pick.length===3?`<div class="cp3-sts">${stats(s,ALL[rankOf(pick)-1].rob)}</div>${s.none.length?`<p class="cp3-miss">Not covered: ${s.none.map(t=>TH[t]).join(", ")}.</p>`:""}${swapTip()}`:`<span>Pick ${3-pick.length} more.</span>`}</div>
 <h3>Which poem to use for each theme</h3>
 <div class="tbl"><table class="cp3-tab"><tr><th>If part (b) asks about…</th><th>Use</th></tr>${TK.map(t=>{const r=pick.map(id=>[id,fit(id,t)]).filter(x=>x[1]).sort((a,b)=>b[1]-a[1]);const cls=r.length>=2?"g2":r.length?"g1":"g0";
   return `<tr class="${cls}"><td>${TH[t]}${ASKED.has(t)?` <small class="cp3-asked">asked before</small>`:""}</td><td>${r.length?r.map(([id,f])=>`<span class="cp3-use">${esc(nm(id))}${f<1?" <small>(partly)</small>":""}</span>`).join(" "):"<i>none of your poems: swap one in</i>"}</td></tr>`}).join("")}</table></div>
 <p class="cp3-key">The first poem listed fits best. "Partly" means it works but isn't the poem's main focus. <span class="g2">Green</span>: you have a backup if one poem is printed. <span class="g1">Amber</span>: only one poem fits. <span class="g0">Red</span>: nothing fits.</p>
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
