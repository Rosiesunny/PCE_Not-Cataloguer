function generateBBCodeGeneString(genestring, locationID, wind) {
    // https://www.geeksforgeeks.org/how-to-create-popup-box-using-html-and-css/#
    let genestringText = ""
    if (localStorage.getItem("colorBBCode") == "false") {
        genestringText = genestring
    }
    else {
        let genestringArray = genestring.split("]")
        for (let i = 0; i < genestringArray.length; i++) {
            genestringArray[i] = genestringArray[i].split("[")[1]
        }
        
        genestringText += "[" + switchSpeciesBBCode(genestringArray[0]) + "] " 
        genestringText += "[" + switchWindBBCode(genestringArray[1][0]) + switchWindBBCode(genestringArray[1][1]) + "] " 
        genestringText += "[" + switchFurBBCode(genestringArray[2][0]) + switchFurBBCode(genestringArray[2][1]) + "] "
        genestringText += "[" + switchColorBBCode(genestringArray[3][0]) + switchColorBBCode(genestringArray[3][1]) + switchDiluteBBCode(genestringArray[3][2]) + switchDiluteBBCode(genestringArray[3][3]) + genestringArray[3][4] + "] "
        genestringText += "[" + switchYesNoBBCode(genestringArray[4][0]) + switchYesNoBBCode(genestringArray[4][1]) + genestringArray[4][2] + genestringArray[4][3] + "] "
        genestringText += "[" + switchYesNoBBCode(genestringArray[5][0]) + switchYesNoBBCode(genestringArray[5][1]) 
        if (genestringArray[5].length > 4) {
            genestringText += genestringArray[5][2] + genestringArray[5][3] + switchWhiteTypeBBCode(genestringArray[5][4]) + "] "
        }
        else {
            genestringText += genestringArray[5][2] + switchWhiteTypeBBCode(genestringArray[5][3]) + "] "
        }
        genestringText += "[" + genestringArray[6] + "] [" + switchAccentColorBBCode(genestringArray[7][0]) + switchAccentColorBBCode(genestringArray[7][1]) + "]"
    }

    let bbcodePrefix = localStorage.getItem("bbcodePrefix")
    let bbcodeSuffix = localStorage.getItem("bbcodeSuffix")
    let userStyleGeneStringText = ""
    if (bbcodePrefix) {
        userStyleGeneStringText += JSON.parse(bbcodePrefix)
    }
    userStyleGeneStringText += genestringText
    if (bbcodeSuffix) {
        userStyleGeneStringText += JSON.parse(bbcodeSuffix)
    }
    if (localStorage.getItem("listHiddenRecessive") == "true") {
        userStyleGeneStringText += "\nCarries/Hides: " + listHiddenRecessive(genestring, wind)
    }
    popupWindow(userStyleGeneStringText, locationID)
}

function bbcodeButton(catGeneString, wind, location) {
    if (catGeneString) {
        let geneString = geneStringifier(catGeneString)
        let functionName = "generateBBCodeGeneString('" + geneString + "', 'bbcodebox', '" + wind + "')"
        if (document.getElementById("generatebbcode")) {
            let geneTestButton = document.getElementById("generatebbcode")
            geneTestButton.setAttribute("onclick", functionName)
        }
        else {
            let generateBBCodeButton = document.createElement('button')
            generateBBCodeButton.setAttribute("id", "generatebbcode")
            generateBBCodeButton.textContent = "Generate BBCode"
            
            generateBBCodeButton.setAttribute("onclick", functionName)
            location.appendChild(generateBBCodeButton)
        }
    }
}

