function findKnownGenes(species, wind, fur, color, colortype, pattern, accentcolor, whitetype, whitelevel) {
    let geneString = ["?",   "?","?",   "?","?",    "?","?","?","?","?",    "?","?","?","?",    "?","?","?","?",    "?","?",    "?","?"]
        sectionSpecies(geneString, species)
        sectionWind(geneString, wind)
        sectionFur(geneString, fur)
        sectionColor(geneString, color, colortype, wind)
        sectionPattern(geneString, pattern)
        sectionAccentColor(geneString, accentcolor)
        sectionWhite(geneString, whitetype, whitelevel)
        return geneString
}

function sectionSpecies(geneString, species) {
    switch(species) {
        case "Not-cat": 
            geneString[0] = "C"
            break
        case "Mercat":
            geneString[0] = "M"
            break
    }
}

//NS
//1 2 
function sectionWind(geneString, wind) {
    switch(wind) {
        case "Trade":
            geneString[1] = "N"
            geneString[2] = "S"
            break
        case "North":
            geneString[1] = "N"
            break
        case "South":
            geneString[1] = "S"
            break
        case "Null":
            geneString[1] = "O"
            geneString[2] = "O"
            break
    }
}

//SL
//3 4
function sectionFur(geneString, fur) {
    switch(fur) {
        case "Shorthair":
            geneString[3] = "S"
            break
        case "Longhair":
            geneString[3] = "L"
            geneString[4] = "L"
            break
    }
}

//BOFD3
//5 6 7 8 9
function sectionColor(geneString, color, colortype, wind) {
    let colorList = ["Black", "Chocolate", "Brown", "Tan", "Red", "Ginger", "Orange", "Apricot", "Charcoal", "Grey", "Smoke", "Silver", "Buff", "Cream", "Almond", "Beige"]
    let densityList = [4, 3, 2, 1, 4, 3, 2, 1, 4, 3, 2, 1, 4, 3, 2, 1]
    let colorGeneList = ["B", "B", "B", "B", "O", "O", "O", "O", "B", "B", "B", "B", "O", "O", "O", "O"]
    let invertedColorGeneList = ["O", "O", "O", "O", "B", "B", "B", "B", "O", "O", "O", "O", "B", "B", "B", "B"]
    let colorNew = color
    if (colortype != "Standard") {
        colorNew = color.split("-")[0]
    }
    for (let i = 0; i< colorList.length; i++) {
        if (colorNew == colorList[i]) {
            if (i>7) {
                geneString[7] = "D"
                geneString[8] = "D"
            }
            else {
                geneString[7] = "F"
            }
            geneString[9] = densityList[i]
            switch(colortype) {
                case "Standard":
                    switch(wind) {
                        case "North":
                            geneString[5] = colorGeneList[i]
                            break
                        case "South":
                            geneString[6] = colorGeneList[i]
                            break
                    }
                    break
                case "Watercolor":
                    geneString[5] = colorGeneList[i]
                    geneString[6] = colorGeneList[i]
                    break
                case "Tortoiseshell":
                    geneString[5] = colorGeneList[i]
                    geneString[6] = invertedColorGeneList[i]
                    break
            }
        }
    }
}

//YYTT
//10 11 12 13
function sectionPattern(geneString, pattern) {
    if (pattern == "Solid") {
        geneString[10] = "N"
        geneString[11] = "N"
    }
    else {
        if (pattern != "-hidden-") {
            geneString[10] = "Y"
        }
    }
    switch(pattern) {
        case "Mackerel":
            geneString[12] = "T"
            geneString[13] = "T"
            break
        case "Classic":
            geneString[12] = "T"
            geneString[13] = "M"
            break
        case "Broken":
            geneString[12] = "T"
            geneString[13] = "S"
            break
        case "Clouded":
            geneString[12] = "M"
            geneString[13] = "M"
            break     
        case "Spotted":
            geneString[12] = "S"
            geneString[13] = "S"
            break
        case "Rosette":
            geneString[12] = "M"
            geneString[13] = "S"
            break
        case "Lynxpoint":
            geneString[12] = "T"
            geneString[13] = "P"
            break
        case "Mink":
            geneString[12] = "S"
            geneString[13] = "P"
            break  
        case "Cloudpoint":
            geneString[12] = "M"
            geneString[13] = "P"
            break
        case "Colorpoint":
            geneString[12] = "P"
            geneString[13] = "P"
            break
        case "Ticked":
            geneString[12] = "T"
            geneString[13] = "A"
            break
        case "Ripple":
            geneString[12] = "M"
            geneString[13] = "A"
            break
        case "Agouti":
            geneString[12] = "S"
            geneString[13] = "A"
            break
        case "Karpati":
            geneString[12] = "P"
            geneString[13] = "A"
            break
        case "Freckle":
            geneString[12] = "A"
            geneString[13] = "A"
            break
    }
}

function sectionAccentColor(geneString, accentcolor) {
    switch(accentcolor) {
        case "Ruby":
            geneString[20] = "R"
            geneString[21] = "R"
            break
        case "Violet":
            geneString[20] = "R"
            geneString[21] = "B"
            break
        case "Amber":
            geneString[20] = "R"
            geneString[21] = "Y"
            break
        case "Pink":
            geneString[20] = "R"
            geneString[21] = "L"
            break
        case "Blue":
            geneString[20] = "B"
            geneString[21] = "B"
            break
        case "Green":
            geneString[20] = "B"
            geneString[21] = "Y"
            break
        case "Indigo":
            geneString[20] = "B"
            geneString[21] = "L"
            break
        case "Gold":
            geneString[20] = "Y"
            geneString[21] = "Y"
            break
        case "Teal":
            geneString[20] = "Y"
            geneString[21] = "L"
            break
        case "Black":
            geneString[20] = "L"
            geneString[21] = "L"
            break
    }
}

//YN7C
//14 15 16 17
function sectionWhite(geneString, whitetype, whitelevel) {
    if (whitelevel != "-hidden-") {
        geneString[14] = "Y"
        geneString[16] = Number(whitelevel)
        geneString[17] = whitetype
    }
}
