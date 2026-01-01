import { createElementClass } from "./common";
import { changeBackgraundColor, changeWellStyle, sleep } from "./common";
import type { colorMode } from "../type/type";
function darkmodeSwitch(){
    const header = document.getElementsByClassName("content-header");
    const btnParent = document.createElement("div")
    Object.assign(btnParent.style, {
        display: "flex",
        justifyContent: "flex-end" }
    )
    const lightBtn = createElementClass("div", "hidden-xs");
    if (header.length > 0) {
        const targetElement = header[0];
        Object.assign(lightBtn.style, {
            display: "flex",
            flexDirection: "column",
            alignItems:"center",
            justifyContent: "center",
            backgroundColor: "white",
            backgroundImage: "none",
            padding: "15px 15px",
            fontFamily: "fontAwesome",
            width: "70px",
            height: "50px",
            border: "1px solid black",
            borderRadius: "5px",
            userSelect: "none",
        });
        const icon = document.createElement("img")
        icon.id = "icon"
        icon.src = chrome.runtime.getURL("sun.svg")
        lightBtn.appendChild(icon)
        btnParent.appendChild(lightBtn)
        targetElement.prepend(btnParent);
    }else{
        console.error("エラー: content-wrapper が見つかりません。");
    }
    return lightBtn
}

const addDarkMode =(lightBtn :HTMLElement, nowColorMode: colorMode, originBgColor: string, lightEvent: (() => void)[] | null, darkEvent: (() => void)[] | null) => {
    let isProcessing = false;
    lightBtn.onclick =  async() =>{
        if (isProcessing) return 
        isProcessing = true
        nowColorMode = darkModeProcess(lightBtn, nowColorMode, originBgColor, lightEvent, darkEvent)
        await sleep(1000)
        isProcessing = false
        }
    return nowColorMode
}

const darkModeProcess = (lightBtn :HTMLElement, nowColorMode: colorMode, originBgColor: string, lightEvent: (() => void)[] | null, darkEvent: (() => void)[] | null) => {
        const wrapper = document.getElementsByClassName("content-wrapper");
        const header = document.querySelectorAll(".content-header");
        const header4 = document.querySelectorAll("h4");
        const bgColor2 = (nowColorMode === "light" ? "black" : "white") 
        const fontColor = (nowColorMode === "light" ? "white" : "black");
        const sunPath = chrome.runtime.getURL("sun.svg")
        const moonPath = chrome.runtime.getURL("moon.svg")

        if (wrapper.length > 0) {
            changeBackgraundColor((nowColorMode === "light" ? "#24272B" : originBgColor))

            header.forEach(element => {
                Object.assign((element as HTMLElement).style, {
                color: fontColor,
            })});

            header4.forEach(element => {
                Object.assign((element as HTMLElement).style, {
                color: fontColor,
            })});

            Object.assign(lightBtn.style,{
                backgroundColor: bgColor2
            })

            const icon = document.getElementById("icon") as HTMLImageElement
            icon.src = nowColorMode === "light" ? moonPath : sunPath

            changeWellStyle(bgColor2,
                            fontColor,
                            (nowColorMode === "light" ?  "#262424ff": "#f5f5f5"))
            
            if (lightEvent && nowColorMode === "light"){
                lightEvent.forEach(element => {
                element()
            })
            }
            if (darkEvent && nowColorMode === "dark"){
                darkEvent.forEach(element => {
                element()
            })
            }
            nowColorMode = (nowColorMode === "light" ? "dark" : "light")
            
        }else{
            console.error("エラー");
        }

    return nowColorMode
}

export { darkmodeSwitch, addDarkMode, darkModeProcess }