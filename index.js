const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const increase = document.querySelector(".increase");
const decrease = document.querySelector(".decrease");
const drawSize = document.querySelector(".drawSize");
const colorDetect = document.querySelector(".colorInp");
const clearCanva = document.querySelector(".clearCanva");
const eraseBtn = document.querySelector(".erase");
const penBtn = document.querySelector(".pen");
const downloadBtnDiv = document.querySelector(".downloadBtnDiv");

canvas.width = 800;
canvas.height = 600;

document.addEventListener("touchmove", (e) => {
  e.preventDefault();
});

let eraseOn = false;
let penOn = false;
let screenClick = false;
let downloadImg = false;

canvas.addEventListener("click", () => {
  screenClick = !screenClick;
});

eraseBtn.addEventListener("click", () => {
  eraseOn = true;
  penOn = false;
  screenClick = false;
});

penBtn.addEventListener("click", () => {
  penOn = true;
  eraseOn = false;
  screenClick = false;
  downloadImg = true;
});

var x = window.matchMedia("(max-width: 700px)");

function matches() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 60;
}

x.matches && matches();

let detectClick = false;
let size = 6;
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
  downloadImg = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function sizeIncrease() {
  if (size >= 24) {
    size = 24;
  } else {
    size += 3;
  }
  drawSize.innerText = size;
}

function sizeDecrease() {
  if (size <= 3) {
    size = 3;
  } else {
    size -= 3;
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
  let x = e.offsetX;
  let y = e.offsetY;
  if (!eraseOn && penOn && detectClick) {
    drawLine(x1, y1, x, y);
    drawCircle(x, y);

    x1 = x;
    y1 = y;
  }

  if (eraseOn && screenClick) {
    ctx.clearRect(x, y, 25, 25);
  }
});

/*=====================================*/

canvas.addEventListener("touchstart", (e) => {
  detectClick = true;

  x1 = e.touches[0].pageX;
  y1 = e.touches[0].pageY;
});

canvas.addEventListener("touchend", () => {
  detectClick = false;

  x1 = undefined;
  y1 = undefined;
});

canvas.addEventListener("touchmove", (e) => {
  let k = e.touches[0].pageX;
  let l = e.touches[0].pageY;
  if (!eraseOn && penOn && detectClick) {
    drawLine(x1, y1, k, l);
    drawCircle(k, l);

    x1 = k;
    y1 = l;
  }
  if (eraseOn && detectClick) {
    ctx.clearRect(k, l, 30, 30);
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
  ctx.lineCap = "round";
  ctx.stroke();
}

/*======================Download functionality====================== */

downloadBtnDiv.addEventListener("click", downloadCanvas);

function downloadCanvas() {
  if (downloadImg) {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
}
