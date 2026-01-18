const messages = [
  "We have officially not been in a situationship for 1 whole month now!!!",
  "Let's take a moment to thank Hinge",
  "Because I couldn't get you actual flowers today 🌸",
  "Reminder: I love you bhondz."
];

const btn = document.getElementById("btn");
const out = document.getElementById("surprise");

btn.addEventListener("click", () => {
  const msg = messages[Math.floor(Math.random() * messages.length)];
  out.textContent = msg;

  // tiny confetti-ish effect using emojis
  const burst = document.createElement("div");
  burst.style.position = "absolute";
  burst.style.inset = "0";
  burst.style.pointerEvents = "none";
  burst.style.display = "grid";
  burst.style.placeItems = "center";
  burst.style.fontSize = "42px";
  burst.style.opacity = "0";
  burst.textContent = "✨🌸✨";
  document.querySelector(".card").appendChild(burst);

  requestAnimationFrame(() => {
    burst.style.transition = "opacity 220ms ease";
    burst.style.opacity = "1";
    setTimeout(() => {
      burst.style.opacity = "0";
      setTimeout(() => burst.remove(), 250);
    }, 450);
  });
});
