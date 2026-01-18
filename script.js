// Relationship timer (since 19 Dec 2025, 6:00 PM UK time)

// UK time in December is GMT (UTC+0), so we use an explicit UTC timestamp.
// 19 Dec 2025 18:00:00 GMT == 2025-12-19T18:00:00Z
const start = new Date("2025-12-19T18:00:00Z").getTime();

const elDays = document.getElementById("tDays");
const elHours = document.getElementById("tHours");
const elMins = document.getElementById("tMins");
const elSecs = document.getElementById("tSecs");

function pad2(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  const now = Date.now();
  let diff = now - start;

  // If someone opens it before the start time, show 0s (no negative)
  if (diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (24 * 3600));
  const rem1 = totalSeconds % (24 * 3600);

  const hours = Math.floor(rem1 / 3600);
  const rem2 = rem1 % 3600;

  const mins = Math.floor(rem2 / 60);
  const secs = rem2 % 60;

  if (elDays) elDays.textContent = String(days);
  if (elHours) elHours.textContent = pad2(hours);
  if (elMins) elMins.textContent = pad2(mins);
  if (elSecs) elSecs.textContent = pad2(secs);
}

tick();
setInterval(tick, 1000);
