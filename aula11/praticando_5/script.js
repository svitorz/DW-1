const STEP = 10;
const boxes = document.querySelectorAll(".box");
const positions = new Map();
let selected = null;

const MOVES = {
  KeyW: [0, -1], ArrowUp: [0, -1],
  KeyS: [0, 1], ArrowDown: [0, 1],
  KeyA: [-1, 0], ArrowLeft: [-1, 0],
  KeyD: [1, 0], ArrowRight: [1, 0],
};

boxes.forEach((box) => {
  positions.set(box, { x: 0, y: 0 });

  box.addEventListener("click", () => {
    if (!selected) {
      box.classList.replace("border-black", "border-warning");
      selected = box;
    } else if (selected === box) {
      box.classList.replace("border-warning", "border-black");
      selected = null;
      box.style.transform = `translate(0px)`;
    } else {
      alert("Atenção! Já há quadrado selecionado. Desselecione-o antes de selecionar outro.");
    }
  });
});

window.addEventListener("keydown", (event) => {
  const move = MOVES[event.code];
  if (!selected || !move) return;
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  event.preventDefault();
  const pos = positions.get(selected);
  pos.x += move[0] * STEP;
  pos.y += move[1] * STEP;
  selected.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
});
