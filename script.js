/* ========= TITULO CAMBIANTE (Feliz Cumpleaños / Te Amo) ========= */
const title = document.getElementById("titleFade");
const titles = ["🎉 Feliz Cumpleaños Ari 🎉", "❤️ Te Amo ❤️"];
let current = 0;

const letterDelay = 120;
const visibleTime = 2000;

function animateTitle() {
    const titleText = titles[current];
    title.innerHTML = "";

    // Crear spans de cada letra, usando &nbsp; para espacios
    const spans = [...titleText].map(char => {
        const span = document.createElement("span");
        if (char === " ") {
            span.innerHTML = "&nbsp;";
        } else {
            span.textContent = char;
        }
        title.appendChild(span);
        return span;
    });

    // Aparecer letra por letra
    spans.forEach((span, i) => {
        setTimeout(() => span.classList.add("show"), i * letterDelay);
    });

    const appearDuration = spans.length * letterDelay;

    // Desaparecer letra por letra
    setTimeout(() => {
        spans.forEach((span, i) => {
            setTimeout(() => {
                span.classList.remove("show");
                span.classList.add("hide");
            }, i * letterDelay);
        });
    }, appearDuration + visibleTime);

    const totalDuration =
        appearDuration +
        visibleTime +
        spans.length * letterDelay +
        600;

    // Cambiar al siguiente título
    setTimeout(() => {
        current = (current + 1) % titles.length;
        animateTitle();
    }, totalDuration);
}

animateTitle();

/* ========= MENSAJE PRINCIPAL LETRA POR LETRA ========= */
const message = document.getElementById("message");
const messageText = message.getAttribute("data-text");
message.innerHTML = ""; // limpiar contenido inicial

// Crear spans para cada letra
const messageSpans = [...messageText].map(char => {
    const span = document.createElement("span");
    if (char === " ") {
        span.innerHTML = "&nbsp;";
    } else if (char === "\n") {
        span.innerHTML = "<br>";
    } else {
        span.textContent = char;
    }
    message.appendChild(span);
    return span;
});

// Aparecer letra por letra
messageSpans.forEach((span, i) => {
    setTimeout(() => span.classList.add("show"), i * 40);
});

/* ========= CONFETI ========= */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("btn");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let confetti = [];

function createConfetti() {
    confetti = [];
    for (let i = 0; i < 180; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 5 + 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
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
        if (c.y > canvas.height) {
            c.y = -10;
            c.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawConfetti);
}

btn.addEventListener("click", () => {
    createConfetti();
    drawConfetti();
    btn.textContent = "🎉 ¡Disfrútalo! 🎉";
});
