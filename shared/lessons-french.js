/* French lessons (AQA 8652 Higher): themes, grammar and one lesson per exam. p = which papers it shows on. */
(function(){const {L,B,A,T,SVG,N,BN}=window.LSN;window.LESSONS=window.LESSONS||{};
const fr=t=>`<span lang="fr">${t}</span>`;
const box=(x,y,w,h,c,n,t,sub)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" class="d-${c}"/>${N(x+w/2,y+(sub?h/2-7:h/2),n,t)}${sub?T(x+w/2,y+h/2+16,sub,"cap"):""}`;
const MARKS=(label,parts)=>{let x=20;return SVG(480,150,label,`${parts.map(([t,m,c],i)=>{const w=m*8.8,s=`<rect x="${x}" y="40" width="${w}" height="50" class="d-${c}"/>${N(x+w/2,65,i+1,t)}${T(x+w/2,110,m+" marks","cap")}`;x+=w;return s}).join("")}${T(240,24,"50 marks in total, 25% of the GCSE","sm")}`)};

const BUILD=SVG(480,250,"Building a top-mark sentence",`
${[["À mon avis,","In my opinion","c5"],["le sport est important","sport is important","c1"],["parce que","because","c4"],["ça me garde en forme.","it keeps me fit","c3"]].map(([f,e,c],i)=>`${box(10+(i%2)*240,14+Math.floor(i/2)*92,220,64,c,i+1,f,e)}`).join("")}
${A(232,46,248,46)}${A(360,80,130,104)}${A(232,138,248,138)}
${box(10,198,460,44,"c2",5,"Mais hier, je suis resté(e) à la maison.","But yesterday I stayed at home (extra tense)")}`);

const LADDER=SVG(480,280,"Opinion ladder from weakest to strongest",`
${[["je déteste","I hate","c2"],["je n'aime pas","I don't like","c2"],["j'aime bien","I quite like","c4"],["j'adore","I love","c3"],["je suis fan de","I'm a big fan of","c3"]].map(([f,e,c],i)=>box(60+i*20,226-i*52,280,42,c,i+1,f,e)).join("")}
${A(30,250,30,20)}${T(20,140,"stronger","cap","end")}`,-50);

const INF=SVG(480,250,"Useful phrases followed by an infinitive",`
${[["Il faut","you must","c2"],["On devrait","we should","c4"],["Je vais","I'm going to","c3"]].map(([f,e,c],i)=>box(10+i*157,10,146,56,c,i+1,f,e)).join("")}
${A(240,72,240,96)}
${box(60,100,360,46,"c1",4,"+ infinitive")}
${T(240,176,"Il faut recycler. (You must recycle.)","sm")}${T(240,198,"On devrait prendre le bus. (We should take the bus.)","sm")}${T(240,220,"Je vais éteindre les lumières. (I'm going to switch off the lights.)","sm")}`);

const JOUER=SVG(440,290,"Present tense endings of jouer",`
${[["je","jou","e"],["tu","jou","es"],["il / elle / on","jou","e"],["nous","jou","ons"],["vous","jou","ez"],["ils / elles","jou","ent"]].map(([p,s,e],i)=>`${T(120,38+i*44,p,"sm","end")}<rect x="134" y="${16+i*44}" width="80" height="34" rx="6" class="d-c6"/>${T(174,38+i*44,s,"bx")}<rect x="218" y="${16+i*44}" width="80" height="34" rx="6" class="d-c4"/>${N(258,33+i*44,i+1,"-"+e)}`).join("")}
${T(370,120,"stem","cap")}${T(370,138,"+ ending","cap")}`);

const PERF=SVG(480,220,"How to form the perfect tense",`
${box(10,20,130,56,"c1",1,"subject","je, il, nous…")}${T(160,54,"+","big")}${box(180,20,130,56,"c4",2,"avoir / être","in the present")}${T(330,54,"+","big")}${box(350,20,120,56,"c3",3,"past participle","joué, fini, vendu")}
${T(240,120,"J'ai mangé une pizza. (I ate a pizza.)","sm")}${T(240,144,"Elle est allée au cinéma. (She went to the cinema.)","sm")}
${T(130,180,"-er → é","big")}${T(240,180,"-ir → i","big")}${T(350,180,"-re → u","big")}${T(240,204,"With être, the participle agrees: allée, allés, allées","cap")}`);

const VAND=SVG(480,300,"DR and MRS VANDERTRAMP: verbs that take être",`
${["D devenir","R revenir","M monter","R rester","S sortir","V venir","A aller","N naître","D descendre","E entrer","R rentrer","T tomber","R retourner","A arriver","M mourir","P partir"].map((v,i)=>{const [l,w]=v.split(" "),x=10+(i%4)*117,y=10+Math.floor(i/4)*70;return `<rect x="${x}" y="${y}" width="108" height="60" rx="9" class="d-c${[1,4,3,5][Math.floor(i/4)]}"/>${T(x+16,y+24,l,"big","start")}${N(x+60,y+40,i+1,w)}`}).join("")}`);

const TENSES=SVG(500,260,"Tenses on a timeline",`
${A(20,130,480,130)}${T(60,152,"past","cap")}${T(250,152,"now","cap")}${T(440,152,"future","cap")}<path d="M250 122 L250 138" class="d-line"/>
${box(10,20,150,58,"c2",1,"j'ai joué","perfect: I played")}${box(10,176,150,58,"c2",2,"je jouais","imperfect: used to")}
${box(175,20,150,58,"c4",3,"je joue","present: I play")}${box(175,176,150,58,"c5",4,"je jouerais","conditional: would")}
${box(340,20,150,58,"c3",5,"je vais jouer","near future")}${box(340,176,150,58,"c3",6,"je jouerai","future: I will")}`);

const SI=SVG(480,230,"Si clauses",`
${box(10,16,200,56,"c1",1,"Si + present","Si j'ai le temps,")}${A(212,44,262,44)}${box(270,16,200,56,"c3",2,"future","j'irai au parc.")}
${box(10,120,200,56,"c1",3,"Si + imperfect","Si j'étais riche,")}${A(212,148,262,148)}${box(270,120,200,56,"c5",4,"conditional","je voyagerais.")}
${T(240,96,"If I have time, I'll go to the park.","cap")}${T(240,200,"If I were rich, I would travel.","cap")}`);

const tips=(xs)=>`<ul>${xs.map(x=>`<li>${x}</li>`).join("")}</ul>`;

window.LESSONS.french=[
{id:"t1",topic:"T1",title:"People and lifestyle: talking about yourself",mins:9,steps:[
 {t:"learn",h:"What this theme covers",html:`<p>Identity and relationships with others, healthy living and lifestyle, and education and work.</p>${tips([fr("Je m'entends bien avec ma mère")+" — I get on well with my mum",fr("Je me dispute avec mon frère")+" — I argue with my brother",fr("Pour rester en forme, je fais du sport")+" — To stay fit, I do sport",fr("À l'avenir, je voudrais devenir infirmier / infirmière")+" — In the future, I'd like to become a nurse"])}`},
 {t:"diagram",h:"Building a top-mark sentence",svg:BUILD,html:`<p>Opinion + statement + reason + an <b>extra tense</b>. This one pattern works in speaking and writing on every theme.</p>`},
 {t:"example",h:"Model answer",html:`<p><b>${fr("Tu t'entends bien avec ta famille ?")}</b> (Do you get on well with your family?)</p><p>${fr("Oui, je m'entends bien avec ma mère parce qu'elle est très patiente. Par contre, je me dispute souvent avec mon frère car il prend mes affaires. Le week-end dernier, nous sommes allés au cinéma ensemble et c'était génial.")}</p><p>Opinion ✓ reason ✓ connective ✓ past tense ✓</p>`},
 {t:"q",h:"Quick check",q:`What does "${fr("Je me dispute avec ma sœur")}" mean?`,o:["I get on with my sister","I argue with my sister","I look after my sister","I go out with my sister"],a:1,ex:"Se disputer = to argue."},
 {t:"q",h:"Your turn",q:"Which sentence includes a past tense?",o:[fr("Je fais du sport."),fr("Je vais manger sainement."),fr("Hier, j'ai couru cinq kilomètres."),fr("Je voudrais être médecin.")],a:2,ex:"J'ai couru = I ran (perfect tense)."},
 {t:"mistake",h:"Common mistake",html:`<p>Writing "${fr("je suis 15 ans")}". In French you <b>have</b> an age: ${fr("j'ai 15 ans")}.</p>`},
 {t:"sum",h:"Summary",bullets:["Relationships: s'entendre avec, se disputer avec","Health: pour rester en forme…","Future plans: je voudrais devenir…","Opinion + reason + extra tense","J'ai 15 ans, not je suis"]}]},

{id:"t2",topic:"T2",title:"Popular culture: free time, festivals and media",mins:8,steps:[
 {t:"learn",h:"What this theme covers",html:`<p>Free-time activities, customs, festivals and celebrations, celebrity culture, and media and technology.</p>${tips([fr("Le week-end, je regarde des séries")+" — At the weekend I watch series",fr("Le 14 juillet, c'est la fête nationale")+" — 14 July is the national holiday",fr("Je suis fan de… parce qu'il / elle…")+" — I'm a fan of… because he / she…",fr("On passe trop de temps sur les réseaux sociaux")+" — We spend too much time on social media"])}`},
 {t:"diagram",h:"An opinion ladder",svg:LADDER,html:`<p>Vary your opinions instead of repeating "j'aime". Add ${fr("ce que je préfère, c'est…")} (what I prefer is…) for a complex structure.</p>`},
 {t:"example",h:"Model answer",html:`<p><b>${fr("Qu'est-ce que tu penses des réseaux sociaux ?")}</b></p><p>${fr("À mon avis, les réseaux sociaux sont utiles pour rester en contact avec mes amis. Cependant, on y passe trop de temps. Hier soir, j'ai passé trois heures sur mon portable au lieu de faire mes devoirs ! À l'avenir, je vais essayer de les utiliser moins.")}</p>`},
 {t:"q",h:"Quick check",q:`What does "${fr("au lieu de")}" mean?`,o:["Because of","Instead of","As well as","In front of"],a:1,ex:"Au lieu de + infinitive = instead of doing."},
 {t:"q",h:"Your turn",q:"Which is the strongest opinion?",o:[fr("j'aime bien"),fr("je n'aime pas"),fr("j'adore"),fr("ça va")],a:2,ex:"J'adore = I love."},
 {t:"mistake",h:"Common mistake",html:`<p>Translating "I play football" as "${fr("je joue football")}". Sports take <b>au / à la</b>: ${fr("je joue au foot")}; instruments take <b>du / de la</b>: ${fr("je joue de la guitare")}.</p>`},
 {t:"sum",h:"Summary",bullets:["Free time, festivals, celebrities, media","Vary opinions: déteste → adore","Jouer au (sport) / jouer de (instrument)","Au lieu de + infinitive","Always add a reason"]}]},

{id:"t3",topic:"T3",title:"The world around us: places, travel and the environment",mins:8,steps:[
 {t:"learn",h:"What this theme covers",html:`<p>Where people live, travel and tourism, and environment and sustainability.</p>${tips([fr("J'habite dans un petit village à la campagne")+" — I live in a small village in the countryside",fr("L'année prochaine, je vais aller en Espagne")+" — Next year I'm going to go to Spain",fr("Il y a trop de circulation")+" — There's too much traffic",fr("Pour protéger l'environnement…")+" — To protect the environment…"])}`},
 {t:"diagram",h:"Phrases + infinitive",svg:INF,html:`<p>These phrases are always followed by the <b>infinitive</b> (the "to" form), so you don't need to change the second verb.</p>`},
 {t:"example",h:"Model answer",html:`<p><b>${fr("Qu'est-ce que tu fais pour protéger l'environnement ?")}</b></p><p>${fr("Je recycle le papier et le plastique, et je vais au collège à vélo. La semaine dernière, j'ai ramassé des déchets dans le parc. À mon avis, on devrait utiliser moins de voitures, parce que la pollution est un grand problème dans ma ville.")}</p>`},
 {t:"q",h:"Quick check",q:`What does "${fr("Il faut éteindre les lumières")}" mean?`,o:["We switched off the lights","You must switch off the lights","The lights are off","I like the lights"],a:1,ex:"Il faut + infinitive = you must / it's necessary to."},
 {t:"q",h:"Your turn",q:`How do you say "to Spain" in French?`,o:[fr("à Espagne"),fr("en Espagne"),fr("au Espagne"),fr("dans Espagne")],a:1,ex:"Feminine countries take en; masculine take au (au Portugal); cities take à (à Paris)."},
 {t:"mistake",h:"Common mistake",html:`<p>Conjugating the second verb: "${fr("il faut recycle")}". After il faut, on devrait and je vais, use the <b>infinitive</b>: ${fr("il faut recycler")}.</p>`},
 {t:"sum",h:"Summary",bullets:["Where you live, travel, environment","Il faut / on devrait / je vais + infinitive","en + feminine country; au + masculine; à + city","Give problems and solutions","Add past and future"]}]},

{id:"gr-present",topic:"GR",title:"Grammar: the present tense",mins:8,steps:[
 {t:"learn",h:"Regular verbs",html:`<p>Take off the -er, -ir or -re to find the <b>stem</b>, then add the ending.</p><div class="tbl"><table><tr><th></th><th>-er (jouer)</th><th>-ir (finir)</th><th>-re (vendre)</th></tr><tr><td>je</td><td>joue</td><td>finis</td><td>vends</td></tr><tr><td>tu</td><td>joues</td><td>finis</td><td>vends</td></tr><tr><td>il / elle</td><td>joue</td><td>finit</td><td>vend</td></tr><tr><td>nous</td><td>jouons</td><td>finissons</td><td>vendons</td></tr><tr><td>vous</td><td>jouez</td><td>finissez</td><td>vendez</td></tr><tr><td>ils / elles</td><td>jouent</td><td>finissent</td><td>vendent</td></tr></table></div>`},
 {t:"diagram",h:"Test yourself: -er endings",svg:JOUER,html:`<p>Tap "Hide labels" and say each ending out loud. The je, tu, il and ils forms all <b>sound the same</b>.</p>`},
 {t:"learn",h:"The big four irregulars",html:`<div class="tbl"><table><tr><th></th><th>avoir</th><th>être</th><th>aller</th><th>faire</th></tr><tr><td>je</td><td>ai</td><td>suis</td><td>vais</td><td>fais</td></tr><tr><td>il / elle</td><td>a</td><td>est</td><td>va</td><td>fait</td></tr><tr><td>nous</td><td>avons</td><td>sommes</td><td>allons</td><td>faisons</td></tr><tr><td>ils / elles</td><td>ont</td><td>sont</td><td>vont</td><td>font</td></tr></table></div>`},
 {t:"q",h:"Quick check",q:`Complete: "Nous ___ au cinéma." (aller)`,o:["allons","allez","vont","vais"],a:0,ex:"Nous allons."},
 {t:"q",h:"Your turn",q:`Complete: "Ils ___ leurs devoirs." (finir)`,o:["finit","finissons","finissent","finis"],a:2,ex:"-ir verbs: ils finissent."},
 {t:"mistake",h:"Common mistake",html:`<p>Adding "am" or "do": "I am playing" is just ${fr("je joue")}, and "I don't play" is ${fr("je ne joue pas")}. French has one present tense.</p>`},
 {t:"sum",h:"Summary",bullets:["Stem + ending","-er: e, es, e, ons, ez, ent","Learn avoir, être, aller, faire","One present tense: je joue = I play / I am playing","Negative: ne … pas around the verb"]}]},

{id:"gr-past",topic:"GR",title:"Grammar: the perfect and imperfect tenses",mins:10,steps:[
 {t:"diagram",h:"Forming the perfect tense",svg:PERF,html:`<p>The perfect tense is for a <b>completed action</b> in the past: "I played", "I have played".</p>`},
 {t:"diagram",h:"Verbs that take être",svg:VAND,html:`<p>Most verbs use <b>avoir</b>. These 16, plus all reflexive verbs (${fr("je me suis levé(e)")}), use <b>être</b>, and the past participle agrees with the subject.</p>`},
 {t:"learn",h:"The imperfect tense",html:`<p>Take the <b>nous</b> form of the present, remove -ons, add: <b>-ais, -ais, -ait, -ions, -iez, -aient</b>. Only être is irregular: ${fr("j'étais")}.</p><p>Use it for <b>descriptions</b> (${fr("c'était génial")}), <b>repeated</b> past actions (${fr("je jouais")} = I used to play) and what <b>was happening</b>.</p>`},
 {t:"example",h:"Perfect or imperfect?",html:`<p>${fr("Quand j'étais petit, j'habitais à Lyon. Un jour, je suis tombé dans le parc.")}</p><ol class="steps"><li>${fr("j'étais, j'habitais")}: description / background → <b>imperfect</b>.</li><li>${fr("je suis tombé")}: one completed event → <b>perfect</b>.</li></ol>`},
 {t:"q",h:"Quick check",q:`Which is correct for "She went"?`,o:[fr("Elle a allé"),fr("Elle est allé"),fr("Elle est allée"),fr("Elle allait")],a:2,ex:"Aller takes être, and the participle agrees: allée."},
 {t:"q",h:"Your turn",q:`"${fr("Je regardais la télé")}" means…`,o:["I watched TV once","I was watching / used to watch TV","I will watch TV","I would watch TV"],a:1,ex:"The imperfect describes ongoing or repeated past actions."},
 {t:"mistake",h:"Common mistake",html:`<p>Forgetting the auxiliary: "${fr("je mangé")}". You always need avoir or être: ${fr("j'ai mangé")}.</p>`},
 {t:"sum",h:"Summary",bullets:["Perfect: subject + avoir/être + past participle","-er → é, -ir → i, -re → u","Être verbs: DR MRS VANDERTRAMP + reflexives; agreement","Imperfect: nous stem + ais, ais, ait, ions, iez, aient","Imperfect = description, used to, was -ing"]}]},

{id:"gr-future",topic:"GR",title:"Grammar: the future and conditional",mins:8,steps:[
 {t:"diagram",h:"Tenses on a timeline",svg:TENSES,html:`<p>Showing you can use past, present and future is one of the quickest ways to boost speaking and writing marks.</p>`},
 {t:"learn",h:"Forming the future",html:`<p><b>Near future</b>: aller + infinitive: ${fr("je vais jouer")} (I'm going to play).</p><p><b>Simple future</b>: infinitive + <b>-ai, -as, -a, -ons, -ez, -ont</b>: ${fr("je jouerai")} (I will play). Irregular stems: ${fr("ir-")} (aller), ${fr("ser-")} (être), ${fr("aur-")} (avoir), ${fr("fer-")} (faire), ${fr("pourr-")} (pouvoir), ${fr("voudr-")} (vouloir).</p>`},
 {t:"learn",h:"The conditional",html:`<p>Future stem + <b>imperfect endings</b> (-ais, -ais, -ait, -ions, -iez, -aient). It means "would".</p><p>${fr("Je voudrais")} (I would like), ${fr("ce serait")} (it would be), ${fr("j'aimerais")} (I would like), ${fr("j'irais")} (I would go).</p>`},
 {t:"q",h:"Quick check",q:`"${fr("Je ferai mes devoirs")}" means…`,o:["I did my homework","I will do my homework","I would do my homework","I'm doing my homework"],a:1,ex:"Fer- is the future stem of faire."},
 {t:"q",h:"Your turn",q:`How do you say "it would be great"?`,o:[fr("c'était génial"),fr("ce sera génial"),fr("ce serait génial"),fr("c'est génial")],a:2,ex:"Ser- + ait = serait."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up ${fr("je jouerai")} (I <b>will</b> play) and ${fr("je jouerais")} (I <b>would</b> play). They sound almost the same, so the spelling matters in writing.</p>`},
 {t:"sum",h:"Summary",bullets:["Near future: aller + infinitive","Future: infinitive + ai, as, a, ons, ez, ont","Learn the irregular stems","Conditional: future stem + imperfect endings","je voudrais, ce serait, j'aimerais"]}]},

{id:"gr-complex",topic:"GR",title:"Complex structures for top marks",mins:8,p:["2","4"],steps:[
 {t:"learn",h:"Why they matter",html:`<p>Higher speaking and writing marks reward a <b>range</b> of language. Learn a handful of structures and reuse them on every theme.</p>`},
 {t:"diagram",h:"Si clauses",svg:SI,html:`<p>Two patterns: possible (present → future) and imaginary (imperfect → conditional).</p>`},
 {t:"learn",h:"Five more to reuse",html:tips([fr("Après avoir mangé, je suis sorti(e).")+" — After eating, I went out.",fr("Avant de partir, j'ai fait mes devoirs.")+" — Before leaving, I did my homework.",fr("J'apprends le français depuis cinq ans.")+" — I've been learning French for five years. (present tense!)",fr("Je ne suis jamais allé(e) en France.")+" — I've never been to France.",fr("J'y vais souvent. J'en mange beaucoup.")+" — I go there often. I eat a lot of it."])},
 {t:"q",h:"Quick check",q:`Complete: "Si j'avais de l'argent, j'___ un vélo."`,o:["achète","achèterai","achèterais","ai acheté"],a:2,ex:"Si + imperfect → conditional: j'achèterais."},
 {t:"q",h:"Your turn",q:`"${fr("J'habite ici depuis dix ans")}" means…`,o:["I lived here ten years ago","I've been living here for ten years","I will live here for ten years","I lived here for ten years"],a:1,ex:"Depuis + present tense = have been doing for."},
 {t:"mistake",h:"Common mistake",html:`<p>Using the future after si: "${fr("si j'aurai le temps")}". After si, use the <b>present</b> (or imperfect), never the future or conditional.</p>`},
 {t:"sum",h:"Summary",bullets:["Si + present → future","Si + imperfect → conditional","Après avoir + past participle; avant de + infinitive","Depuis + present tense","Negatives (ne … jamais) and pronouns (y, en)"]}]},

{id:"ex-listen",topic:"GR",kicker:"Exam skills · Paper 1",title:"How to do the listening exam",mins:7,p:["1"],steps:[
 {t:"diagram",h:"What's in the paper",svg:MARKS("Listening paper marks",[["Comprehension",40,"c1"],["Dictation",10,"c4"]]),html:`<p>45 minutes, including reading time. Questions and answers are in English.</p>`},
 {t:"learn",h:"Before and during each recording",html:tips(["Use the reading time: underline key words in each question and <b>predict</b> the vocabulary you'll hear.","Listen for <b>negatives</b> (ne … pas, ne … jamais) and <b>time phrases</b> (hier, demain) that change the answer.","Watch for <b>distractors</b>: a speaker may mention one thing, then change their mind (mais, par contre).","Each recording plays twice: get the gist first, then check details."])},
 {t:"learn",h:"Dictation: sounds to spellings",html:`<div class="tbl"><table><tr><th>You hear</th><th>Likely spellings</th></tr><tr><td>"oh"</td><td>o, au, eau</td></tr><tr><td>"ay"</td><td>é, -er, -ez, -et</td></tr><tr><td>"on"</td><td>on, om</td></tr><tr><td>"an"</td><td>an, en, am, em</td></tr><tr><td>"oo"</td><td>ou</td></tr></table></div><p>Final consonants are usually silent, so think about grammar: plural nouns need -s, ils verbs need -ent.</p>`},
 {t:"q",h:"Quick check",q:`You hear "${fr("Je ne mange jamais de viande")}". What does the speaker say?`,o:["They eat meat every day","They never eat meat","They sometimes eat meat","They love meat"],a:1,ex:"Ne … jamais = never."},
 {t:"q",h:"Your turn",q:"In the dictation you hear a word ending in an 'ay' sound after 'vous'. Which ending is most likely?",o:["-er","-ez","-é","-ais"],a:1,ex:"Vous takes -ez in the present: vous parlez."},
 {t:"mistake",h:"Common mistake",html:`<p>Writing down the first thing you hear. Speakers often correct themselves: "${fr("Je voulais aller au cinéma, mais finalement je suis resté à la maison")}". The answer is "stayed at home".</p>`},
 {t:"sum",h:"Summary",bullets:["40 marks comprehension + 10 marks dictation","Predict vocabulary in the reading time","Negatives, time phrases and distractors","Dictation: match sounds to spellings","Use grammar to spell silent endings"]}]},

{id:"ex-speak",topic:"GR",kicker:"Exam skills · Paper 2",title:"How to do the speaking exam",mins:8,p:["2"],steps:[
 {t:"diagram",h:"What's in the exam",svg:MARKS("Speaking exam marks",[["Role play",10,"c1"],["Read aloud",15,"c4"],["Photo card",25,"c3"]]),html:`<p>15 minutes of preparation, then about 10–12 minutes with your teacher.</p>`},
 {t:"learn",h:"Task by task",html:tips(["<b>Role play</b>: one clear sentence per prompt. One prompt is unexpected (!) so listen carefully; one asks you to ask a question (?).","<b>Reading aloud</b> (5 marks): pronunciation matters: silent endings, liaison (les amis), and sounds like -tion and -eu. Then answer four unprepared questions (10 marks).","<b>Photo card</b>: describe both photos (5 marks), then a conversation on the theme (20 marks)."])},
 {t:"example",h:"Describing a photo",html:`<p>${fr("Sur la photo, il y a une famille qui mange au restaurant. Ils ont l'air contents. À mon avis, c'est important de manger ensemble parce qu'on peut parler. Le week-end dernier, j'ai mangé au restaurant avec mes grands-parents.")}</p><p>Describe → opinion → reason → extra tense.</p>`},
 {t:"q",h:"Quick check",q:"In the role play, what should you do for the '!' prompt?",o:["Ask the teacher a question","Answer an unexpected question","Describe a photo","Read a text aloud"],a:1,ex:"You won't see the question in advance, so listen for question words."},
 {t:"q",h:"Your turn",q:`How do you start describing a photo?`,o:[fr("Sur la photo, il y a…"),fr("Je suis allé…"),fr("Si j'avais…"),fr("Il faut…")],a:0,ex:"Sur la photo, il y a… = In the photo there is / are…"},
 {t:"mistake",h:"Common mistake",html:`<p>Giving one-word answers in the conversation. Extend every answer: opinion, reason, a connective and another tense.</p>`},
 {t:"sum",h:"Summary",bullets:["Role play 10, reading aloud + questions 15, photo card 25","Listen for the unexpected prompt","Pronunciation counts in reading aloud","Photo: describe → opinion → reason → tense","Extend every answer"]}]},

{id:"ex-read",topic:"GR",kicker:"Exam skills · Paper 3",title:"How to do the reading exam",mins:7,p:["3"],steps:[
 {t:"diagram",h:"What's in the paper",svg:MARKS("Reading paper marks",[["Comprehension",40,"c1"],["Translation",10,"c3"]]),html:`<p>1 hour. Questions are in English, including on literary texts. The last section is a translation into English.</p>`},
 {t:"learn",h:"Reading strategies",html:tips(["<b>Skim</b> for the topic first, then <b>scan</b> for the part that answers each question.",`Use <b>cognates</b> (words like English ones: ${fr("important, la musique")}).`,`Beware <b>false friends</b>: ${fr("la librairie")} = bookshop, ${fr("la journée")} = day, ${fr("sensible")} = sensitive, ${fr("actuellement")} = currently.`,"Check every detail the question asks for: who, when, and negatives."])},
 {t:"example",h:"Translating into English",html:`<p>${fr("Hier, je suis allée au marché avec ma mère parce qu'elle voulait acheter des légumes.")}</p><p><b>Yesterday, I went to the market with my mum because she wanted to buy some vegetables.</b></p><p>Translate the meaning naturally, keep the <b>tense</b> right, and don't miss small words.</p>`},
 {t:"q",h:"Quick check",q:`What does "${fr("la librairie")}" mean?`,o:["The library","The bookshop","The bakery","The newsagent"],a:1,ex:"Library = la bibliothèque."},
 {t:"q",h:"Your turn",q:`Translate "${fr("Je n'ai rien mangé")}".`,o:["I ate everything","I didn't eat anything","I never eat","I ate a lot"],a:1,ex:"Ne … rien = nothing / not anything."},
 {t:"mistake",h:"Common mistake",html:`<p>Translating word for word: "${fr("j'ai faim")}" is "I'm hungry", not "I have hunger". Make it sound like natural English.</p>`},
 {t:"sum",h:"Summary",bullets:["40 marks comprehension + 10 marks translation","Skim, then scan","Cognates help; false friends trap","Watch negatives and tenses","Translate naturally"]}]},

{id:"ex-write",topic:"GR",kicker:"Exam skills · Paper 4",title:"How to do the writing exam",mins:8,p:["4"],steps:[
 {t:"diagram",h:"What's in the paper",svg:MARKS("Writing paper marks",[["Translation",10,"c3"],["90 words",15,"c1"],["150 words",25,"c5"]]),html:`<p>1 hour 15 minutes. Cover <b>every bullet point</b> in each task.</p>`},
 {t:"learn",h:"A plan for each task",html:tips(["Write a paragraph for each bullet.","Use <b>past, present and future</b> (or conditional) in each longer answer.","Give an <b>opinion and a reason</b> in as many sentences as you can.","Add one or two complex structures (si clauses, après avoir, depuis).","Leave 5 minutes to check: tenses, agreements, accents."])},
 {t:"example",h:"Translating into French",html:`<p><b>Last weekend I went to the cinema with my friends. The film was funny.</b></p><p>${fr("Le week-end dernier, je suis allé(e) au cinéma avec mes amis. Le film était drôle.")}</p><ol class="steps"><li>Went: aller takes être → ${fr("je suis allé(e)")}.</li><li>Was (description) → imperfect ${fr("était")}.</li></ol>`},
 {t:"q",h:"Quick check",q:"How should you organise a 150-word answer?",o:["One long paragraph","A paragraph for each bullet point","Only answer the first bullet","Write a list of words"],a:1,ex:"Covering every bullet is essential for the content marks."},
 {t:"q",h:"Your turn",q:`Translate "I would like to go to France".`,o:[fr("Je vais aller en France."),fr("Je voudrais aller en France."),fr("Je suis allé en France."),fr("J'aime aller en France.")],a:1,ex:"Je voudrais + infinitive."},
 {t:"mistake",h:"Common mistake",html:`<p>Writing far more than the word count with lots of errors. Accuracy and range matter more than length: aim for about the suggested number of words, then <b>check</b>.</p>`},
 {t:"sum",h:"Summary",bullets:["Translation 10 + 90-word 15 + 150-word 25","Cover every bullet","Three time frames","Opinions, reasons, complex structures","Check tenses, agreements and accents"]}]}
];
})();
