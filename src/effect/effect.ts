import { randomNum } from "../func/common";

function shake(){
    document.body.classList.add("shake-x")
}

function flash(){
    const flashDiv = document.createElement("div");
    document.body.appendChild(flashDiv);
    flashDiv.classList.add("flash-effect");
    setTimeout(() => {
        flashDiv.classList.remove("flash-effect");
    }, 3000);
}

function breakEffect(){
    const breakDiv = document.createElement("img");
    breakDiv.src = chrome.runtime.getURL("break.png")
    Object.assign(breakDiv.style,{
      pointerEvents: "none",
      position: "fixed",
      top: `${randomNum(-300, 300)}px`,
      left: `${randomNum(-300, 300)}px`,
      width: "100%",
      height: "100%",
      zIndex: 9999
    })
    document.body.appendChild(breakDiv);
}

function colorOut(color: string, time: GLfloat) {
  const div = document.createElement("div");
  Object.assign(div.style, {
    backgroundColor: "transparent",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "9999",
  });

  div.style.setProperty("--target-color", color);
  div.style.animation = `color-out-animation ${time}s ease-out forwards`;
  document.body.appendChild(div);

  return div

}
  

export {shake, flash, breakEffect, colorOut}