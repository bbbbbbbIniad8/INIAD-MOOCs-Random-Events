import './index.css'
import { addDarkMode, darkmodeSwitch} from './func/darkmode';
import { addUboaWell, uboaEvent } from './event/uboa/uboa';
import type { colorMode } from './type/type';
import { monikaEvent } from './event/monika/process';
import { addSpk } from './event/spk/spk';
import { randomNum } from './func/common';
import { addHatizihanWell } from './event/hatizihan/hatizihan';
import { deleteOnNowEvent } from './event/deleteOnNow/deleteOnNow';
import { sleep } from './func/common';
import { addGary } from './event/gary/gary';
import { addGF, GFEvent } from './event/GF/GF';
import { shouldntKilledEvent } from './event/TheOneYouShouldntKilled/TheOneYouShouldntKilled';

const pseudoReload = (contentSection: Node | undefined, originalContent: Node | undefined, bgColor: string, fanValue: number|null) => {
  if (!contentSection||!contentSection.parentNode || !originalContent) return;
  const newContent = originalContent.cloneNode(true) as Node;
  contentSection.parentNode.replaceChild(newContent, contentSection);
  contentSection = newContent;
  document.body.style.cursor = "default"
  decideEvent(bgColor, fanValue)
  return contentSection
};

function decideEvent(bgColor: string, selectedValue: number | null){
  const funValMax = 300;
  let funValue = randomNum(0, funValMax)
  if (selectedValue){
    funValue = selectedValue
  }

  let nowColorMode = "light" as colorMode
  const tables = document.getElementsByClassName("row flex")
  const lightBtn = darkmodeSwitch()
  let lightEvent: (() => void)[] = [];
  let darkEvent: (() => void)[] = [];
  if (tables.length > 0) {
    if (funValue < 50){
      addSpk(tables[0])
    }else if (funValue < 75){
      addUboaWell(tables[0])
      lightEvent = [() => uboaEvent(lightBtn, nowColorMode)];
    }else if (funValue < 85){
      monikaEvent()
    }else if (funValue < 100){
      addHatizihanWell(tables[0])
    }else if (funValue < 101){
      deleteOnNowEvent()
    } else if(funValue < 110){
      nowColorMode = addGF(lightBtn, nowColorMode, bgColor)
      darkEvent = [() => GFEvent()]
    }else if (funValue < 150){
      addGary()
    }else{
      shouldntKilledEvent()
    }
  } else {
      console.error("エラー");
  }
  addDarkMode(lightBtn, nowColorMode, bgColor, lightEvent, darkEvent)
}


let originalContent = undefined as Node | undefined;
let contentSection = document.querySelector('.content-wrapper') as Node | undefined;
let bgColor = ""
if (contentSection) {
  originalContent = contentSection.cloneNode(true);
  const contentStyle = window.getComputedStyle(contentSection as Element);
  bgColor = contentStyle.backgroundColor;
}
let isProcessing = false
decideEvent(bgColor, null);
window.addEventListener('keydown', async(e) => {
  let selectedValue = null as number | null
  if ((e.key === '9' || e.key === 't') && isProcessing === false) {
    if (e.key === 't'){
      const inputValue = prompt()
      selectedValue = Number(inputValue)
    }
    isProcessing = true
    contentSection = pseudoReload(contentSection, originalContent, bgColor, selectedValue)
    document.body.classList.remove("shake-x")
    await sleep(1000)
    isProcessing = false
  } 
});