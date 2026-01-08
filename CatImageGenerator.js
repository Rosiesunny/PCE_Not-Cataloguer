function makeCatImage(furlength, color, colortype, whitelevel, whitetype, pattern, accentcolor, eyes, eyecolor, pose, age, species, location) {
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
    catimage.src = imgsrc
    catimage.classList.add(mainclass)
    catimage.classList.add(otherclass)
    catimage.style = "z-index: " + zindex
    catjaillocation.insertAdjacentElement("beforeend", catimage)
}

function generateMainClass(pose, furlength, species, age) {
    let mainclass = ""
    if (species == "Not-cat") {
        mainclass += "c-"
    }
    if (species == "Mercat") {
        mainclass += "m-"
    }
    if (age == "Adult" || age == "Adolescent") {
        mainclass += "adult-"
    }
    if (age == "Kitten" || age == "Young Kitten") {
        mainclass += "kitten-"
    }
    if (age == "Bean") {
        mainclass += "bean-"
    }
    if (furlength == "Longhair") {
        mainclass += "longhair-"
    }
    if (furlength == "Shorthair") {
        mainclass += "shorthair-"
    }
    if (typeof pose == "undefined" || pose.includes("undefined")) {
        pose = "standing"
    }
    mainclass += pose
    return mainclass
}

function makeBaseCatImageSRC(color, pattern, species) {
    if (color == "-hidden-") {
        return "/assets/PCE_Assets/Cat/blank.png"
    }
    else {
        let colorList = ["Black", "Chocolate", "Brown", "Tan", "Red", "Ginger", "Orange", "Apricot", "Charcoal", "Grey", "Smoke", "Silver", "Buff", "Cream", "Almond", "Beige", "Snow", "-hidden-"]
        let colorListFiles = ["black", "choco", "brown", "tan", "red", "ginger", "orange", "aprico", "charc", "grey", "smoke", "silver", "buff", "cream", "almond", "beige", "snow", "unknown"]
        let imgsrc = "/assets/PCE_Assets/Cat/"
        if (species == "Not-cat") {
            imgsrc += "Not-Cat/BaseColors/"
        }
        if (species == "Mercat") {
            imgsrc += "Mercat/BaseColors/"
        }
        if (color.includes("-")) {
            color = color.split("-")[0]
        }
        for (let i = 0; i < colorList.length; i++) {
            if (color === colorList[i]) {
                imgsrc += colorListFiles[i] + "_main_"
                break
            }
        }
        imgsrc += pattern.toLowerCase() + ".png"
        return imgsrc
    }
}

function makeTradeImageSRC(color, pattern, species) {
    console.log(color + " " + pattern + " " + species) 
    let colorList = ["Black", "Chocolate", "Brown", "Tan", "Red", "Ginger", "Orange", "Apricot", "Charcoal", "Grey", "Smoke", "Silver", "Buff", "Cream", "Almond", "Beige", "Snow", "-hidden-"]
    let colorListFiles = ["black", "choco", "brown", "tan", "red", "ginger", "orange", "aprico", "charc", "grey", "smoke", "silver", "buff", "cream", "almond", "beige", "snow", "unknown"]
    let imgsrc = "/assets/PCE_Assets/Cat/"
    if (species == "Not-cat") {
        imgsrc += "Not-Cat/TradeColors/"
    }
    if (species == "Mercat") {
        imgsrc += "Mercat/TradeColors/"
    }
    if (color.includes("-")) {
        color = color.split("-")[1]
    }
    for (let i = 0; i < colorList.length; i++) {
        if (color === colorList[i]) {
            imgsrc += colorListFiles[i] + "_trade_"
            break
        }
    }
    if (pattern == "-hidden-") {
        imgsrc += "unknown.png"
    }
    else {
        imgsrc += pattern.toLowerCase() + ".png"
    }
    return imgsrc
}

function makeAccentImageSRC(accentcolor, pattern, species) {
    let imgsrc = "/assets/PCE_Assets/Cat/"
    if (species == "Mercat") {
        imgsrc += "Mercat/AccentColors/"
    }
    if (accentcolor == "-hidden-") {
        imgsrc += "unknown_accent_"
    }
    else {
        imgsrc += accentcolor.toLowerCase() + "_accent_"
    }
    if (pattern == "-hidden-") {
        imgsrc += "unknown.png"
    }
    else {
        imgsrc += pattern.toLowerCase() + ".png"
    }
    return imgsrc
}

function makeWhiteImageSRC(whitelevel, whitetype, species) {
    let whiteTypeLetterList = ["C", "P", "R", "L", "I", "T"]
    let whiteTypeList = ["classic", "piebald", "right", "left", "inverse", "tabby"]
    if (whitelevel == "-hidden-") {
        return "/assets/PCE_Assets/Cat/blank.png"
    }
    else {
        let imgsrc = "/assets/PCE_Assets/Cat/"
        if (species == "Not-cat") {
            imgsrc += "Not-Cat/WhiteMarkings/white_"
        }
        if (species == "Mercat") {
            imgsrc += "Mercat/WhiteMarkings/white_"
        }
        for (let i = 0; i < whiteTypeLetterList.length; i++) {
            if (whitetype === whiteTypeLetterList[i]) {
                imgsrc += whiteTypeList[i] + "_"
                break
            }
        }
        imgsrc += whitelevel + ".png"
        return imgsrc
    }
}

function makeEyesImageSRC(eyes, eyecolor) {
    let imgsrc = "/assets/PCE_Assets/Cat/Eyes/eyes_"
    if (typeof eyes == "undefined" || eyes.includes("undefined")) {
        eyes = "neutral"
    }
    imgsrc += eyes
    let eyeColorList = ["Dark Brown", "Dark Aqua", "Pale Red", "Pale Violet", "Pale Green", "Pale Blue", "Pale Gold", "Cool Odd"]
    let eyeWhiteTypeList = ["", "", "_a_classic", "_a_piebald", "_a_right", "_a_left", "_a_inverse", "_a_tabby"]
    for (let i = 0; i < eyeColorList.length; i++) {
            if (eyecolor === eyeColorList[i]) {
                imgsrc += eyeWhiteTypeList[i] + ".png"
                break
            }
        }
    return imgsrc
}