function popupWindow(genestringText, locationID) {
    let location = document.getElementById(locationID)
    location.innerHTML = ""
    location.classList.add("showbbcodebox")
    location.classList.remove("hidebbcodebox")

    let popupContainer = document.createElement("div")
    popupContainer.classList.add("popupcontainer")

    let popupGenes = document.createElement("textarea")
    popupGenes.classList.add("popupGenes")
    popupGenes.value = genestringText

    let popupX = document.createElement("button")
    popupX.classList.add("xbutton")
    popupX.innerText = "x"
    popupX.setAttribute("onclick", "exitBBCodeBox('bbcodebox')")

    let copyButton = document.createElement("button")
    copyButton.classList.add("copybutton")
    copyButton.innerText = "Copy to Clipboard"

    copyButton.setAttribute("onclick", "copyClipboard('.popupGenes')")


    popupContainer.appendChild(popupX)
    popupContainer.appendChild(popupGenes)
    popupContainer.appendChild(copyButton)
    location.appendChild(popupContainer)
    

}

function exitBBCodeBox(locationID) {
    let location = document.getElementById(locationID)
    location.classList.remove("showbbcodebox")
    location.classList.add("hidebbcodebox")
    location.innerHTML = ""
}

function copyClipboard(locationID) {
    let copyArea = document.querySelector(locationID)
    navigator.clipboard.writeText(copyArea.value)
    alert("Copied text: " + copyArea.value)
}


function switchWindBBCode(gene) {
    switch(gene) {
        case "N":
            return "[color=blue]N[/color]"
        case "S":
            return "[color=red]S[/color]"
        case "O":
            return "[color=grey][size=1]O[/size][/color]"
        case "?":
            return "?"
    }
}

function switchFurBBCode(gene) {
    switch(gene) {
        case "S":
            return "[color=yellow]S[/color]"
        case "L":
            return "[color=purple][size=1]L[/size][/color]"
        case "?":
            return "?"
    }
}

function switchColorBBCode(gene) {
    switch(gene) {
        case "B":
            return "[color=grey]B[/color]"
        case "O":
            return "[color=orange]O[/color]"
        case "?":
            return "?"
    }
}

function switchDiluteBBCode(gene) {
    switch(gene) {
        case "F":
            return "[color=brown]F[/color]"
        case "D":
            return "[color=yellow][size=1]D[/size][/color]"
        case "?":
            return "?"
    }
}

function switchYesNoBBCode(gene) {
    switch(gene) {
        case "Y":
            return "[color=green]Y[/color]"
        case "N":
            return "[color=red][size=1]N[/size][/color]"
        case "?":
            return "?"
    }
}

function switchWhiteTypeBBCode(gene) {
    switch(gene) {
        case "C":
            return "[color=red]C[/color]"
        case "P":
            return "[color=purple]P[/color]"
        case "L":
            return "[color=blue]L[/color]"
        case "R":
            return "[color=green]R[/color]"
        case "I":
            return "[color=yellow]I[/color]"
        case "T":
            return "[color=teal]T[/color]"
        case "?":
            return "?"
    }
}

function switchAccentColorBBCode(gene) {
    switch(gene) {
        case "B":
            return "[color=blue]B[/color]"
        case "R":
            return "[color=red]R[/color]"
        case "Y":
            return "[color=yellow]Y[/color]"
        case "L":
            return "[color=grey]L[/color]"
        case "?":
            return "?"
    }
}

function switchSpeciesBBCode(gene) {
    switch (gene) {
        case "C":
            return "[color=grey]C[/color]"
        case "M":
            return "[color=blue]M[/color]"
        case "?":
            return "?"
    }
}

