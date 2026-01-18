// ---------- Button surprise messages ----------
const messages = [
  "We have officially not been in a situationship for 1 whole month now!!!",
  "Let's take a moment to thank Hinge",
  "Because I couldn't get you actual flowers today 🌸",
  "Reminder: I love you bhondz."
];

const modal = document.getElementById("messageModal");
const openBtn = document.getElementById("openMessage");
const closeBackdrop = document.getElementById("closeMessage");
const closeX = document.getElementById("xClose");
const closeOk = document.getElementById("okClose");

openBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

[closeBackdrop, closeX, closeOk].forEach(el => {
  el.addEventListener("click", () => {
    modal.classList.remove("show");
  });
});
