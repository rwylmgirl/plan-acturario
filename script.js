const canvas = document.getElementById('malla');
const ctx = canvas.getContext('2d');

const cols = 20;
const rows = 10;
const cellWidth = canvas.width / cols;
const cellHeight = canvas.height / rows;

function drawGrid(mouseX = -1, mouseY = -1) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * cellWidth;
      const y = j * cellHeight;
      const isHover = (
        mouseX > x && mouseX < x + cellWidth &&
        mouseY > y && mouseY < y + cellHeight
      );
      ctx.fillStyle = isHover ? 'red' : 'lightgray';
      ctx.fillRect(x, y, cellWidth - 1, cellHeight - 1);
    }
  }
}

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  drawGrid(x, y);
});

drawGrid();
