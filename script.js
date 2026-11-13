const cover=document.getElementById("cover");
const invitation=document.getElementById("invitation");
const openBtn=document.getElementById("openInvitation");
document.body.classList.add("no-scroll");

openBtn.addEventListener("click",()=>{
  cover.style.opacity="0";
  cover.style.transition="opacity .65s ease";
  setTimeout(()=>{
    cover.style.display="none";
    invitation.classList.remove("hidden");
    document.body.classList.remove("no-scroll");
    observeSections();
  },650);
});

const eventDate=new Date("2026-11-28T11:00:00-06:00").getTime();

function updateCountdown(){
  let distance=eventDate-Date.now();
  if(distance<0)distance=0;
  const days=Math.floor(distance/(1000*60*60*24));
  const hours=Math.floor((distance/(1000*60*60))%24);
  const minutes=Math.floor((distance/(1000*60))%60);
  const seconds=Math.floor((distance/1000)%60);
  document.getElementById("days").textContent=String(days).padStart(2,"0");
  document.getElementById("hours").textContent=String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent=String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent=String(seconds).padStart(2,"0");
}
updateCountdown();setInterval(updateCountdown,1000);

function observeSections(){
  const els=document.querySelectorAll(".reveal");
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");});
  },{threshold:.12});
  els.forEach(el=>observer.observe(el));
}




const rsvpForm=document.getElementById("rsvpForm");
const formMessage=document.getElementById("formMessage");
const hiddenIframe=document.getElementById("hidden_iframe");

let rsvpSubmitted=false;
let rsvpTimeout=null;

if(rsvpForm && hiddenIframe){
  rsvpForm.addEventListener("submit",()=>{
    rsvpSubmitted=true;

    const submitButton=rsvpForm.querySelector('button[type="submit"]');
    if(submitButton){
      submitButton.disabled=true;
      submitButton.textContent="ENVIANDO…";
    }

    formMessage.className="form-message";
    formMessage.textContent="Enviando confirmación…";

    clearTimeout(rsvpTimeout);
    rsvpTimeout=setTimeout(()=>{
      if(!rsvpSubmitted) return;

      formMessage.className="form-message error";
      formMessage.textContent="No se pudo confirmar el envío. Intenta de nuevo.";

      if(submitButton){
        submitButton.disabled=false;
        submitButton.textContent="CONFIRMAR ASISTENCIA";
      }

      rsvpSubmitted=false;
    },12000);
  });

  hiddenIframe.addEventListener("load",()=>{
    if(!rsvpSubmitted) return;

    clearTimeout(rsvpTimeout);

    formMessage.className="form-message success";
    formMessage.textContent="¡Gracias! Tu confirmación fue registrada.";

    rsvpForm.reset();

    const submitButton=rsvpForm.querySelector('button[type="submit"]');
    if(submitButton){
      submitButton.disabled=false;
      submitButton.textContent="CONFIRMAR ASISTENCIA";
    }

    rsvpSubmitted=false;
  });
}
