function openCollapsible(id) {
    let idlocation = document.getElementById(id)

    if (idlocation.classList.contains("openedcontent")) {
        idlocation.classList.remove("openedcontent")
        idlocation.classList.add("closedcontent")
    }
    else {
        idlocation.classList.add("openedcontent")
        idlocation.classList.remove("closedcontent")
    }
}
