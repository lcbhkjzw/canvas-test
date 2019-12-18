import webgl from "./webgl";

const webGLbtn = document.createElement("button");
webGLbtn.innerText = "webgl";
document.body.appendChild(webGLbtn);
webGLbtn.addEventListener("click", webgl);
