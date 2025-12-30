import { addWell } from "../../func/common";
import { breakEffect, colorOut } from "../../effect/effect";

let clickNum = 0

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
async function closeCurrentTab() {
    chrome.runtime.sendMessage({ action: "CLOSE_TAB" });
}

async function typeEffect(div: HTMLElement) {
    let displayText = "";
    await sleep(1000);
    const headWords = ["만", "지", "지", "마"];
    for (const char of headWords) {
        await sleep(300);
        displayText += char;
        div.textContent = displayText;
    }

    let speed = 100;
    let fontSize = 80;

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
        e.preventDefault()
        clickNum++
        if (clickNum >= 4){
            const div = colorOut("#ff0808ff")
            typeEffect(div)
        } else {
            breakEffect()
        }
    })

    img.addEventListener("click", (e)=>{
        e.preventDefault()
        clickNum++
        if (clickNum >= 4){
            const div = colorOut("#ff0808ff")
            typeEffect(div)
        } else {
            breakEffect()
        }
    })
    return element
}

export { addHatizihanWell }