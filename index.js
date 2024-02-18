const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const increase = document.querySelector(".increase");
const decrease = document.querySelector(".decrease");
const drawSize = document.querySelector(".drawSize");
const colorDetect = document.querySelector(".colorInp");
const clearCanva = document.querySelector(".clearCanva");

canvas.width = 800;
canvas.height = 600;

var x = window.matchMedia("(max-width: 700px)");

function matches() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 70;
}

x.matches && matches();

let detectClick = false;
let size = 30;
let color = "black";

let x1 = 0;
let y1 = 0;

colorDetect.addEventListener("change", (e) => {
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

    drawLine(x1, y1, x, y);
    drawCircle(x, y);

    x1 = x;
    y1 = y;
  }
});

/*=====================================*/

canvas.addEventListener("touchstart", (e) => {
  detectClick = true;

  x1 = e.touches[0].pageX;
  y1 = e.touches[0].pageY;

  //console.log(x1, y1);
});

canvas.addEventListener("touchend", () => {
  detectClick = false;

  x1 = undefined;
  y1 = undefined;
});

canvas.addEventListener("touchmove", (e) => {
  if (detectClick) {
    let k = e.touches[0].pageX;
    let l = e.touches[0].pageY;

    drawLine(x1, y1, k, l);
    drawCircle(k, l);

    x1 = k;
    y1 = l;
  }
});

/*=====================================*/

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x, y) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x, y);
  ctx.lineWidth = size * 2;
  ctx.strokeStyle = color;
  ctx.stroke();
}
