import { addDarkMode, darkmodeSwitch } from './darkmode';
import { addHeaderBtn } from './common';
import { eventList, type EventContext } from '../eventAdmin';
import type { colorMode } from '../type/type';
import { spinElement } from '../effect/effect';

export class EventManager {
  private originalContent: Node | undefined;
  private contentSection: Node | undefined;
  private bgColor: string = "";
  private isProcessing: boolean = false;

  constructor() {
    this.contentSection = document.querySelector('.content-wrapper') as Node | undefined;
    if (this.contentSection) {
      this.originalContent = this.contentSection.cloneNode(true);
      const contentStyle = window.getComputedStyle(this.contentSection as Element);
      this.bgColor = contentStyle.backgroundColor;
    }
  }

  private pseudoReload(selectedValue: number | null) {
    if (!this.contentSection || !this.contentSection.parentNode || !this.originalContent) return;
    
    const newContent = this.originalContent.cloneNode(true) as Node;
    this.contentSection.parentNode.replaceChild(newContent, this.contentSection);
    this.contentSection = newContent;
    document.body.style.cursor = "default";
    
    this.decideEvent(selectedValue);
  }

  public decideEvent(selectedValue: number | null) {
    let nowColorMode = "light" as colorMode;
    const tables = document.getElementsByClassName("row flex");
    const btnParent = document.createElement("div");
    const header = document.querySelector(".content-header") as HTMLElement;
    // const contentWrapper = document.querySelector(".content-wrapper") as HTMLElement;
    const reloadBtn = addHeaderBtn(btnParent, chrome.runtime.getURL("reload.svg"), "reloadBtnIcon");
    
    reloadBtn.onclick = () => this.reload(reloadBtn, null);
    reloadBtn.setAttribute("data-tooltip", "サーバーに負荷をかけずにイベント再抽選");
    reloadBtn.classList.add("custom-tooltip");

    Object.assign(btnParent.style, {
      display: "flex",
      justifyContent: "space-between"
    });

    const div = document.createElement("div")
    Object.assign(div.style, {
      display: "flex",
      justifyContent: "space-between"
    });

    const lightBtn = darkmodeSwitch(btnParent);
    div.prepend(lightBtn);
    div.prepend(reloadBtn);
    header.prepend(div);
    let lightEvent: (() => void)[] = [];
    let darkEvent: (() => void)[] = [];

    if (tables.length > 0) {
      const totalWeight = eventList.reduce((sum, e) => sum + e.weight, 0);
      let random = !selectedValue ? (Math.random() * totalWeight) : 9999;

      for (const event of eventList) {
        if (random < event.weight || selectedValue === event.eventNum) {
          const ctx: EventContext = {
            parent: tables[0] as HTMLElement,
            lightBtn,
            nowColorMode,
            bgColor: this.bgColor
          };
          const result = event.action(ctx);
          if (result.nowColorMode) nowColorMode = result.nowColorMode;
          if (result.lightEvent) lightEvent = result.lightEvent;
          if (result.darkEvent) darkEvent = result.darkEvent;
          break;
        }
        random -= event.weight;
      }
    }
    addDarkMode(lightBtn, nowColorMode, this.bgColor, lightEvent, darkEvent);
  }

  public async reload(reloadBtn: HTMLElement | null, selectedValue: number | null) {
    if (this.isProcessing) return;
    this.isProcessing = true;
    
    
    document.body.classList.remove("shake-x");
    const icon = reloadBtn?.querySelector("img");
    if (icon){
      await spinElement(icon, 1000);
    }
    this.pseudoReload(selectedValue);
    this.isProcessing = false;
  }

  public get processing() {
    return this.isProcessing;
  }
}