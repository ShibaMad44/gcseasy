/* GCSEasy: best free resources per subject, plus a "Videos" link on every topic.
   Links are to home pages, channels and searches so they don't go stale. */
(function(){
const YT=q=>"https://www.youtube.com/results?search_query="+encodeURIComponent(q);
const PAST={AQA:["AQA past papers and mark schemes","https://www.aqa.org.uk/find-past-papers-and-mark-schemes","Official papers, mark schemes and examiner reports"],
 OCR:["OCR past paper finder","https://www.ocr.org.uk/qualifications/past-paper-finder/","Official papers and mark schemes"],
 Edexcel:["Pearson Edexcel past papers","https://qualifications.pearson.com/en/support/support-topics/exams/past-papers.html","Official papers and mark schemes"]};
const PMT=["Physics & Maths Tutor","https://www.physicsandmathstutor.com/","Past paper questions sorted by topic, plus notes and flashcards"];
const SME=["Save My Exams","https://www.savemyexams.com/gcse/","Revision notes and topic questions (some free each day)"];
const SEN=["Seneca","https://senecalearning.com/en-GB/","Free interactive courses that quiz you as you go"];
const BBC=["BBC Bitesize","https://www.bbc.co.uk/bitesize","Short, clear notes, videos and tests for every subject"];
const COG=["Cognito","https://www.cognito.org/","Free video lessons with quizzes, tracked progress"];
const SCI={watch:[["Freesciencelessons","https://www.youtube.com/@Freesciencelessons","Every AQA topic, one short video each. The go-to for science"],["Cognito","https://www.youtube.com/@Cognitoedu","Animated explainers, great for hard ideas"],["Primrose Kitten","https://www.youtube.com/@PrimroseKitten","Quick revision videos and exam walkthroughs"]],
 learn:[COG,SEN,BBC,PMT,SME],papers:[PAST.AQA,PMT]};
const R={
 biology:{name:"Biology",board:"AQA",...SCI},
 chemistry:{name:"Chemistry",board:"AQA",...SCI},
 physics:{name:"Physics",board:"AQA",watch:SCI.watch,learn:[...SCI.learn,["Isaac Physics","https://isaacphysics.org/","Free physics problems from Cambridge University, great for calculations"]],papers:SCI.papers},
 "combined-science":{name:"Combined Science",board:"AQA Trilogy",...SCI},
 maths:{name:"Maths",board:"Edexcel Higher",watch:[["Corbettmaths","https://www.youtube.com/@corbettmaths","A video for every GCSE topic"],["MathsWatch","https://vle.mathswatch.co.uk/","Your school's clips: log in with your school account"],["Higher maths topics on YouTube",YT("GCSE maths higher Edexcel revision"),"Search results for full-topic walkthroughs"]],
  learn:[["Corbettmaths contents","https://corbettmaths.com/contents/","Videos, worksheets and practice questions for every topic"],["Corbettmaths 5-a-day","https://corbettmaths.com/5-a-day/gcse/","Five mixed questions a day: the best daily habit"],["Maths Genie","https://www.mathsgenie.co.uk/gcse.html","Exam questions by topic and grade, with videos"],["Dr Frost Maths","https://www.drfrost.org/","Free practice with instant marking"],PMT],papers:[PAST.Edexcel,["Maths Genie past papers","https://www.mathsgenie.co.uk/papers.html","Papers with video solutions"]]},
 "english-language":{name:"English Language",board:"AQA",watch:[["Mr Bruff","https://www.youtube.com/@mrbruff","Question-by-question guides to both papers"],["Mr Salles","https://www.youtube.com/@MrSallesTeachesEnglish","Grade 9 model answers and how they're marked"],["Language Paper 1 Q5 videos",YT("AQA English Language Paper 1 Question 5 grade 9"),"Creative writing walkthroughs"]],
  learn:[BBC,SEN,SME],papers:[PAST.AQA]},
 "english-literature":{name:"English Literature",board:"OCR",watch:[["Mr Bruff","https://www.youtube.com/@mrbruff","Plot, character and theme videos for the set texts"],["Mr Salles","https://www.youtube.com/@MrSallesTeachesEnglish","Grade 9 essays and context"],["Set text analysis",YT("GCSE English Literature grade 9 analysis"),"Search for your text, e.g. \"An Inspector Calls grade 9\""]],
  learn:[BBC,SEN,SME],papers:[PAST.OCR]},
 geography:{name:"Geography",board:"AQA",watch:[["Time for Geography","https://timeforgeography.co.uk/","Short, filmed-on-location videos for the AQA spec"],["Cognito Geography (AQA)","https://www.cognito.org/courses/gcse/geography/aqa/lessons","Full AQA course in short video lessons"],["tutor2u Rio de Janeiro videos","https://www.tutor2u.net/geography/reference/topic-video-for-aqa-gcse-geography-why-is-rio-de-janeiro-important-nee-city-study-rio-de-janeiro-1","A 6-part video series on the Rio case study"]],
  learn:[["Internet Geography","https://www.internetgeography.net/","Detailed notes and case studies for AQA"],["tutor2u Geography","https://www.tutor2u.net/geography","Exam technique, model answers, revision blasts"],SEN,BBC,SME],papers:[PAST.AQA,["PMT Geography","https://www.physicsandmathstutor.com/geography-revision/","Questions and notes by topic"]]},
 citizenship:{name:"Citizenship",board:"OCR",watch:[["UK Parliament explainers",YT("UK Parliament explained how laws are made"),"How Parliament, laws and elections work"],["Citizenship GCSE revision",YT("OCR GCSE Citizenship Studies revision"),"Topic walkthroughs"]],
  learn:[["UK Parliament Education","https://learning.parliament.uk/","Official guides to Parliament, laws and voting"],["How government works","https://www.gov.uk/government/how-government-works","The official guide to the UK government"],BBC],papers:[PAST.OCR]},
 french:{name:"French",board:"AQA",watch:[["French listening practice",YT("GCSE French listening practice AQA"),"Practise with real-speed audio"],["French grammar explained",YT("GCSE French grammar perfect tense explained"),"Tenses and grammar walkthroughs"]],
  learn:[["Language Gym","https://www.language-gym.com/","Verb and vocab games built for GCSE"],["Languages Online","https://www.languagesonline.org.uk/","Free grammar and vocab exercises"],["Conjuguemos","https://conjuguemos.com/","Verb conjugation drills"],["Lingolia French","https://francais.lingolia.com/en/","Clear grammar explanations with exercises"],BBC,SEN],papers:[PAST.AQA]}
};
const page=(location.pathname.split("/").pop()||"index").replace(/\.html$/,"")||"index";
const css=`.resbox{margin:40px 0 8px;padding-top:24px;border-top:2px solid var(--line)}
.resbox h2{font:700 1.4rem/1.2 var(--display);margin:0 0 4px}.resbox>p{color:var(--muted);margin:0 0 14px;font-size:.94rem}
.resgrid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.rescol h3{font:700 .76rem var(--display);text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin:0 0 8px}
.reslink{display:block;text-decoration:none;color:var(--ink);background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin-bottom:8px;min-width:0}
.reslink:hover{border-color:var(--accent)}.reslink b{display:block;font-size:.97rem}.reslink b::after{content:" ↗";color:var(--accent);font-weight:700}
.reslink span{display:block;color:var(--muted);font-size:.86rem;margin-top:2px}
.vidlink{display:inline-flex;align-items:center;gap:6px;margin:10px 8px 0 0;font-weight:700;font-size:.9rem;color:var(--accent);text-decoration:none;border:1px solid var(--line);border-radius:999px;padding:7px 12px;background:var(--surface)}
.vidlink:hover{border-color:var(--accent)}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const link=([t,u,d])=>`<a class="reslink" href="${u}" target="_blank" rel="noopener"><b>${t}</b><span>${d}</span></a>`;
function block(r,full){return `<div class="resgrid">
 <div class="rescol"><h3>Watch</h3>${r.watch.map(link).join("")}</div>
 <div class="rescol"><h3>Learn and practise</h3>${r.learn.map(link).join("")}</div>
 <div class="rescol"><h3>Past papers</h3>${r.papers.map(link).join("")}</div></div>`}
function subjectBox(){const r=R[page];if(!r)return;const wrap=document.querySelector(".wrap");if(!wrap||document.getElementById("resbox"))return;
 const d=document.createElement("section");d.className="resbox";d.id="resbox";
 d.innerHTML=`<h2>Best free resources for ${r.name}</h2><p>Hand-picked and free. Videos open on YouTube, which some school networks block. Every topic above also has its own <b>▶ Videos</b> link.</p>${block(r)}`;wrap.appendChild(d)}
function topicVids(){const r=R[page];if(!r)return;
 document.querySelectorAll("section.topic").forEach(sec=>{if(sec.querySelector(".vidlink"))return;const h=sec.querySelector(".th h2,h2");if(!h)return;
  const host=sec.querySelector(".tbody")||sec;const a=document.createElement("a");a.className="vidlink";a.target="_blank";a.rel="noopener";
  a.href=YT(`GCSE ${r.board.split(" ")[0]} ${r.name.replace("Combined Science","science")} ${h.textContent.replace(/\(.*?\)/g,"").trim()}`);a.textContent="▶ Videos on this topic";host.appendChild(a)})}
function allPage(){const el=document.getElementById("allres");if(!el)return;
 el.innerHTML=Object.entries(R).filter(([k])=>k!=="combined-science").map(([k,r])=>`<section class="resbox" id="res-${k}"><h2>${r.name} <small style="font:500 .9rem var(--mono);color:var(--muted)">${r.board}</small></h2>${block(r)}</section>`).join("")}
const go=()=>{subjectBox();allPage();topicVids();setTimeout(topicVids,600)};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go();
window.GCSE_RES=R;
})();
