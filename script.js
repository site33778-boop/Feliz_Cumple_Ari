const envelope=document.getElementById("envelope");
const letter=document.getElementById("letter");
const title=document.getElementById("title");
const message=document.getElementById("message");

function vibrate(p){ if(navigator.vibrate) navigator.vibrate(p); }

envelope.onclick=()=>{
    vibrate([80,40,80]);
    envelope.classList.add("open");

    setTimeout(()=>{
        envelope.style.display="none";
        letter.classList.remove("hidden");
        letter.classList.add("show");
        startTitle();
        startMessage();
    },800);
};

/* TITULOS */
const titles=["🎉 Feliz Cumpleaños Ari 🎉","❤️ Te Amo ❤️"];
let index=0;
const speed=80;
const stayTime=5000;

function startTitle(){
    title.innerHTML="";
    const text=titles[index];
    const spans=[];

    [...text].forEach((c,i)=>{
        const span=document.createElement("span");
        span.textContent=c===" "?"\u00A0":c;
        title.appendChild(span);
        spans.push(span);
        setTimeout(()=>span.classList.add("show"),i*speed);
    });

    const appearTime=text.length*speed;
    const hideStart=appearTime + stayTime;

    spans.forEach((s,i)=>{
        setTimeout(()=>s.classList.add("hide"),hideStart + i*speed);
    });

    const total=hideStart + text.length*speed;

    setTimeout(()=>{
        index=(index+1)%titles.length;
        startTitle();
    }, total);
}

/* MENSAJE */
function startMessage(){
    const text=message.dataset.text;
    message.innerHTML="";
    let delay=0;

    text.split(" ").forEach(word=>{
        const wordSpan=document.createElement("span");
        wordSpan.classList.add("word");

        [...word].forEach(char=>{
            const span=document.createElement("span");
            span.textContent=char;
            span.classList.add("letterSpan");
            wordSpan.appendChild(span);

            setTimeout(()=>{
                span.classList.add("show");
                vibrate(6);
            },delay);

            delay+=40;
        });

        message.appendChild(wordSpan);
        message.appendChild(document.createTextNode(" "));
        delay+=40;
    });
}

/* CONFETI */
const canvas=document.getElementById("confetti");
const ctx=canvas.getContext("2d");
const btn=document.getElementById("btn");
const stopBtn=document.getElementById("stopBtn");

function resize(){
    canvas.width=innerWidth;
    canvas.height=innerHeight;
}
resize();
addEventListener("resize",resize);

let confetti=[];
let anim=null;

function create(){
    confetti=[];
    for(let i=0;i<60;i++){
        confetti.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height-canvas.height,
            r:Math.random()*6+3,
            d:Math.random()*4+2,
            c:`hsl(${Math.random()*360},100%,60%)`
        });
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.c;
        ctx.fill();
        p.y+=p.d;
        if(p.y>canvas.height)p.y=-10;
    });
    anim=requestAnimationFrame(draw);
}

btn.onclick=()=>{ vibrate([100,50,100]); create(); draw(); }
stopBtn.onclick=()=>{ vibrate(60); cancelAnimationFrame(anim); ctx.clearRect(0,0,canvas.width,canvas.height); }
