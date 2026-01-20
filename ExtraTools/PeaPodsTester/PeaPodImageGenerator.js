function makePeaPodImage(plant, location) {
    let mainclass = generateMainClass(plant)
    let baseplantsrc = makeBasePlantImageSRC(plant)
    addImage(baseplantsrc, location, mainclass, "plant-base")
    if (plant.variegation.level !== 5 && plant.variegation.level !== "Unknown") {
        let variegationplantsrc = makeVariegationPlantImageSRC(plant)
        addImage(variegationplantsrc, location, mainclass, "plant-varie")
    }
    let potsrc = makePotImageSRC(plant)
    addImage(potsrc, location, mainclass, "plant-pot")
    let peapodssrc = makePeaPodsImageSRC(plant)
    addImage(peapodssrc, location, mainclass, "plant-peas")
    let flowerssrc = makeFlowersSRC(plant)
    addImage(flowerssrc, location, mainclass, "plant-flower")
}




function addImage(imgsrc, location, mainclass, otherclass) {
    let plantjailfound = location.querySelector(".plantjail")
    if (!plantjailfound) {
        let plantjaildiv = document.createElement("div")
        plantjaildiv.classList.add("plantjail")
        location.appendChild(plantjaildiv)
    }
    let plantjaillocation = location.querySelector(".plantjail")
    let plantimage = document.createElement("img")
    if (document.URL.includes("ExtraTools")) {
        imgsrc = "../" + imgsrc
        plantimage.classList.add("extratools-float-up")
    }
    plantimage.src = imgsrc
    plantimage.classList.add(mainclass)
    plantimage.classList.add(otherclass)
    plantjaillocation.insertAdjacentElement("beforeend", plantimage)
}

function generateMainClass(plant) {
    let mainclass = "pea-"
    mainclass += plant.size.toLowerCase() + "-"
    mainclass += plant.stem.style.toLowerCase()
    return mainclass
}

function makeBasePlantImageSRC(plant) {
    let color = ""
    if (plant.stem.color == "Dark Green") {
        color = "darkgreen"
    }
    else {
        color = plant.stem.color.toLowerCase()
    }
    let imgsrc = "assets/PCE_Assets/Events/Candlelight/plant_base_" + color + ".png"
    return imgsrc
}

function makeVariegationPlantImageSRC(plant) {
    let imgsrc = "assets/PCE_Assets/Events/Candlelight/variegation_" + String(plant.variegation.level) + "_" + plant.variegation.color.toLowerCase() + ".png"
    return imgsrc
}

function makePotImageSRC(plant) {
    let imgsrc = ""
    if (plant.name) {
        switch(plant.name) {
            case "Mystery Plant":
                imgsrc = "assets/PCE_Assets/Events/Candlelight/pot_mystery.png"
                break
            case "Helper A":
                imgsrc = "assets/PCE_Assets/Events/Candlelight/pot_a.png"
                break
            case "Helper B":
                imgsrc = "assets/PCE_Assets/Events/Candlelight/pot_b.png"
                break
            case "Helper C":
                imgsrc = "assets/PCE_Assets/Events/Candlelight/pot_c.png"
                break
            case "Helper D":
                imgsrc = "assets/PCE_Assets/Events/Candlelight/pot_d.png"
                break
            case "Helper E":
                imgsrc = "assets/PCE_Assets/Events/Candlelight/pot_e.png"
                break
        }
    }
    else {
        imgsrc = "assets/PCE_Assets/Events/Candlelight/pot_mystery.png"
    }
    return imgsrc
}

function makePeaPodsImageSRC(plant) {
    let imgsrc = "assets/PCE_Assets/Events/Candlelight/pods_"
    imgsrc += plant.peaPods.texture.toLowerCase() + "_" + plant.peaPods.color.toLowerCase() + ".png"
    return imgsrc
}

function makeFlowersSRC(plant) {
    let imgsrc = "assets/PCE_Assets/Events/Candlelight/flower_"
    let flowersFullNames = ["Ghost Bells", "Moose Pansies", "Button Blooms", "Squid Bells", "Candle Drops", "Eye Daisies"]
    let flowersFileNames = ["ghosts", "moose", "buttons", "squid", "candles", "eyes"]
    for (let i = 0; i < flowersFullNames.length; i++) {
        if (plant.flowers.type == flowersFullNames[i]) {
            imgsrc += flowersFileNames[i] + "_"
            break
        }
    }
    imgsrc += plant.flowers.color.toLowerCase() 
    if (plant.flowers.type == "Eye Daisies") {
        imgsrc += "_yes"
    }
    imgsrc += ".png"
    return imgsrc
}
