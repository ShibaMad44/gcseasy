/* Geography topic lessons (AQA 8035), one per topic. Uses the case studies in the notes. */
(function(){const {L,B,A,T,SVG,N,BN}=window.LSN;window.LESSONS=window.LESSONS||{};
const RP=[[160,12],[310,88],[270,210],[50,210],[10,88]],RA=[[320,40,370,86],[390,130,360,208],[268,230,212,230],[110,208,90,130],[100,86,158,40]];
const RING=(label,items,cols,cap)=>SVG(480,262,label,`${items.map((t,i)=>`<rect x="${RP[i][0]}" y="${RP[i][1]}" width="160" height="40" rx="9" class="d-${cols[i]}"/>${N(RP[i][0]+80,RP[i][1]+20,i+1,t)}`).join("")}${RA.map(a=>A(...a)).join("")}${T(240,150,cap,"cap")}`);
const box=(x,y,w,h,c,n,t,sub)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" class="d-${c}"/>${N(x+w/2,y+(sub?h/2-7:h/2),n,t)}${sub?T(x+w/2,y+h/2+16,sub,"cap"):""}`;

const PLATE=SVG(480,280,"A destructive plate margin",`
<rect x="0" y="100" width="480" height="180" class="d-c4"/>
<rect x="240" y="90" width="240" height="32" class="d-sea"/>
<path d="M0 100 L235 100 L262 120 L240 182 L0 182 Z" class="d-land"/>
<path d="M480 120 L265 120 L190 262 L222 262 L285 145 L480 145 Z" class="d-rock"/>
<path d="M90 100 L130 42 L170 100 Z" class="d-c6"/>
<path d="M222 210 C200 170 150 140 130 50" fill="none" stroke="#E06666" stroke-width="5" stroke-dasharray="7 5"/>
${A(470,133,390,133)}
${N(70,150,1,"Continental")}${N(400,166,2,"Oceanic plate (denser)")}
${L(210,236,170,252,3,"Subduction zone","end")}
${L(130,46,196,24,4,"Composite volcano")}
${L(266,121,300,58,5,"Ocean trench")}`);

const CELLS=SVG(480,290,"Global atmospheric circulation",`
<rect x="20" y="202" width="400" height="10" class="d-grass"/>
${A(44,190,44,74)}${A(52,64,148,64)}${A(156,74,156,190)}${A(148,196,52,196)}
${A(168,74,168,190)}${A(176,196,268,196)}${A(276,190,276,74)}${A(268,64,176,64)}
${A(288,190,288,74)}${A(296,64,392,64)}${A(400,74,400,190)}${A(392,196,296,196)}
${T(100,134,"Hadley cell","cap")}${T(222,134,"Ferrel cell","cap")}${T(344,134,"Polar cell","cap")}
${T(44,228,"0°","sm")}${T(162,228,"30°","sm")}${T(282,228,"60°","sm")}${T(400,228,"90°","sm")}
${N(44,252,1,"Low: wet")}${N(162,252,2,"High: dry")}${N(282,252,3,"Low: wet (UK)")}${N(400,252,4,"High: cold")}
${T(44,276,"rainforests","cap")}${T(162,276,"hot deserts","cap")}${T(282,276,"rising air","cap")}${T(400,276,"sinking air","cap")}`);

const CLIM=SVG(480,260,"Mitigation and adaptation",`
${B(10,10,220,44,"c3","Mitigation","reduce the causes")}${B(250,10,220,44,"c1","Adaptation","live with the effects")}
${box(10,66,220,38,"c0",1,"Renewable energy")}${box(10,112,220,38,"c0",2,"Carbon capture")}${box(10,158,220,38,"c0",3,"Planting trees")}${box(10,204,220,38,"c0",4,"Paris Agreement")}
${box(250,66,220,38,"c0",5,"Drought-resistant crops")}${box(250,112,220,38,"c0",6,"Water management")}${box(250,158,220,38,"c0",7,"Coastal defences")}`);

const CHAIN=SVG(480,250,"A food chain with decomposers",`
${[["Oak leaves","c3"],["Caterpillar","c4"],["Blue tit","c1"],["Sparrowhawk","c2"]].map(([t,c],i)=>B(10+i*120,30,100,40,c,t)).join("")}
${A(112,50,128,50)}${A(232,50,248,50)}${A(352,50,368,50)}
${N(60,94,1,"Producer")}${N(180,94,2,"Primary")}${N(300,94,3,"Secondary")}${N(420,94,4,"Tertiary")}
${T(180,112,"consumer","cap")}${T(300,112,"consumer","cap")}${T(420,112,"consumer","cap")}
${B(130,180,220,40,"c6","Decomposers")}
${A(60,74,180,178,"dash")}${A(420,118,300,178,"dash")}
${T(240,240,"Break down dead material and return nutrients to the soil","cap")}`);

const tree=(x,y,rx,ry)=>`<path d="M${x} 280 L${x} ${y}" stroke="#8a6a45" stroke-width="${Math.max(3,rx/6)}"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" class="d-grass"/>`;
const LAYERS=SVG(520,290,"Layers of the tropical rainforest",`
<rect x="0" y="278" width="520" height="12" class="d-land"/>
${tree(64,40,40,16)}${[120,180,240,300].map(x=>tree(x,100,38,22)).join("")}${tree(150,168,22,14)}${tree(270,168,22,14)}
${[110,210,300].map(x=>`<ellipse cx="${x}" cy="256" rx="26" ry="14" class="d-c3"/>`).join("")}
${L(104,40,340,40,1,"Emergent: up to 50 m")}${L(336,100,350,100,2,"Canopy: about 30 m")}${L(292,168,350,168,3,"Under canopy: 20 m")}${L(326,256,350,256,4,"Shrub layer: dark")}`);

const DESERT=RING("The desertification cycle",["Population grows","Overgrazing, firewood","Fewer plants","Soil dries, erodes","Less fertile land"],["c5","c2","c4","c6","c2"],"Each step makes the next one worse");

const HEAD=SVG(440,240,"Cave, arch, stack and stump",`
<rect x="0" y="150" width="440" height="90" class="d-sea"/>
<path d="M0 70 L70 70 L70 240 L0 240 Z" class="d-rock"/>
<path d="M70 70 L150 70 L150 150 L132 150 Q120 116 108 150 L70 150 Z" class="d-rock"/>
<path d="M170 80 L250 80 L250 150 L232 150 L232 126 Q210 100 188 126 L188 150 L170 150 Z" class="d-rock"/>
<path d="M280 92 L310 92 L312 150 L278 150 Z" class="d-rock"/><path d="M340 136 L372 136 L374 150 L338 150 Z" class="d-rock"/>
${N(118,48,1,"Cave")}${N(210,58,2,"Arch")}${N(295,70,3,"Stack")}${N(356,114,4,"Stump")}
${A(80,196,400,196)}${T(240,222,"over time: erosion, weathering, collapse","cap")}`);

const FALL=SVG(480,290,"How a waterfall forms",`
<rect x="0" y="68" width="250" height="12" class="d-sea"/>
<path d="M0 80 L250 80 L250 112 L0 112 Z" class="d-c6"/><path d="M0 112 L220 112 L232 250 L0 250 Z" class="d-land"/>
<path d="M232 210 L480 210 L480 250 L232 250 Z" class="d-land"/><path d="M238 210 Q266 252 300 210 Z" class="d-sea"/><rect x="300" y="202" width="180" height="8" class="d-sea"/>
<path d="M250 74 C262 90 264 150 264 208" fill="none" stroke="#6FA8DC" stroke-width="8"/>
${A(430,150,320,150)}${T(375,140,"retreats upstream","cap")}
${L(80,96,96,32,1,"Hard rock (resistant)")}${L(100,190,120,272,2,"Soft rock: erodes faster")}${L(244,104,330,64,3,"Overhang")}${L(268,224,340,256,4,"Plunge pool")}`);

const URB=SVG(480,270,"Percentage of the world's people living in urban areas",`
<path d="M60 20 L60 220 L440 220" class="d-no"/><path d="M60 120 L440 120" class="d-ln" stroke-dasharray="3 4"/>
${T(54,224,"0%","sm","end")}${T(54,124,"50%","sm","end")}${T(54,24,"100%","sm","end")}
${T(60,238,"1950","sm")}${T(240,238,"2000","sm")}${T(420,238,"2050","sm")}${T(240,260,"Year","cap")}
<path d="M60 160 C140 145 210 130 265 120 L330 106" class="d-line" style="stroke:#2F6FD6"/><path d="M330 106 L420 84" class="d-line" style="stroke:#2F6FD6" stroke-dasharray="6 5"/>
${L(60,160,90,192,1,"1950: 30%")}${L(265,120,200,70,2,"2007: over half")}${L(420,84,410,40,3,"2050: about 68%","end")}`);

const RIO=SVG(480,290,"Chain of explanation for Rio's favelas",`
${["Rural-urban migration","Favelas on steep land","No sewers or bins","Disease spreads","High infant mortality"].map((t,i)=>B(10,10+i*56,200,40,["c5","c6","c2","c2","c2"][i],t)).join("")}
${[0,1,2,3].map(i=>A(110,52+i*56,110,64+i*56)).join("")}
${T(370,30,"Favela Bairro fixes","big")}
${box(270,46,200,40,"c3",1,"UPP pushes out gangs")}${box(270,94,200,40,"c3",2,"Cable car to Ipanema")}${box(270,142,200,40,"c3",3,"Wider, paved roads")}${box(270,190,200,40,"c3",4,"Adult education")}
${A(268,162,212,162,"dash")}${T(370,252,"$1 billion budget","cap")}${T(370,268,"for one group of favelas","cap")}`);

const MULT=RING("The multiplier effect in Cambridge",["Science firms grow","More jobs","Workers spend","Shop, service jobs","More tax"],["c5","c3","c4","c3","c1"],"More tax → better infrastructure → more firms");

const EDD=SVG(480,250,"How Eddington is sustainable",`
<path d="M240 125 L105 45 M240 125 L375 45 M240 125 L105 205 M240 125 L375 205" class="d-ln"/>
${B(165,100,150,50,"c5","Eddington","west Cambridge")}
${box(10,16,190,58,"c4",1,"Energy","district heating")}${box(280,16,190,58,"c1",2,"Water","swales and a lake")}
${box(10,176,190,58,"c6",3,"Green space","1,000 trees")}${box(280,176,190,58,"c3",4,"Transport","20-minute community")}`);

const CPT=[[275,292,1,"Cambridge South Station"],[243,286,2,"Biomedical Campus"],[296,206,3,"Leisure Park"],[268,232,4,"Cambridge Station"],[242,240,5,"Station Road (CB1)"],[300,140,6,"Cambridge North"],[266,122,7,"Science Park"],[226,116,8,"Orchard Park"],[194,136,9,"Darwin Green"],[158,176,10,"Eddington"],[204,304,11,"Trumpington Meadows"]];
const CAMMAP=SVG(480,480,"Sketch map of Cambridge",`
<rect x="0" y="0" width="480" height="352" rx="10" class="d-land"/>
${[[234,194,118,98],[234,194,202,92],[234,194,306,92],[234,194,430,176],[234,194,336,250],[234,194,292,346],[234,194,214,346],[234,194,60,196]].map(r=>`<path d="M${r[0]} ${r[1]} L${r[2]} ${r[3]}" class="d-ln" stroke-dasharray="2 3"/>`).join("")}
<path d="M20 84 L460 84" class="d-line" style="stroke:#D9822B"/><path d="M96 84 L176 350" class="d-line" style="stroke:#2F6FD6"/><path d="M404 84 L470 300" class="d-line" style="stroke:#D9822B"/>
<path d="M336 4 L300 140 L268 232 L275 292 L262 350" fill="none" stroke="#555" stroke-width="3" stroke-dasharray="8 5"/>
<circle cx="234" cy="194" r="22" class="d-c5"/>${T(234,198,"Centre","sm")}
${T(30,78,"A14","sm","start")}${T(116,320,"M11","sm","start")}${T(456,250,"A11","sm","end")}${T(344,16,"to Ely","sm","start")}${T(270,346,"to London","sm","start")}
<circle cx="70" cy="40" r="12" class="d-c6"/>${T(88,44,"Northstowe (commuter town)","sm","start")}
${CPT.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="10" class="d-nb"/><text x="${p[0]}" y="${p[1]+4}" text-anchor="middle" class="d-nt">${p[2]}</text>`).join("")}
${CPT.map((p,i)=>{const c=i<6?0:1,r=i<6?i:i-6;return `<circle cx="${18+c*236}" cy="${376+r*18}" r="8" class="d-nb"/><text x="${18+c*236}" y="${380+r*18}" text-anchor="middle" class="d-nt">${p[2]}</text>${T(32+c*236,380+r*18,p[3],"sm","start")}`}).join("")}`);

window.LESSONS.geography=[
{id:"tectonic",topic:"A1",title:"Plate margins and tectonic hazards",mins:10,steps:[
 {t:"learn",h:"Why plates move",html:`<p>The Earth's crust is split into <b>tectonic plates</b>. <b>Continental</b> plates are thicker and less dense; <b>oceanic</b> plates are thinner and denser.</p><p>They move because of <b>convection currents</b> in the mantle (Higher: also <b>ridge push</b> and <b>slab pull</b>). Earthquakes and volcanoes happen along <b>plate margins</b>, like the Pacific Ring of Fire.</p>`},
 {t:"learn",h:"The three margins",html:`<div class="tbl"><table><tr><th>Margin</th><th>Movement</th><th>Hazards</th></tr><tr><td><b>Constructive</b></td><td>Apart: magma rises to fill the gap</td><td>Gentle eruptions, small earthquakes</td></tr><tr><td><b>Destructive</b></td><td>Oceanic subducts under continental</td><td>Explosive eruptions, strong earthquakes, tsunamis</td></tr><tr><td><b>Conservative</b></td><td>Slide past each other</td><td>Strong earthquakes, no volcanoes</td></tr></table></div>`},
 {t:"diagram",h:"A destructive margin",svg:PLATE,html:`<p>The denser oceanic plate is forced under the continental plate (<b>subduction</b>). It melts into magma, which rises and erupts <b>explosively</b> because it is thick and full of gas. Friction also causes earthquakes.</p>`},
 {t:"example",h:"Worked example: a 4-mark answer",html:`<p><b>Explain why people continue to live in areas at risk from tectonic hazards.</b></p><p>Volcanic soils are <b>fertile</b>, so farming is productive (1), e.g. olives around Mt Vesuvius (1). <b>Geothermal energy</b> is cheap (1): it supplies about 65% of Iceland's energy (1). People may also lack the money to move, or feel the risk is managed by monitoring.</p>`},
 {t:"q",h:"Quick check",q:"At which margin are there strong earthquakes but no volcanoes?",o:["Constructive","Destructive","Conservative","None of them"],a:2,ex:"Plates slide past each other, so no magma rises, but friction builds pressure and is released suddenly."},
 {t:"q",h:"Your turn",q:"Which of these is a secondary effect of an earthquake?",o:["Buildings collapse from shaking","People are killed by falling debris","A tsunami floods the coast","Roads crack"],a:2,ex:"Secondary effects are caused by the primary effects: tsunamis, fires, landslides, disease, homelessness."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up the <b>four Ps</b> of reducing risk. <b>Monitoring</b> (seismometers, tiltmeters), <b>prediction</b> (thermal satellite maps; earthquakes can't be predicted, only where), <b>planning</b> (evacuation routes, drills) and <b>protection</b> (earthquake-proof buildings with shock absorbers).</p>`},
 {t:"sum",h:"Summary",bullets:["Convection currents move the plates","Constructive: apart; destructive: subduction; conservative: sideways","Primary effects from the hazard; secondary from the primary effects","People stay for fertile soil, geothermal energy, minerals, tourism","Monitoring, prediction, planning, protection"]}]},

{id:"weather",topic:"A2",title:"Atmospheric circulation and tropical storms",mins:10,steps:[
 {t:"learn",h:"Pressure and wind",html:`<p><b>Warm air rises</b>, making <b>low pressure</b>: clouds and rain. <b>Cool air sinks</b>, making <b>high pressure</b>: clear, dry skies. Wind blows from high to low pressure, curved by the Earth's spin (the <b>Coriolis effect</b>).</p>`},
 {t:"diagram",h:"Global atmospheric circulation",svg:CELLS,html:`<p>Three loops in each hemisphere explain where rainforests (0°), hot deserts (30°) and wet places like the UK (60°) are found.</p>`},
 {t:"learn",h:"How a tropical storm forms",html:`<ol class="steps"><li>Sea at least <b>26 °C</b>, between about 5° and 30° from the Equator.</li><li>Warm, moist air rises quickly, creating very <b>low pressure</b>.</li><li>It cools and condenses into tall cumulonimbus clouds; condensation releases heat, which powers the storm.</li><li>The <b>Coriolis effect</b> makes it spin. Cool air sinks in the centre to form the calm <b>eye</b>.</li><li>It moves with the prevailing wind and <b>weakens over land</b> (no warm water).</li></ol>`},
 {t:"example",h:"Worked example",html:`<p><b>Explain why tropical storms don't form on the Equator.</b></p><p>The <b>Coriolis effect</b> is too weak at the Equator (1), so the rising air can't start to <b>spin</b> (1), and a storm can't develop its circular structure.</p>`},
 {t:"q",h:"Quick check",q:"What kind of pressure is found at about 30° north and south?",o:["Low pressure, wet","High pressure, dry","Low pressure, dry","High pressure, wet"],a:1,ex:"Air sinks at about 30°, so skies are clear and dry: that's where hot deserts are."},
 {t:"q",h:"Your turn",q:"Why does a tropical storm weaken when it reaches land?",o:["It speeds up","It loses its supply of warm, moist air","The Coriolis effect gets stronger","The eye gets bigger"],a:1,ex:"Warm sea water is its energy source; over land there's also more friction."},
 {t:"mistake",h:"Common mistake",html:`<p>Just listing tropical storm conditions without explaining them. Link each one: "the sea must be 26 °C <b>because</b> warm water evaporates quickly, <b>which</b> releases heat when it condenses and powers the storm."</p>`},
 {t:"sum",h:"Summary",bullets:["Rising air = low pressure = rain; sinking air = high pressure = dry","Hadley, Ferrel and Polar cells","Storms: sea 26 °C+, 5–30°, Coriolis spin","Eye: sinking cool air; eye wall: strongest winds","UK extreme weather is getting more frequent and severe"]}]},

{id:"climate",topic:"A3",title:"Climate change: evidence, causes and responses",mins:9,steps:[
 {t:"learn",h:"Evidence",html:`<ul><li><b>Ice cores</b>: air bubbles show CO₂ and temperature going back 800 000 years.</li><li><b>Tree rings</b>: wider rings in warm, wet years.</li><li><b>Temperature records</b> since about 1850 show warming of around 1 °C.</li><li><b>Shrinking glaciers</b> and sea ice; <b>rising sea level</b>.</li></ul>`},
 {t:"learn",h:"Causes",html:`<p><b>Natural</b>: Milankovitch cycles (Earth's orbit), volcanic eruptions (ash causes cooling), sunspots.</p><p><b>Human</b>: burning <b>fossil fuels</b> (CO₂), <b>agriculture</b> (methane from cattle and rice), <b>deforestation</b> (fewer trees absorb CO₂). These add to the natural greenhouse effect: the <b>enhanced greenhouse effect</b>.</p>`},
 {t:"diagram",h:"Two ways to respond",svg:CLIM,html:`<p><b>Mitigation</b> tackles the cause. <b>Adaptation</b> copes with the effects that are already happening.</p>`},
 {t:"example",h:"Worked example: a 4-mark answer",html:`<p><b>Explain one way of mitigating climate change.</b></p><p>Planting trees (1) means more CO₂ is absorbed from the atmosphere by photosynthesis (1). This reduces the amount of greenhouse gas (1), so less heat is trapped and warming slows (1).</p>`},
 {t:"q",h:"Quick check",q:"Building higher sea walls is an example of what?",o:["Mitigation","Adaptation","A natural cause","Evidence"],a:1,ex:"It helps people live with sea level rise, rather than reducing the cause."},
 {t:"q",h:"Your turn",q:"How do volcanic eruptions affect the climate?",o:["They cause long-term warming","Ash blocks sunlight, causing short-term cooling","They have no effect","They increase sunspots"],a:1,ex:"Ash and sulfur in the atmosphere reflect sunlight, cooling the Earth for a year or two."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying the greenhouse effect is bad. The <b>natural</b> greenhouse effect keeps Earth warm enough for life. The problem is the <b>enhanced</b> effect from extra human-made gases.</p>`},
 {t:"sum",h:"Summary",bullets:["Evidence: ice cores, tree rings, temperature records, glaciers","Natural causes: orbit, volcanoes, sunspots","Human causes: fossil fuels, farming, deforestation","Mitigation: renewables, carbon capture, trees, Paris Agreement","Adaptation: drought-resistant crops, water management, coastal defences"]}]},

{id:"ecosys",topic:"B1",title:"How an ecosystem works",mins:8,steps:[
 {t:"learn",h:"Parts of an ecosystem",html:`<p>An <b>ecosystem</b> is the links between plants, animals, climate and the land. It can be small (a pond) or global (a <b>biome</b> such as a rainforest).</p><ul><li><b>Biotic</b>: living (trees, fish). <b>Abiotic</b>: non-living (soil, water, light).</li><li><b>Producers</b> photosynthesise; <b>consumers</b> eat; <b>decomposers</b> break down dead material.</li></ul>`},
 {t:"diagram",h:"A food chain",svg:CHAIN,html:`<p>Arrows point to the eater: they show the direction energy flows. A <b>food web</b> links many food chains together.</p>`},
 {t:"learn",h:"Nutrient cycling and interdependence",html:`<p>Nutrients move between three stores: <b>soil → biomass</b> (plants absorb) <b>→ litter</b> (they die) <b>→ soil</b> (decomposition).</p><p><b>Interdependence</b>: every part relies on others, so a change to one part ripples through the whole ecosystem.</p>`},
 {t:"example",h:"Worked example: a 6-mark plan",html:`<p><b>Explain how a change to one part of an ecosystem affects other parts.</b></p><ol class="steps"><li>Name the change: a pond in a woodland is drained.</li><li>Producers: plants that need water die.</li><li>Primary consumers: insects and frogs that feed on them decline.</li><li>Secondary consumers: birds that eat those decline too.</li><li>Nutrient cycle: less litter, so fewer nutrients return to the soil.</li></ol>`},
 {t:"q",h:"Quick check",q:"Which of these is abiotic?",o:["Fungi","Rabbits","Rainfall","Grass"],a:2,ex:"Abiotic means non-living: water, light, temperature, soil."},
 {t:"q",h:"Your turn",q:"In 'grass → rabbit → fox', what is the rabbit?",o:["Producer","Primary consumer","Secondary consumer","Decomposer"],a:1,ex:"It eats the producer, so it's the primary consumer."},
 {t:"mistake",h:"Common mistake",html:`<p>Drawing food chain arrows the wrong way. The arrow means "is eaten by": it points from the food to the eater.</p>`},
 {t:"sum",h:"Summary",bullets:["Biotic = living; abiotic = non-living","Producers → consumers; decomposers recycle","Arrows point to the eater","Nutrients: soil → biomass → litter → soil","Change one part and the rest is affected"]}]},

{id:"rainforest",topic:"B2",title:"Tropical rainforests and deforestation",mins:10,steps:[
 {t:"learn",h:"Characteristics",html:`<p>Between the tropics (e.g. the Amazon, Malaysia). Hot all year (about <b>27 °C</b>) and wet (over <b>2 000 mm</b> of rain a year), so <b>biodiversity is very high</b>.</p><p>Most nutrients are in the <b>biomass</b>. Few are in the soil, because plants take them up fast and heavy rain <b>leaches</b> them away.</p>`},
 {t:"diagram",h:"The layers",svg:LAYERS,html:`<p>The canopy forms a roof that blocks most light; most animals live there. The shrub layer is dark, so plants have large leaves.</p>`},
 {t:"learn",h:"Adaptations and deforestation",html:`<p><b>Adaptations</b>: drip tips (rain runs off), buttress roots (support tall trees), lianas (climb to the light), epiphytes (grow on branches).</p><p><b>Causes of deforestation</b>: logging, subsistence and commercial farming, mineral extraction, HEP dams, roads and settlements.</p><p><b>Impacts</b>: soil erosion, local and global climate change, but also jobs and income for the country.</p>`},
 {t:"example",h:"Worked example: sustainable management",html:`<p><b>Explain one way rainforests can be managed sustainably.</b></p><p><b>Selective logging</b> (1): only old or valuable trees are cut down, so the rest of the forest stays (1). Young trees grow into the gaps, so the forest can recover and still be used in the future (1). It's slower and more expensive than clear-felling.</p>`},
 {t:"q",h:"Quick check",q:"Why are rainforest soils low in nutrients?",o:["There are no decomposers","Heavy rain leaches nutrients and plants take them up quickly","It is too cold","The soil is too dry"],a:1,ex:"Most nutrients are stored in the biomass, not the soil."},
 {t:"q",h:"Your turn",q:"What is the purpose of buttress roots?",o:["To store water","To support very tall trees","To catch insects","To absorb light"],a:1,ex:"Shallow soils mean trees need wide roots to stay upright."},
 {t:"mistake",h:"Common mistake",html:`<p>Only giving negative impacts of deforestation. Exam questions often want balance: it also brings <b>economic development</b> (jobs, exports, taxes) for countries like Malaysia.</p>`},
 {t:"sum",h:"Summary",bullets:["Hot, wet, very high biodiversity","Layers: emergent, canopy, under canopy, shrub","Nutrients mostly in the biomass","Causes: logging, farming, mining, dams, roads","Manage with selective logging, replanting, national parks, ecotourism"]}]},

{id:"deserts",topic:"B3",title:"Hot deserts and desertification",mins:8,steps:[
 {t:"learn",h:"Characteristics",html:`<p>Found between <b>15° and 30°</b> N and S (Sahara, Thar). Sinking air (high pressure) means few clouds and <b>under 250 mm</b> of rain a year.</p><p>Hot days but cold nights (a high <b>diurnal range</b>), because there are no clouds to trap heat. Biodiversity is low, and most nutrients are in the <b>soil</b>.</p>`},
 {t:"learn",h:"Adaptations",html:`<ul><li><b>Camel</b>: fat in its hump, wide feet, long eyelashes against sand.</li><li><b>Fennec fox</b>: nocturnal, large ears to lose heat.</li><li><b>Cactus</b>: stores water in its stem, spines instead of leaves, long or wide roots, waxy skin.</li></ul>`},
 {t:"diagram",h:"The desertification cycle",svg:DESERT,html:`<p><b>Desertification</b>: land on the edge of a desert becomes dry and loses its fertility. Climate change (hotter, less rain) makes it worse.</p>`},
 {t:"example",h:"Worked example: reducing the risk",html:`<p><b>Explain one strategy to reduce desertification.</b></p><p><b>Planting trees</b> (1): their roots bind the soil together and their leaves shade it (1), so less soil is eroded by wind and rain and it holds more moisture (1). Other strategies: contour traps (stone lines trap water and soil) and zaï pits filled with compost.</p>`},
 {t:"q",h:"Quick check",q:"Why are desert nights cold?",o:["The sun is further away","There are no clouds to trap heat","Winds blow from the poles","The sand is wet"],a:1,ex:"Clear skies let heat escape quickly after sunset."},
 {t:"q",h:"Your turn",q:"Which is a human cause of desertification?",o:["Sunspots","Overgrazing by livestock","Low pressure","Ocean currents"],a:1,ex:"Overgrazing removes plants that protect the soil."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying deserts are "always hot". They have a huge daily range and can drop below freezing at night.</p>`},
 {t:"sum",h:"Summary",bullets:["15–30°, high pressure, under 250 mm rain","High diurnal temperature range","Adaptations save water and lose heat","Causes: population, overgrazing, overcultivation, firewood, climate change","Reduce it: trees, contour traps, zaï pits"]}]},

{id:"coasts",topic:"C1",title:"Coastal processes and landforms",mins:10,steps:[
 {t:"learn",h:"Waves",html:`<div class="tbl"><table><tr><th>Constructive</th><th>Destructive</th></tr><tr><td>Low, long wavelength</td><td>Tall, short wavelength</td></tr><tr><td>Swash stronger than backwash</td><td>Backwash stronger than swash</td></tr><tr><td>Build beaches</td><td>Remove sediment</td></tr></table></div><p><b>Fetch</b>: the distance the wind blows over the water. Longer fetch = more powerful waves.</p>`},
 {t:"learn",h:"Processes",html:`<ul><li><b>Erosion</b>: hydraulic power, abrasion, attrition.</li><li><b>Weathering</b>: freeze-thaw, chemical, biological.</li><li><b>Mass movement</b>: sliding, slumping, rock fall.</li><li><b>Longshore drift</b>: swash carries sediment up the beach at an angle, backwash drags it straight down, so it zig-zags along the coast.</li></ul>`},
 {t:"diagram",h:"Cave, arch, stack and stump",svg:HEAD,html:`<p>Example: Old Harry Rocks and Durdle Door in Dorset. Spits like Spurn Head form by <b>deposition</b> where the coast changes direction.</p>`},
 {t:"example",h:"Worked example: a 6-mark plan",html:`<p><b>Explain how a stack forms.</b></p><ol class="steps"><li>A headland has a weakness such as a crack.</li><li>Hydraulic power and abrasion widen it into a <b>cave</b>.</li><li>The cave erodes right through to form an <b>arch</b>.</li><li>Erosion at the base and weathering of the roof make it <b>collapse</b>.</li><li>A <b>stack</b> is left; it's later eroded into a <b>stump</b>.</li></ol>`},
 {t:"q",h:"Quick check",q:"Which process moves sediment along a coastline?",o:["Attrition","Longshore drift","Slumping","Freeze-thaw"],a:1,ex:"Waves approach at an angle with the prevailing wind, so sediment zig-zags along."},
 {t:"q",h:"Your turn",q:"What is a disadvantage of groynes?",o:["They are very expensive","They starve beaches further along of sediment","They reflect waves","They make the beach narrower"],a:1,ex:"Groynes trap sediment, so less reaches beaches down-drift."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up <b>hard</b> and <b>soft engineering</b>. Hard = built structures (sea wall, rock armour, groynes). Soft = works with nature (beach nourishment, dune regeneration, managed retreat).</p>`},
 {t:"sum",h:"Summary",bullets:["Constructive waves build; destructive waves erode","Erosion: hydraulic power, abrasion, attrition","Crack → cave → arch → stack → stump","Spits form by longshore drift and deposition","Hard engineering is built; soft works with nature"]}]},

{id:"rivers",topic:"C2",title:"River processes, landforms and flooding",mins:10,steps:[
 {t:"learn",h:"Down the river",html:`<p>Upper course: steep, V-shaped valley, <b>vertical erosion</b>. Middle: wider, <b>lateral erosion</b> and deposition. Lower: wide, flat, mostly <b>deposition</b>.</p><p><b>Transport</b>: traction (rolled), saltation (bounced), suspension (carried), solution (dissolved).</p>`},
 {t:"diagram",h:"How a waterfall forms",svg:FALL,html:`<p>Example: <b>High Force</b> on the River Tees. As the waterfall retreats it leaves a steep-sided <b>gorge</b>.</p>`},
 {t:"learn",h:"Meanders and ox-bow lakes",html:`<ol class="steps"><li>Fastest water on the <b>outside</b> of a bend erodes a river cliff.</li><li>Slower water on the <b>inside</b> deposits a slip-off slope.</li><li>The neck of the meander narrows.</li><li>In a flood the river cuts through the neck.</li><li>Deposition seals off the old loop: an <b>ox-bow lake</b>.</li></ol>`},
 {t:"example",h:"Worked example: hydrographs",html:`<p><b>Peak rainfall is at 10:00 and peak discharge at 16:00. What is the lag time, and what does it mean?</b></p><p>Lag time = <b>6 hours</b>. A <b>short</b> lag time means water reaches the river quickly, so flood risk is higher. Urban areas, steep slopes and impermeable rock shorten it.</p>`},
 {t:"q",h:"Quick check",q:"Which process shapes the upper course of a river most?",o:["Deposition","Vertical erosion","Lateral erosion","Saltation"],a:1,ex:"The river cuts down into its bed, making a V-shaped valley."},
 {t:"q",h:"Your turn",q:"Why does urbanisation increase flood risk?",o:["More trees intercept rain","Concrete is impermeable, so water runs off quickly","Rivers get wider","Rain falls more slowly"],a:1,ex:"Impermeable surfaces and drains carry water into the river fast, so lag time falls."},
 {t:"mistake",h:"Common mistake",html:`<p>Describing landforms without the processes. Examiners want the <b>process words</b>: hydraulic action, abrasion, undercutting, overhang, collapse, retreat.</p>`},
 {t:"sum",h:"Summary",bullets:["Upper: vertical erosion; lower: deposition","Waterfall: hard rock over soft, undercutting, overhang, collapse, retreat","Meander → ox-bow lake in a flood","Short lag time = higher flood risk","Hard engineering: dams, embankments; soft: warnings, zoning, trees"]}]},

{id:"urban",topic:"U1",title:"Global urban trends",mins:8,steps:[
 {t:"learn",h:"Key terms",html:`<ul><li><b>Urbanisation</b>: an increase in the <b>percentage</b> of people living in towns and cities.</li><li><b>Rate</b> of urbanisation: how fast that percentage is rising. <b>Level</b>: the percentage already urban.</li><li><b>Megacity</b>: 10 million or more people.</li></ul>`},
 {t:"diagram",h:"The world is becoming urban",svg:URB,html:`<p>In <b>2007</b>, over half the world's people lived in cities for the first time. Most megacities are in <b>Asia</b>.</p>`},
 {t:"learn",h:"Different types of country",html:`<div class="tbl"><table><tr><th>Country</th><th>Level</th><th>Rate</th><th>Why</th></tr><tr><td><b>HIC</b></td><td>High</td><td>Slow</td><td>Most people already live in cities</td></tr><tr><td><b>NEE</b></td><td>Medium</td><td>Fast</td><td>Industry creates city jobs, so lots of rural-urban migration</td></tr><tr><td><b>LIC</b></td><td>Low</td><td>Medium</td><td>Most people still farm, but migration is starting</td></tr></table></div>`},
 {t:"learn",h:"Why cities grow",html:`<p><b>Rural-urban migration</b>: push factors (few jobs, drought, poor services) and pull factors (jobs, schools, hospitals, a better life).</p><p><b>Natural increase</b>: migrants are often young adults, so they have children in the city, and better healthcare lowers the death rate.</p>`},
 {t:"learn",h:"The UK's population",html:`<p>The UK's population is <b>unevenly distributed</b>. Density is high in the <b>south-east</b> (London) and the <b>north-west</b> (Manchester, Liverpool), and low in <b>East Anglia</b> and the <b>north of Scotland</b>. Southern towns such as Oxford, Cambridge and Reading are growing.</p>`},
 {t:"example",h:"Worked example: describing a graph",html:`<p><b>Describe the trend in world urban population.</b></p><p>The percentage <b>increased steadily</b> from about <b>30% in 1950</b> to over <b>50% in 2007</b>, and is predicted to reach about <b>68% by 2050</b>. Always give the overall trend, then data with years and units.</p>`},
 {t:"q",h:"Quick check",q:"Which type of country has the FASTEST rate of urbanisation?",o:["HICs","NEEs","LICs","They're all the same"],a:1,ex:"NEEs: industry creates city jobs, so there's lots of rural-urban migration. HICs are slow; LICs are medium."},
 {t:"q",h:"Your turn",q:"Which type of country has the HIGHEST level of urbanisation?",o:["HICs","NEEs","LICs"],a:0,ex:"Most people in HICs already live in cities, so the level is high but the rate is slow."},
 {t:"q",h:"Your turn",q:"Which is a pull factor to a city?",o:["Drought","Conflict","Better-paid jobs","Low farm income"],a:2,ex:"Pull factors attract people to the city; the others push people from the countryside."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up <b>rate</b> and <b>level</b>. HICs have a high level but a slow rate; NEEs have a medium level but a fast rate.</p>`},
 {t:"sum",h:"Summary",bullets:["Over half the world is urban (since 2007)","HIC: high level, slow rate; NEE: medium, fast; LIC: low, medium","Growth = migration + natural increase","Megacity = 10 million+; most in Asia","UK: dense in the south-east and north-west"]}]},

{id:"rio",topic:"U2",title:"Rio de Janeiro: opportunities and challenges",mins:12,steps:[
 {t:"learn",h:"Location and importance",html:`<p>A coastal city in the south-east of <b>Brazil</b> (an NEE). Brazil's second most populated city.</p><ul><li><b>Regional</b>: banks lend to businesses in nearby towns.</li><li><b>National</b>: 5% of Brazil's GNI; ports export coffee, sugar and iron; the cultural capital (50+ museums, the carnival).</li><li><b>International</b>: a global financial centre; 5 ports and 3 airports; the 2014 World Cup final and 2016 Olympics; Christ the Redeemer.</li></ul>`},
 {t:"learn",h:"Opportunities",html:`<p><b>Social</b>: more workers pay more tax, so: 105 hospitals (higher life expectancy); 1,400 schools and 6 universities (higher literacy); 300 km of water pipes (95% have running water); 60 km of electricity wires.</p><p><b>Economic</b>: the <b>multiplier effect</b>. Every 2 steel jobs create 13 more (e.g. the VW factory). Taxes paid for the BRT bus system. But the informal economy isn't taxed.</p>`},
 {t:"diagram",h:"Challenges and solutions",svg:RIO,html:`<p><b>85%</b> of favelas are on steep slopes, at risk of landslides. 50% of favela homes have no sewer and 12% no running water, so infant mortality can reach 50 per 1,000.</p>`},
 {t:"learn",h:"More challenges",html:`<ul><li><b>Services</b>: Rio das Pedras has 2 schools for 50,000 people; life expectancy in Rocinha is 29 years lower than in wealthy areas.</li><li><b>Crime</b>: drug gangs; in some favelas 20 per 1,000 are killed each year.</li><li><b>Pollution</b>: 250+ tonnes of sewage a day into the sea; car use up 40%; 5,000 deaths a year from air pollution.</li></ul>`},
 {t:"example",h:"Worked example: a 9-mark judgement",html:`<p><b>To what extent has urban planning improved quality of life for the urban poor?</b></p><p><b>Judgement first</b>: to some extent, but only for one group of favelas. <b>For</b>: in Complexo do Alemão, the UPP pushed out drug gangs; wider roads let rubbish lorries in; adult education raised literacy; the cable car to Ipanema gave access to jobs; infant mortality fell. <b>Against</b>: a $1 billion budget for one group of favelas, infrastructure not maintained, and the cable car has closed. <b>Conclusion</b>: repeat the judgement.</p>`},
 {t:"q",h:"Quick check",q:"What is the multiplier effect?",o:["More people moving to the city","New jobs creating spending that leads to even more jobs","Building more favelas","Tax being cut"],a:1,ex:"Workers spend wages in shops and services, which creates more jobs and more tax."},
 {t:"num",h:"Your turn",q:"What percentage of Rio's favelas are on steep slopes?",ans:85,tol:0,unit:"%",ex:"85%, so landslides are a big risk."},
 {t:"q",h:"Your turn",q:"Where did the Favela Bairro cable car link the favela to?",o:["Christ the Redeemer","Ipanema, a business area","The airport","Brasília"],a:1,ex:"With a free daily return ticket for residents, so they could reach jobs."},
 {t:"mistake",h:"Common mistake",html:`<p>Using vague points like "it has problems with crime". Use the <b>specific figures</b>: 85% of favelas on steep slopes, 2 schools for 50,000 in Rio das Pedras, 20 per 1,000 killed, 5,000 air-pollution deaths a year.</p>`},
 {t:"sum",h:"Summary",bullets:["Rio: south-east Brazil, an NEE","Growth: migration (65%) + natural increase","Opportunities: 105 hospitals, 1,400 schools, the multiplier effect","Challenges: favelas, services, health, crime, pollution","Favela Bairro: UPP, cable car, roads, education; $1bn for one group"]}]},

{id:"cambridge",topic:"U3",title:"Cambridge: urban change in the UK",mins:12,steps:[
 {t:"learn",h:"Location and importance",html:`<p>An inland city in the east of England, in Cambridgeshire, north of London.</p><ul><li><b>Regional</b>: the Arts Theatre and Cambridge Junction; Crown, magistrates' and county courts.</li><li><b>National</b>: AstraZeneca on the Biomedical Campus; Royal Papworth Hospital; the Fitzwilliam Museum; the M11, A14 and Stansted.</li><li><b>International</b>: a world-leading university; the Science Park; tourism worth <b>£500m</b>; King's College Chapel.</li></ul>`},
 {t:"diagram",h:"Sketch map of Cambridge",svg:CAMMAP,html:`<p>The city sits inside a triangle of the <b>A14</b>, <b>M11</b> and <b>A11</b>. Radial roads (Huntingdon, Histon, Milton, Newmarket, Mill, Hills, Trumpington and Madingley Roads) lead to the centre. New housing (Eddington, Darwin Green, Orchard Park, Trumpington Meadows) is on the rural-urban fringe.</p>`},
 {t:"learn",h:"Migration",html:`<p><b>National</b>: over 14,000 (about <b>60%</b>) of the university's students are from the UK, so more student housing (Yugo House, Abodus) and research companies (AstraZeneca).</p><p><b>International</b>: pre-Brexit, 63% of new migrants came from Europe; post-Brexit, 55% come from Asia. <b>Mill Road</b> has the Cambridge Central Mosque, Bedouin, Seoul Plaza and Noodles Plus.</p>`},
 {t:"diagram",h:"The multiplier effect",svg:MULT,html:`<p>Science businesses on the Science Park and Biomedical Campus create jobs and pay tax. The Guided Busway lets over <b>50,000</b> people commute in, so firms have the workers they need.</p>`},
 {t:"example",h:"Worked example: challenges",html:`<p><b>Explain one challenge of urban change in Cambridge.</b></p><p><b>Inequality</b>: only 34% of Abbey residents have 5+ GCSEs, compared with 64% in Newnham (1). So fewer have professional jobs (27% vs 57%) and incomes are lower (1). This means worse health: life expectancy is 84 compared with 90 (1). Other challenges: waste (400,000 tonnes, half to landfill at Waterbeach), urban sprawl (Trumpington Meadows) and congestion.</p>`},
 {t:"q",h:"Quick check",q:"What is a brownfield site?",o:["An area with few or no buildings","An unused area with many derelict buildings","A national park","A new town"],a:1,ex:"E.g. the old Cattle Market, now the Leisure Park. Greenfield = few or no buildings, e.g. Eddington."},
 {t:"q",h:"Your turn",q:"Which is an environmental opportunity of urban change in Cambridge?",o:["Waterbeach landfill filling up","Urban greening, e.g. 1,000 trees at Eddington","Congestion on medieval streets","House prices rising"],a:1,ex:"Urban greening gives cleaner air and space for exercise."},
 {t:"num",h:"Your turn",q:"What percentage of Newnham residents have 5+ GCSEs at grade 4+?",ans:64,tol:0,unit:"%",ex:"64%, compared with 34% in Abbey."},
 {t:"mistake",h:"Common mistake",html:`<p>Forgetting the <b>CB1 regeneration</b> detail. Know why it was needed (abandoned warehouses, derelict land, empty houses), what was done (Mill Park Road flats, an Apple office, a 3,000-space cycle park, the Clayton and Ibis hotels) and whether it worked (less crime and more jobs, but expensive housing and anti-social behaviour).</p>`},
 {t:"sum",h:"Summary",bullets:["East of England; world-class university; tourism £500m","60% of students from the UK; post-Brexit migrants mostly from Asia","Opportunities: busway, new stations, schools, 1,000 trees","Challenges: Abbey vs Newnham, waste, sprawl, congestion","CB1: regeneration of the station area"]}]},

{id:"sustain",topic:"U4",title:"Sustainable urban living",mins:8,steps:[
 {t:"learn",h:"What sustainable means",html:`<p>Sustainability means meeting everyone's <b>social</b> (good housing, education), <b>economic</b> (jobs, affordable necessities) and <b>environmental</b> (clean air, green space) needs, now and in the future.</p>`},
 {t:"diagram",h:"Eddington, west Cambridge",svg:EDD,html:`<p>Between Huntingdon Road, Madingley Road and the M11. A <b>district heating system</b> pipes hot water to every home; insulation and triple glazing keep heat in. Swales carry rain into a lake, so flood risk is low. It's a <b>20-minute community</b> with <b>1,000 trees</b>. But many houses cost about <b>£1 million</b>.</p>`},
 {t:"learn",h:"Reducing traffic congestion",html:`<p>Over 50,000 people commute in, and the centre has narrow, medieval roads.</p><div class="tbl"><table><tr><th>Strategy</th><th>Example</th><th>Successful?</th></tr><tr><td>Encourage cycling and public transport</td><td>Park &amp; Ride; Histon Road bus lane; Milton Road cycle path</td><td>38,000 cars off the road a day, but busway buses only 50% full</td></tr><tr><td>Make car journeys longer</td><td>20 mph (Arbury Road); one-way (Park Terrace)</td><td>Cars 3.8 mph slower, but deliveries slower too</td></tr><tr><td>Make parking difficult</td><td>About £5 an hour at the Grand Arcade; Courtney Way residents-only</td><td>More walking, but car parks still full at weekends</td></tr></table></div>`},
 {t:"example",h:"Worked example: was it successful?",html:`<p><b>Assess how successful Cambridge's transport strategies have been.</b></p><p><b>Success</b>: cycling takes about 38,000 cars off the roads every day. <b>Limits</b>: Guided Busway buses are usually only 50% full, and car parks are still full at weekends despite £5-an-hour parking. <b>Judgement</b>: partly successful; cycling works, but the city keeps growing.</p>`},
 {t:"q",h:"Quick check",q:"Why does a district heating system save energy?",o:["Every home has its own boiler","One efficient system heats water for every home","It uses coal","It only runs in summer"],a:1,ex:"It's more efficient than a boiler in every house, so less gas is burned."},
 {t:"q",h:"Your turn",q:"What is a 20-minute community?",o:["Buses every 20 minutes","All services within a 20-minute walk or cycle","A 20 mph speed limit","20-minute parking"],a:1,ex:"People drive less, so the air is cleaner and they're healthier."},
 {t:"q",h:"Your turn",q:"What is one problem with Northstowe?",o:["It increases the sprawl of Cambridge itself","More A14 traffic, and people may feel isolated","It has no houses","It is too close to London"],a:1,ex:"It reduces sprawl and protects villages, but most residents commute, and it's hard to build community in a new town."},
 {t:"mistake",h:"Common mistake",html:`<p>Only praising Eddington. For "assess" questions, add a counter-point: many houses cost about £1 million, so it doesn't meet everyone's economic needs, and it's one new development while most of Cambridge is older housing.</p>`},
 {t:"sum",h:"Summary",bullets:["Sustainable: social, economic and environmental needs, now and in the future","Eddington: district heating, swales, 20-minute community, 1,000 trees","But houses cost about £1 million","Traffic: cycling and buses, slower journeys, harder parking","Always give a counter-point and a judgement"]}]}
];
})();
