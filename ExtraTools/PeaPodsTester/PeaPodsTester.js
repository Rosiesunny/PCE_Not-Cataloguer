let testplants = []
let keeptestplants = false

function parseText() {
    let textBoxEntry = document.querySelector(".input").value
    let plantRegEx = /(mystery crate|(?:a (normal|miniature) pea plant with a (straight|curly), (dark green|lavender|white|gold) stem(a tiny amount of|a small amount of|a medium amount of|a large amount of|full)? ?(white|gold)? ?(?:variegation.+)?.+(?:pot labeled with .+)(wrinkly|smooth), (green|gold) pea pods(blue|indigo|purple|white) (ghost bells|moose pansies|button blooms|squid bells|candle drops|eye daisies)))/gm
    let matches = []
    let match  
    while ((match = plantRegEx.exec(textBoxEntry)) !== null) {
        matches.push(match)
    }
    let offspringplants = []

    
    let tempplantsarray = []
    let peapodstemp = false
    for (let i = 0; i < matches.length; i++) {
        let plant = genePlant(matches[i]) // makes plant object
        if (keeptestplants == false) {
            if (i < 6) {
                let testplantnamesarray = ["Mystery Plant", "Helper A", "Helper B", "Helper C", "Helper D", "Helper E"]
                plant.name = testplantnamesarray[i]
                tempplantsarray.push(plant)
                if (peapodstemp === false) {
                    let num = i+1
                    let location = document.getElementById("plant" + num)
                    location.innerHTML = ""
                    makePeaPodImage(plant, location)
                    displayInfo(plant, location)
                }
            }
        }
        if (i >= 6) {
            offspringplants.push(plant)
            let num = i+1
            let location = document.getElementById("plant" + num)
            location.innerHTML = ""
            makePeaPodImage(plant, location)
            displayInfo(plant, location)
        }
    }
    if (keeptestplants == false) {
        testplants = tempplantsarray
        keeptestplants = true
    }

    // tEMP
    //initializeGeneContainerGenes(testplants[3].genes)
}



