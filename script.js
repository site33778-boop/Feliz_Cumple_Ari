/* ===== TITULO CAMBIANTE ===== */
const title = document.getElementById("titleFade");
const titles = ["🎉 Feliz Cumpleaños Ari 🎉", "❤️ Te Amo ❤️"];
let current = 0;

function animateTitle() {
    title.innerHTML = "";
    const text = titles[current];

    [...text].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        title.appendChild(span);

        setTimeout(() => span.classList.add("show"), i * 120);
    });

    setTimeout(() => {
        current = (current + 1) % titles.length;
        animateTitle();
    }, 4200);
}

animateTitle();

/* ===== MENSAJE CON PAUSAS NATURALES ===== */
const message = document.getElementById("message");
const text = message.getAttribute("data-text");
message.innerHTML = "";

let delay = 0;

text.split(" ").forEach(word => {
    const wordSpan = document.createElement("span");
    wordSpan.style.display = "inline-block";
    wordSpan.textContent = word; // palabra completa
    message.appendChild(wordSpan);

    setTimeout(() => wordSpan.classList.add("show"), delay);

    // Pausa entre palabras
    const lastChar = word[word.length - 1];
    if ([".", ",", "!", "?", "✨"].includes(lastChar)) {
        delay += 500; // pausa más larga después de signos
    } else {
        delay += 150; // espacio normal entre palabras
    }

    // Añadir espacio visual entre palabras
    const space = document.createTextNode("\u00A0");
    message.appendChild(space);
});

/* ===== CONFETI ===== */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("btn");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let confetti = [];

function createConfetti() {
    confetti = [];
    for (let i = 0; i < 50; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 4 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
        c.y += c.d;
        if (c.y > canvas.height) c.y = -10;
    });
    requestAnimationFrame(drawConfetti);
}

btn.addEventListener("click", () => {
    createConfetti();
    drawConfetti();
    btn.textContent = "🎉 ¡Disfrútalo! 🎉";
});
