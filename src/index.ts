import webgl from "./webgl";

const webGLbtn = document.createElement("button");
webGLbtn.innerText = "webgl";
document.body.appendChild(webGLbtn);
webGLbtn.addEventListener("click", webgl);

const drawLine = document.querySelector('#draw-line');
drawLine.addEventListener('click', () => {
  const canvas = document.querySelector('#c') as HTMLCanvasElement;
  const gl = canvas.getContext('webgl');
  
  const vertexSource = `

  `
  const fragmentSource = `
    
  `
})