function genePlant(planttraits) {
    let genes = ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?"]
    let thisPlant = {
        size: "Unknown",
        stem: {
            style: "Unknown",
            color: "Unknown"
        },
        peaPods: {
            texture: "Unknown",
            color: "Unknown"
        },
        variegation: {
           displays: "Unknown",
           color: "Unknown",
           level: "Unknown"
        },
        flowers: {
            type: "Unknown",
            color: "Unknown"
        }
    }

    if (planttraits[0] == "mystery crate") {
        thisPlant.genes = genes
        return thisPlant
    }
    
    // genes[0] & genes[1] - plant size (N|M) M recessive 
    switch(planttraits[2]) {
        case "normal":
            genes[0] = "N"
            thisPlant.size = "Normal"
            break
        case "miniature":
            genes[0] = "M"
            genes[1] = "M"
            thisPlant.size = "Miniature"
            break
    }

    // genes[2] & genes[3] - stem style (S|C) C recessive
    switch (planttraits[3]) {
        case "straight":
            genes[2] = "S"
            thisPlant.stem.style = "Straight"
            break
        case "curly":
            genes[2] = "C"
            genes[3] = "C"
            thisPlant.stem.style = "Curly"
            break
    }

    // genes[4] & genes[5] - stem color (D|L) L recessive
    switch (planttraits[4]) {
        case "dark green":
            genes[4] = "D"
            thisPlant.stem.color = "Dark Green"
            break
        case "lavender":
            genes[4]= "L"
            genes[5] = "L"
            thisPlant.stem.color = "Lavender"
            break
        case "white":
            thisPlant.stem.color = "White"
            genes[10] = "Y"
            thisPlant.variegation.displays = "Shows"
            genes[12] = "W"
            thisPlant.variegation.color = "White"
            genes[14] = 5
            thisPlant.variegation.level = 5
            break
        case "gold":
            thisPlant.stem.color = "Gold"
            genes[10] = "Y"
            thisPlant.variegation.displays = "Shows"
            genes[12] = "Y"
            genes[13] = "Y"
            thisPlant.variegation.color = "Gold"
            genes[14] = 5
            thisPlant.variegation.level = 5
            break
    }

    // genes[6] & genes[7] - pea pod texture (S|W) W recessive
    switch(planttraits[7]) {
        case "smooth":
            genes[6] = "S"
            thisPlant.peaPods.texture = "Smooth"
            break
        case "wrinkly":
            genes[6] = "W"
            genes[7] = "W"
            thisPlant.peaPods.texture = "Wrinkly"
            break
    }

    // genes[8] & genes[9] - pea pod color (G|Y) Y recessive
    switch(planttraits[8]) {
        case "green":
            genes[8] = "G"
            thisPlant.peaPods.color = "Green"
            break
        case "gold":
            genes[8] = "Y"
            genes[9] = "Y"
            thisPlant.peaPods.color = "Gold"
            break
    }
    if (planttraits[4] !== "white" && planttraits[4] !== "gold") {
        
        // genes[10] & genes[11] - displays variegation (Y|N) N recessive
        if (planttraits[5] || planttraits[6]) {
            genes[10] = "Y"
            thisPlant.variegation.displays = "Shows"
            // genes[12] & genes[13] - variegation color (W|Y) Y recessive
            switch (planttraits[6]) {
                case "white":
                    genes[12] = "W"
                    thisPlant.variegation.color = "White"
                    break
                case "gold":
                    genes[12] = "Y"
                    genes[13] = "Y"
                    thisPlant.variegation.color = "Gold"
                    break
            }
            // genes [14] - variegation amount (0|1|2|3|4|5)
            switch(planttraits[5]) {
                case "a tiny amount of":
                    genes[14] = 1
                    thisPlant.variegation.level = 1
                    break
                case "a small amount of":
                    genes[14] = 2
                    thisPlant.variegation.level = 2
                    break
                case "a medium amount of":
                    genes[14] = 3
                    thisPlant.variegation.level = 3
                    break
                case "a large amount of":
                    genes[14] = 4
                    thisPlant.variegation.level = 4
                    break
            }
        }
        else {
            thisPlant.variegation.displays = "Hides"
        }
    }


    

    // genes[15] & genes[16] - flower type (A|B|C)
    switch(planttraits[10]) {
        case "ghost bells":
            genes[15] = "B"
            genes[16] = "B"
            thisPlant.flowers.type = "Ghost Bells"
            break
        case "moose pansies":
            genes[15] = "A"
            genes[16] = "A"
            thisPlant.flowers.type = "Moose Pansies"
            break
        case "button blooms":
            genes[15] = "C"
            genes[16] = "C"
            thisPlant.flowers.type = "Button Blooms"
            break
        case "squid bells":
            genes[15] = "A"
            genes[16] = "B"
            thisPlant.flowers.type = "Squid Bells"
            break
        case "candle drops":
            genes[15] = "B"
            genes[16] = "C"
            thisPlant.flowers.type = "Candle Drops"
            break
        case "eye daisies":
            genes[15] = "A"
            genes[16] = "C"
            thisPlant.flowers.type = "Eye Daisies"
            break
    }    
    
    // genes[17] & genes[18] - flower color (B|P|O) O recessive
    switch(planttraits[9]) {
        case "blue":
            genes[17] = "B"
            thisPlant.flowers.color = "Blue"
            break
        case "purple":
            genes[17] = "P"
            thisPlant.flowers.color = "Purple"
            break
        case "indigo":
            genes[17] = "B"
            genes[18] = "P"
            thisPlant.flowers.color = "Indigo"
            break
        case "white":
            genes[17] = "O"
            genes[18] = "O"
            thisPlant.flowers.color = "White"
            break
    }
    thisPlant.genes = genes
    return thisPlant
}

