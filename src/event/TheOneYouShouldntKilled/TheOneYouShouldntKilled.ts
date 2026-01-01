function shouldntKilledEvent(){
    const div = document.createElement("div")
    const img = document.createElement("img") as HTMLImageElement
    const wrapper = document.querySelector(".wrapper")

    const op = "0.4"

    if (!wrapper) return
    Object.assign(div.style,{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "9999",
        position: "fixed",
        top: 0,
        left:0,
        width: "100%",
        backgroundColor: "black"
    })
    div.style.setProperty("--timer", "0.5");
    div.style.setProperty("--op", op);
    
    img.style.width = "100vh"
    img.style.opacity = op
    img.src = chrome.runtime.getURL("TheOneYouShouldntHaveKilled.png")
    div.appendChild(img)
    wrapper.appendChild(div)
    div.className = "fade-out"
}

export {shouldntKilledEvent}