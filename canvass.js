const canvas = document.getElementById("A+Canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const rectBtn = document.getElementById("jsrect");

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillCanvas);
  canvas.addEventListener("contextmenu", handleCM);
}

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "white";

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  //마우스 위치 감지, 그리기 기능
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //painting을 true값으로 바꾼다.
    ctx.beginPath(); //경로list 시작
    ctx.moveTo(x, y); //경로list에 시작 좌표값을 받는다.
  } else {
    ctx.lineTo(x, y); //경로list에 하위 좌표값을 받음.
    ctx.stroke(); //시작 값부터 하위 값들의 경로로 획을 그음.
  }
}

function onMouseUp(event) {
  stopPainting();
} //마우스 클릭x

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
} //색상 바꾸기

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
); //색상 바꾸기
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
} //브러쉬 크기

if (range) {
  range.addEventListener("input", handleRangeChange);
} //브러쉬 크기

function fillCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
} //채우기

if (mode) {
  mode.addEventListener("click", handleModeClick);
} //채우기

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerHTML = "FILL";
  } else {
    filling = true;
    mode.innerHTML = "PAINT";
  }
} //채우기

function handleCM(event) {
  event.preventDefault();
} //저장

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
} //저장

if (save) {
  save.addEventListener("click", handleSaveClick);
} //저장

function colorChange(color) {
  ctx.strokeStyle = color;
} //지우개

function clearAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
} //전체지우개

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMoveR);
  canvas.addEventListener("mousedown", startRecting);
  canvas.addEventListener("mouseup", stopRecting);
  canvas.addEventListener("mouseleave", stopRecting);
}
if (rectBtn) {
  rectBtn.addEventListener("click", handleRectClick);
}

let paint = true;
let rectpaint = false;
let rect = false;
let recting = false;
let fill = false;

let startX = 0;
let startY = 0;

function handleRectClick(event) {
  if (rect === false) {
    rect = true;
    fill = false;
    paint = false;
  }
}

function startRecting(event) {
  if (rect === true) {
    recting = true;
    startX = event.offsetX;
    startY = event.offsetY;
    ctx.beginPath();
  }
}

function onMouseMoveR(event) {
  if (rect === true) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!recting) {
    } else {
      const width = x - startX;
      const height = y - startY;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.fillRect(startX, startY, width, height);
    }
  }
}

function stopRecting(event) {
  if (rect === true) {
    recting = false;
    ctx.stroke();
    ctx.closePath();
  }
  rect = false;
}
