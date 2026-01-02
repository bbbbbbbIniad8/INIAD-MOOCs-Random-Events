import { sleep } from "../../func/common"

function addRedRoom(){
    const backDiv = document.createElement("div")
    const div = document.createElement("div")
    const closeBar = document.createElement("div") 
    const divChild = document.createElement("div")
    const wrapper = document.querySelector(".wrapper")
    const DoYou = document.createElement("div")
    const Like = document.createElement("div")
    const closeBtn = document.createElement("div")
    if (!wrapper) return
    const img01 = document.createElement("img") as HTMLImageElement
    img01.src = chrome.runtime.getURL("redRoom01.png")
    const img02 = document.createElement("img") as HTMLImageElement
    img02.src = chrome.runtime.getURL("redRoom02.png")
    wrapper.appendChild(backDiv)
    backDiv.appendChild(div)
    div.appendChild(closeBar)
    div.appendChild(divChild)
    closeBar.appendChild(closeBtn)
    divChild.appendChild(DoYou)
    divChild.appendChild(Like)
    divChild.appendChild(img01)
    divChild.appendChild(img02)

    const size = 400;
    const fontSize = 24
    const top = 45
    const DoYouDefaultPosition = size * 0.30

    Object.assign(backDiv.style,{
        zIndex: "9000",
        position: "fixed",
        top: "80vh",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    })

    Object.assign(div.style,{
        zIndex: "9000",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        
    })
    Object.assign(closeBar.style,{
        zIndex: "99999",
        position: "relative",
        width : `${size}px`,
        height: "20px",
        
    })

    Object.assign(closeBtn.style, {
        width: "20px",
        color: "black",
        textAlign: "center",
        backgroundColor: "#BEC9C9",
        border: "1px solid black"
    })
    
    closeBtn.textContent = "X"

    Object.assign(img01.style,{
        zIndex: "9800",
        position: "absolute",
        pointerEvents: "none",
        width: `${size}px`
    })
    
    Object.assign(DoYou.style,{
        zIndex: "9801",
        position: "absolute",
        fontSize: `${fontSize}px`,
        width: "300px",
        color:"black",
        top: `${top}px`,
        left: `${DoYouDefaultPosition}px`,
        transform: "rotate(-3deg) scaleY(0.8)",
        
    })

    DoYou.textContent = "あなたは 赤い部屋が"

    Object.assign(img02.style,{
        zIndex: "9900",
        position: "absolute",
        pointerEvents: "none",
        width: `${size}px`
    })

    Object.assign(Like.style,{
        zIndex: "9901",
        position: "absolute",
        fontSize: `${fontSize}px`,
        width: "200px",
        color:"black",
        top: `${top + 10}px`,
        left: `${size * 0.6}px`,
        transform: "rotate(3deg) scaleY(0.8)",
        
    })
    Like.textContent = "好きですか？"
    let push = 0

    closeBtn.addEventListener("click", async() => {
        push++;
        if (push === 12){
            for(let i:number=12; i <= 30; i++){
                push++; 
                await deletePopup(backDiv, DoYou, push, size, DoYouDefaultPosition)
                await sleep(100)
            }
            window.location.href = chrome.runtime.getURL('src/event/redRoom/redRoom.html');
        }else{
            await deletePopup(backDiv, DoYou, push, size, DoYouDefaultPosition)
        }
    }

)}

async function deletePopup(element: HTMLElement, DoYou: HTMLElement,
                           push: number, size: number, DoYouDefaultPosition: number){
    element.style.display = "none"
    await sleep(100)
    changePopup(DoYou, push, size, DoYouDefaultPosition)
    element.style.display = "flex"
    await sleep(100)
}

function changePopup(element: HTMLElement, push: number, size: number, DoYouDefaultPosition: number){
    if (push % 2 === 0 && push <= 32){
            element.style.left = `${DoYouDefaultPosition - (push * size * 0.01)}px`
        }
    }

export {addRedRoom}