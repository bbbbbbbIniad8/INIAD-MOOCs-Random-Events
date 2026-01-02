import { sleep } from "../../func/common";

window.onload = async() => {
    const nameList = document.getElementById('nameList');
    const add = document.getElementById('add')
    const target = document.getElementById('zoom');
    if (!nameList) return
    if (!target) return
    if (!add) return

    const targetRect = target.getBoundingClientRect();
    const x = targetRect.left + (targetRect.width / 2);
    const y = targetRect.top + (targetRect.height);

    nameList.style.transformOrigin = `${x}px ${y}px`;

    setTimeout(() => {
        nameList.classList.add('zooming');
    }, 10000);

    setTimeout(() => {
        add.textContent += "/"
    }, 10000);

    await sleep(20000)

    const div = document.createElement("div")

    Object.assign(div.style, {
      display: "flex",
      alignItems: "center",
      justifyContent: "center", 
      textAlign: "center",
      color: "white",
      animation :"none",
      backgroundColor :"blue",
      fontSize : '50px',
      fontWeight :'200',
      zIndex: '9999',
      height: '100vh'
    }
    )
    div.textContent = "あなたは襍､縺?Κ螻から保護されました。\n元のサイトに戻ってください。";
    nameList.style.display="none"
    document.body.appendChild(div)

    
};