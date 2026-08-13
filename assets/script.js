
const year = document.querySelectorAll(".year");
year.forEach(x=>x.textContent=new Date().getFullYear());

document.querySelectorAll(".prototype-form").forEach(form=>{
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const status=form.querySelector(".form-status");
    if(status) status.textContent="Prototype submission received locally. Connect this form to the approved business email/CRM before public launch.";
    form.reset();
  });
});

const bot = {
  welcome:"Hello. I’m the LinguaNova website assistant. I can help you understand our solutions, identify the right area of expertise, or prepare for a consultation. What are you working on?",
  language:"LinguaNova’s Language Services include professional translation, interpretation, academic editing, proofreading, localization, healthcare communication, and immigration-documentation support. Tell me the type of document or communication challenge and I’ll help route it.",
  ai:"LinguaNova develops human-centered AI and knowledge solutions, including AI workflow design, multilingual AI assistants, CrewAI organizational solutions, intelligent document processing, knowledge management, and AI consulting. AI is intended to augment professional expertise, not replace it.",
  research:"Research & Academic Solutions include research consulting, literature reviews, grant development, program evaluation, academic writing support, and specialized linguistic analysis.",
  education:"Education & Learning Solutions include curriculum development, teacher professional development, AI for education, language learning, educational technology, and Mini-Ticha.",
  publishing:"LinguaNova Publishing includes bilingual children’s literature, educational publications, digital learning resources, open educational resources, and the Medical Spanish Dictionary.",
  impact:"LinguaNova’s social-impact model connects commercial success with educational access, language preservation, open knowledge resources, and community partnerships. Mini-Ticha is the flagship Indigenous-language initiative described in the Master Plan.",
  consult:"To prepare for a consultation, briefly describe: 1) your organization or role, 2) the problem you need to solve, 3) the desired outcome, 4) relevant timeline, and 5) whether language, education, research, AI, publishing, or several areas are involved.",
  privacy:"Please do not paste confidential, medical, financial, legal, immigration, or identity documents into this prototype chat. A production version should provide secure document exchange and clear privacy controls.",
  default:"I can guide you through Language Services, AI & Knowledge Solutions, Research, Education, Publishing, Social Impact, or consultation intake. Describe the challenge in one or two sentences."
};
function classify(t){
 t=t.toLowerCase();
 if(/privacy|confidential|secure|document upload|medical record|passport/.test(t))return"privacy";
 if(/translate|translation|interpret|editing|proofread|localization|language service|immigration/.test(t))return"language";
 if(/\bai\b|artificial intelligence|crewai|automation|assistant|workflow|knowledge management/.test(t))return"ai";
 if(/research|literature|grant|methodology|academic|linguistic analysis|program evaluation/.test(t))return"research";
 if(/education|curriculum|teacher|learning|mini-ticha|training/.test(t))return"education";
 if(/publish|book|dictionary|open educational|resource/.test(t))return"publishing";
 if(/impact|community|indigenous|preserv|social/.test(t))return"impact";
 if(/consult|quote|contact|help me choose|which service/.test(t))return"consult";
 return"default";
}
const panel=document.getElementById("chatPanel"), body=document.getElementById("chatBody");
function addMsg(text,who="bot"){if(!body)return;const d=document.createElement("div");d.className=`msg ${who}`;d.textContent=text;body.appendChild(d);body.scrollTop=body.scrollHeight;}
function openChat(){if(!panel)return;panel.classList.add("open");if(!body.children.length)addMsg(bot.welcome);}
document.getElementById("chatLaunch")?.addEventListener("click",openChat);
document.getElementById("chatClose")?.addEventListener("click",()=>panel.classList.remove("open"));
document.querySelectorAll("[data-bot]").forEach(b=>b.addEventListener("click",()=>{openChat();addMsg(b.textContent,"user");setTimeout(()=>addMsg(bot[b.dataset.bot]||bot.default),120);}));
document.getElementById("chatForm")?.addEventListener("submit",e=>{
 e.preventDefault();const input=document.getElementById("chatInput");const t=input.value.trim();if(!t)return;input.value="";addMsg(t,"user");setTimeout(()=>addMsg(bot[classify(t)]),120);
});
