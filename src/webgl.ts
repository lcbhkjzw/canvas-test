import { createShader, createProgram } from "./utils/tools";

export default function webgl() {
  const canvas = document.querySelector("#c") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl");
  const vertexShaderSource = `
    void main() {
      gl_Position     = vec4(.0, .0, .0, 1.0);
      gl_PointSize     = 100.0;
    }
  `;
  const fragmentShaderSource = `
    void main() {
      gl_FragColor = vec4(.0, .0, 1.0, 1.0);
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
  gl.drawArrays(gl.POINTS, 0, 1);
}
