import { createShader, createProgram } from "./utils/tools";

export default /*******************  3d ******************/
function webgl() {
  
  const canvas = document.querySelector("#c") as HTMLCanvasElement;
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
  var program = createProgram(gl, vertexShader, fragmentShader);
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position"); // 定义地址
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 三个二维点坐标
  var positions = [-1, -1, 0, -1, 0.7, 1];
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

/*******************  3d ******************/
