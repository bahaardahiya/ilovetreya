// ---------- Button surprise messages ----------
const messages = [
  "We have officially not been in a situationship for 1 whole month now!!!",
  "Let's take a moment to thank Hinge",
  "Because I couldn't get you actual flowers today 🌸",
  "I love you"
  "Thank you for tolerating all my bullshit, u da goat",
  "You're a diva"
];

let msgIndex = 0;
const messageTextEl = document.getElementById("messageText");


// DOM hooks (match your current IDs)
const modal = document.getElementById("messageModal");
const openBtn = document.getElementById("openMessage") || document.getElementById("openBtn");
const closeBackdrop = document.getElementById("closeMessage");
const closeX = document.getElementById("xClose");
const closeOk = document.getElementById("okClose");

// Where the message should render inside the modal.
// IMPORTANT: In your index.html modal, add an element with id="messageText"
// (example: <p id="messageText"></p>)

// Safety: if the element doesn't exist, fail gracefully
function setMessage(text) {
  if (!messageTextEl) return;
  messageTextEl.textContent = text;
}

function openModalWithNextMessage() {
  // Set next message
  setMessage(messages[msgIndex]);

  // Advance index (cycle)
  msgIndex = (msgIndex + 1) % messages.length;

  // Open modal
  modal.classList.add("show"); // your CSS currently uses "show"
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

// Click → show next message
if (openBtn) openBtn.addEventListener("click", openModalWithNextMessage);

// Close controls
[closeBackdrop, closeX, closeOk].forEach((el) => {
  if (!el) return;
  el.addEventListener("click", closeModal);
});

// ESC closes
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
