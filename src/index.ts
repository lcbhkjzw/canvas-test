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

/*******************  3d ******************/
function webgl() {
  // 创建着色器方法，输入参数：渲染上下文，着色器类型，数据源
  function createShader(gl, type, source) {
    var shader = gl.createShader(type); // 创建着色器对象
    gl.shaderSource(shader, source); // 提供数据源
    gl.compileShader(shader); // 编译 -> 生成着色器
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
  const canvas = document.querySelector('#c') as HTMLCanvasElement;
  const gl = canvas.getContext("webgl");
  const vertexShaderSource = `
        // 一个属性值，将会从缓冲中获取数据
        attribute vec4 a_position;
        
        // 所有着色器都有一个main方法
        void main() {
        
        // gl_Position 是一个顶点着色器主要设置的变量
        gl_Position = a_position;
        }
  `;
  const fragmentShaderSource = `
        // 片断着色器没有默认精度，所以我们需要设置一个精度
        // mediump是一个不错的默认值，代表“medium precision”（中等精度）
        precision mediump float;
        
        void main() {
            // gl_FragColor是一个片断着色器主要设置的变量
            gl_FragColor = vec4(0, 0, 0.5, 1); // 返回“瑞迪施紫色”
        }
  `;
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }
  var program = createProgram(gl, vertexShader, fragmentShader);
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position"); // 定义地址
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 三个二维点坐标
  var positions = [0, 0, 0, 0.5, 0.7, 0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
//   webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // 清空画布
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 告诉它用我们之前写好的着色程序（一个着色器对）
  gl.useProgram(program);
  gl.enableVertexAttribArray(positionAttributeLocation);
  // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
  var size = 2; // 每次迭代运行提取两个单位数据
  var type = gl.FLOAT; // 每个单位的数据类型是32位浮点型
  var normalize = false; // 不需要归一化数据
  var stride = 0; // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
  // 每次迭代运行运动多少内存到下一个数据开始点
  var offset = 0; // 从缓冲起始位置开始读取
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 3;
  gl.drawArrays(primitiveType, offset, count);
}

const webGLbtn = document.createElement("button");
webGLbtn.innerText = "webgl";
document.body.appendChild(webGLbtn);
webGLbtn.addEventListener("click", webgl);

/*******************  3d ******************/
