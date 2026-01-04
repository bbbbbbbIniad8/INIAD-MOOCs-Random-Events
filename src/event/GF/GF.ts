import type { colorMode } from "../../type/type"
import { darkModeProcess } from "../../func/darkmode"
import { addDarkMode } from "../../func/darkmode"
import { closeCurrentTab, sleep } from "../../func/common"

const addGF = (lightBtn: HTMLElement, nowColorMode: colorMode, bgColor: string) => {
    nowColorMode = darkModeProcess( nowColorMode, bgColor, null, null)
    
    const div = document.createElement("div")
    const img = document.createElement("img") as HTMLImageElement
    img.src = chrome.runtime.getURL("src/event/GF/pic/GF.png")
    const header = document.querySelector(".content-header")

    Object.assign(div.style, {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none"
    })
    img.style.width = "400px"
    div.append(img)

    if (header) {
        header.prepend(div)
    }

    let timerId: number | null = null
    const WAIT_TIME = 10000

    const callback: IntersectionObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timerId = window.setTimeout(() => {
                    GFEvent()
                }, WAIT_TIME)
            } else {
                if (timerId) {
                    clearTimeout(timerId);
                    timerId = null
                }
                div.style.display = "none";
                addDarkMode(lightBtn, nowColorMode, bgColor, null, null)
                observer.unobserve(div);
            }
        });
    };

    const options: IntersectionObserverInit = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(div);
    return nowColorMode
}

async function GFEvent() {
    if (document.getElementById("GF")) return;

    const img = document.createElement("img") as HTMLImageElement
    img.id = "GF";
    img.src = chrome.runtime.getURL("src/event/GF/pic/dead.png")
    Object.assign(img.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        zIndex: "99999",
        userSelect: "none"
    })
    
    document.body.appendChild(img)
    document.body.style.overflow = "hidden" 
    await sleep(2000)
    closeCurrentTab()
}

export { addGF, GFEvent }