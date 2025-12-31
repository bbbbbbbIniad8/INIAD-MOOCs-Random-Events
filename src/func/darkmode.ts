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
            border: "1px solid black",
            borderRadius: "5px",
            userSelect: "none",
        });
        const icon = document.createElement("img")
        icon.id = "icon"
        icon.src = "https://icongr.am/clarity/sun.svg?size=25&color=000000"
        lightBtn.appendChild(icon)
        btnParent.appendChild(lightBtn)
        targetElement.prepend(btnParent);
    }else{
        console.error("エラー: content-wrapper が見つかりません。");
    }
    return lightBtn
}

const darkmode =(lightBtn :HTMLElement, nowColorMode: colorMode, originBgColor: string, LightEvent: (() => void)[] | null, DarkEvent: (() => void)[] | null) => {
    let isProcessing = false;
    lightBtn.onclick =  async() =>{
        if (isProcessing) return 
        isProcessing = true
        const wrapper = document.getElementsByClassName("content-wrapper");
        const header = document.querySelectorAll(".content-header");
        const header4 = document.querySelectorAll("h4");
        const bgColor2 = (nowColorMode === "light" ? "black" : "white") 
        const fontColor = (nowColorMode === "light" ? "white" : "black");

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
            icon.src = nowColorMode === "light" ? "https://icongr.am/clarity/moon.svg?size=25&color=ffffff" : "https://icongr.am/clarity/sun.svg?size=25&color=000000"

            changeWellStyle(bgColor2,
                            fontColor,
                            (nowColorMode === "light" ?  "#262424ff": "#f5f5f5"))
            
            if (LightEvent && nowColorMode === "light"){
                LightEvent.forEach(element => {
                element()
            })
            }
            if (DarkEvent && nowColorMode === "dark"){
                DarkEvent.forEach(element => {
                element()
            })
            }
            nowColorMode = (nowColorMode === "light" ? "dark" : "light")
            await sleep(1000)
        }else{
            console.error("エラー");
        }
        isProcessing = false
}
    return nowColorMode
}

export { darkmodeSwitch, darkmode }