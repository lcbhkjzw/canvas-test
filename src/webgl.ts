import { createShader, createProgram } from "./utils/tools";

export default function webgl() {
  const canvas = document.querySelector("#c") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl");
  const vertexShaderSource = `
    attribute vec4 a_position;

    attribute vec4 a_color;
    varying vec4 v_color;

    void main() {
      gl_Position = a_position;
      gl_PointSize = 100.0;
      v_color = a_color;
    }
  `;
  const fragmentShaderSource = `
    precision mediump float;

    varying vec4 v_color;

    void main() {
      gl_FragColor = v_color;
    }
  `;
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );
  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  //传递顶点数据给shader
  const a_position = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const position = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(a_position);
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

  const a_color = gl.getAttribLocation(program, "a_color");
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  const color = new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]);
  gl.bufferData(gl.ARRAY_BUFFER, color, gl.STATIC_DRAW);

  gl.enableVertexAttribArray(a_color);

  gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 0, 0);

  // gl.drawArrays(gl.TRIANGLES, 0, 3);
  // gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
}
