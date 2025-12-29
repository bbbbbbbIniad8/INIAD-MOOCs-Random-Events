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

export {shake, flash}