const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const increase = document.querySelector(".increase");
const decrease = document.querySelector(".decrease");
const drawSize = document.querySelector(".drawSize");
const colorDetect = document.querySelector(".colorInp");
const clearCanva = document.querySelector(".clearCanva");

let detectClick = false;
let size = 30;
let color = "black";

let x1 = undefined;
let y1 = undefined;

colorDetect.addEventListener("change", (e) => {
  console.log(e.target.value);
  color = e.target.value;
});

increase.addEventListener("click", () => {
  sizeIncrease();
});

decrease.addEventListener("click", () => {
  sizeDecrease();
});

clearCanva.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function sizeIncrease() {
  if (size >= 50) {
    size = 50;
  } else {
    size += 5;
  }
  drawSize.innerText = size;
}

function sizeDecrease() {
  if (size <= 5) {
    size = 5;
  } else {
    size -= 5;
  }
  drawSize.innerText = size;
}

canvas.addEventListener("mousedown", (e) => {
  detectClick = true;

  x1 = e.offsetX;
  y1 = e.offsetY;

  console.log(x1, y1);
});

canvas.addEventListener("mouseup", () => {
  detectClick = false;

  x1 = undefined;
  y1 = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (detectClick) {
    let x = e.offsetX;
    let y = e.offsetY;

    drawCircle(x, y);
    drawLine(x1, y1, x, y);

    x1 = x;
    y1 = y;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x, y) {
  ctx.beginPath();
  //console.log("X1",x,"Y1",y);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x, y);
  ctx.lineWidth = size * 2;
  ctx.strokeStyle = color;
  ctx.stroke();
  console.log(size);
}
