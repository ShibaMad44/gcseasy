/* English Language lessons (AQA 8700). */
(function(){const {L,B,A,T,SVG,N,BN}=window.LSN;window.LESSONS=window.LESSONS||{};
const box=(x,y,w,h,c,n,t,sub)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" class="d-${c}"/>${N(x+w/2,y+(sub?h/2-7:h/2),n,t)}${sub?T(x+w/2,y+h/2+16,sub,"cap"):""}`;
const PAPER=(label,rows)=>SVG(480,rows.length*48+30,label,`${rows.map(([q,m,t,task,c],i)=>`${B(10,10+i*48,48,36,"c6",q)}<rect x="66" y="${14+i*48}" width="${m*6}" height="28" rx="5" class="d-${c}"/>${N(66+m*6+8+60,28+i*48,i+1,task,"sm")}${T(66+m*6+8,48+i*48-2,m+" marks · "+t,"cap","start")}`).join("")}`);
const FLOW=(label,items)=>SVG(440,items.length*62+10,label,`${items.map(([t,c,s],i)=>box(40,10+i*62,360,46,c,i+1,t,s)).join("")}${items.slice(1).map((_,i)=>A(220,58+i*62,220,70+i*62)).join("")}`);
const RP=[[160,12],[310,88],[270,210],[50,210],[10,88]],RA=[[320,40,370,86],[390,130,360,208],[268,230,212,230],[110,208,90,130],[100,86,158,40]];
const RING=(label,items,cols,cap)=>SVG(480,262,label,`${items.map((t,i)=>`<rect x="${RP[i][0]}" y="${RP[i][1]}" width="160" height="40" rx="9" class="d-${cols[i]}"/>${N(RP[i][0]+80,RP[i][1]+20,i+1,t)}`).join("")}${RA.map(a=>A(...a)).join("")}${T(240,150,cap,"cap")}`);

const P1=PAPER("Paper 1 questions, marks and timings",[["Q1",4,"5 min","List four things","c1"],["Q2",8,"10 min","Language","c1"],["Q3",8,"10 min","Structure","c1"],["Q4",20,"25 min","Evaluate","c4"],["Q5",40,"45 min","Creative writing","c3"]]);
const P2=PAPER("Paper 2 questions, marks and timings",[["Q1",4,"5 min","True statements","c1"],["Q2",8,"10 min","Summary","c1"],["Q3",12,"15 min","Language","c1"],["Q4",16,"20 min","Compare views","c4"],["Q5",40,"45 min","Viewpoint writing","c3"]]);
const ZOOM=FLOW("How to analyse a quotation",[["Name the method","c5","e.g. a simile"],["Embed a short quote","c1","\"like a wounded animal\""],["Zoom in on one word","c4","\"wounded\" suggests pain and fear"],["Effect on the reader","c3","we feel sympathy"],["Why the writer chose it","c2","to show the storm's violence"]]);
const STRUCT=SVG(480,230,"How the focus shifts through a text",`
${box(10,14,220,64,"c1",1,"Opening: wide shot","sets the scene")}${box(250,14,220,64,"c5",2,"Zoom in","a person or detail")}
${box(10,128,220,64,"c4",3,"Shift","new time, place or mood")}${box(250,128,220,64,"c2",4,"Ending","climax, or back to the start")}
${A(232,46,248,46)}${A(360,80,130,126)}${A(232,160,248,160)}${T(240,220,"Ask: what is the focus, and why does it change here?","cap")}`);
const STORY=RING("A five-part plan for narrative writing",["Drop into the action","Zoom in on detail","Shift in time or mood","Turning point","Circle back"],["c1","c5","c4","c2","c3"],"Use all five senses; vary sentences");
const VIEW=FLOW("A plan for viewpoint writing",[["Hook","c5","anecdote, question or shocking fact"],["Point 1","c1","your strongest argument"],["Point 2","c1","with a statistic or expert"],["Counter-argument","c4","then knock it down"],["Conclusion","c3","call to action"]]);

window.LESSONS["english-language"]=[
{id:"p1",topic:"P1",p:["1"],title:"Paper 1: how to do each question",mins:9,steps:[
 {t:"learn",h:"Explorations in creative reading and writing",html:`<p>1 hour 45 minutes. Section A: four questions on one fiction extract (40 marks). Section B: one piece of descriptive or narrative writing (40 marks).</p><p>Spend about <b>1 minute per mark</b>, and read the extract carefully first.</p>`},
 {t:"diagram",h:"Marks and timings",svg:P1,html:`<p>Q4 and Q5 are worth 60 of the 80 marks. Don't spend too long on Q1–Q3.</p>`},
 {t:"learn",h:"What each question wants",html:`<ol class="steps"><li><b>Q1</b>: four simple, true facts from the lines given.</li><li><b>Q2</b>: how the writer uses <b>language</b>: words, phrases, techniques, sentence forms.</li><li><b>Q3</b>: how the writer <b>structures</b> the whole extract: what the focus is on and how it shifts.</li><li><b>Q4</b>: a statement to <b>evaluate</b>: how far you agree, backed up with evidence and methods.</li></ol>`},
 {t:"example",h:"Model Q4 opening",html:`<p><b>"The writer makes the storm feel terrifying." How far do you agree?</b></p><p>I strongly agree. From the start, the writer personifies the wind as it "screamed through the gaps", making the storm seem alive and furious. The verb "screamed" suggests pain and panic, so the reader shares the family's fear.</p><p>Judgement → evidence → method → effect.</p>`},
 {t:"q",h:"Quick check",q:"Which question asks about the structure of the extract?",o:["Q1","Q2","Q3","Q4"],a:2,ex:"Q3: focus, shifts, openings and endings."},
 {t:"q",h:"Your turn",q:"About how long should you spend on Paper 1 Q4?",o:["5 minutes","10 minutes","20–25 minutes","45 minutes"],a:2,ex:"20 marks, so about 20–25 minutes."},
 {t:"mistake",h:"Common mistake",html:`<p>Writing about language in Q3. Q3 is about <b>structure</b>: where the writer starts, what we focus on, and how and why it changes. Save word-level analysis for Q2 and Q4.</p>`},
 {t:"sum",h:"Summary",bullets:["Section A: 4 reading questions; Section B: creative writing","About 1 minute per mark","Q2 language; Q3 structure","Q4: judgement + evidence + methods","Q5: 45 minutes for 40 marks"]}]},

{id:"p2",topic:"P2",p:["2"],title:"Paper 2: how to do each question",mins:9,steps:[
 {t:"learn",h:"Writers' viewpoints and perspectives",html:`<p>1 hour 45 minutes. Two non-fiction sources, usually one modern and one from the 19th century. Section A: four reading questions. Section B: viewpoint writing.</p>`},
 {t:"diagram",h:"Marks and timings",svg:P2,html:`<p>Q4 compares the writers' <b>perspectives</b> (their attitudes) across both sources.</p>`},
 {t:"learn",h:"What each question wants",html:`<ol class="steps"><li><b>Q1</b>: shade four true statements.</li><li><b>Q2</b>: summarise the <b>differences</b> between the sources, with <b>inference</b>: what each detail suggests.</li><li><b>Q3</b>: language in <b>one</b> source, linked to the writer's viewpoint.</li><li><b>Q4</b>: compare the writers' <b>ideas and perspectives</b>, and the <b>methods</b> they use to show them.</li></ol>`},
 {t:"example",h:"Model Q2 sentence",html:`<p>In Source A the school is "bright and noisy", suggesting a lively, welcoming place, <b>whereas</b> in Source B pupils sit "in silent rows", implying strict discipline and fear.</p><p>Point A + quote + inference → connective → point B + quote + inference.</p>`},
 {t:"q",h:"Quick check",q:"In Paper 2 Q2, what must you add to each piece of evidence?",o:["A language technique","An inference about what it suggests","A word count","Your own opinion"],a:1,ex:"Q2 is a summary with inference, not language analysis."},
 {t:"q",h:"Your turn",q:"Paper 2 Q4 asks you to compare…",o:["The sources' layout","The writers' perspectives and methods","Two pieces of fiction","Your own experiences"],a:1,ex:"Ideas and attitudes, and how the writers convey them."},
 {t:"mistake",h:"Common mistake",html:`<p>Analysing language in Q2. Q2 only needs <b>what</b> each source shows and what it <b>suggests</b>. Methods belong in Q3 and Q4.</p>`},
 {t:"sum",h:"Summary",bullets:["Two non-fiction sources, different eras","Q2: differences + inference","Q3: language in one source","Q4: compare perspectives and methods","Q5: viewpoint writing, 40 marks"]}]},

{id:"lang",topic:"LT",title:"Analysing language: zoom in",mins:8,steps:[
 {t:"learn",h:"Techniques worth knowing",html:`<div class="tbl"><table><tr><th>Technique</th><th>Example</th></tr><tr><td>Simile / metaphor</td><td>"like a wounded animal" / "a sea of faces"</td></tr><tr><td>Personification</td><td>"the wind screamed"</td></tr><tr><td>Verbs and adjectives</td><td>"crept", "jagged"</td></tr><tr><td>Sensory language</td><td>sounds, smells, textures</td></tr><tr><td>Sentence forms</td><td>a short sentence for impact; a list; a question</td></tr></table></div>`},
 {t:"diagram",h:"The zoom method",svg:ZOOM,html:`<p>Spotting a technique earns little. Marks come from explaining the <b>effect</b> of specific words.</p>`},
 {t:"example",h:"Model paragraph",html:`<p>The writer uses a simile to describe the house, which groans "like a wounded animal". The adjective "wounded" suggests the house is in pain and close to collapse, making the reader feel uneasy. This creates a threatening atmosphere and hints that something terrible will happen.</p>`},
 {t:"q",h:"Quick check",q:`"The fog crept through the streets." What technique is this?`,o:["Simile","Personification","Alliteration","Rhetorical question"],a:1,ex:"Fog can't creep: it's given a human or animal action."},
 {t:"q",h:"Your turn",q:"Which sentence goes deepest into the effect?",o:["The writer uses a metaphor.","This is effective.","'Shattered' suggests her hopes are broken beyond repair.","The writer uses lots of words."],a:2,ex:"It zooms in on one word and explains what it suggests."},
 {t:"mistake",h:"Common mistake",html:`<p>Writing "this makes the reader want to read on" or "this paints a picture". Be <b>specific</b>: what exactly does the reader feel or imagine, and why?</p>`},
 {t:"sum",h:"Summary",bullets:["Method → quote → zoom → effect → why","Short, embedded quotes","Zoom in on one word","Avoid vague effects","Link to the writer's purpose"]}]},

{id:"struct",topic:"ST",title:"Analysing structure: follow the focus",mins:8,steps:[
 {t:"learn",h:"What structure means",html:`<p>Structure is how the writer <b>orders</b> the text and moves our attention. Think like a film director: where does the camera start, what does it zoom in on, and when does it cut away?</p><ul><li><b>Openings</b>: setting, character, or straight into action.</li><li><b>Shifts</b>: in time, place, viewpoint or mood.</li><li><b>Repetition</b> or echoes, a <b>one-line paragraph</b>, a <b>flashback</b>.</li><li><b>Endings</b>: a climax, a cliffhanger, or a return to the start (cyclical).</li></ul>`},
 {t:"diagram",h:"Following the focus",svg:STRUCT,html:`<p>In Q3, write about the <b>whole</b> extract: beginning, middle and end.</p>`},
 {t:"example",h:"Model paragraph",html:`<p>At the start, the writer focuses on the wide, empty beach, establishing a calm, lonely setting. The focus then narrows to a single set of footprints leading to the sea. This shift creates mystery, because the reader wonders who made them, and prepares us for the discovery at the end.</p>`},
 {t:"q",h:"Quick check",q:"Which is a structural feature?",o:["A simile","A shift in time to a flashback","An adjective","A metaphor"],a:1,ex:"Shifts in time, place or focus are structural."},
 {t:"q",h:"Your turn",q:"What is a cyclical structure?",o:["The ending returns to the opening","The text is very short","Every paragraph starts with 'and'","The story has no ending"],a:0,ex:"It echoes the start, often to show change or no change."},
 {t:"mistake",h:"Common mistake",html:`<p>Just describing what happens: "First it describes the beach, then the footprints." Always explain <b>why</b> the writer moves the focus there and what effect it has.</p>`},
 {t:"sum",h:"Summary",bullets:["Structure = order and focus","Openings, shifts, endings","Think like a film camera","Cover the whole extract","Explain why each shift matters"]}]},

{id:"story",topic:"WR",p:["1"],title:"Writing Q5: descriptive and narrative",mins:9,steps:[
 {t:"learn",h:"How Q5 is marked",html:`<p>40 marks: <b>24</b> for content and organisation, <b>16</b> for technical accuracy (spelling, punctuation, grammar). Spend about 5 minutes planning, 35 writing and 5 checking.</p>`},
 {t:"diagram",h:"A five-part plan",svg:STORY,html:`<p>A <b>short, controlled</b> story beats a long, rushed one. You don't need lots of events.</p>`},
 {t:"learn",h:"Make it ambitious",html:`<ul><li>Vary sentence openings: an -ing word, an adverb, a prepositional phrase.</li><li>Use a <b>one-word sentence</b> or a <b>one-line paragraph</b> for impact.</li><li>Use a range of punctuation: semicolons, colons, dashes, brackets.</li><li>Use precise vocabulary rather than lots of adjectives.</li></ul>`},
 {t:"example",h:"Model opening",html:`<p>Silence. The station clock had stopped at 4:17, its hands frozen like an accusation. Rain needled the windows; somewhere, a door banged once, then gave up.</p><p>One-word sentence ✓ simile ✓ semicolon ✓ personification ✓</p>`},
 {t:"q",h:"Quick check",q:"How many of the 40 marks are for spelling, punctuation and grammar?",o:["4","16","24","40"],a:1,ex:"24 for content and organisation, 16 for technical accuracy."},
 {t:"q",h:"Your turn",q:"Which is the best way to end a narrative?",o:["'It was all a dream.'","Circling back to an image from the opening","Stopping mid-sentence","A list of everything that happened"],a:1,ex:"A cyclical ending feels deliberate and crafted."},
 {t:"mistake",h:"Common mistake",html:`<p>Cramming in too much plot: car chases, explosions, a twist. Examiners reward <b>crafted description</b> and control, not lots of action.</p>`},
 {t:"sum",h:"Summary",bullets:["24 content + 16 accuracy","Plan five parts","Vary sentences and punctuation","Short and controlled beats long and rushed","Leave 5 minutes to check"]}]},

{id:"viewpoint",topic:"WR",p:["2"],title:"Writing Q5: viewpoint writing",mins:9,steps:[
 {t:"learn",h:"What Paper 2 Q5 asks",html:`<p>You'll be given a statement and asked to write a <b>letter</b>, <b>article</b>, <b>speech</b>, <b>leaflet</b> or <b>blog</b> giving your view. Match the form, audience and purpose (FAP).</p>`},
 {t:"diagram",h:"A five-paragraph plan",svg:VIEW,html:`<p>Deal with the other side, then show why you're still right: that's what makes an argument convincing.</p>`},
 {t:"learn",h:"Persuasive methods",html:`<ul><li><b>Direct address</b>: "you".</li><li><b>Rhetorical questions</b> and the <b>rule of three</b>.</li><li><b>Facts and statistics</b> (you can make them up, but keep them believable).</li><li><b>Anecdote</b>: a short personal story.</li><li><b>Emotive language</b> and a confident, controlled tone.</li></ul>`},
 {t:"example",h:"Model opening",html:`<p><b>"Homework should be banned." Write an article for a newspaper.</b></p><p>Picture this: it's 10 pm, you've had six hours of lessons and two hours of sport, and there's still an essay waiting on the kitchen table. Is this really the best way to help young people learn?</p>`},
 {t:"q",h:"Quick check",q:"What does FAP stand for?",o:["Facts, arguments, points","Form, audience, purpose","First, after, previously","Fiction, article, poem"],a:1,ex:"Check the form, audience and purpose before you plan."},
 {t:"q",h:"Your turn",q:"Why include a counter-argument?",o:["To fill space","To show you've considered the other side, then rebut it","To change your mind","Because it's required by law"],a:1,ex:"Rebutting it makes your argument stronger."},
 {t:"mistake",h:"Common mistake",html:`<p>Ignoring the form. A speech needs to address an audience ("Ladies and gentlemen…"); a letter needs a greeting and sign-off; an article needs a headline.</p>`},
 {t:"sum",h:"Summary",bullets:["Form, audience, purpose","Hook → points → counter → conclusion","Direct address, questions, rule of three, statistics","Match the conventions of the form","24 content + 16 accuracy"]}]}
];
})();
