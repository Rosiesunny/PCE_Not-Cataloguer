document.addEventListener("visibilitychange", () => {
    saveVillage();
});

function saveVillage() {
    window.localStorage.setItem("myVillage", JSON.stringify(village));
}

function deleteCat(catID) {
    delete village.cats[catID];
    saveVillage();
}