function getGeneString(genes) {
    var geneString = "";
    geneString += "[" + genes[0] + genes[1] + "]";
    geneString += " [" + genes[2] + genes[3] + "]";
    geneString += " [" + genes[4] + genes[5] + "]";
    geneString += " [" + genes[6] + genes[7] + "]";
    geneString += " [" + genes[8] + genes[9] + "]";
    geneString += " [" + genes[10] + genes[11] + "]";
    geneString += " [" + genes[12] + genes[13] + "]";
    geneString += " [" + genes[14] + "]";
    geneString += " [" + genes[15] + genes[16] + "]";
    geneString += " [" + genes[17] + genes[18] + "]";
    return geneString;
}

function displayInfo(plant, location) {
    let plantTraitsArray = []
    plantTraitsArray.push(getGeneString(plant.genes))
    console.log(plant)
    
    switch(plant.size) {
        case "Normal":
            plantTraitsArray.push("Size: Normal")
            break
        case "Miniature":
            plantTraitsArray.push("<span class = 'recessive'>Size: Miniature</span>")
            break
    }

    switch(plant.stem.style) {
        case "Straight":
            plantTraitsArray.push("Stem style: Straight")
            break
        case "Curly":
            plantTraitsArray.push("<span class = 'recessive'>Stem style: Curly</span>")
            break
    }

    switch(plant.stem.color) {
        case "Dark Green":
            plantTraitsArray.push("Stem color: Dark Green")
            break
        case "Lavender":
            plantTraitsArray.push("<span class = 'recessive'>Stem color: Lavender</span>")
            break
        case "White":
            plantTraitsArray.push("Stem color: -hidden-")
            break
        case "Gold":
            plantTraitsArray.push("Stem color: -hidden-")
            break    
    }

    switch(plant.peaPods.texture) {
        case "Smooth":
            plantTraitsArray.push("Pea pod texture: Smooth")
            break
        case "Wrinkly": 
            plantTraitsArray.push("<span class = 'recessive'>Pea pod texture: Wrinkly</span>")
            break
    }

    switch(plant.peaPods.color) {
        case "Green":
            plantTraitsArray.push("Pea pod color: Green")
            break
        case "Gold": 
            plantTraitsArray.push("<span class = 'recessive'>Pea pod color: Gold</span>")
            break
    }

    switch(plant.variegation.displays) {
        case "Shows":
            plantTraitsArray.push("Variegation Display: Shows")
            switch(plant.variegation.color) {
                case "White":
                    plantTraitsArray.push("Variegation color: White")
                    break
                case "Gold":
                    plantTraitsArray.push("<span class = 'recessive'>Variegation color: Gold</span>")
                    break
            }
            plantTraitsArray.push("Variegation level: " + plant.variegation.level)
            break
        case "Hides":
            plantTraitsArray.push("Variegation Display: -hidden-")
            plantTraitsArray.push("Variegation color: -hidden-")
            plantTraitsArray.push("Variegation level: -hidden-")
            break
    }

    switch(plant.flowers.type) {
        case "Ghost Bells": 
            plantTraitsArray.push("Flower type: Ghost Bells [BB]")
            break
        case "Moose Pansies":
            plantTraitsArray.push("Flower type: Moose Pansies [AA]")
            break
        case "Button Blooms":
            plantTraitsArray.push("Flower type: Button Blooms [CC]")
            break
        case "Squid Bells":
            plantTraitsArray.push("Flower type: Squid Bells [AB]")
            break
        case "Candle Drops":
            plantTraitsArray.push("Flower type: Candle Drops [BC]")
            break
        case "Eye Daisies":
            plantTraitsArray.push("Flower type: Eye Daisies [AC]")
            break
    }

    switch(plant.flowers.color) {
        case "Blue":
            plantTraitsArray.push("Flower color: Blue")
            break
        case "Purple":
            plantTraitsArray.push("Flower color: Purple")
            break
        case "Indigo":
            plantTraitsArray.push("Flower color: Indigo")
            break
        case "White":
            plantTraitsArray.push("<span class = 'recessive'>Flower color: White</span>")
            break
        case "Blue":
            plantTraitsArray.push("Flower color: ")
            break
        
    }

    let plantTraitsString = "<ul>"
    for (let i = 0; i < plantTraitsArray.length; i++) {
        plantTraitsString += "<li>" + plantTraitsArray[i] + "</li>"
    }
    plantTraitsString += "</ul>"

    let plantparagraph = document.createElement("p")
    plantparagraph.innerHTML = plantTraitsString
    location.insertAdjacentElement("beforeend", plantparagraph)
}

