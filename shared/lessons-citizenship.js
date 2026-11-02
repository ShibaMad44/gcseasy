/* Citizenship / Politics lessons (OCR J270), one per topic. */
(function(){const {L,B,A,T,SVG,N,BN}=window.LSN;window.LESSONS=window.LESSONS||{};
const box=(x,y,w,h,c,n,t,sub)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" class="d-${c}"/>${N(x+w/2,y+(sub?h/2-7:h/2),n,t)}${sub?T(x+w/2,y+h/2+16,sub,"cap"):""}`;
const RP=[[160,12],[310,88],[270,210],[50,210],[10,88]],RA=[[320,40,370,86],[390,130,360,208],[268,230,212,230],[110,208,90,130],[100,86,158,40]];
const RING=(label,items,cols,cap)=>SVG(480,262,label,`${items.map((t,i)=>`<rect x="${RP[i][0]}" y="${RP[i][1]}" width="160" height="40" rx="9" class="d-${cols[i]}"/>${N(RP[i][0]+80,RP[i][1]+20,i+1,t)}`).join("")}${RA.map(a=>A(...a)).join("")}${T(240,150,cap,"cap")}`);
const COLS=(label,h1,s1,c1,l1,h2,s2,c2,l2,foot)=>SVG(480,66+Math.max(l1.length,l2.length)*46+(foot?34:8),label,`${B(10,10,220,44,c1,h1,s1)}${B(250,10,220,44,c2,h2,s2)}${l1.map((t,i)=>box(10,66+i*46,220,38,"c0",i+1,t)).join("")}${l2.map((t,i)=>box(250,66+i*46,220,38,"c0",l1.length+i+1,t)).join("")}${foot?T(240,66+Math.max(l1.length,l2.length)*46+18,foot,"cap"):""}`);

const FPTP=SVG(460,250,"A first-past-the-post result in one constituency",`
<path d="M60 20 L60 210 L360 210" class="d-no"/>
<rect x="80" y="50" width="70" height="160" class="d-c3"/><rect x="180" y="70" width="70" height="140" class="d-c2"/><rect x="280" y="110" width="70" height="100" class="d-c1"/>
${N(115,130,1,"40%")}${N(215,140,2,"35%")}${N(315,160,3,"25%")}
${T(115,230,"Party A","sm")}${T(215,230,"Party B","sm")}${T(315,230,"Party C","sm")}
${T(410,90,"A wins the seat","sm")}${T(410,110,"with 40%,","cap")}${T(410,128,"but 60% voted","cap")}${T(410,146,"for others","cap")}`);

const TIME=SVG(530,200,"Timeline of rights",`
<path d="M10 100 L470 100" class="d-line"/>${[40,150,210,270,340,420].map(x=>`<circle cx="${x}" cy="100" r="6" class="d-c4"/>`).join("")}
${[["1215",40],["1948",150],["1950",210],["1989",270],["1998",340],["2010",420]].map(([y,x],i)=>T(x,i%2?80:124,y,"sm")).join("")}
${N(40,58,1,"Magna Carta")}${N(150,146,2,"UDHR")}${N(210,58,3,"ECHR")}${N(270,146,4,"UNCRC")}${N(340,58,5,"Human Rights Act")}${N(420,146,6,"Equality Act")}
${T(240,190,"Not to scale","cap")}`,-50);

const SEP=SVG(460,270,"The separation of powers",`
${box(140,10,180,58,"c1",1,"Legislature","Parliament: makes laws")}
${box(10,196,190,58,"c4",2,"Executive","PM and cabinet")}${box(260,196,190,58,"c5",3,"Judiciary","Judges and courts")}
${A(160,70,100,194)}${A(300,70,360,194)}${A(258,225,202,225)}${T(122,134,"holds it to account","cap","end")}${T(340,134,"laws applied by","cap","start")}${T(230,214,"checks","cap")}`);

const TIERS=SVG(460,290,"Levels of government in the UK",`
${box(80,10,300,56,"c1",1,"UK Parliament","reserved powers: defence, economy")}
${A(140,68,80,96)}${A(230,68,230,96)}${A(320,68,380,96)}
${box(10,98,140,52,"c3",2,"Holyrood","Scotland")}${box(160,98,140,52,"c3",3,"Senedd","Wales")}${box(310,98,140,52,"c3",4,"Stormont","Northern Ireland")}
${T(230,176,"devolved powers: health, education, transport","cap")}
${box(80,196,300,56,"c4",5,"Local councils","bins, libraries, social care")}${T(230,276,"county → district → parish","cap")}`);

const MEDIA=COLS("The media: a double-edged sword","Protects democracy","",  "c3",["Informs the public","Exposes wrongdoing","Scrutinises power"],"Can harm","","c2",["Fake news","Bias and ownership","Invading privacy"],"Regulators: IPSO (press) and Ofcom (TV and radio)");

const LAWS=COLS("Criminal and civil law","Criminal law","wrongs against society","c2",["e.g. theft, assault","Punishment","Magistrates', Crown"],"Civil law","disputes between people","c1",["e.g. contracts, divorce","Compensation","County court, tribunals"],"");

const COURTS=SVG(480,290,"The court system and appeals",`
${box(160,10,160,42,"c5",1,"Supreme Court")}${box(160,82,160,42,"c4",2,"Court of Appeal")}
${box(20,154,170,42,"c2",3,"Crown Court")}${box(20,226,170,42,"c2",4,"Magistrates' Court")}
${box(290,154,170,42,"c1",5,"High Court")}${box(290,226,170,42,"c1",6,"County Court")}
${A(240,80,240,54)}${A(130,152,200,126)}${A(350,152,280,126)}${A(105,224,105,198)}${A(375,224,375,198)}
${T(105,286,"criminal","cap")}${T(375,286,"civil","cap")}${T(40,30,"Appeals go up ↑","cap","start")}`);

const HUB=SVG(480,250,"The UK in international organisations",`
<path d="M240 125 L105 45 M240 125 L375 45 M240 125 L105 205 M240 125 L375 205" class="d-ln"/>
${B(180,100,120,50,"c6","The UK")}
${box(10,16,190,58,"c1",1,"UN","Security Council veto")}${box(280,16,190,58,"c2",2,"NATO","Article 5: defence")}
${box(10,176,190,58,"c3",3,"Commonwealth","56 countries")}${box(280,176,190,58,"c4",4,"Council of Europe","created the ECHR")}`);

const ACT=RING("The five stages of a citizenship action",["Choose an issue","Research","Plan","Take action","Evaluate"],["c5","c1","c4","c3","c2"],"Set success criteria early");

window.LESSONS.citizenship=[
{id:"p1-mcq",topic:"DE",kicker:"Exam skills · Paper 1",p:["1"],title:"How to do Paper 1: all multiple choice",mins:7,steps:[
 {t:"learn",h:"What's in Paper 1",html:`<p><b>Citizenship in perspective</b>: 50 minutes, 50 marks, 25% of the GCSE. <b>Every question is multiple choice</b>: no written answers. (The written 4, 8 and 12-mark answers are in Papers 2 and 3.)</p><div class="tbl"><table><tr><th>Section</th><th>Theme</th><th>Marks</th></tr><tr><td>A (about Q1–12)</td><td>Rights, responsibilities and the law</td><td>18</td></tr><tr><td>B (about Q13–25)</td><td>Politics and government</td><td>16</td></tr><tr><td>C (about Q26–37)</td><td>The UK and the wider world</td><td>16</td></tr></table></div>`},
 {t:"learn",h:"The four question formats",html:`<ol class="steps"><li><b>Single answer</b>: pick one option (1 mark).</li><li><b>Choose several</b>: "Which <b>three</b>…?" Each correct choice is 1 mark.</li><li><b>Two statements</b>: decide whether statement 1, statement 2, both or neither is true.</li><li><b>Scenario or source</b>: apply your knowledge to a short case, e.g. a made-up country or a person's situation.</li></ol>`},
 {t:"example",h:"Worked example: two statements",html:`<p><b>Statement 1:</b> All criminal cases start in a magistrates' court.<br><b>Statement 2:</b> In the Crown Court, the jury decides the sentence.</p><ol class="steps"><li>Judge each statement on its own: 1 is <b>true</b>.</li><li>2 is <b>false</b>: the jury decides guilt; the judge decides the sentence.</li><li>Answer: <b>only statement 1 is true</b>.</li></ol>`},
 {t:"q",h:"Quick check",q:"A question asks 'Which three of these…?' and you're sure of only two. What should you do?",o:["Leave it blank","Choose the two and make your best guess for the third","Choose four to be safe","Choose just one"],a:1,ex:"There's no penalty for a wrong guess, but choosing too many can lose marks."},
 {t:"q",h:"Your turn",q:"Which is the best way to spend the 50 minutes?",o:["Spend 35 minutes on Section A","Keep moving: aim to start Section C with about 15 minutes left","Do Section C first and rush A","Check nothing at the end"],a:1,ex:"Section C is often the most rushed; about 1 minute per mark keeps you on track."},
 {t:"mistake",h:"Common mistake",html:`<p>Picking the first option that looks right. Many wrong options are <b>nearly</b> right: the executive vs the legislature, a refugee vs an asylum seeker, IPSO vs Ofcom. Read <b>every</b> option, and watch for NOT and EXCEPT.</p>`},
 {t:"sum",h:"Summary",bullets:["50 minutes, 50 marks, all multiple choice","Section A law, B politics, C wider world","Formats: single, choose several, two statements, scenarios","Read every option; watch NOT and EXCEPT","Try the full Paper 1 mock in Practice"]}]},
{id:"p2-skills",topic:"DE",kicker:"Exam skills · Paper 2",p:["2"],title:"How to do Paper 2: Citizenship in action",mins:8,steps:[
 {t:"learn",h:"What's in Paper 2",html:`<p>1 hour 45 minutes, <b>100 marks</b>: half of your GCSE.</p><div class="tbl"><table><tr><th>Section</th><th>What</th><th>Marks</th></tr><tr><td>A</td><td>Short and source-based questions on rights, the law and democracy, often with a fictional country</td><td>about 30</td></tr><tr><td>B</td><td>Data and sources (graphs, tables), including an 8-mark answer</td><td>about 24</td></tr><tr><td>C</td><td>One 12-mark synoptic evaluation using the whole course</td><td>12</td></tr><tr><td>D</td><td>Citizenship action: other people's actions, then a 12-mark reflection on your own</td><td>about 34</td></tr></table></div>`},
 {t:"learn",h:"Timing",html:`<p>About <b>1 minute per mark</b>: roughly 30 minutes for A, 25 for B, 15 for C and 35 for D. Don't let Section C eat into Section D.</p>`},
 {t:"example",h:"The ARE paragraph for 8 and 12-markers",html:`<ol class="steps"><li><b>A</b>ddress a point or bullet from the question.</li><li><b>R</b>etrieve evidence: a statistic from the figure, or a law, case or organisation you know.</li><li><b>E</b>xplain what it shows, then link it back to the view.</li></ol><p>For a 12-mark evaluation, write at least one paragraph on each side and finish with a full judgement.</p>`},
 {t:"q",h:"Quick check",q:"How many marks is Paper 2 worth?",o:["50","80","100","120"],a:2,ex:"100 marks, 50% of the GCSE."},
 {t:"q",h:"Your turn",q:"Which section is about your own citizenship action?",o:["Section A","Section B","Section C","Section D"],a:3,ex:"Section D, which ends with a 12-mark reflection on your own action."},
 {t:"mistake",h:"Common mistake",html:`<p>Describing your action instead of <b>evaluating</b> it. Say what worked and what didn't, why, with evidence (numbers, responses), what you'd change, and give a judgement.</p>`},
 {t:"sum",h:"Summary",bullets:["1 hr 45, 100 marks, 50% of the GCSE","A short/source, B data + 8-mark, C 12-mark synoptic, D action","About 1 minute per mark","ARE paragraphs; quote the figures","Learn your own action in detail"]}]},
{id:"p3-skills",topic:"RR",kicker:"Exam skills · Paper 3",p:["3"],title:"How to do Paper 3: Our rights, our society, our world",mins:7,steps:[
 {t:"learn",h:"What's in Paper 3",html:`<p>1 hour, <b>50 marks</b>, 25% of the GCSE. Every question is built around <b>sources</b> (tables, graphs, short texts).</p><p>It covers only <b>rights and the law</b> and <b>the UK and the wider world</b>: identity, community cohesion, migration and the UK's international role. Democracy and government are not on this paper.</p>`},
 {t:"learn",h:"The question types",html:`<ol class="steps"><li><b>Short source questions</b> (1–4 marks): identify or explain using the source.</li><li><b>Two 8-mark answers</b>: a reasoned case for or against a view, or a short evaluation.</li><li><b>One 12-mark evaluation</b>: balanced, with a justified conclusion.</li></ol>`},
 {t:"example",h:"Using a source",html:`<p><b>"Using Table 1, identify one legal right a person gains at 18."</b></p><p>Take the answer straight from the source: "At 18 you can vote in a general election." One mark, one short sentence. Save your time for the 8 and 12-markers.</p>`},
 {t:"q",h:"Quick check",q:"Which topic is NOT tested on Paper 3?",o:["Migration","The age of criminal responsibility","How a bill becomes law","Community cohesion"],a:2,ex:"Democracy and government (including Parliament) are on Papers 1 and 2."},
 {t:"q",h:"Your turn",q:"What must a reasoned case 'supporting' a view do?",o:["Argue both sides equally","Only argue for the view, with evidence","Summarise the source","Give no conclusion"],a:1,ex:"A reasoned case is one-sided; an evaluation is balanced."},
 {t:"mistake",h:"Common mistake",html:`<p>Ignoring the sources. Most marks need evidence <b>from the source</b> plus your own knowledge: quote figures and name them ("Fig 2 shows…").</p>`},
 {t:"sum",h:"Summary",bullets:["1 hour, 50 marks, 25%","Rights and the law + the UK and the wider world","Short source questions, two 8s, one 12","Quote the sources","Reasoned case = one-sided; evaluation = balanced"]}]},
{id:"democracy",topic:"DE",title:"Democracy, elections and voting systems",mins:9,steps:[
 {t:"learn",h:"Two kinds of democracy",html:`<p><b>Direct democracy</b>: citizens vote on every issue themselves. Everyone is heard, but it's slow.</p><p><b>Representative democracy</b>: citizens elect representatives (MPs, councillors) to decide for them. Practical, and they can be voted out, but voters have little power between elections.</p><p>The UK is representative, with occasional <b>referendums</b>: 2011 voting system (68% kept FPTP), 2014 Scottish independence (55% No), 2016 EU (52% Leave).</p>`},
 {t:"learn",h:"UK elections",html:`<ul><li>General elections at least every <b>5 years</b>, by <b>secret ballot</b>.</li><li>Vote in person, by post or by proxy. Photo <b>voter ID</b> is needed at polling stations in England.</li><li>Voting age: 18 for general elections; 16 for Scottish Parliament and Senedd elections.</li><li><b>Political parties</b> publish a <b>manifesto</b> of what they'll do if elected.</li></ul>`},
 {t:"diagram",h:"First past the post",svg:FPTP,html:`<p>The candidate with the <b>most votes</b> in each of the 650 constituencies wins. It's simple and gives strong governments, but smaller parties win far fewer seats than their share of the vote. <b>Proportional representation</b> gives seats in proportion to votes.</p>`},
 {t:"example",h:"Worked example: a 4-mark answer",html:`<p><b>Explain one advantage and one disadvantage of first past the post.</b></p><p>It usually gives one party a <b>majority</b> (1), so the government is strong and can pass its laws (1). However, many votes are <b>wasted</b> (1): a candidate can win with 40%, so most voters in that seat aren't represented (1).</p>`},
 {t:"q",h:"Quick check",q:"What is a referendum?",o:["An election for MPs","A vote by the public on one specific issue","A vote in Parliament","A party's list of policies"],a:1,ex:"It's direct democracy within a representative system."},
 {t:"q",h:"Your turn",q:"What does a manifesto set out?",o:["The rules of Parliament","What a party will do if elected","The results of an election","The powers of the monarch"],a:1,ex:"Voters can compare manifestos when deciding who to vote for."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying the UK "uses PR". UK <b>general elections</b> use first past the post; PR systems are used for elections like the Scottish Parliament and the Senedd.</p>`},
 {t:"sum",h:"Summary",bullets:["Direct vs representative democracy","UK: representative, with occasional referendums","Elections every 5 years, secret ballot, voter ID","FPTP: most votes wins; strong government, wasted votes","PR: seats match votes more fairly"]}]},

{id:"rights",topic:"RR",title:"Rights, responsibilities and how they developed",mins:8,steps:[
 {t:"learn",h:"Rights and responsibilities",html:`<ul><li><b>Legal right</b>: protected by law (the right to an education).</li><li><b>Moral right</b>: reasonable to expect, but not law (a friend keeping a promise).</li><li><b>Legal responsibility</b>: required by law. <b>Moral responsibility</b>: the right thing to do.</li></ul><p>Rights come with responsibilities. The age of criminal responsibility is 10 in England, Wales and Northern Ireland, and 12 in Scotland.</p>`},
 {t:"diagram",h:"How rights developed",svg:TIME,html:`<p>The <b>Human Rights Act 1998</b> put the European Convention on Human Rights into UK law, so cases can be heard in UK courts. The <b>Equality Act 2010</b> bans discrimination on 9 protected characteristics.</p>`},
 {t:"learn",h:"Rights at work",html:`<p><b>Trade unions</b> are groups of employees that campaign for fair pay and safe conditions. The TUC represents most UK unions.</p><p>For: fewer accidents, better pay, support for members. Against: strikes cause disruption, and membership costs money.</p>`},
 {t:"example",h:"Worked example: a 3-mark answer",html:`<p><b>Explain why Magna Carta is important.</b></p><p>It established that even the <b>king had to follow the law</b> (1). Clause 39 said no one could be imprisoned <b>without lawful judgement</b> (1). This is the basis of the rule of law and the right to a fair trial today (1).</p>`},
 {t:"q",h:"Quick check",q:"Which law put the European Convention on Human Rights into UK law?",o:["Magna Carta","Equality Act 2010","Human Rights Act 1998","UN Convention on the Rights of the Child"],a:2,ex:"The HRA lets people take ECHR cases to UK courts."},
 {t:"q",h:"Your turn",q:"Which of these is a moral responsibility rather than a legal one?",o:["Paying tax","Not carrying a weapon","Helping a neighbour who is ill","Sending children to school"],a:2,ex:"It's the right thing to do, but no law requires it."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying the European Court of Human Rights is part of the EU. It belongs to the <b>Council of Europe</b>, so Brexit didn't change the UK's membership.</p>`},
 {t:"sum",h:"Summary",bullets:["Legal vs moral rights and responsibilities","1215 Magna Carta → 1948 UDHR → 1950 ECHR","1989 UNCRC → 1998 HRA → 2010 Equality Act","Trade unions protect workers' rights","ECtHR is not part of the EU"]}]},

{id:"constitution",topic:"BC",title:"The constitution and how laws are made",mins:10,steps:[
 {t:"learn",h:"An uncodified constitution",html:`<p>The UK's constitution isn't written in one document. It comes from statutes, conventions, case law and key documents. It's <b>flexible</b> but less clear.</p><ul><li><b>Parliamentary sovereignty</b>: Parliament is the supreme law-maker.</li><li><b>Rule of law</b>: everyone, including the government, must obey the law.</li><li><b>Constitutional monarchy</b>: the monarch is head of state but doesn't run the country.</li></ul>`},
 {t:"diagram",h:"The separation of powers",svg:SEP,html:`<p>Power is split so no branch becomes too powerful. In 2019 the <b>Supreme Court</b> ruled that the prime minister's suspension of Parliament was unlawful: the judiciary checking the executive.</p>`},
 {t:"learn",h:"How a bill becomes law",html:`<ol class="steps"><li>Green paper (ideas), then white paper (firm proposals).</li><li><b>First reading</b>: the title is read out.</li><li><b>Second reading</b>: main debate and vote.</li><li><b>Committee stage</b>: examined line by line.</li><li><b>Report stage</b> and <b>third reading</b>.</li><li>The same stages in the <b>other House</b>.</li><li><b>Royal assent</b>: it becomes an Act.</li></ol>`},
 {t:"example",h:"Worked example: a 4-mark answer",html:`<p><b>Explain the role of the House of Lords.</b></p><p>The Lords <b>scrutinise</b> bills (1), using members' <b>expertise</b> to suggest improvements (1). They can <b>delay</b> most bills but not block them (1), so the elected Commons has the final say. Critics argue an unelected chamber is <b>undemocratic</b> (1).</p>`},
 {t:"q",h:"Quick check",q:"Which branch of government runs the country day to day?",o:["Legislature","Executive","Judiciary","Monarchy"],a:1,ex:"The prime minister and cabinet, supported by the civil service."},
 {t:"q",h:"Your turn",q:"What happens at the committee stage of a bill?",o:["The title is read out","It's examined line by line","The monarch signs it","The public votes"],a:1,ex:"A small group of MPs goes through the detail and suggests amendments."},
 {t:"mistake",h:"Common mistake",html:`<p>Confusing <b>whips</b> and the <b>Speaker</b>. The Speaker keeps order in debates and is neutral; whips make MPs vote with their party.</p>`},
 {t:"sum",h:"Summary",bullets:["Uncodified: flexible but less clear","Sovereignty, rule of law, constitutional monarchy","Legislature, executive, judiciary","Bill: readings → committee → report → other House → royal assent","Lords scrutinise and delay"]}]},

{id:"government",topic:"LG",title:"National, devolved and local government",mins:8,steps:[
 {t:"learn",h:"Forming a government",html:`<p>After a general election, the monarch asks the leader of the party that can command a majority in the Commons to form a government. The PM chooses the cabinet.</p><p>Westminster keeps <b>reserved powers</b>: defence, foreign policy, the economy, immigration and the constitution.</p>`},
 {t:"diagram",h:"Levels of government",svg:TIERS,html:`<p><b>Devolution</b> passed some powers to Scotland, Wales and Northern Ireland. Scotland has the most power, including some tax-raising and its own legal system.</p>`},
 {t:"learn",h:"Local government",html:`<p><b>Councils</b> run local services: bins, libraries, social care, local roads. Elected <b>councillors</b> each represent a ward. Some areas have directly elected <b>mayors</b> with powers over transport and housing.</p><p>Funding: council tax, business rates and grants from central government.</p>`},
 {t:"example",h:"Worked example: evaluate",html:`<p><b>Is devolution good for the UK?</b></p><p><b>For</b>: local decision-makers understand local needs and are easier to hold to account. <b>Against</b>: it can create a "postcode lottery" in services and fuel calls to break up the UK. <b>Judgement</b>: weigh both and decide.</p>`},
 {t:"q",h:"Quick check",q:"Which is a reserved power kept by Westminster?",o:["Education in Scotland","Defence","Health in Wales","Bin collections"],a:1,ex:"Defence, foreign policy and the economy are reserved."},
 {t:"q",h:"Your turn",q:"How are local councils mainly funded?",o:["Income tax only","Council tax, business rates and government grants","Donations","The licence fee"],a:1,ex:"These three sources pay for local services."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up <b>devolved</b> and <b>local</b> government. Devolved = the Scottish Parliament, Senedd and Stormont. Local = councils and mayors.</p>`},
 {t:"sum",h:"Summary",bullets:["Largest party (majority) forms the government","Reserved powers stay at Westminster","Devolved: Holyrood, Senedd, Stormont","Councils: local services, funded by council tax and grants","Devolution has pros and cons"]}]},

{id:"media",topic:"ME",title:"The media and a free press",mins:7,steps:[
 {t:"learn",h:"Why a free press matters",html:`<p>The media <b>informs</b> the public, <b>exposes wrongdoing</b> and <b>scrutinises</b> those in power, giving a range of opinions.</p><p>Rights: freedom of expression and access to information (e.g. Freedom of Information requests). Responsibilities: respect privacy, don't publish anything false or <b>libellous</b>.</p>`},
 {t:"diagram",h:"A double-edged sword",svg:MEDIA,html:`<p>The <b>Leveson Inquiry</b> (2011–12) looked at press ethics after phone hacking. The BBC is publicly owned, funded by the licence fee, and must be <b>impartial</b>.</p>`},
 {t:"example",h:"Worked example: a 4-mark answer",html:`<p><b>Explain why there are limits on press freedom.</b></p><p>The press must respect people's <b>privacy</b> (1), as shown by the phone-hacking scandal (1). It can't publish <b>false, damaging</b> stories (libel) (1), or reports that threaten <b>national security</b> or name victims and young offenders (1).</p>`},
 {t:"q",h:"Quick check",q:"Which body regulates TV and radio in the UK?",o:["IPSO","Ofcom","The BBC","Parliament"],a:1,ex:"IPSO deals with newspapers; Ofcom with broadcasters."},
 {t:"q",h:"Your turn",q:"What is libel?",o:["Publishing something false that damages someone's reputation","Refusing to publish a story","A type of newspaper","A government report"],a:0,ex:"People can sue for libel in the civil courts."},
 {t:"mistake",h:"Common mistake",html:`<p>Only praising a free press. Strong answers balance its role in democracy against problems like <b>fake news</b>, <b>bias</b> and ownership by a few powerful people.</p>`},
 {t:"sum",h:"Summary",bullets:["Inform, expose, scrutinise","Rights: free expression, information","Limits: privacy, libel, security, victims","IPSO (press), Ofcom (broadcasting)","Issues: fake news, bias, ownership"]}]},

{id:"law",topic:"LW",title:"The law: criminal, civil and equality",mins:8,steps:[
 {t:"learn",h:"Why we have laws",html:`<p>Laws protect rights, keep people safe, settle disputes and set out what's acceptable. Key principles: <b>equality before the law</b>, <b>innocent until proven guilty</b>, the right to a <b>fair trial</b> and legal representation (legal aid helps people on low incomes).</p>`},
 {t:"diagram",h:"Criminal and civil law",svg:LAWS,html:`<p>Criminal cases are brought by the state (the CPS). Civil cases are brought by the person who was wronged.</p>`},
 {t:"learn",h:"Where laws come from",html:`<ul><li><b>Statute law</b>: Acts of Parliament.</li><li><b>Common law / case law</b>: judges' decisions that set precedents.</li><li><b>International law</b>: treaties the UK signs.</li></ul><p><b>Equality Act 2010</b>: 9 protected characteristics: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, sexual orientation.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>A worker is paid less than colleagues because of her age. Which law protects her, and where could she go?</b></p><p>The <b>Equality Act 2010</b>, because age is a protected characteristic. She could get free advice from Citizens Advice and take her case to an <b>employment tribunal</b> (civil law).</p>`},
 {t:"q",h:"Quick check",q:"Which of these is a civil case?",o:["Theft","Murder","A dispute over a contract","Assault"],a:2,ex:"Civil law covers disputes between people or organisations."},
 {t:"q",h:"Your turn",q:"What is case law?",o:["Laws made by Parliament","Judges' decisions that set a precedent","Treaties signed by the UK","Council by-laws"],a:1,ex:"Later courts follow earlier decisions on similar cases."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying someone is "found guilty" in a civil case. Civil cases decide who is <b>liable</b> and usually end in compensation, not punishment.</p>`},
 {t:"sum",h:"Summary",bullets:["Equality before the law; innocent until proven guilty","Criminal: punishment; civil: compensation","Statute, case law, international law","Equality Act: 9 protected characteristics","Tribunals hear workplace cases"]}]},

{id:"legal",topic:"LS",title:"Police, courts and sentencing",mins:9,steps:[
 {t:"learn",h:"Police powers",html:`<p>The police can stop and search, arrest, and hold a suspect for 24 hours (up to 96 hours for serious crimes with approval). They must tell suspects their rights and use only reasonable force.</p><p>Elected <b>police and crime commissioners</b> oversee local forces. <b>Special constables</b> are unpaid volunteers.</p>`},
 {t:"diagram",h:"The court system",svg:COURTS,html:`<p>All criminal cases start in the <b>magistrates' court</b>. Serious cases go to the <b>Crown Court</b>, where a jury of 12 decides guilt and the judge decides the sentence.</p>`},
 {t:"learn",h:"Aims of sentencing",html:`<ul><li><b>Retribution</b>: punishment that fits the crime.</li><li><b>Deterrence</b>: putting people off crime.</li><li><b>Rehabilitation</b>: helping offenders change.</li><li><b>Reparation</b> / restorative justice: making amends to the victim.</li><li><b>Public protection</b>: keeping dangerous people away from society.</li></ul>`},
 {t:"example",h:"Worked example: a 4-mark answer",html:`<p><b>Explain the role of a jury.</b></p><p>A jury is <b>12 members of the public</b> aged 18–75 (1), chosen at random (1). They listen to the evidence in a Crown Court trial and decide whether the defendant is <b>guilty or not guilty</b> (1). This means ordinary citizens take part in justice (1).</p>`},
 {t:"q",h:"Quick check",q:"Who decides the sentence in a Crown Court trial?",o:["The jury","The judge","The police","The victim"],a:1,ex:"The jury decides guilt; the judge decides the sentence."},
 {t:"q",h:"Your turn",q:"A young offender does unpaid work to repair damage they caused. Which aim is this?",o:["Retribution","Deterrence","Reparation","Public protection"],a:2,ex:"Reparation means making amends."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up <b>solicitors</b> and <b>barristers</b>. Solicitors give legal advice and prepare cases; barristers argue cases in court.</p>`},
 {t:"sum",h:"Summary",bullets:["Police powers come with responsibilities","Magistrates' (minor) → Crown (serious, jury)","Youth court for 10–17; county court for civil","Retribution, deterrence, rehabilitation, reparation, protection","CPS decides whether to prosecute"]}]},

{id:"world",topic:"WW",title:"The UK and the wider world",mins:8,steps:[
 {t:"learn",h:"Identity and migration",html:`<p>The UK is a <b>multicultural</b> society. People move because of <b>push factors</b> (war, persecution, poverty) and <b>pull factors</b> (jobs, family, safety).</p><p>A <b>refugee</b> has protection; an <b>asylum seeker</b> is waiting for a decision. <b>Community cohesion</b> means people from different backgrounds getting on well together.</p>`},
 {t:"diagram",h:"International organisations",svg:HUB,html:`<p>The UK left the <b>EU</b> in January 2020 after the 2016 referendum. The <b>WTO</b> sets the rules for trade between countries.</p>`},
 {t:"learn",h:"Conflict and aid",html:`<p>The UK can respond to conflict by <b>diplomacy</b>, <b>sanctions</b>, UN <b>peacekeeping</b> or military action. The <b>International Criminal Court</b> tries genocide and war crimes.</p><p><b>Humanitarian aid</b> is emergency help; <b>development aid</b> is long-term. NGOs like Oxfam also give aid.</p>`},
 {t:"example",h:"Worked example: evaluate",html:`<p><b>Does the UK benefit from international organisations?</b></p><p><b>For</b>: security through NATO's Article 5; influence through the UN Security Council veto; human rights through the Council of Europe. <b>Against</b>: cost, and some loss of <b>sovereignty</b> (court rulings). <b>Judgement</b>: decide which matters more, and why.</p>`},
 {t:"q",h:"Quick check",q:"What is NATO?",o:["A trade organisation","A military alliance","A human rights court","A charity"],a:1,ex:"An attack on one member is treated as an attack on all."},
 {t:"q",h:"Your turn",q:"Emergency food after a flood is which type of aid?",o:["Development aid","Humanitarian aid","A sanction","Fair trade"],a:1,ex:"Humanitarian aid is short-term emergency help."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up the <b>Council of Europe</b> (46 countries, created the ECHR) with the <b>European Union</b> (27 countries, single market). The UK left the EU but is still in the Council of Europe.</p>`},
 {t:"sum",h:"Summary",bullets:["Push and pull factors; refugee vs asylum seeker","UN veto, NATO, Commonwealth, Council of Europe, WTO","Left the EU in 2020","Responses to conflict: diplomacy, sanctions, peacekeeping","Humanitarian vs development aid"]}]},

{id:"action",topic:"CA",title:"Planning and evaluating a citizenship action",mins:8,steps:[
 {t:"learn",h:"What a citizenship action is",html:`<p>A planned project, done with others, to make a difference on a citizenship issue. It's tested in <b>Paper 2 Section D</b> (about 34 marks): first questions on other people's actions, then a 12-mark reflection on <b>your own</b>, so learn its details: names, numbers, dates and results.</p>`},
 {t:"diagram",h:"The five stages",svg:ACT,html:`<p><b>Primary research</b> is data you collect (surveys, interviews). <b>Secondary research</b> is data others collected (news, government reports). <b>Success criteria</b> say how you'll know it worked.</p>`},
 {t:"learn",h:"Ways to take action",html:`<ul><li><b>Campaigning</b>: posters, social media, an assembly.</li><li><b>Petitions</b>: a UK Parliament petition gets a government response at 10 000 signatures and is considered for debate at 100 000.</li><li><b>Lobbying</b>: contacting decision-makers such as your MP or councillor.</li><li>Working with <b>pressure groups</b> and charities.</li></ul>`},
 {t:"example",h:"Worked example: judging an action",html:`<p><b>A group surveyed 30 friends, then sent a petition about park bins to their headteacher. Identify two weaknesses.</b></p><p>The sample was <b>small and biased</b> (only friends) (1). They sent the petition to the <b>wrong decision-maker</b>: the council, not the school, decides on park bins (1).</p>`},
 {t:"q",h:"Quick check",q:"Which is primary research?",o:["A government report","A newspaper article","A survey you carried out","A charity's website"],a:2,ex:"Primary research is data you collect yourself."},
 {t:"q",h:"Your turn",q:"How many signatures does a Parliament petition need to be considered for debate?",o:["1 000","10 000","100 000","1 million"],a:2,ex:"10 000 gets a government response; 100 000 is considered for debate."},
 {t:"mistake",h:"Common mistake",html:`<p>Describing your action without <b>evaluating</b> it. Say what worked, what didn't and why, what you'd change, and give a judgement on how successful it was, with evidence.</p>`},
 {t:"sum",h:"Summary",bullets:["Choose → research → plan → act → evaluate","Primary vs secondary research","Target the right decision-maker","Petitions: 10 000 response, 100 000 debate","Evaluate with evidence and a judgement"]}]}
];
})();
