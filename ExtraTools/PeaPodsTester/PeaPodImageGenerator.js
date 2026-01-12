function makePeaPodImage(furlength, color, colortype, whitelevel, whitetype, pattern, accentcolor, eyes, eyecolor, pose, age, species, location) {
    let mainclass = generateMainClass(pose, furlength, species, age)
    let basecatsrc = makeBaseCatImageSRC(color, pattern, species)
    addImage(basecatsrc, location, mainclass, "cat-base", 8)
    if (colortype == "Tortoiseshell" || colortype == "Watercolor") {
       let tradesrc = makeTradeImageSRC(color, pattern, species)
       addImage(tradesrc, location, mainclass, "cat-base", 9)
    }
    if (species == "Mercat") {
        let accentsrc = makeAccentImageSRC(accentcolor, pattern, species)
        addImage(accentsrc, location, mainclass, "cat-base", 9)
    }
    let whitesrc = makeWhiteImageSRC(whitelevel, whitetype, species)
    addImage(whitesrc, location, mainclass, "cat-white", 10)
    let eyessrc = makeEyesImageSRC(eyes, eyecolor)
    addImage(eyessrc, location, mainclass, "cat-eyes", 10)
}



function addImage(imgsrc, location, mainclass, otherclass, zindex) {
    let catjailfound = location.querySelector(".catjail")
    if (!catjailfound) {
        let catjaildiv = document.createElement("div")
        catjaildiv.classList.add("catjail")
        catjaildiv.style = "margin: auto;"
        location.appendChild(catjaildiv)
    }
    let catjaillocation = location.querySelector(".catjail")
    let catimage = document.createElement("img")
    if (document.URL.includes("ExtraTools")) {
        imgsrc = "../" + imgsrc
        catimage.classList.add("extratools-float-up")
    }
    catimage.src = imgsrc
    catimage.classList.add(mainclass)
    catimage.classList.add(otherclass)
    catimage.style = "z-index: " + zindex
    catjaillocation.insertAdjacentElement("beforeend", catimage)
}