function resetTestPlants() {
    console.log("Resetting Saved Test Plants to make room for new ones")
    testplants = []
    keeptestplants = false
}

function initializeGeneContainerGenes(genes) {
    let genesArrayOptionsMap = [
        "size", "size",
        "stemstyle", "stemstyle",
        "stemcolor", "stemcolor",
        "podtexture", "podtexture",
        "podcolor", "podcolor",
        "variegationdisplay", "variegationdisplay",
        "variegationcolor", "variegationcolor",
        "variegationlevel",
        "flowertype", "flowertype", 
        "flowercolor", "flowercolor"
    ]

    let genesArrayIdsMap = [
        "size-1", "size-2",
        "stem-style-1", "stem-style-2",
        "stem-color-1", "stem-color-2",
        "pod-texture-1", "pod-texture-2",
        "pod-color-1", "pod-color-2",
        "variegation-display-1", "variegation-display-2",
        "variegation-color-1", "variegation-color-2",
        "variegation-level",
        "flower-type-1", "flower-type-2",
        "flower-color-1", "flower-color-2"
    ]

    //used to get checkArray
    let geneOptions = {
        size: [["N", "Normal Size"], ["M", "Miniature Size"]],
        stemstyle: [["S", "Straight Stem"], ["C", "Curly Stem"]],
        stemcolor: [["D", "Dark Green Stem"], ["L", "Lavender Stem"]],
        podtexture: [["S", "Smooth Pods"], ["W", "Wrinkly Pods"]],
        podcolor: [["G", "Green Pods"], ["Y", "Gold Pods"]],
        variegationdisplay: [["Y", "Yes (Shows Variegation)"], ["N", "No (Hides Variegation)"]],
        variegationcolor: [["W", "White Variegation"], ["Y", "Gold Variegation"]],
        variegationlevel: [[0, "No Variegation"], [1, "Tiny Variegation Amount"], [2, "Small Variegation Amount"], [3, "Medium Variegation Amount"], [4, "Large Variegation Amount"], [5, "Fully-Coverage Variegation"]],
        flowertype: [["A", "Animal Group"], ["B", "Bell Group"], ["C", "Crafts Group"]],
        flowercolor: [["B", "Blue Flowers"], ["P", "Purple Flowers"], ["W", "White Flowers"]]
    }

    for (let i = 0; i < genes.length; i++) {
        let value = genes[i]
        let geneOptionAccess = "geneOptions." + genesArrayOptionsMap[i]
        let checkArray = eval(geneOptionAccess)
        for (let j = 0; j < checkArray.length; j++) {
            if (value == "?") {
                let geneLetterBox = document.getElementById(genesArrayIdsMap[i])
                geneLetterBox.innerText = value
                let descId = genesArrayIdsMap[i] + "-desc"
                let geneDesc = document.getElementById(descId)
                geneDesc.innerText = "Unknown"
                break
            }
            if (value == checkArray[j][0]) {
                let geneLetterBox = document.getElementById(genesArrayIdsMap[i])
                geneLetterBox.innerText = value
                let descId = genesArrayIdsMap[i] + "-desc"
                let geneDesc = document.getElementById(descId)
                geneDesc.innerText = checkArray[j][1]
            }
        }
    }
}

