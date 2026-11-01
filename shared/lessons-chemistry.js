/* Chemistry topic lessons (C1, C2, C4–C10). C3 is in lessons.js. */
(function(){const {L,B,A,T,SVG,N,BN}=window.LSN;
const ring=(cx,cy,r,angs,cls)=>angs.map(a=>{const x=cx+r*Math.cos(a*Math.PI/180),y=cy-r*Math.sin(a*Math.PI/180);return cls==="x"?`<path d="M${x-4} ${y-4} L${x+4} ${y+4} M${x+4} ${y-4} L${x-4} ${y+4}" class="d-line" style="stroke:#D2433B;stroke-width:2"/>`:`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" class="d-c1"/>`}).join("");

const ATOM=SVG(460,280,"Electron shells of a sodium atom",`
<circle cx="150" cy="140" r="46" class="d-no"/><circle cx="150" cy="140" r="76" class="d-no"/><circle cx="150" cy="140" r="106" class="d-no"/>
<circle cx="150" cy="140" r="22" class="d-c2"/>${T(150,137,"11p","sm")}${T(150,150,"12n","sm")}
${ring(150,140,46,[90,270])}${ring(150,140,76,[0,45,90,135,180,225,270,315])}${ring(150,140,106,[30])}
${L(170,130,290,40,1,"Nucleus")}
${L(242,87,300,90,2,"Electron (charge −1)")}
${L(225,140,300,150,3,"Shell (energy level)")}
${T(290,210,"Sodium: 2, 8, 1","big","start")}${T(290,230,"1 outer electron → Group 1","cap","start")}${T(290,246,"3 shells → Period 3","cap","start")}${T(290,64,"(protons + neutrons)","cap","start")}`);

const IONIC=SVG(460,280,"Ionic bonding in sodium chloride",`
<circle cx="90" cy="80" r="42" class="d-no"/>${T(90,85,"Na","big")}${ring(90,80,42,[0],"x")}
<circle cx="260" cy="80" r="42" class="d-no"/>${T(260,85,"Cl","big")}${ring(260,80,42,[80,100,170,190,260,280,350])}
<path d="M136 72 Q175 30 212 66" class="d-ar red"/>
${N(175,24,1,"1 electron transferred")}
${A(175,140,175,168)}
<circle cx="110" cy="220" r="36" class="d-c4"/>${T(110,226,"Na⁺","big")}
<circle cx="260" cy="220" r="40" class="d-c1"/>${T(260,226,"Cl⁻","big")}${ring(260,220,40,[80,100,170,190,260,280,350])}${ring(260,220,40,[10],"x")}
${N(110,272,2,"Lost an electron: +1")}${N(290,272,3,"Gained an electron: −1")}
${T(395,215,"Opposite charges","cap")}${T(395,231,"attract strongly","cap")}`);

const ELEC=SVG(520,280,"Electrolysis apparatus",`
<path d="M100 90 L100 250 L320 250 L320 90" class="d-glassw"/><rect x="102" y="118" width="216" height="130" class="d-water"/>
<rect x="150" y="66" width="14" height="150" rx="2" class="d-c6"/><rect x="256" y="66" width="14" height="150" rx="2" class="d-c6"/>
<path d="M157 66 L157 30 L200 30 M212 30 L263 30 L263 66" class="d-wire"/><path d="M200 16 L200 44 M212 22 L212 38" class="d-line"/>
${T(196,14,"+","sm","end")}${T(218,14,"−","sm","start")}
<circle cx="146" cy="190" r="3" class="d-bub"/><circle cx="142" cy="205" r="3.5" class="d-bub"/><circle cx="147" cy="215" r="2.5" class="d-bub"/>
<circle cx="275" cy="195" r="3" class="d-bub"/><circle cx="279" cy="210" r="3.5" class="d-bub"/><circle cx="274" cy="214" r="2.5" class="d-bub"/>
<circle cx="225" cy="150" r="9" class="d-c2"/>${T(225,154,"+","sm")}${A(236,150,250,150,"red")}
<circle cx="195" cy="200" r="9" class="d-c1"/>${T(195,204,"−","sm")}${A(184,200,170,200,"blue")}
${L(150,140,60,140,1,"Anode (+)","end")}${L(270,120,350,110,2,"Cathode (−)")}${L(300,230,350,236,3,"Electrolyte")}`,-60);

const PROFILE=SVG(520,280,"Reaction profile for an exothermic reaction",`
<path d="M40 14 L40 240 L440 240" class="d-no"/>${T(48,12,"Energy","cap","start")}${T(240,262,"Progress of reaction","cap")}
<path d="M60 100 L130 100 C170 100 180 40 205 40 C230 40 240 180 280 180 L400 180" class="d-line" style="stroke:#D2433B"/>
<path d="M130 100 L350 100" class="d-ln" stroke-dasharray="4 4"/>
${A(205,100,205,44)}${A(330,100,330,176)}
${N(90,84,1,"Reactants")}${N(350,200,2,"Products")}
${L(205,72,150,58,3,"Activation energy","end")}${L(330,138,356,128,4,"Energy given out")}`);

const RATE=(()=>{const c=t=>{let d="";for(let x=0;x<=360;x+=4){const y=220-170*(1-Math.exp(-x/t));d+=(x?" L":"M")+(50+x)+" "+y.toFixed(1)}return d};
return SVG(460,270,"Volume of gas produced over time at two temperatures",`
<path d="M50 14 L50 220 L420 220" class="d-no"/>${T(58,12,"Volume of gas (cm³)","cap","start")}${T(235,250,"Time (s)","cap")}
<path d="${c(35)}" class="d-line" style="stroke:#D2433B"/><path d="${c(110)}" class="d-line" style="stroke:#2F6FD6"/>
${L(90,120,150,90,1,"Higher temperature: steeper = faster")}
${L(200,110,240,150,2,"Lower temperature: slower")}
${T(410,42,"Same total volume at the end","cap","end")}`)})();

const FRAC=SVG(460,290,"Fractional distillation of crude oil",`
<defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE0FB"/><stop offset="1" stop-color="#F6B26B"/></linearGradient></defs>
<rect x="160" y="20" width="80" height="250" rx="8" fill="url(#fg)" class="d-no"/>
${[50,92,134,176,218].map(y=>`<path d="M162 ${y+12} L238 ${y+12}" class="d-ln"/>`).join("")}
${A(60,252,158,252)}${T(60,240,"Hot crude oil","cap","start")}${T(60,272,"vapour in","cap","start")}
${T(150,40,"cool","cap","end")}${T(150,200,"hot","cap","end")}
${A(240,40,282,40)}${A(240,82,282,82)}${A(240,124,282,124)}${A(240,166,282,166)}${A(240,208,282,208)}${A(200,272,200,286)}
${N(350,40,1,"Refinery gases")}${N(350,82,2,"Petrol")}${N(350,124,3,"Kerosene")}${N(350,166,4,"Diesel")}${N(350,208,5,"Heavy fuel oil")}${N(300,282,6,"Bitumen")}`);

const CHROMA=SVG(460,280,"Paper chromatography",`
<rect x="130" y="16" width="150" height="250" class="d-c0"/><rect x="110" y="240" width="190" height="34" class="d-water"/>
<path d="M130 40 L280 40" class="d-ln" stroke-dasharray="5 4"/><path d="M130 220 L280 220" class="d-line" stroke-dasharray="2 3"/>
<circle cx="170" cy="150" r="7" fill="#D2433B"/><circle cx="170" cy="90" r="7" fill="#2F6FD6"/><circle cx="240" cy="150" r="7" fill="#D2433B"/>
${T(170,236,"A","sm")}${T(240,236,"B","sm")}
${A(300,220,300,154)}${A(330,220,330,44)}${T(306,190,"a","sm","start")}${T(336,130,"b","sm","start")}
${L(130,40,70,40,1,"Solvent front","end")}${L(130,220,70,210,2,"Pencil start line","end")}${L(115,256,70,256,3,"Solvent","end")}
${T(-50,110,"Rf = a ÷ b","big","start")}${T(-50,130,"A has 2 substances;","cap","start")}${T(-50,146,"B matches one.","cap","start")}`,-60);

const GREEN=SVG(480,270,"The greenhouse effect",`
<rect x="0" y="80" width="480" height="44" class="d-c1" opacity=".7"/>${T(470,108,"Atmosphere","cap","end")}
<rect x="0" y="222" width="480" height="48" class="d-grass"/>${T(470,252,"Earth's surface","cap","end")}
<circle cx="44" cy="36" r="22" class="d-light"/>
${A(60,58,110,218)}${A(170,218,220,20,"red")}${A(290,218,330,108,"red")}${A(340,108,390,218,"red")}
${N(140,150,1,"Sunlight in")}${N(290,40,2,"Infrared escapes")}${N(370,66,3,"Absorbed, re-emitted")}${N(422,190,4,"Warms Earth")}`);

const WATER=SVG(460,220,"Making potable water",`
${BN(10,16,190,48,"c1",1,"Choose a fresh source")}${BN(260,16,190,48,"c6",2,"Filter: sand and gravel")}
${BN(260,140,190,48,"c4",3,"Sterilise: chlorine, UV")}${BN(10,140,190,48,"c3",4,"Potable water")}
${A(202,40,258,40)}${A(355,66,355,138)}${A(258,164,202,164)}
${T(105,90,"removes solids","cap")}${T(355,212,"kills microbes","cap")}`);

window.LESSONS.chemistry.push(
{id:"atoms",topic:"C1",title:"Atomic structure and the periodic table",mins:9,steps:[
 {t:"learn",h:"Inside an atom",html:`<div class="tbl"><table><tr><th>Particle</th><th>Relative mass</th><th>Charge</th><th>Where</th></tr><tr><td>Proton</td><td>1</td><td>+1</td><td>Nucleus</td></tr><tr><td>Neutron</td><td>1</td><td>0</td><td>Nucleus</td></tr><tr><td>Electron</td><td>Very small</td><td>−1</td><td>Shells</td></tr></table></div><p><b>Atomic number</b> = protons. <b>Mass number</b> = protons + neutrons. Atoms have no overall charge, so electrons = protons.</p>`},
 {t:"diagram",h:"Electron shells",svg:ATOM,html:`<p>Shells fill in order: <b>2, then 8, then 8</b>. The number of outer electrons gives the <b>group</b>; the number of shells gives the <b>period</b>.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>Chlorine has atomic number 17 and mass number 35. Find its protons, neutrons, electrons and electron arrangement.</b></p><ol class="steps"><li>Protons = 17; electrons = 17.</li><li>Neutrons = 35 − 17 = <b>18</b>.</li><li>Arrangement: <b>2, 8, 7</b>, so it's in Group 7.</li></ol>`},
 {t:"learn",h:"Groups that come up",html:`<ul><li><b>Group 1 (alkali metals)</b>: one outer electron; react with water to make hydrogen and an alkali; more reactive going down.</li><li><b>Group 7 (halogens)</b>: seven outer electrons; less reactive going down; a more reactive halogen displaces a less reactive one.</li><li><b>Group 0 (noble gases)</b>: full outer shell, so very unreactive.</li></ul>`},
 {t:"q",h:"Quick check",q:"Isotopes of an element have different numbers of what?",o:["Protons","Electrons","Neutrons","Shells"],a:2,ex:"Isotopes: same number of protons, different number of neutrons."},
 {t:"q",h:"Your turn",q:"Why does reactivity increase down Group 1?",o:["The atoms gain more outer electrons","The outer electron is further from the nucleus, so it is lost more easily","The nucleus has fewer protons","The atoms get smaller"],a:1,ex:"More shells means weaker attraction to the outer electron, so it is lost more easily."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying reactivity increases down <b>Group 7</b> too. It's the opposite: halogens get <b>less</b> reactive going down, because it gets harder to <b>gain</b> an electron.</p>`},
 {t:"sum",h:"Summary",bullets:["Protons +1, neutrons 0, electrons −1","Neutrons = mass number − atomic number","Shells: 2, 8, 8","Outer electrons = group; shells = period","Group 1 more reactive down; Group 7 less reactive down"]}]},

{id:"bonding",topic:"C2",title:"Ionic, covalent and metallic bonding",mins:10,steps:[
 {t:"learn",h:"Three types of bond",html:`<div class="tbl"><table><tr><th>Bond</th><th>Between</th><th>What happens</th></tr><tr><td><b>Ionic</b></td><td>Metal + non-metal</td><td>Electrons are <b>transferred</b> to form ions</td></tr><tr><td><b>Covalent</b></td><td>Non-metals</td><td>Pairs of electrons are <b>shared</b></td></tr><tr><td><b>Metallic</b></td><td>Metals</td><td>Positive ions in a sea of <b>delocalised electrons</b></td></tr></table></div>`},
 {t:"diagram",h:"Ionic bonding: sodium chloride",svg:IONIC,html:`<p>Both ions end up with a full outer shell. The ions form a <b>giant ionic lattice</b> held by strong electrostatic forces in all directions.</p>`},
 {t:"learn",h:"Structure explains properties",html:`<ul><li><b>Giant ionic</b>: high melting point; conducts only when <b>molten or dissolved</b> (ions free to move).</li><li><b>Simple molecules</b> (H₂O, CO₂): low melting point because the <b>forces between molecules</b> are weak; don't conduct.</li><li><b>Giant covalent</b>: diamond is very hard (4 bonds each); graphite conducts and is slippery (layers, 1 delocalised electron per carbon).</li><li><b>Metals</b>: conduct heat and electricity (delocalised electrons); malleable because layers slide.</li></ul>`},
 {t:"example",h:"Worked example: a 3-mark answer",html:`<p><b>Explain why sodium chloride has a high melting point.</b></p><p>It has a <b>giant ionic lattice</b> (1) with <b>strong electrostatic forces</b> between oppositely charged ions (1). A lot of <b>energy</b> is needed to overcome them (1).</p>`},
 {t:"q",h:"Quick check",q:"Why does solid sodium chloride not conduct electricity?",o:["It has no electrons","Its ions can't move","It is covalent","It is a metal"],a:1,ex:"The ions are fixed in the lattice. When melted or dissolved they can move and carry charge."},
 {t:"q",h:"Your turn",q:"When water boils, what is overcome?",o:["The covalent bonds inside the molecules","The weak forces between molecules","The ionic bonds","The metallic bonds"],a:1,ex:"Boiling separates molecules; the covalent bonds inside each molecule stay intact."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying simple molecular substances have low boiling points because "the covalent bonds are weak". Covalent bonds are <b>strong</b>. It's the <b>intermolecular forces</b> that are weak.</p>`},
 {t:"sum",h:"Summary",bullets:["Ionic: transfer; covalent: share; metallic: sea of electrons","Ionic compounds conduct when molten or dissolved","Simple molecules: weak intermolecular forces, low boiling points","Diamond hard; graphite conducts","Alloys are harder: different-sized atoms stop layers sliding"]}]},

{id:"electrolysis",topic:"C4",title:"Acids, reactivity and electrolysis",mins:10,steps:[
 {t:"learn",h:"Acids and salts",html:`<div class="formula">acid + metal → salt + hydrogen</div><div class="formula">acid + alkali → salt + water</div><div class="formula">acid + carbonate → salt + water + carbon dioxide</div><p>Hydrochloric acid makes <b>chlorides</b>, sulfuric acid makes <b>sulfates</b>, nitric acid makes <b>nitrates</b>. Acids have pH below 7 and contain H⁺ ions; alkalis contain OH⁻ ions.</p>`},
 {t:"learn",h:"Reactivity and extraction",html:`<p>Potassium, sodium, lithium, calcium, magnesium, (carbon), zinc, iron, (hydrogen), copper.</p><ul><li>Metals <b>less reactive than carbon</b> are extracted by heating with carbon (reduction), e.g. iron.</li><li>Metals <b>more reactive than carbon</b> are extracted by <b>electrolysis</b>, e.g. aluminium.</li><li><b>OIL RIG</b>: Oxidation Is Loss (of electrons), Reduction Is Gain.</li></ul>`},
 {t:"diagram",h:"Electrolysis",svg:ELEC,html:`<p>Positive ions go to the <b>cathode</b> (−) and gain electrons. Negative ions go to the <b>anode</b> (+) and lose electrons. The ions must be free to move: <b>molten or dissolved</b>.</p>`},
 {t:"example",h:"Worked example: solutions",html:`<p><b>What forms at each electrode when sodium chloride solution is electrolysed?</b></p><ol class="steps"><li>Cathode: sodium is more reactive than hydrogen, so <b>hydrogen</b> forms.</li><li>Anode: a halide is present, so <b>chlorine</b> forms.</li><li>Sodium hydroxide is left in solution.</li></ol>`},
 {t:"q",h:"Quick check",q:"What salt forms when magnesium reacts with sulfuric acid?",o:["Magnesium chloride","Magnesium sulfate","Magnesium nitrate","Magnesium sulfide"],a:1,ex:"Sulfuric acid makes sulfates."},
 {t:"q",h:"Your turn",q:"In electrolysis of copper sulfate solution, what forms at the cathode?",o:["Hydrogen","Oxygen","Copper","Sulfur"],a:2,ex:"Copper is less reactive than hydrogen, so copper is deposited."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up the electrodes. <b>PANIC</b>: Positive Anode, Negative Is Cathode. Positive ions (cations) go to the cathode.</p>`},
 {t:"sum",h:"Summary",bullets:["Acid + metal → salt + hydrogen; + carbonate also gives CO₂","Below carbon: reduce with carbon; above carbon: electrolysis","OIL RIG","Cathode: metal or hydrogen; anode: halogen or oxygen","Ions must be free to move"]}]},

{id:"energychem",topic:"C5",title:"Exothermic and endothermic reactions",mins:8,steps:[
 {t:"learn",h:"Energy in reactions",html:`<ul><li><b>Exothermic</b>: gives out energy to the surroundings, so the temperature <b>rises</b>. Examples: combustion, neutralisation, respiration, hand warmers.</li><li><b>Endothermic</b>: takes in energy, so the temperature <b>falls</b>. Examples: thermal decomposition, photosynthesis, sports cold packs.</li></ul>`},
 {t:"diagram",h:"A reaction profile",svg:PROFILE,html:`<p>In an exothermic reaction the products have <b>less energy</b> than the reactants. The <b>activation energy</b> is the minimum energy needed for particles to react.</p>`},
 {t:"learn",h:"Bond energies (Higher)",html:`<p>Breaking bonds <b>takes in</b> energy. Making bonds <b>gives out</b> energy.</p><div class="formula">energy change = bonds broken − bonds made</div><p>A negative answer means exothermic; positive means endothermic.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>H₂ + Cl₂ → 2HCl. Bonds: H–H 436, Cl–Cl 242, H–Cl 431 kJ/mol.</b></p><ol class="steps"><li>Broken: 436 + 242 = 678.</li><li>Made: 2 × 431 = 862.</li><li>678 − 862 = <b>−184 kJ/mol</b>: exothermic.</li></ol>`},
 {t:"q",h:"Quick check",q:"In an endothermic reaction, what happens to the temperature of the surroundings?",o:["It rises","It falls","It stays the same","It doubles"],a:1,ex:"Energy is taken in from the surroundings, so they cool."},
 {t:"num",h:"Your turn",q:"Bonds broken total 2000 kJ/mol; bonds made total 2500 kJ/mol. What is the energy change in kJ/mol?",ans:-500,tol:.01,unit:"kJ/mol",ex:"2000 − 2500 = −500 kJ/mol (exothermic)."},
 {t:"mistake",h:"Common mistake",html:`<p>Thinking bond <b>breaking</b> releases energy. It always <b>needs</b> energy. Energy is released when new bonds <b>form</b>.</p>`},
 {t:"sum",h:"Summary",bullets:["Exothermic: temperature rises; endothermic: falls","Exothermic profile: products lower than reactants","Activation energy: the hump","Breaking bonds takes in energy; making bonds gives it out","Energy change = broken − made"]}]},

{id:"rates",topic:"C6",title:"Rates of reaction and equilibrium",mins:9,steps:[
 {t:"learn",h:"Collision theory",html:`<p>Particles react when they <b>collide</b> with at least the <b>activation energy</b>. Anything that makes successful collisions more frequent increases the rate:</p><ul><li><b>Temperature</b>: particles move faster, collide more often and with more energy.</li><li><b>Concentration or pressure</b>: more particles in the same space.</li><li><b>Surface area</b>: smaller pieces expose more particles.</li><li><b>Catalyst</b>: provides a route with a lower activation energy; it isn't used up.</li></ul>`},
 {t:"diagram",h:"Reading a rate graph",svg:RATE,html:`<p>The steeper the line, the faster the reaction. It levels off when a reactant has <b>run out</b>.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>60 cm³ of gas is made in 30 s. What is the mean rate?</b></p><p>mean rate = amount of product ÷ time = 60 ÷ 30 = <b>2 cm³/s</b>.</p>`},
 {t:"num",h:"Your turn",q:"A reaction loses 1.5 g of mass in 50 s. What is the mean rate in g/s?",ans:.03,tol:.0005,unit:"g/s",ex:"1.5 ÷ 50 = 0.03 g/s."},
 {t:"learn",h:"Reversible reactions",html:`<p>Some reactions go both ways (⇌). In a closed system they reach <b>equilibrium</b>: the forward and backward reactions happen at the same rate.</p><p><b>Le Chatelier's principle</b> (Higher): if conditions change, the equilibrium shifts to <b>oppose</b> the change. Raising the temperature favours the endothermic direction; raising the pressure favours the side with fewer gas molecules.</p>`},
 {t:"q",h:"Quick check",q:"Why does powder react faster than a lump of the same mass?",o:["It has a lower activation energy","It has a larger surface area","It is more concentrated","It is hotter"],a:1,ex:"More particles are exposed, so there are more frequent collisions."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying higher temperature means "more collisions" only. You need both: <b>more frequent</b> collisions and <b>more of them have enough energy</b> to react.</p>`},
 {t:"sum",h:"Summary",bullets:["Rate rises with temperature, concentration, surface area and catalysts","Mean rate = product ÷ time","Steeper graph = faster","Equilibrium: forward rate = backward rate","Equilibrium shifts to oppose a change"]}]},

{id:"organic",topic:"C7",title:"Crude oil, alkanes and cracking",mins:8,steps:[
 {t:"learn",h:"Crude oil and alkanes",html:`<p>Crude oil is a mixture of <b>hydrocarbons</b> (compounds of hydrogen and carbon only), mostly <b>alkanes</b>.</p><div class="formula">Alkanes: CₙH₂ₙ₊₂</div><p>Methane CH₄, ethane C₂H₆, propane C₃H₈, butane C₄H₁₀. Alkanes are <b>saturated</b>: only single C–C bonds.</p>`},
 {t:"diagram",h:"Fractional distillation",svg:FRAC,html:`<p>The column is hot at the bottom and cool at the top. Each fraction <b>condenses</b> at the level where the temperature drops below its boiling point.</p>`},
 {t:"learn",h:"Chain length and properties",html:`<p>Shorter chains: <b>lower boiling point</b>, more <b>flammable</b>, less <b>viscous</b> (runny). These are the most useful fuels.</p><p><b>Cracking</b> breaks long, less useful alkanes into shorter alkanes and <b>alkenes</b>, using a catalyst or steam at high temperature. Alkenes (C=C) turn <b>bromine water</b> from orange to colourless.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>Complete the cracking equation: C₁₀H₂₂ → C₈H₁₈ + ?</b></p><ol class="steps"><li>Carbon: 10 − 8 = 2.</li><li>Hydrogen: 22 − 18 = 4.</li><li>Answer: <b>C₂H₄</b> (ethene, an alkene).</li></ol>`},
 {t:"q",h:"Quick check",q:"Which fraction collects at the top of the column?",o:["Bitumen","Refinery gases","Diesel","Heavy fuel oil"],a:1,ex:"The smallest molecules have the lowest boiling points, so they rise furthest."},
 {t:"q",h:"Your turn",q:"What is the formula of the alkane with 5 carbon atoms?",o:["C₅H₁₀","C₅H₁₂","C₅H₈","C₅H₁₄"],a:1,ex:"CₙH₂ₙ₊₂: 2 × 5 + 2 = 12."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying fractional distillation <b>breaks</b> molecules. It only <b>separates</b> them by boiling point. Breaking molecules is cracking.</p>`},
 {t:"sum",h:"Summary",bullets:["Alkanes CₙH₂ₙ₊₂, saturated","Fractional distillation separates by boiling point","Short chains: low boiling point, flammable, runny","Cracking: long alkanes → short alkanes + alkenes","Alkenes decolourise bromine water"]}]},

{id:"analysis",topic:"C8",title:"Chromatography, purity and gas tests",mins:8,steps:[
 {t:"learn",h:"Pure substances",html:`<p>In chemistry, a <b>pure</b> substance is a single element or compound. It melts and boils at a <b>sharp, fixed temperature</b>. Impurities lower the melting point and make it melt over a range.</p><p>A <b>formulation</b> is a mixture designed for a purpose, e.g. paint, medicine, fertiliser.</p>`},
 {t:"diagram",h:"Paper chromatography",svg:CHROMA,html:`<p>Draw the start line in <b>pencil</b> (ink would run). Keep it <b>above</b> the solvent. Each substance moves a different distance depending on its attraction to the paper and the solvent.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>A spot moves 3.0 cm. The solvent front moves 7.5 cm. Find Rf.</b></p><p>Rf = distance moved by substance ÷ distance moved by solvent = 3.0 ÷ 7.5 = <b>0.4</b>.</p>`},
 {t:"num",h:"Your turn",q:"A spot moves 4.2 cm; the solvent moves 6.0 cm. What is the Rf value?",ans:.7,tol:.005,unit:"",ex:"4.2 ÷ 6.0 = 0.7. Rf has no units and is always less than 1."},
 {t:"learn",h:"The four gas tests",html:`<div class="tbl"><table><tr><th>Gas</th><th>Test</th><th>Result</th></tr><tr><td>Hydrogen</td><td>Lighted splint</td><td>Squeaky pop</td></tr><tr><td>Oxygen</td><td>Glowing splint</td><td>Relights</td></tr><tr><td>Carbon dioxide</td><td>Bubble through limewater</td><td>Turns milky</td></tr><tr><td>Chlorine</td><td>Damp litmus paper</td><td>Bleached white</td></tr></table></div>`},
 {t:"q",h:"Quick check",q:"Which gas relights a glowing splint?",o:["Hydrogen","Oxygen","Carbon dioxide","Chlorine"],a:1,ex:"Oxygen relights a glowing splint."},
 {t:"mistake",h:"Common mistake",html:`<p>Using a <b>lighted</b> splint to test for oxygen. Lighted splint = hydrogen (pop); <b>glowing</b> splint = oxygen (relights).</p>`},
 {t:"sum",h:"Summary",bullets:["Pure = one substance, sharp melting point","Pencil start line, above the solvent","Rf = substance distance ÷ solvent distance","H₂ pop; O₂ relights; CO₂ limewater milky; Cl₂ bleaches litmus"]}]},

{id:"atmos",topic:"C9",title:"The atmosphere and climate change",mins:8,steps:[
 {t:"learn",h:"How the atmosphere changed",html:`<p>Today: about <b>80% nitrogen</b>, <b>20% oxygen</b>, small amounts of argon, CO₂ and water vapour.</p><ol class="steps"><li>Early: mostly <b>CO₂</b> from volcanoes, little or no oxygen.</li><li>Water vapour condensed to form the <b>oceans</b>; CO₂ dissolved in them.</li><li><b>Algae and plants</b> photosynthesised: CO₂ fell and oxygen rose.</li><li>Carbon was locked up in <b>sedimentary rocks</b> and <b>fossil fuels</b>.</li></ol>`},
 {t:"diagram",h:"The greenhouse effect",svg:GREEN,html:`<p>Greenhouse gases (<b>CO₂, methane, water vapour</b>) absorb infrared radiated by the Earth and re-emit it, warming the lower atmosphere. More of them means more warming.</p>`},
 {t:"learn",h:"Human causes and effects",html:`<ul><li>More CO₂ from <b>burning fossil fuels</b> and <b>deforestation</b>; more methane from <b>cattle</b> and <b>rice paddies</b>.</li><li>Effects: sea level rise, more extreme weather, changes to rainfall, habitat loss.</li><li><b>Carbon footprint</b>: the total greenhouse gases released over the life of a product or activity.</li></ul>`},
 {t:"example",h:"Worked example: pollutants",html:`<p><b>Name two pollutants from burning fuel and their effects.</b></p><p><b>Carbon monoxide</b> (incomplete combustion): toxic, stops blood carrying oxygen. <b>Sulfur dioxide</b>: causes acid rain and breathing problems. Also <b>soot</b> (global dimming) and <b>nitrogen oxides</b> (acid rain).</p>`},
 {t:"q",h:"Quick check",q:"Which process removed most of the CO₂ from the early atmosphere?",o:["Volcanoes","Photosynthesis and dissolving in oceans","Combustion","Respiration"],a:1,ex:"CO₂ dissolved in the oceans and was used by algae and plants in photosynthesis."},
 {t:"q",h:"Your turn",q:"Why is carbon monoxide dangerous?",o:["It causes acid rain","It is toxic and stops blood carrying oxygen","It destroys the ozone layer","It causes global dimming"],a:1,ex:"CO binds to haemoglobin in red blood cells."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up the greenhouse effect with the <b>ozone hole</b>. They are different problems. And the greenhouse effect itself is natural; it's the <b>enhanced</b> effect from extra gases that causes climate change.</p>`},
 {t:"sum",h:"Summary",bullets:["Now: ~80% N₂, ~20% O₂","Early CO₂ dissolved in oceans and was used by plants","Greenhouse gases: CO₂, methane, water vapour","Humans add CO₂ (fossil fuels, deforestation) and methane (cattle, rice)","CO toxic; SO₂ and NOₓ acid rain; soot dimming"]}]},

{id:"resources",topic:"C10",title:"Using resources and potable water",mins:8,steps:[
 {t:"learn",h:"Sustainability",html:`<p>Sustainable development meets today's needs <b>without stopping future generations</b> from meeting theirs. Chemistry helps by finding ways to use less, reuse and recycle, and by replacing finite resources with renewable ones.</p>`},
 {t:"diagram",h:"Making potable water in the UK",svg:WATER,html:`<p><b>Potable</b> water is safe to drink. It isn't <b>pure</b>: it still has dissolved substances, but low levels of salts and microbes.</p>`},
 {t:"learn",h:"Other water and LCAs",html:`<ul><li><b>Desalination</b> of seawater (distillation or reverse osmosis) needs lots of <b>energy</b>, so it's used where fresh water is scarce.</li><li><b>Waste water</b> is screened, then sedimentation, then anaerobic digestion of the sludge and aerobic treatment of the effluent.</li><li>A <b>life cycle assessment (LCA)</b> looks at environmental impact at every stage: raw materials, manufacture, use and disposal.</li></ul>`},
 {t:"example",h:"Worked example: LCA",html:`<p><b>Compare plastic and paper bags.</b></p><p>Plastic bags come from <b>crude oil</b> (finite) but use less energy to make and can be reused many times. Paper bags come from <b>trees</b> (renewable) and biodegrade, but use more energy and water to make. Some LCA values are <b>subjective</b>, e.g. how much pollution to count.</p>`},
 {t:"q",h:"Quick check",q:"What is used to sterilise drinking water?",o:["Sand","Chlorine, ozone or UV light","Salt","Filter paper"],a:1,ex:"Sterilising kills microbes. Filtering removes solids."},
 {t:"q",h:"Your turn",q:"Why is desalination not used much in the UK?",o:["The water isn't potable","It needs lots of energy and the UK has plenty of fresh water","It makes the water salty","It is illegal"],a:1,ex:"Desalination is expensive in energy, so it's used where fresh water is scarce."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying potable water is pure. In chemistry, <b>pure</b> means a single substance; potable water contains dissolved salts.</p>`},
 {t:"sum",h:"Summary",bullets:["Sustainable: meet needs now and in the future","Potable water: filter, then sterilise","Desalination uses lots of energy","LCA: raw materials → manufacture → use → disposal","Reduce, reuse, recycle saves resources and energy"]}]}
);
})();
