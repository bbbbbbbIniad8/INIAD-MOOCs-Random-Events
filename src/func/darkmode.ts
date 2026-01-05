import { addHeaderBtn } from "./common";
import { changeBackgraundColor, changeWellStyle, sleep } from "./common";
import type { colorMode } from "../type/type";


function darkmodeSwitch(btnParent: HTMLElement){
    const lightBtn = addHeaderBtn(btnParent, chrome.runtime.getURL("sun.svg"), "darkModeBtnIcon")
    return lightBtn
}

const addDarkMode =(lightBtn :HTMLElement, nowColorMode: colorMode, originBgColor: string, lightEvent: (() => void)[] | null, darkEvent: (() => void)[] | null) => {
    let isProcessing = false;
    lightBtn.onclick =  async() =>{
        if (isProcessing) return 
        isProcessing = true
        nowColorMode = darkModeProcess( nowColorMode, originBgColor, lightEvent, darkEvent)
        await sleep(1000)
        isProcessing = false
        }
    
        Object.assign(lightBtn.style, {
            position: "fixed",
            bottom: 0,
            right: 0,
            zIndex: 5000,
            margin: "10px",
        })
    return nowColorMode
}

const darkModeProcess = (nowColorMode: colorMode, originBgColor: string, lightEvent: (() => void)[] | null, darkEvent: (() => void)[] | null) => {
        const wrapper = document.getElementsByClassName("content-wrapper");
        const header = document.querySelectorAll(".content-header");
        const header4 = document.querySelectorAll("h4");
        const bgColor2 = (nowColorMode === "light" ? "black" : "white") 
        const fontColor = (nowColorMode === "light" ? "white" : "black");
        const sunPath = chrome.runtime.getURL("sun.svg")
        const moonPath = chrome.runtime.getURL("moon.svg")

        const reloadBlackPath = chrome.runtime.getURL("reload.svg")
        const reloadWhitePath = chrome.runtime.getURL("reloadWhite.svg")


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

            const btns = document.querySelectorAll(".btns")
            btns.forEach(element=>{
                Object.assign((element as HTMLElement).style, {
                backgroundColor: bgColor2,
            })});

            const darkModeBtnIcon = document.getElementById("darkModeBtnIcon") as HTMLImageElement
            darkModeBtnIcon.src = nowColorMode === "light" ? moonPath : sunPath

            const reloadBtnIcon = document.getElementById("reloadBtnIcon") as HTMLImageElement
            reloadBtnIcon.src = nowColorMode === "light" ? reloadWhitePath : reloadBlackPath

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