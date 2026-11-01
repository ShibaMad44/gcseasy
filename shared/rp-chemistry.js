/* AQA Chemistry required practicals. */
(function(){const {L,B,A,T,SVG,N,BN,K}=window.LSN;
const V=q=>"AQA GCSE chemistry required practical "+q;
const vars=(iv,dv,cv)=>`<div class="tbl"><table><tr><th>Independent (you change)</th><td>${iv}</td></tr><tr><th>Dependent (you measure)</th><td>${dv}</td></tr><tr><th>Control (keep the same)</th><td>${cv}</td></tr></table></div>`;
const ol=a=>`<ol class="steps">${a.map(x=>`<li>${x}</li>`).join("")}</ol>`;
const TRIPLE=`<p class="note">Triple (separate) Chemistry only: not in Combined Science.</p>`;

const SALT=SVG(540,290,"Making a soluble salt in three stages",`
${K.beaker(40,90,90,80,.5)}<rect x="44" y="160" width="82" height="8" fill="#333"/>${K.tripod(30,172,110,60)}${K.burner(85,216)}
<path d="M150 56 L104 92" stroke="var(--ink)" stroke-width="3"/><ellipse cx="102" cy="94" rx="6" ry="3" fill="#333"/>
<path d="M215 70 L305 70 L268 122 L268 150 L252 150 L252 122 Z" class="d-c0"/><path d="M226 74 L294 74 L262 114 L258 114 Z" fill="#f2f2f2" stroke="var(--muted)"/><ellipse cx="260" cy="100" rx="12" ry="4" fill="#333"/>
${K.flask(225,150,70,96,.35,"#7fb3e6")}
<path d="M392 120 Q445 172 498 120 Z" fill="#7fb3e6" stroke="var(--ink)" stroke-width="1.6"/>${[410,428,452,470].map(x=>`<rect x="${x}" y="128" width="8" height="8" transform="rotate(45 ${x+4} 132)" fill="#2F6FD6"/>`).join("")}${K.tripod(395,124,100,50)}${K.burner(445,168)}
${N(85,24,1,"1 Warm, add CuO")}${N(260,24,2,"2 Filter")}${N(445,24,3,"3 Crystallise")}
${T(85,46,"until it stops dissolving","cap")}${T(260,46,"remove excess CuO","cap")}${T(445,46,"then leave to cool","cap")}`);

const TITR=SVG(520,300,"Titration apparatus",`
${K.stand(120,20,256,74,100)}
<rect x="196" y="20" width="16" height="160" class="d-c0"/><rect x="198" y="40" width="12" height="138" fill="#bfe0fb"/><rect x="190" y="172" width="28" height="8" class="d-c6"/><path d="M204 180 L204 196" stroke="var(--ink)" stroke-width="3"/>
${K.flask(166,196,76,70,.45,"#f5a3c7")}<rect x="150" y="266" width="108" height="8" fill="#fff" stroke="var(--ink)"/>
${L(204,70,260,60,1,"Burette (acid)")}${L(214,176,260,170,2,"Tap: drop by drop near the end")}${L(214,250,260,240,3,"Alkali + indicator")}${L(250,270,280,290,4,"White tile")}`);

const ELYS=SVG(540,280,"Electrolysis of copper chloride solution",`
${K.beaker(100,110,220,140,.75,"d-water")}<rect x="102" y="146" width="216" height="102" fill="#7fc4b8" opacity=".55"/>
<rect x="150" y="70" width="16" height="150" class="d-c6"/><rect x="254" y="70" width="16" height="150" class="d-c6"/><rect x="254" y="170" width="16" height="50" fill="#c46a2b"/>
<rect x="170" y="8" width="80" height="34" rx="6" class="d-c6"/>${T(210,30,"DC","sm")}${K.wire("M158 70 L158 25 L170 25 M250 25 L262 25 L262 70")}
${K.bubbles(146,210,5)}
${L(150,150,80,150,1,"Anode (+)","end")}${L(270,196,330,206,2,"Cathode (−): copper")}${L(300,236,330,256,3,"Copper chloride solution")}${L(250,25,320,25,4,"DC power pack")}`);

const TEMP=SVG(600,280,"Measuring a temperature change",`
${K.beaker(150,120,140,124,0)}<path d="M165 110 L275 110 L262 238 L178 238 Z" class="d-c0"/><path d="M168 140 L272 140 L262 236 L178 236 Z" fill="#bfe0fb"/>
<path d="M156 104 L284 104" stroke="var(--ink)" stroke-width="5"/>${K.therm(220,30,186)}
${L(172,180,100,180,1,"Polystyrene cup","end")}${L(220,60,280,50,2,"Thermometer")}${L(270,104,320,90,3,"Lid: less heat lost")}${L(286,210,320,220,4,"Beaker keeps it steady")}`,-110);

const GAS=SVG(520,270,"Measuring gas volume with a gas syringe",`
${K.flask(60,120,90,110,.4)}<rect x="88" y="108" width="34" height="14" rx="2" class="d-c6"/>
<path d="M105 108 L105 80 L230 80" fill="none" stroke="var(--ink)" stroke-width="4"/>
<rect x="230" y="66" width="170" height="28" class="d-c0"/><rect x="232" y="68" width="98" height="24" class="d-c1"/><rect x="330" y="70" width="110" height="20" class="d-c6"/><rect x="440" y="62" width="8" height="36" class="d-c6"/>
<rect x="90" y="220" width="30" height="5" fill="#999"/>${K.bubbles(105,212,4)}
${L(105,220,46,252,1,"Magnesium + acid","start")}${L(170,80,170,48,2,"Delivery tube")}${L(300,94,300,130,3,"Gas syringe: read volume")}${L(90,115,40,100,4,"Bung","end")}`,-30);

const CROSS=SVG(560,270,"The disappearing cross method",`
<rect x="100" y="222" width="200" height="22" fill="#fff" stroke="var(--ink)"/><path d="M186 226 L214 240 M214 226 L186 240" stroke="var(--ink)" stroke-width="3"/>
${K.flask(140,110,120,110,.5,"#efe9c9")}
<ellipse cx="200" cy="30" rx="22" ry="12" class="d-c0"/><circle cx="200" cy="30" r="6" fill="var(--ink)"/><path d="M200 44 L200 214" class="d-ln" stroke-dasharray="4 4"/>
${L(222,30,300,30,1,"Look down through the flask")}${L(252,190,320,190,2,"Thiosulfate + acid: goes cloudy")}${L(286,233,320,250,3,"Cross on paper")}`);

const CHROM=SVG(520,280,"Paper chromatography set-up",`
${K.beaker(130,60,160,190,.12)}<path d="M110 40 L310 40" stroke="var(--ink)" stroke-width="4"/>
<rect x="170" y="40" width="80" height="196" class="d-c0"/><path d="M170 80 L250 80" class="d-ln" stroke-dasharray="5 4"/><path d="M170 210 L250 210" class="d-line" stroke-dasharray="2 3"/>
<circle cx="190" cy="150" r="6" fill="#D2433B"/><circle cx="190" cy="110" r="6" fill="#2F6FD6"/><circle cx="230" cy="150" r="6" fill="#D2433B"/>
${L(250,80,320,80,1,"Solvent front")}${L(250,210,320,206,2,"Pencil start line")}${L(270,240,320,250,3,"Solvent below the line")}${L(176,130,100,120,4,"Dyes separate","end")}`,-20);

const FLAME=SVG(500,260,"Flame test colours",`
${K.burner(110,150)}<path d="M20 50 L106 120" stroke="#999" stroke-width="3"/><circle cx="109" cy="123" r="4" fill="none" stroke="#999" stroke-width="2"/>
${[["#b3123b","crimson","Lithium, Li⁺"],["#f2c40f","yellow","Sodium, Na⁺"],["#b694d6","lilac","Potassium, K⁺"],["#e8562a","orange-red","Calcium, Ca²⁺"],["#3aa35b","green","Copper, Cu²⁺"]].map(([c,n,m],i)=>`<rect x="190" y="${14+i*46}" width="110" height="36" rx="8" fill="${c}"/>${T(245,36+i*46,n,"bx")}${N(400,32+i*46,i+1,m)}`).join("")}
${T(95,236,"Clean nichrome loop:","cap")}${T(95,252,"dip, then into the flame","cap")}`);

const DIST=SVG(560,330,"Distilling salty water",`
<circle cx="90" cy="170" r="45" class="d-c0"/><path d="M48 186 A45 45 0 0 0 132 186 Z" fill="#bfe0fb"/><rect x="80" y="94" width="20" height="40" class="d-c0"/>
${K.therm(90,40,70)}${K.burner(90,262)}
<path d="M100 104 L330 196" stroke="#bfe0fb" stroke-width="20" stroke-linecap="round"/><path d="M100 104 L340 200" stroke="var(--ink)" stroke-width="3"/>
${A(340,232,318,206,"blue")}${A(130,104,140,74,"blue")}
${K.beaker(330,214,80,70,.3)}<circle cx="344" cy="212" r="3" fill="#6FA8DC" class="d-pulse"/>
${L(96,60,180,40,1,"Thermometer: 100 °C")}${L(220,150,250,120,2,"Condenser: steam cools")}${L(340,232,420,232,3,"Cold water in")}${L(380,270,430,300,4,"Pure water")}${L(120,200,170,250,5,"Salty water heated")}`);

window.LESSONS.chemistry.push(
{id:"rp-salt",topic:"C4",rp:true,title:"Making a soluble salt",mins:9,steps:[
 {t:"learn",h:"The aim",html:`<p>Make a pure, dry sample of a soluble salt (copper sulfate) from an insoluble base (copper oxide) and an acid.</p><div class="formula">copper oxide + sulfuric acid → copper sulfate + water</div>`},
 {t:"diagram",h:"The three stages",svg:SALT,html:`<p>Adding the base <b>in excess</b> makes sure all the acid is used up, so the salt isn't contaminated with acid.</p>`},
 {t:"learn",h:"Method",html:ol(["Warm dilute sulfuric acid gently in a beaker (don't boil it).","Add copper oxide a spatula at a time, stirring, until no more dissolves: black solid is left over (excess).","Filter to remove the excess copper oxide.","Heat the blue filtrate in an evaporating basin until crystals start to form (or about half the water has gone).","Leave it to cool so crystals form slowly, then pat them dry with filter paper."]),vid:V("making salts copper sulfate")},
 {t:"example",h:"Naming the salt",html:`<p>The first part comes from the metal in the base; the second from the acid: sulfuric → <b>sulfate</b>, hydrochloric → <b>chloride</b>, nitric → <b>nitrate</b>.</p><p>Zinc oxide + hydrochloric acid → <b>zinc chloride</b> + water.</p>`},
 {t:"q",h:"Quick check",q:"How do you know the copper oxide is in excess?",o:["The solution turns red","Black solid stays undissolved","It starts to fizz","The beaker gets cold"],a:1,ex:"When no more dissolves, all the acid has reacted."},
 {t:"q",h:"Your turn",q:"Why is the solution left to cool slowly rather than boiled dry?",o:["To save gas","To get larger, well-formed crystals","To make it more acidic","Boiling would make it explode"],a:1,ex:"Slow cooling gives bigger crystals; boiling dry can decompose the salt."},
 {t:"mistake",h:"Errors and safety",html:`<ul><li>Wear <b>eye protection</b>: hot acid can spit.</li><li>Not adding enough base leaves acid in the product.</li><li>Heating too strongly in the evaporating basin causes spitting and can decompose the crystals.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Warm acid; add base until excess","Filter off the excess solid","Evaporate until crystals start to form","Cool slowly; pat dry","Acid gives the second name: sulfate, chloride, nitrate"],vid:V("making salts copper sulfate")}]},

{id:"rp-titration",triple:true,topic:"C4",rp:true,title:"Titration",mins:9,steps:[
 {t:"learn",h:"The aim",html:`${TRIPLE}<p>Find the volume of acid needed to exactly neutralise a known volume of alkali, then use it to work out a concentration.</p>`},
 {t:"diagram",h:"The apparatus",svg:TITR,html:`<p>Use a <b>pipette</b> to measure exactly 25.0 cm³ of alkali into the conical flask. The white tile makes the colour change easy to see.</p>`},
 {t:"learn",h:"Method",html:ol(["Pipette 25.0 cm³ of sodium hydroxide into a conical flask and add a few drops of indicator (e.g. phenolphthalein or methyl orange).","Fill the burette with acid and read the starting volume at eye level, from the bottom of the meniscus.","Add acid while swirling the flask; add it <b>drop by drop</b> near the end point.","Stop when the indicator changes colour permanently. Record the final reading.","Repeat until you get <b>concordant</b> results (within 0.10 cm³ of each other) and find the mean."]),vid:V("titration")},
 {t:"example",h:"Concentration (Higher)",html:`<p><b>25.0 cm³ of 0.100 mol/dm³ NaOH is neutralised by 22.45 cm³ of HCl. Find the concentration of HCl.</b></p><ol class="steps"><li>Moles NaOH = 0.100 × 0.0250 = 0.00250 mol.</li><li>NaOH + HCl react 1 : 1, so moles HCl = 0.00250 mol.</li><li>Concentration = 0.00250 ÷ 0.02245 = <b>0.111 mol/dm³</b>.</li></ol>`},
 {t:"num",h:"Your turn",q:"Concordant titres are 24.10 cm³ and 24.20 cm³. What is the mean titre (cm³)?",ans:24.15,tol:.001,unit:"cm³",ex:"(24.10 + 24.20) ÷ 2 = 24.15 cm³."},
 {t:"q",h:"Quick check",q:"Why do you swirl the flask?",o:["To cool it","To mix the acid and alkali so the colour change is accurate","To add more indicator","To read the burette"],a:1,ex:"Unmixed acid can give a false end point."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Reading the burette from above or below: read at <b>eye level</b>, from the bottom of the meniscus.</li><li>Going past the end point: add acid drop by drop near the end.</li><li>Air bubble in the burette tip: run some acid through first.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Pipette 25.0 cm³ alkali + indicator","Burette of acid; read at eye level","Drop by drop near the end point","Concordant = within 0.10 cm³","moles = conc × volume (dm³)"],vid:V("titration")}]},

{id:"rp-electrolysis",topic:"C4",rp:true,title:"Electrolysis of solutions",mins:8,steps:[
 {t:"learn",h:"The aim",html:`<p>Investigate what is formed at each electrode when aqueous solutions are electrolysed using <b>inert</b> (graphite) electrodes.</p>`},
 {t:"diagram",h:"The set-up",svg:ELYS,html:`<p>In copper chloride solution, <b>copper</b> coats the cathode and <b>chlorine</b> bubbles form at the anode.</p>`},
 {t:"learn",h:"Method",html:ol(["Pour the solution into a beaker and put in two clean graphite electrodes, not touching.","Connect them to a low-voltage DC supply (about 4 V).","Switch on and observe each electrode.","Test any gas: chlorine bleaches damp blue litmus paper; oxygen relights a glowing splint; hydrogen burns with a squeaky pop.","Repeat with other solutions, e.g. sodium chloride, copper sulfate, sodium sulfate."]),vid:V("electrolysis aqueous solutions")},
 {t:"example",h:"Predicting the products",html:`<p><b>Cathode (−)</b>: the metal forms if it's <b>less reactive than hydrogen</b> (e.g. copper); otherwise hydrogen.</p><p><b>Anode (+)</b>: a halogen forms if a <b>halide</b> is present (chlorine, bromine, iodine); otherwise oxygen.</p>`},
 {t:"q",h:"Quick check",q:"What forms at the cathode when sodium chloride solution is electrolysed?",o:["Sodium","Hydrogen","Chlorine","Oxygen"],a:1,ex:"Sodium is more reactive than hydrogen, so hydrogen forms."},
 {t:"q",h:"Your turn",q:"What forms at the anode with copper sulfate solution?",o:["Sulfur","Oxygen","Copper","Hydrogen"],a:1,ex:"No halide is present, so oxygen forms."},
 {t:"mistake",h:"Errors and safety",html:`<ul><li><b>Chlorine is toxic</b>: use a low voltage, run it for a short time and keep the room ventilated.</li><li>Electrodes touching cause a short circuit.</li><li>Clean the electrodes so earlier deposits don't confuse results.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Inert graphite electrodes, low-voltage DC","Cathode: metal if less reactive than H, else hydrogen","Anode: halogen if halide, else oxygen","Gas tests: litmus bleached, splint relights, squeaky pop","Chlorine is toxic: ventilate"],vid:V("electrolysis aqueous solutions")}]},

{id:"rp-temp",topic:"C5",rp:true,title:"Temperature changes in reactions",mins:8,steps:[
 {t:"learn",h:"The aim",html:`<p>Investigate how a variable affects the temperature change in a reaction, e.g. the volume of sodium hydroxide added to hydrochloric acid.</p>${vars("Volume of sodium hydroxide added","Maximum temperature reached","Volume and concentration of acid, starting temperature, type of cup")}`},
 {t:"diagram",h:"The set-up",svg:TEMP,html:`<p>Polystyrene is a good <b>insulator</b>, and the lid reduces heat loss, so more of the energy change shows up as a temperature change.</p>`},
 {t:"learn",h:"Method",html:ol(["Measure 30 cm³ of dilute hydrochloric acid into a polystyrene cup in a beaker.","Record its starting temperature.","Add 5 cm³ of sodium hydroxide, put the lid on, stir, and record the highest temperature.","Repeat, adding 5 cm³ at a time, up to 40 cm³.","Plot temperature against volume added; draw two lines of best fit."]),vid:V("temperature change neutralisation")},
 {t:"example",h:"Temperature change",html:`<p><b>The acid starts at 19.5 °C and reaches 27.0 °C.</b></p><p>change = 27.0 − 19.5 = <b>+7.5 °C</b>: an exothermic reaction. The peak of the graph shows the volume where neutralisation is complete.</p>`},
 {t:"num",h:"Your turn",q:"A reaction starts at 21.0 °C and ends at 15.5 °C. What is the temperature change (°C)?",ans:-5.5,tol:.01,unit:"°C",ex:"15.5 − 21.0 = −5.5 °C: endothermic."},
 {t:"q",h:"Quick check",q:"Why is a lid used?",o:["To stop the acid spilling only","To reduce heat loss to the surroundings","To make it react faster","To measure the volume"],a:1,ex:"Less energy escapes, so the measured change is more accurate."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Heat loss to the air makes the rise look smaller: use a lid and insulation.</li><li>Not stirring gives uneven temperatures.</li><li>A digital thermometer or temperature probe is more precise.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Polystyrene cup + lid to insulate","Record start and maximum temperature","Add alkali in 5 cm³ portions","Rise = exothermic; fall = endothermic","Two lines of best fit meet at neutralisation"],vid:V("temperature change neutralisation")}]},

{id:"rp-rates",topic:"C6",rp:true,title:"Rates of reaction",mins:10,steps:[
 {t:"learn",h:"The aim",html:`<p>Investigate how concentration affects the rate of reaction by measuring (a) the volume of gas made and (b) a change in colour or cloudiness.</p>${vars("Concentration of the acid (or thiosulfate)","Volume of gas over time, or time for the cross to disappear","Temperature, volumes, mass and surface area of solid")}`},
 {t:"diagram",h:"Method 1: gas volume",svg:GAS,html:`<p>Magnesium + hydrochloric acid → magnesium chloride + hydrogen. Read the gas syringe every 10 seconds.</p>`},
 {t:"diagram",h:"Method 2: disappearing cross",svg:CROSS,html:`<p>Sodium thiosulfate + hydrochloric acid makes a <b>sulfur</b> precipitate, so the mixture goes cloudy until the cross can't be seen.</p>`},
 {t:"learn",h:"Method",html:ol(["Measure the acid into a conical flask and add the magnesium; quickly put the bung in and start timing.","Record the gas volume every 10 s until the reaction stops.","For the cross: put the flask on a cross, add thiosulfate and acid, start the timer, and stop it when the cross disappears.","Repeat with different concentrations."]),vid:V("rates of reaction")},
 {t:"example",h:"Calculating the rate",html:`<p><b>Mean rate</b> = amount of product ÷ time: 48 cm³ in 60 s = <b>0.8 cm³/s</b>.</p><p>For the cross method: <b>rate = 1 ÷ time</b>. If the cross disappears after 40 s, the rate = 1 ÷ 40 = 0.025 s⁻¹.</p>`},
 {t:"num",h:"Your turn",q:"The cross disappears after 50 s. What is the rate (1 ÷ time) in s⁻¹?",ans:.02,tol:.0005,unit:"s⁻¹",ex:"1 ÷ 50 = 0.02 s⁻¹."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Gas escapes before the bung goes in: use a divided flask or tie the magnesium on a thread.</li><li>Different people judge the cross differently: the same person should watch every time, or use a light sensor.</li><li>Keep the temperature the same: it also affects rate.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Gas syringe: volume every 10 s","Disappearing cross: time until hidden","Rate = 1 ÷ time; mean rate = product ÷ time","Higher concentration → faster","Same observer, same temperature"],vid:V("rates of reaction")}]},

{id:"rp-chroma",topic:"C8",rp:true,title:"Chromatography",mins:8,steps:[
 {t:"learn",h:"The aim",html:`<p>Separate the coloured substances in inks or food colourings, and identify them using Rf values.</p>`},
 {t:"diagram",h:"The set-up",svg:CHROM,html:`<p>The start line is in <b>pencil</b> (ink would dissolve and run). The solvent must be <b>below</b> the line, or the spots would wash into it.</p>`},
 {t:"learn",h:"Method",html:ol(["Draw a pencil line about 1.5 cm from the bottom of the paper.","Put small spots of each sample on the line.","Hang the paper in a beaker with solvent below the line; put a lid on.","Leave until the solvent is near the top. Mark the solvent front in pencil.","Let it dry, then measure how far each spot and the solvent moved."]),vid:V("chromatography")},
 {t:"example",h:"Calculating Rf",html:`<p>Rf = distance moved by substance ÷ distance moved by solvent.</p><p>A spot moves 3.0 cm; the solvent moves 7.5 cm: Rf = <b>0.4</b>. Matching Rf values (in the same solvent) suggest the same substance.</p>`},
 {t:"num",h:"Your turn",q:"A spot moves 4.5 cm and the solvent 9.0 cm. What is the Rf value?",ans:.5,tol:.005,unit:"",ex:"4.5 ÷ 9.0 = 0.5."},
 {t:"q",h:"Quick check",q:"A sample makes three spots. What does this tell you?",o:["It is pure","It contains at least three substances","It is insoluble","The solvent was wrong"],a:1,ex:"A pure substance makes one spot."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Spots too big blur together: use small, concentrated spots.</li><li>Forgetting to mark the solvent front before it evaporates.</li><li>A lid stops the solvent evaporating from the paper.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Pencil start line, above the solvent","Small spots; lid on","Mark the solvent front","Rf = substance ÷ solvent distance","Pure substance = one spot"],vid:V("chromatography")}]},

{id:"rp-ions",triple:true,topic:"C8",rp:true,title:"Identifying ions",mins:9,steps:[
 {t:"learn",h:"The aim",html:`${TRIPLE}<p>Use flame tests and chemical tests to identify the positive and negative ions in an unknown compound.</p>`},
 {t:"diagram",h:"Flame tests",svg:FLAME,html:`<p>Clean the nichrome loop by dipping it in hydrochloric acid and holding it in the flame until there's no colour.</p>`},
 {t:"learn",h:"Other tests",html:`<div class="tbl"><table><tr><th>Test</th><th>Result</th></tr><tr><td>Sodium hydroxide → precipitate</td><td>Cu²⁺ <b>blue</b>; Fe²⁺ <b>green</b>; Fe³⁺ <b>brown</b>; Ca²⁺, Mg²⁺, Al³⁺ <b>white</b> (Al³⁺ dissolves in excess)</td></tr><tr><td>Carbonate: add dilute acid</td><td>Fizzes; gas turns <b>limewater milky</b></td></tr><tr><td>Halide: nitric acid, then silver nitrate</td><td>Cl⁻ <b>white</b>; Br⁻ <b>cream</b>; I⁻ <b>yellow</b></td></tr><tr><td>Sulfate: hydrochloric acid, then barium chloride</td><td><b>White</b> precipitate</td></tr></table></div>`},
 {t:"example",h:"Identifying a compound",html:`<p><b>A solid gives a green flame. Its solution gives a white precipitate with nitric acid and silver nitrate.</b></p><p>Green flame → Cu²⁺; white precipitate → Cl⁻. It's <b>copper chloride</b>.</p>`},
 {t:"q",h:"Quick check",q:"Which ion gives a brown precipitate with sodium hydroxide?",o:["Fe²⁺","Fe³⁺","Cu²⁺","Ca²⁺"],a:1,ex:"Iron(III) gives brown; iron(II) gives green."},
 {t:"q",h:"Your turn",q:"Why is nitric acid added before silver nitrate?",o:["To make the precipitate brighter","To remove carbonate ions that would also give a precipitate","To change the colour","To heat the solution"],a:1,ex:"Carbonates would give a false positive."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>A dirty loop mixes colours: clean it between tests.</li><li>Sodium's strong yellow can hide other colours.</li><li>A <b>flame emission spectroscope</b> is more accurate and works with mixtures.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Flames: Li crimson, Na yellow, K lilac, Ca orange-red, Cu green","NaOH: Cu²⁺ blue, Fe²⁺ green, Fe³⁺ brown","Carbonate: acid → CO₂ → limewater milky","Halides: Cl⁻ white, Br⁻ cream, I⁻ yellow","Sulfate: BaCl₂ → white"],vid:V("identifying ions flame test")}]},

{id:"rp-water",topic:"C10",rp:true,title:"Water purification",mins:8,steps:[
 {t:"learn",h:"The aim",html:`<p>Analyse and purify samples of water from different sources: test the pH, find the mass of dissolved solids, and distil salty water.</p>`},
 {t:"diagram",h:"Distillation",svg:DIST,html:`<p>The water <b>evaporates</b>, then <b>condenses</b> in the cold condenser. The salt stays in the flask.</p>`},
 {t:"learn",h:"Method",html:ol(["Test the pH of each sample with universal indicator or a pH meter.","Weigh an empty evaporating basin, add a known volume of water, and heat to evaporate it; reweigh to find the mass of dissolved solids.","Distil salty water: heat it in a flask, pass the steam through a condenser and collect the pure water.","Check the thermometer reads <b>100 °C</b> and that the distillate's pH is 7."]),vid:V("water purification distillation")},
 {t:"example",h:"Mass of dissolved solids",html:`<p><b>The basin weighs 52.30 g empty and 52.45 g after evaporating 50 cm³ of water.</b></p><p>Dissolved solids = 52.45 − 52.30 = <b>0.15 g</b> in 50 cm³.</p>`},
 {t:"num",h:"Your turn",q:"A basin weighs 48.20 g empty and 48.56 g after evaporating the water. What mass of solids was dissolved (g)?",ans:.36,tol:.001,unit:"g",ex:"48.56 − 48.20 = 0.36 g."},
 {t:"q",h:"Quick check",q:"What should the thermometer read when pure water is distilling?",o:["0 °C","37 °C","100 °C","120 °C"],a:2,ex:"Pure water boils at 100 °C."},
 {t:"mistake",h:"Errors and safety",html:`<ul><li>Use anti-bumping granules so the water boils smoothly.</li><li>Cold water enters the condenser at the <b>bottom</b>, so it fills completely.</li><li>Don't boil the flask dry.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Test pH; potable water is about 7","Evaporate to find dissolved solids","Distil: evaporate, then condense","Thermometer at 100 °C for pure water","Water in at the bottom of the condenser"],vid:V("water purification distillation")}]}
);
})();
