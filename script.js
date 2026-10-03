// QR decorativo (NO funcional): patrón aleatorio con los 3 cuadrados de esquina
function fakeQR(seed, size = 25) {
  let s = 0;
  for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  const rand = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;

  const finder = (x, y) => {
    const inX = x >= 0 && x < 7, inY = y >= 0 && y < 7;
    if (!inX || !inY) return null;
    const edge = x === 0 || x === 6 || y === 0 || y === 6;
    const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
    return edge || core;
  };

  let rects = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let on;
      const tl = finder(x, y);
      const tr = finder(x - (size - 7), y);
      const bl = finder(x, y - (size - 7));
      if (tl !== null) on = tl;
      else if (tr !== null) on = tr;
      else if (bl !== null) on = bl;
      else if ((x === 7 || y === 7 || x === size - 8 || y === size - 8) &&
               (x < 8 || y < 8 || (x > size - 9 && y < 8) || (y > size - 9 && x < 8))) on = false;
      else on = rand() > 0.52;
      if (on) rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
  }
  return `<svg viewBox="-2 -2 ${size + 4} ${size + 4}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" role="img" aria-label="Código QR de ejemplo">
    <rect x="-2" y="-2" width="${size + 4}" height="${size + 4}" fill="#fff"/>
    <g fill="#111">${rects}</g></svg>`;
}

const modal = document.getElementById("qrModal");
const qrBox = document.getElementById("qrBox");
const ticketBtn = document.getElementById("ticketBtn");
const closeBtn = document.getElementById("closeBtn");

qrBox.innerHTML = fakeQR("BF-2027-001");

function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  closeBtn.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  ticketBtn.focus();
}

ticketBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });