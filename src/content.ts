import './index.css'
import { createWellContent } from './func/common';
import { darkmode, darkmodeSwitch } from './func/darkmode';
import { uboaEvent } from './event/uboa/uboa';
import type { colorMode } from './type/type';


const uboaEventRun = false

const nowColorMode = "light" as colorMode
const tables = document.getElementsByClassName("row flex")
if (tables.length > 0) {
    const element1 = createWellContent("情報連携のためのｽﾋﾟｷ",
                                    "https://pbs.twimg.com/media/G7s0RbrbAAIaLs5?format=png&name=medium",
                                  "https://youtu.be/HDjdSK-oRC4?si=-nmF90E9IKcBW9eB")

    const element2 = createWellContent("ポ二子",
                                    chrome.runtime.getURL("poniko.png"),
                                    "https://www3.nns.ne.jp/~tk-mto/kikiyamaHP.html") 
    element2.id = "poniko"
    tables[0].prepend(element1);
    tables[0].prepend(element2);
} else {
    console.error("エラー");
}
const lightBtn = darkmodeSwitch()
if (uboaEventRun === false){
  darkmode(lightBtn, nowColorMode, [() => uboaEvent(lightBtn, nowColorMode)], null)
}