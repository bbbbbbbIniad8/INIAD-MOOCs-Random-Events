const randomNum = (min: number, max: number) => {
  const minValue = min;
  const maxValue = max;
  const randomInt = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  return randomInt;
}

const createElementClass = (elementName : string, className: string) => {
  const content = document.createElement(elementName);
  content.className = className;
  return content;
};

const createWellContent = (title: string, imgUrl: string, courseUrl: string) =>{
  const col = createElementClass("div", "col-lg-4 col-sm-6 col-xs-12")
  const well = createElementClass("div", "well")
  const media = createElementClass("div", "media")
  const mediaLeft = createElementClass("div", "media-left media-middle")
  const img = createElementClass("img", "course-list-icon") as HTMLImageElement
  img.src = imgUrl
  img.style = "object-fit: contain;"
  const mediaBody = createElementClass("div", "media-body media-middle")
  const mediaHeading = createElementClass("h4", "media-heading")
  mediaHeading.textContent = title
  const btn = createElementClass("a", "btn btn-primary") as HTMLAnchorElement
  btn.href = courseUrl
  const i = createElementClass("i", "fa fa-play-circle")
  i.textContent = " View Course"

  col.appendChild(well)
  well.appendChild(media)
  media.appendChild(mediaLeft)
  mediaLeft.appendChild(img)
  media.appendChild(mediaBody)
  mediaBody.appendChild(mediaHeading)
  mediaBody.appendChild(btn)
  btn.appendChild(i)
  return col
}

function changeBackgraundColor(BgColor: string){
  const wrapper = document.querySelector(".content-wrapper");

  Object.assign((wrapper as HTMLElement).style, {
      backgroundColor: BgColor
  });

}

function changeWellStyle(BgColor: string, fontColor: string, borderColor: string){
  const wells = document.querySelectorAll(".well");
    wells.forEach(element => {
      Object.assign((element as HTMLElement).style, {
                    backgroundColor: BgColor,
                    color: fontColor,
                    borderStyle: "solid",
                    borderColor: borderColor})
    }
  )
}

function deleteAllAnchersHref(){
  const anchers = document.querySelectorAll("a")
  anchers.forEach(element => {
    element.removeAttribute("href");
  })
}
function addWell(parentElement: Element, title: string, imgPath: string, linkPath: string ){
  const element = createWellContent(title,
                                    imgPath,
                                    linkPath) 
  parentElement.prepend(element);
  return element
}
const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));  

export {randomNum, createElementClass, createWellContent, addWell,
       changeWellStyle, changeBackgraundColor, deleteAllAnchersHref ,sleep}