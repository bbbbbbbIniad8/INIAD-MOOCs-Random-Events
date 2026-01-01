import { changePointer } from "../../func/common"

function addGary(){
    changePointer(chrome.runtime.getURL("gary.png"))
}

export {addGary}