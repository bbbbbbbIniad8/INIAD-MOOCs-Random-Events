window.onload = () => {
    const uboaImg = document.getElementById("uboa");
    if (uboaImg) {
        const url = chrome.runtime.getURL("uboaEventFin.png");
        console.log("Loading Image URL:", url);
        uboaImg.src = url;
    }
};