function listHiddenRecessive(genestring, wind) {
    let genestringArray = genestring.split("]")
    
    let carryArray = []
    let albinoSolidHiddenAppearance = []
    for (let i = 0; i < genestringArray.length; i++) {
        genestringArray[i] = genestringArray[i].split("[")[1]
    }

    if (wind == "North" || wind == "South") {
        if (genestringArray[1].includes("O")) {
            carryArray.push("Null wind")
        }
    }
    // cat is shorthair
    if (genestringArray[2].includes("S")) {
        if (genestringArray[2].includes("L")) {
            // cat carries longhair
            carryArray.push("Longhair")
        }
    }
    // will work so long as Y isn't added as a white type gene later
    if (genestringArray[5].includes("10") && genestringArray[5].includes("Y")) { // cat is albino, all color and pattern info is hidden. handling color info first
        if (wind == "North"||wind == "South") {
            let colorgeneShown = ""
            let colorgeneHidden = ""
            if (wind == "North") {
                colorgeneShown = genestringArray[3][0]
                colorgeneHidden = genestringArray[3][1]
            }
            if (wind == "South") {
                colorgeneShown = genestringArray[3][1]
                colorgeneHidden = genestringArray[3][0]
            }
            if (colorgeneShown !== "?" && colorgeneHidden !== "?") {
                let colorgenes = [
                ["O", "Orange color gene", 
                    [["Apricot", "Orange", "Ginger", "Red"], ["Beige", "Almond", "Cream", "Buff"]]
                ], 
                ["B", "Black color gene", 
                    [["Tan", "Brown", "Chocolate", "Black"], ["Silver", "Smoke", "Grey", "Charcoal"]]
                ]
                ]
                // if "shown" color gene is the same as "hidden" color gene (both are hidden because albino but if the cat wasn't albino which would it be showing)
                if (colorgeneShown !== colorgeneHidden) {
                    for (let i = 0; i < colorgenes.length; i++) {
                        if (colorgeneHidden === colorgenes[i][0]) {
                            // color match found, hidden color gene is different from "shown" one (not rlly shown bc it's albino but whatever)
                            carryArray.push(colorgenes[i][1])
                            break
                        }
                    }
                }
                // now get shown color/what it would be if it wasn't hidden under albino
                for (let i = 0; i < colorgenes.length; i++) {
                    if (colorgeneShown == colorgenes[i][0]) {
                        // color match found, "shown" color found, time to determine its full color with dilute/full/number check
                        if (genestringArray[3][2] == "F" || genestringArray[3][3] == "F") {
                            // cat is full, get color match and push to albino/solid array
                            albinoSolidHiddenAppearance.push(colorgenes[i][2][0][Number(genestringArray[3][4])-1])
                        }
                        else {
                            // cat is dilute, get color match and push to albino/solid array
                            albinoSolidHiddenAppearance.push(colorgenes[i][2][1][Number(genestringArray[3][4])-1])
                        }
                        break
                    }
                }
                albinoSolidHiddenAppearance.push("Standard")
            }
            
        }
        // works so long as D or F isn't added as a color gene
        if (genestringArray[3].includes("F")) {
            if (genestringArray[3].includes("D")) {
                carryArray.push("Dilute")
            }
        }
        if (wind == "Trade") {
            let colorgene1 = genestringArray[3][0]
            let colorgene2 = genestringArray[3][1]
            if (colorgene1 !== "?" && colorgene2 !== "?") {
                if (colorgene1 == colorgene2) {
                    // cat is watercolor 
                    let colorgenes = [
                        ["O", "Orange color gene", 
                            [["Snow", "Apricot", "Orange", "Ginger", "Red"], ["Snow", "Beige", "Almond", "Cream", "Buff"]]
                        ], 
                        ["B", "Black color gene", 
                            [["Snow", "Tan", "Brown", "Chocolate", "Black"], ["Snow", "Silver", "Smoke", "Grey", "Charcoal"]]
                        ]
                    ]
                    let i = 0
                    // find color gene match
                    for (i = 0; i < colorgenes.length; i++) {
                        if (colorgene1 == colorgenes[i][0]) {
                            break
                        }
                    }
                    let j = 0
                    if (genestringArray[3][2] == "F" || genestringArray[3][3] == "F") {
                        // cat is full
                        j = 0
                    }
                    else {
                        j = 1
                    }
                    let color1 = colorgenes[i][2][j][Number(genestringArray[3][4])]
                    let color2 = colorgenes[i][2][j][Number(genestringArray[3][4])-1]
                    albinoSolidHiddenAppearance.push(color1 + "-" + color2)
                    albinoSolidHiddenAppearance.push("Watercolor")
                    }
                else {
                    // cat is tortie
                    let colorgenes = [
                        ["O", "Orange color gene", 
                            [["Apricot", "Orange", "Ginger", "Red"], ["Beige", "Almond", "Cream", "Buff"]]
                        ], 
                        ["B", "Black color gene", 
                            [["Tan", "Brown", "Chocolate", "Black"], ["Silver", "Smoke", "Grey", "Charcoal"]]
                        ]
                    ]
                    let i1 = 0
                    // find color gene match 1
                    for (i1 = 0; i1 < colorgenes.length; i1++) {
                        if (colorgene1 == colorgenes[i1][0]) {
                            break
                        }
                    }
                    let i2 = 0
                    // find color gene match 1
                    for (i2 = 0; i2 < colorgenes.length; i2++) {
                        if (colorgene2 == colorgenes[i2][0]) {
                            break
                        }
                    }
                    let j = 0
                    if (genestringArray[3][2] == "F" || genestringArray[3][3] == "F") {
                        // cat is full
                        j = 0
                    }
                    else {
                        j = 1
                    }
                    let color1 = colorgenes[i1][2][j][Number(genestringArray[3][4])-1]
                    let color2 = colorgenes[i2][2][j][Number(genestringArray[3][4])-1]
                    albinoSolidHiddenAppearance.push(color1 + "-" + color2)
                    albinoSolidHiddenAppearance.push("Tortoiseshell")
                }
            }
            
        }
        if (wind == "Null") {
            let colorgene1 = genestringArray[3][0]
            let colorgene2 = genestringArray[3][1]
            if (colorgene1 !== "?" && colorgene2 !== "?") {
                let colorgenes = [
                    ["O", "Orange color gene", 
                        [["Apricot", "Orange", "Ginger", "Red"], ["Beige", "Almond", "Cream", "Buff"]]
                    ], 
                    ["B", "Black color gene", 
                        [["Tan", "Brown", "Chocolate", "Black"], ["Silver", "Smoke", "Grey", "Charcoal"]]
                    ]
                ]
                let i1 = 0
                // find color gene match 1
                for (i1 = 0; i1 < colorgenes.length; i1++) {
                    if (colorgene1 == colorgenes[i1][0]) {
                        break
                    }
                }
                let i2 = 0
                // find color gene match 1
                for (i2 = 0; i2 < colorgenes.length; i2++) {
                    if (colorgene2 == colorgenes[i2][0]) {
                        break
                    }
                }
                let j = 0
                if (genestringArray[3][2] == "F" || genestringArray[3][3] == "F") {
                    // cat is full
                    j = 0
                }
                else {
                    j = 1
                }
                let color1 = colorgenes[i1][2][j][Number(genestringArray[3][4])-1]
                let color2 = colorgenes[i2][2][j][Number(genestringArray[3][4])-1]
                if (color1 == color2) {
                    albinoSolidHiddenAppearance.push(color1)
                }
                else {
                    albinoSolidHiddenAppearance.push(color1 + "/" + color2)
                }
                albinoSolidHiddenAppearance.push("Standard")
            }
            
        }

        // colors/dilutes handling done, still need to determine pattern. doing Y/N first
        if (genestringArray[4].includes("Y")) {
            if (genestringArray[4].includes("N")) {
                carryArray.push("Solid")
            }
        }
        
        if (genestringArray[4][0] == "N" && genestringArray[4][1] == "N") {
            // cat is solid
            albinoSolidHiddenAppearance.push("Solid")
            albinoSolidHiddenAppearance.push("hiding")
        }
        let patterns = [
            ["Mackerel", "TT"], 
            ["Classic", "TM", "MT"], 
            ["Broken", "TS", "ST"], 
            ["Lynxpoint", "TP", "PT"],
            ["Ticked", "TA", "AT"],
            ["Clouded", "MM"],
            ["Rosette", "MS", "SM"],
            ["Cloudpoint", "MP", "PM"],
            ["Ripple", "MA", "AM"],
            ["Spotted", "SS"],
            ["Mink", "SP", "PS"],
            ["Agouti", "SA", "AS"],
            ["Colorpoint", "PP"],
            ["Karpati", "PA", "AP"],
            ["Freckle", "AA"]
        ]
        let patterngenes = genestringArray[4].slice(2, 4)
        for (let i = 0; i < patterns.length; i++) {
            if (patterngenes == patterns[i][1] || patterngenes == patterns[i][2]) {
                albinoSolidHiddenAppearance.push(patterns[i][0] + " pattern")
                break
            }
        }
    }
    // END OF ALBINOS HANDLING
    else { // cat is not albino
        if (wind == "North" || wind == "South") {
            let colorgeneShown = ""
            let colorgeneHidden = ""
            if (wind == "North") {
                colorgeneShown = genestringArray[3][0]
                colorgeneHidden = genestringArray[3][1]
            }
            if (wind == "South") {
                colorgeneShown = genestringArray[3][1]
                colorgeneHidden = genestringArray[3][0]
            }
            // cat is north or south so they're hiding a color gene
            let colorgenes = [["O", "Orange color gene"], ["B", "Black color gene"]] 
            if (colorgeneShown !== colorgeneHidden) {
                for (let i = 0; i < colorgenes.length; i++) {
                    if (colorgeneHidden === colorgenes[i][0]) {
                        // color match found, hidden color gene is different from "shown" one (not rlly shown bc it's albino but whatever)
                        carryArray.push(colorgenes[i][1])
                        break
                    }
                }
            }      

        }
        if (wind == "Null") {
            let colorgene1 = genestringArray[3][0]
            let colorgene2 = genestringArray[3][1]
            if (colorgene1 !== "?" && colorgene2 !== "?") {
                let colorgenes = [
                ["O", "Orange color gene", 
                    [["Apricot", "Orange", "Ginger", "Red"], ["Beige", "Almond", "Cream", "Buff"]]
                ], 
                ["B", "Black color gene", 
                    [["Tan", "Brown", "Chocolate", "Black"], ["Silver", "Smoke", "Grey", "Charcoal"]]
                ]
                ]
                let i1 = 0
                // find color gene match 1
                for (i1 = 0; i1 < colorgenes.length; i1++) {
                    if (colorgene1 == colorgenes[i1][0]) {
                        break
                    }
                }
                let i2 = 0
                // find color gene match 1
                for (i2 = 0; i2 < colorgenes.length; i2++) {
                    if (colorgene2 == colorgenes[i2][0]) {
                        break
                    }
                }
                let j = 0
                if (genestringArray[3][2] == "F" || genestringArray[3][3] == "F") {
                    // cat is full
                    j = 0
                }
                if (genestringArray[3][2] == "D" && genestringArray[3][3] == "D") {
                    // cat is full
                    j = 1
                }
                console.log(colorgenes)
                let color1 = colorgenes[i1][2][j][Number(genestringArray[3][4])-1]
                let color2 = colorgenes[i2][2][j][Number(genestringArray[3][4])-1]
                if (color1 == color2) {
                    albinoSolidHiddenAppearance.push(color1)
                }
                else {
                    albinoSolidHiddenAppearance.push(color1 + "/" + color2)
                }
            }
            
        }
        // works so long as D or F isn't added as a color gene
        if (genestringArray[3].includes("F")) {
            if (genestringArray[3].includes("D")) {
                carryArray.push("Dilute")
            }
        }

        // colors/dilutes handling done, still need to determine pattern. doing Y/N first
        if (genestringArray[4].includes("Y")) {
            if (genestringArray[4].includes("N")) {
                carryArray.push("Solid")
            }
        }
        if (genestringArray[4][0] == "N" && genestringArray[4][1] == "N") {
            // cat is solid
            let patterns = [
            ["Mackerel", "TT"], 
            ["Classic", "TM", "MT"], 
            ["Broken", "TS", "ST"], 
            ["Lynxpoint", "TP", "PT"],
            ["Ticked", "TA", "AT"],
            ["Clouded", "MM"],
            ["Rosette", "MS, SM"],
            ["Cloudpoint", "MP", "PM"],
            ["Ripple", "MA", "AM"],
            ["Spotted", "SS"],
            ["Mink", "SP", "PS"],
            ["Agouti", "SA", "AS"],
            ["Colorpoint", "PP"],
            ["Karpati", "PA", "AP"],
            ["Freckle", "AA"]
            ]
            let patterngenes = genestringArray[4].slice(2, 4)
            for (let i = 0; i < patterns.length; i++) {
                if (patterngenes == patterns[i][1] || patterngenes == patterns[i][2]) {
                    albinoSolidHiddenAppearance.push(patterns[i][0] + " pattern")
                    break
                }
            }
        }
    }
    // all cats handled from here on, no albino/not albino specifier    
    if (genestringArray[5].includes("Y")) {
        // cat shows white
        if (genestringArray[5][0] == "N" || genestringArray[5][1] == "N") {
            // cat carries no white
            carryArray.push("No-white")
        }
    }
    else {
        // cat is no-white via NN, what white is it hiding?
        let whitetrim = genestringArray[5].slice(2, 6)
        if (whitetrim !== "??") {
            if (whitetrim.length > 2) {
                let whitelevel = whitetrim.slice(0, 2)
                let whitetype = whitetrim.slice(2, 3)
                carryArray.push(whitetype + whitelevel + " white")
            }
            else {
                let whitelevel = whitetrim.slice(0, 1)
                let whitetype = whitetrim.slice(1, 2)
                carryArray.push(whitetype + whitelevel + " white")
            }
            
        }
        
    }
    if (genestringArray[0] == "C") {
        let accentgenes = genestringArray[7]
        // cat is not-cat, hiding accent genes
        let accentcolors = [
            ["Ruby", "RR"],
            ["Violet", "RB", "BR"],
            ["Amber", "RY", "YR"],
            ["Pink", "RL", "LR"],
            ["Blue", "BB"],
            ["Green", "BY", "YB"],
            ["Indigo", "BL", "LB"],
            ["Gold", "YY"],
            ["Teal", "YL", "LY"],
            ["Black", "LL"],
        ]
        for (let i = 0; i < accentcolors.length; i++) {
            if (accentgenes == accentcolors[i][1] || accentgenes == accentcolors[i][2]) {
                carryArray.push(accentcolors[i][0] + " accent")
                break
            }
        }
    }
    else {
        // cat is mercat (at least until we get new species it sure is. but it probably shows accent color?)
        if (genestringArray[5].includes("10") && genestringArray[5].includes("Y")) {
            let accentgenes = genestringArray[7]
            // mercat is albino, hiding accent genes
            let accentcolors = [
                ["Ruby", "RR"],
                ["Violet", "RB", "BR"],
                ["Amber", "RY", "YR"],
                ["Pink", "RL", "LR"],
                ["Blue", "BB"],
                ["Green", "BY", "YB"],
                ["Indigo", "BL", "LB"],
                ["Gold", "YY"],
                ["Teal", "YL", "LY"],
                ["Black", "BB"],
            ]
            for (let i = 0; i < accentcolors.length; i++) {
                if (accentgenes == accentcolors[i][1] || accentgenes == accentcolors[i][2]) {
                    carryArray.push(accentcolors[i][0] + " accent")
                    break
                }
            }
        }
    }
    // done finding hidden/carried genes, now list them
    let hidesCarriesString = ""
    if (carryArray.length > 0 || albinoSolidHiddenAppearance.length > 0) {
        hidesCarriesString += ""
        if (albinoSolidHiddenAppearance.length > 0) {
            for (let i = 0; i < albinoSolidHiddenAppearance.length; i++) {
                hidesCarriesString += albinoSolidHiddenAppearance[i] + " "
            }
            hidesCarriesString = hidesCarriesString.trim()
            if (carryArray.length > 0) {
                hidesCarriesString += ", "
            }
        }
        if (carryArray.length > 0) {
            for (let i = 0; i < carryArray.length; i++) {
                hidesCarriesString += carryArray[i] + ", "
            }
        }
        
        hidesCarriesString = hidesCarriesString.trim()
        hidesCarriesString += "\n"
    }
    
    let newlineregex = /, ?\n/gm
    hidesCarriesString = hidesCarriesString.replace(newlineregex, "\n")
    return hidesCarriesString
}