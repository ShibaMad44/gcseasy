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
${T(370,40,"Favela Bairro fixes","big")}
${box(270,66,200,40,"c3",1,"Cable car to the city")}${box(270,122,200,40,"c3",2,"Wider, paved roads")}${box(270,178,200,40,"c3",3,"Daycare, adult education")}
${A(268,142,212,142,"dash")}${T(370,250,"Cost about $1 billion","cap")}${T(370,266,"for only a few favelas","cap")}`);

const MULT=RING("The multiplier effect in Cambridge",["Science firms grow","More jobs","Workers spend","Shop, service jobs","More tax"],["c5","c3","c4","c3","c1"],"More tax → better infrastructure → more firms");

const EDD=SVG(480,250,"How Eddington is sustainable",`
<path d="M240 125 L105 45 M240 125 L375 45 M240 125 L105 205 M240 125 L375 205" class="d-ln"/>
${B(165,100,150,50,"c5","Eddington","NW Cambridge")}
${box(10,16,190,58,"c4",1,"Energy","district heating")}${box(280,16,190,58,"c1",2,"Water","swales and a lake")}
${box(10,176,190,58,"c6",3,"Waste","sensor bins")}${box(280,176,190,58,"c3",4,"Transport","buses, cycleways")}`);

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
 {t:"learn",h:"Key terms",html:`<ul><li><b>Urbanisation</b>: an increase in the <b>percentage</b> of people living in towns and cities.</li><li><b>Urban growth</b>: an increase in a city's population.</li><li><b>Megacity</b>: 10 million or more people.</li></ul>`},
 {t:"diagram",h:"The world is becoming urban",svg:URB,html:`<p>HICs are already about 80% urban, so they urbanise slowly. NEEs and LICs are urbanising fastest. Most megacities are in Asia.</p>`},
 {t:"learn",h:"Why cities grow",html:`<p><b>Rural-urban migration</b>: push factors (few jobs, drought, poor services) and pull factors (jobs, schools, hospitals, a better life).</p><p><b>Natural increase</b>: migrants are often young adults, so they have children in the city, and better healthcare lowers the death rate.</p>`},
 {t:"example",h:"Worked example: describing a graph",html:`<p><b>Describe the trend in world urban population.</b></p><p>The percentage <b>increased steadily</b> from about <b>30% in 1950</b> to over <b>50% in 2007</b>, and is predicted to reach about <b>68% by 2050</b>. Always give the overall trend, then data with years and units.</p>`},
 {t:"q",h:"Quick check",q:"Which group of countries has the fastest urban growth?",o:["HICs","LICs and NEEs","Only European countries","Only Australia"],a:1,ex:"Rapid migration and natural increase in LICs and NEEs."},
 {t:"q",h:"Your turn",q:"Which is a pull factor to a city?",o:["Drought","Conflict","Better-paid jobs","Low farm income"],a:2,ex:"Pull factors attract people to the city; the others push people from the countryside."},
 {t:"mistake",h:"Common mistake",html:`<p>Using "urbanisation" and "urban growth" as if they mean the same. Urbanisation is about the <b>percentage</b>; urban growth is about <b>numbers</b>.</p>`},
 {t:"sum",h:"Summary",bullets:["Over half the world is urban (since 2007)","HICs urbanise slowly; LICs and NEEs fast","Growth = migration + natural increase","Megacity = 10 million+","Describe graphs: trend, then data with years"]}]},

{id:"rio",topic:"U2",title:"Rio de Janeiro: opportunities and challenges",mins:10,steps:[
 {t:"learn",h:"Location and importance",html:`<p>On the south-east coast of <b>Brazil</b> (an NEE), on the Atlantic. Brazil's second-largest city.</p><ul><li><b>National</b>: about 5% of Brazil's GNI; the "cultural capital" with its carnival.</li><li><b>International</b>: Christ the Redeemer, the 2014 World Cup final and the 2016 Olympics; 5 ports and 3 airports.</li></ul>`},
 {t:"learn",h:"Opportunities",html:`<p><b>Social</b>: more tax pays for services: 105 hospitals, 95% of homes with running water, over 1 000 primary schools.</p><p><b>Economic</b>: the <b>multiplier effect</b>. Factories like VW create jobs in linked industries: every 2 steel jobs create about 13 more. Taxes paid for the BRT bus system.</p>`},
 {t:"diagram",h:"Challenges and solutions",svg:RIO,html:`<p>Favelas such as Rocinha are built illegally on steep land, at risk from landslides. About 50% of favela homes have no sewer connection.</p>`},
 {t:"example",h:"Worked example: a 9-mark judgement",html:`<p><b>To what extent has urban planning improved quality of life for the urban poor?</b></p><p><b>Judgement first</b>: to a large extent, but only for a few favelas. <b>For</b>: wider roads let waste lorries and ambulances in; the cable car linked hilltop favelas to jobs; daycare and adult education raised literacy. <b>Against</b>: it cost about $1 billion for a few favelas, the cable car closed and gangs returned. <b>Conclusion</b>: repeat the judgement.</p>`},
 {t:"q",h:"Quick check",q:"What is the multiplier effect?",o:["More people moving to the city","New jobs creating spending that leads to even more jobs","Building more favelas","Tax being cut"],a:1,ex:"Workers spend wages in shops and services, which creates more jobs and more tax."},
 {t:"q",h:"Your turn",q:"Why do diseases spread easily in favelas?",o:["The climate is cold","No sewers and narrow roads stop waste collection","There are too many hospitals","People are too old"],a:1,ex:"Waste goes into open drains and contaminates water."},
 {t:"mistake",h:"Common mistake",html:`<p>Using vague points like "it has problems with crime". Use the <b>specific figures</b> from your case study: 12% of favela homes with no water, about 20% unemployment, about 5 000 deaths a year from air pollution.</p>`},
 {t:"sum",h:"Summary",bullets:["Rio: south-east Brazil, an NEE","Growth: migration (about 65%) + natural increase","Opportunities: services, the multiplier effect","Challenges: favelas, services, health, crime, pollution","Favela Bairro: roads, cable car, education, but costly"]}]},

