import { createShader, createProgram } from "./utils/tools";

export default function webgl() {
  const canvas = document.querySelector("#c") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl");
  const vertexShaderSource = `
    attribute vec4 a_position;

    void main() {
      gl_Position = a_position;
      gl_PointSize = 100.0;
    }
  `;
  const fragmentShaderSource = `
    precision mediump float;

    uniform vec4 u_color;

    void main() {
      gl_FragColor = u_color;
    }
  `;
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );
  const program = createProgram(gl, vertexShader, fragmentShader);

  //传递顶点数据给shader
  const positionAttribute = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const position = [-0.2, 0.2, 0, 0, 0.7, 0.5];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);

  const colorUniform = gl.getUniformLocation(program, "u_color");

  gl.useProgram(program);
  gl.enableVertexAttribArray(positionAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.uniform4f(colorUniform, 0, 23, 43, 1);

  gl.drawArrays(gl.POINTS, 0, 3);
}
