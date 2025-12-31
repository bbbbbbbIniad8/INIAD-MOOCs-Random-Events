import { addWell } from "../../func/common";
import { breakEffect, colorOut } from "../../effect/effect";
import { sleep } from "../../func/common";

let clickNum = 0

async function closeCurrentTab() {
    chrome.runtime.sendMessage({ action: "CLOSE_TAB" });
}

async function typeEffect(div: HTMLElement) {
    let displayText = "";
    let speed = 100;
    let fontSize = 80;
    await sleep(1000);
    const headWords = ["만", "지", "지", "마"];
    for (const char of headWords) {
        await sleep(300);
        displayText += char;
        div.textContent = displayText;
    }

    for (let i = 0; i < 200; i++) {
        await sleep(speed);
        displayText += "아";
        div.textContent = displayText;
        if (speed > 10) speed -= 3;
        if (i > 50 && fontSize < 500) {
            fontSize += 5;
        }
        div.scrollTop = div.scrollHeight + (Math.random() * 50);
        if (i % 10 === 0) {
            div.style.color = Math.random() > 0.5 ? "#000000ff" : "white";
        }
    }
    
    await sleep(500);
    Object.assign(div.style, {
      display: "flex",
      alignItems: "center",
      justifyContent: "center", 
      textAlign: "center",
      animation :"none",
      backgroundColor :"blue",
      fontSize : '50px',
      fontWeight :'200',
      transform :"scaleY(-1)"
    }
    )
    div.textContent = "INIAD MOOCs に重大なエラーが発生いたしました。";
    await sleep(500);
    closeCurrentTab();
}

function hatizihanEvent(e: PointerEvent){
    e.preventDefault()
    clickNum++
    if (clickNum >= 4){
        const div = colorOut("#ff0808ff", 0.5)
        Object.assign(div.style,{
            fontSize: "80px",
            color: "white",
            fontWeight: "1000",
            overflow: "scroll",
        })
        typeEffect(div)
    } else {
        breakEffect()
    }
}

function addHatizihanWell(parentElement: Element){
    const element = addWell(parentElement,
                            "만져서는 안 된다",
                            chrome.runtime.getURL("hatizihan.png"),
                            "https://youtu.be/haUwYGcZCMk?si=CyB6H46vFqVRWplU") 
    element.id = "hatizihan"
    parentElement.prepend(element);

    const btn = element.querySelector("a")
    if (!btn) return
    const img = element.querySelector("img")
    if (!img) return
    btn.addEventListener("click", (e)=>{
        hatizihanEvent(e)
    })

    img.addEventListener("click", (e)=>{
        hatizihanEvent(e)
    })
    return element
}

export { addHatizihanWell }