{id:"cambridge",topic:"U3",title:"Cambridge: urban change in the UK",mins:10,steps:[
 {t:"learn",h:"Location and importance",html:`<p>In the East of England, about 80 km north of London, on the River Cam.</p><ul><li><b>National</b>: Royal Papworth Hospital (heart and lung transplants), the Fitzwilliam Museum.</li><li><b>International</b>: a world top-5 university; about 7.6 million tourists a year.</li></ul>`},
 {t:"learn",h:"Migration",html:`<p>The university has about 24 000 students, 41% from outside the UK. International migration has changed the city's character: in 2018 most new arrivals were from Europe; by 2024 most were from Asia. <b>Mill Road</b> is now very culturally diverse.</p>`},
 {t:"diagram",h:"The multiplier effect",svg:MULT,html:`<p>Science businesses on the Science Park and Biomedical Campus create jobs and pay tax. This is an <b>economic opportunity</b> of urban change.</p>`},
 {t:"example",h:"Worked example: challenges",html:`<p><b>Explain one challenge of urban change in Cambridge.</b></p><p><b>Inequality</b>: almost twice as many residents of Newnham as Abbey have 5+ GCSEs and professional jobs (1). Houses in Abbey are smaller and closer together (1), so life chances differ across the city (1). Other challenges: waste (half to landfill), urban sprawl onto greenfield sites like Orchard Park, and congestion.</p>`},
 {t:"q",h:"Quick check",q:"What is a brownfield site?",o:["Land that has never been built on","Previously built-on land","A national park","Farmland"],a:1,ex:"Building on brownfield land protects the countryside but may need cleaning up."},
 {t:"q",h:"Your turn",q:"Which is an environmental opportunity of urban change in Cambridge?",o:["Waterbeach landfill filling up","Urban greening, e.g. 2 000 trees at Eddington","Congestion on medieval streets","House prices rising"],a:1,ex:"Urban greening gives cleaner air and space for exercise."},
 {t:"mistake",h:"Common mistake",html:`<p>Forgetting the <b>CB1 regeneration</b> detail. Know why it was needed (the station area looked run-down), what was done (new housing, a cycle park with about 3 000 spaces, wider pavements, Microsoft Research offices) and whether it worked.</p>`},
 {t:"sum",h:"Summary",bullets:["East of England; world-class university and hospital","Migration has made the city more diverse","Opportunities: regeneration, schools, transport, multiplier effect, greening","Challenges: inequality, waste, sprawl, congestion","Brownfield vs greenfield"]}]},

{id:"sustain",topic:"U4",title:"Sustainable urban living",mins:8,steps:[
 {t:"learn",h:"What sustainable means",html:`<p>Sustainable urban living meets the needs of people now <b>without stopping future generations</b> meeting theirs: saving water and energy, recycling waste, creating green space and using public transport.</p>`},
 {t:"diagram",h:"Eddington, north-west Cambridge",svg:EDD,html:`<p>District heating heats every home from one energy centre. Rain runs through swales into a lake and is reused, so about <b>40% less</b> water is pumped in. Underground bins have sensors, so lorries only collect when full.</p>`},
 {t:"learn",h:"Reducing traffic congestion",html:`<div class="tbl"><table><tr><th>Strategy</th><th>Cambridge example</th></tr><tr><td>Make parking difficult</td><td>Grand Arcade about £3.60 an hour; resident-only parking</td></tr><tr><td>Make driving slower</td><td>20 mph limits; bus lanes</td></tr><tr><td>Offer alternatives</td><td>Park &amp; Ride, Cambridge North station, cycle lanes, the Guided Busway</td></tr></table></div>`},
 {t:"example",h:"Worked example: was it successful?",html:`<p><b>Assess how successful Cambridge's transport strategies have been.</b></p><p><b>Success</b>: cycling replaces about 38 000 car journeys a day. <b>Limits</b>: the Guided Busway only cut A14 traffic by about 2%, against a predicted 11%. <b>Judgement</b>: partly successful; cycling works, but car traffic is still high.</p>`},
 {t:"q",h:"Quick check",q:"Why does a district heating system save energy?",o:["Every home has its own boiler","One efficient energy centre heats every home","It uses coal","It only runs in summer"],a:1,ex:"One central system is more efficient than many separate boilers."},
 {t:"q",h:"Your turn",q:"What is one problem with Northstowe?",o:["It increases urban sprawl of Cambridge itself","More A14 traffic and few facilities yet","It has no houses","It is too close to London"],a:1,ex:"Most residents commute to Cambridge, and services are still being built."},
 {t:"mistake",h:"Common mistake",html:`<p>Only praising Eddington. For "assess" questions, add a counter-point: it's one new development, the homes are expensive, and most of Cambridge is older housing that is harder to change.</p>`},
 {t:"sum",h:"Summary",bullets:["Sustainable: meet needs now and in the future","Eddington: energy, water, waste, transport, green space","Traffic: harder parking, slower driving, alternatives","Cycling a big success; the busway less so","Always give a counter-point and a judgement"]}]}
];
})();
