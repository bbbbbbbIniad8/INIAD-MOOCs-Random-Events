import './index.css'
import { darkmode, darkmodeSwitch } from './func/darkmode';
import { addUboaWell, uboaEvent } from './event/uboa/uboa';
import type { colorMode } from './type/type';
import { monikaEvent } from './event/monika/process';
import { addSpk } from './event/spk/spk';
import { randomNum } from './func/common';
import { addHatizihanWell } from './event/hatizihan/hatizihan';

const funValMax = 200;
const funValue = randomNum(0, funValMax)

const nowColorMode = "light" as colorMode
const tables = document.getElementsByClassName("row flex")
const lightBtn = darkmodeSwitch()
let lightEvent: (() => void)[] = [];
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
  }
} else {
    console.error("エラー");
}

darkmode(lightBtn, nowColorMode, lightEvent, null)
