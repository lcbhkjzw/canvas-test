var canvas = document.querySelector("#canvas") as HTMLCanvasElement;
var ctx = canvas.getContext("2d");
function drawRect() {
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 800, 400);
}

function drawLine() {
  ctx.canvas = null;
  ctx.beginPath();
  for (let y = 10; y < 100; y += 10) {
    ctx.moveTo(10, y);
    ctx.lineTo(90, y);
  }

  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = "red";
  var lindDash = ctx.getLineDash();
}

function drawCircle() {
  ctx.beginPath();
  ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  ctx.fillStyle = "#cbd34f";
  ctx.fill();
}

function drawText() {
  //   let text = ctx.measureText("Hello world");
  ctx.font = "20px Times New Roman";
  ctx.fillText("Hello world", 10, 20);
}

function drawWindow() {
  //   ctx.drawWindow(window, 0, 0, 100, 200, "rgb(255,255,255)");
}

const btnsMap = [
  { class: "drawRect", event: drawRect },
  { class: "drawCircle", event: drawCircle },
  { class: "drawLine", event: drawLine },
  { class: "drawText", event: drawText },
  { class: "drawWindow", event: drawWindow }
];

btnsMap.forEach(btn => {
  const ele = document.querySelector(`.${btn.class}`) as HTMLDivElement;
  ele.addEventListener("click", btn.event);
});

function fullScreen() {
  const ele = document.querySelector("#canvas") as HTMLCanvasElement;
  ele.requestFullscreen();
}

const fullScreenBtn = document.createElement("button");
fullScreenBtn.innerText = "全屏";
document.body.appendChild(fullScreenBtn);
fullScreenBtn.addEventListener("click", fullScreen);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const clearBtn = document.createElement("button");
clearBtn.innerText = "清空";
document.body.appendChild(clearBtn);
clearBtn.addEventListener("click", clearCanvas);

function getImageData() {
  const imgData = ctx.getImageData(0, 0, 800, 400);
  console.log(imgData);
}

const getImageDataBtn = document.createElement("button");
getImageDataBtn.innerText = "获取图像数据";
document.body.appendChild(getImageDataBtn);
getImageDataBtn.addEventListener("click", getImageData);