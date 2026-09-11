const cards = [...document.querySelectorAll(".achievement-card")];
const dots = [...document.querySelectorAll(".dot")];
let current = 0;

function renderCarousel(){
  cards.forEach((card,i)=>{
    const offset = (i-current+cards.length)%cards.length;
    card.classList.remove("active-card","left","right");
    if(offset===0) card.classList.add("active-card");
    else if(offset===1) card.classList.add("right");
    else card.classList.add("left");
  });
  dots.forEach((d,i)=>d.classList.toggle("active",i===current));
}
function move(dir){ current=(current+dir+cards.length)%cards.length; renderCarousel(); }
document.getElementById("prevBtn").addEventListener("click",()=>move(-1));
document.getElementById("nextBtn").addEventListener("click",()=>move(1));
dots.forEach((d,i)=>d.addEventListener("click",()=>{current=i;renderCarousel();}));

// Auto-advance: the center card gently pulls back and the next achievement comes forward.
let timer=setInterval(()=>move(1),4500);
document.getElementById("achievementCarousel").addEventListener("mouseenter",()=>clearInterval(timer));
document.getElementById("achievementCarousel").addEventListener("mouseleave",()=>timer=setInterval(()=>move(1),4500));
renderCarousel();

// Interactive orbital hero: the whole system subtly follows the pointer.
const scene=document.getElementById("orbitScene");
const tip=document.getElementById("orbitTip");
scene.addEventListener("mousemove",(e)=>{
  const r=scene.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-.5;
  const y=(e.clientY-r.top)/r.height-.5;
  scene.style.transform=`perspective(700px) rotateY(${x*12}deg) rotateX(${-y*10}deg)`;
});
scene.addEventListener("mouseleave",()=>scene.style.transform="perspective(700px) rotateY(0deg) rotateX(0deg)");
document.querySelectorAll(".orbit-moon").forEach(moon=>{
  moon.addEventListener("click",()=>{
    tip.textContent=moon.dataset.orbit+" • keep exploring";
    setTimeout(()=>tip.textContent="Move your mouse • interact with the orbit",1800);
  });
});

document.getElementById("themeToggle").addEventListener("click",()=>{
  document.body.classList.toggle("brighter");
});
