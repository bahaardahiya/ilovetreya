// ---------- Button surprise messages ----------
const messages = [
  "We have officially not been in a situationship for 1 whole month now!!!",
  "Let's take a moment to thank Hinge",
  "Because I couldn't get you actual flowers today 🌸",
  "Reminder: I love you bhondz."
];

const btn = document.getElementById("btn");
const out = document.getElementById("surprise");

if (btn && out) {
  btn.addEventListener("click", () => {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    out.textContent = msg;
  });
}

// ---------- Distance: London ↔ Bangalore (offline, no API) ----------
function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Approx coordinates
const london = { lat: 51.5074, lon: -0.1278 };
const bangalore = { lat: 12.9716, lon: 77.5946 };

const km = haversineKm(london.lat, london.lon, bangalore.lat, bangalore.lon);
const kmEl = document.getElementById("km");
if (kmEl) kmEl.textContent = `~${Math.round(km).toLocaleString()} km`;

// ---------- Globe: draggable spin + pins that move with longitude ----------
const globe = document.getElementById("globe");
const pinLondon = document.getElementById("pin-london");
const pinBlr = document.getElementById("pin-blr");

let spinDeg = 0;

function placePin(pinEl, lat, lon) {
  if (!pinEl) return;

  const relLon = ((((lon - spinDeg) % 360) + 540) % 360) - 180; // -180..180
  const facing = Math.cos((relLon * Math.PI) / 180);
  const visible = facing > 0.05;

  const x = 50 + (relLon / 180) * 45; // percent
  const y = 50 - (lat / 90) * 28; // percent

  pinEl.style.left = `${x}%`;
  pinEl.style.top = `${y}%`;
  pinEl.style.opacity = visible ? "1" : "0";
}

function renderGlobe() {
  if (!globe) return;
  const px = (spinDeg / 360) * 160;
  globe.style.setProperty("--spin", `${px}px`);

  placePin(pinLondon, london.lat, london.lon);
  placePin(pinBlr, bangalore.lat, bangalore.lon);
}

renderGlobe();

let dragging = false;
let lastX = 0;

function onDown(e) {
  dragging = true;
  globe.setPointerCapture?.(e.pointerId);
  lastX = e.clientX;
}

function onMove(e) {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  lastX = e.clientX;
  spinDeg = (spinDeg + dx * 0.65) % 360;
  renderGlobe();
}

function onUp() {
  dragging = false;
}

if (globe) {
  globe.addEventListener("pointerdown", onDown);
  globe.addEventListener("pointermove", onMove);
  globe.addEventListener("pointerup", onUp);
  globe.addEventListener("pointercancel", onUp);
  globe.addEventListener("mouseleave", onUp);
}

// ---------- Flowers: click-to-grow in the garden ----------
const garden = document.getElementById("garden");
const flowerSet = ["✿", "❀", "✾", "❁", "❃", "⚘", "🌼", "🌷", "🌸", "🪻"];

// Blue + yellow palette
const flowerPalette = [
  "rgba(59,130,246,0.95)",
  "rgba(11,59,122,0.95)",
  "rgba(187,216,255,0.95)",
  "rgba(255,210,77,0.98)",
  "rgba(255,228,138,0.98)"
];

function spawnFlower(x, y) {
  const f = document.createElement("div");
  f.className = "flower";
  f.textContent = flowerSet[Math.floor(Math.random() * flowerSet.length)];
  f.style.color = flowerPalette[Math.floor(Math.random() * flowerPalette.length)];

  const size = 22 + Math.random() * 32;
  f.style.fontSize = `${size}px`;

  const rot = (Math.random() * 24 - 12).toFixed(1);
  f.style.transform = `translate(-50%, -50%) scale(0.2) rotate(${rot}deg)`;

  f.style.left = `${x}px`;
  f.style.top = `${y}px`;

  garden.appendChild(f);
  setTimeout(() => f.remove(), 9000);
}

if (garden) {
  garden.addEventListener("click", (e) => {
    const rect = garden.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spawnFlower(x, y);

    // occasional burst
    if (Math.random() < 0.20) {
      for (let i = 0; i < 6; i++) {
        spawnFlower(x + (Math.random() * 80 - 40), y + (Math.random() * 50 - 25));
      }
    }
  });

  const r = garden.getBoundingClientRect();
  spawnFlower(r.width * 0.70, r.height * 0.55);
}

// ---------- Floating decor (makes it feel less “corporate”) ----------
const floaters = document.querySelector(".floaters");
const icons = ["✿", "❀", "✾", "⚘", "♡", "✧"];

function makeFloater() {
  if (!floaters) return;
  const el = document.createElement("div");
  el.className = "floater";
  el.textContent = icons[Math.floor(Math.random() * icons.length)];

  const left = Math.random() * 100;
  const size = 14 + Math.random() * 14;
  const duration = 8 + Math.random() * 7;

  el.style.left = `${left}vw`;
  el.style.fontSize = `${size}px`;
  el.style.animationDuration = `${duration}s`;
  el.style.animationDelay = `${Math.random() * 2}s`;

  floaters.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000);
}

for (let i = 0; i < 14; i++) makeFloater();
setInterval(makeFloater, 700);
