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

  //传递顶点数据给shader
  const a_position = gl.getAttribLocation(program, "a_position");
  const a_color = gl.getAttribLocation(program, "a_color");

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const position = new Float32Array([
    0.0,
    0.5,
    1.0,
    0.0,
    0.0, // (x,y) (r,g,b)
    -0.5,
    -0.5,
    0.0,
    1.0,
    0.0,
    0.5,
    -0.5,
    0.0,
    0.0,
    1.0
  ]);
  const BYTES_PER_ELEMENT = position.BYTES_PER_ELEMENT;
  gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);
  gl.bufferData(gl.ARRAY_BUFFER, position, a_color);

  gl.useProgram(program);
  gl.enableVertexAttribArray(a_position);
  gl.enableVertexAttribArray(a_color);

  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 5 * BYTES_PER_ELEMENT, 0);
  gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 3 * BYTES_PER_ELEMENT, 2 * BYTES_PER_ELEMENT,)

  gl.drawArrays(gl.POINTS, 0, 3);
}
