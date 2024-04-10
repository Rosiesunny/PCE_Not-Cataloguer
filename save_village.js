document.addEventListener("visibilitychange", () => {
    saveVillage();
});

function saveVillage() {
    window.localStorage.setItem("myVillage", JSON.stringify(village));
}

function clearVillage() {
    window.localStorage.removeItem("myVillage");
}