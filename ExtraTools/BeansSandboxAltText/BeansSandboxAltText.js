function parseText() {
    // Get input and parse
    let textBoxEntry = document.querySelector(".input");

    // beansSandboxPageInfoINITIAL is an array of the lines of the input
    let beansSandboxPageInfoINITIAL = textBoxEntry.value.split("\n");
    let beansSandboxArray = ensmallenData(beansSandboxPageInfoINITIAL)
    let dataArray = parseCats(beansSandboxArray)
    let htmlArray = generateInnerHTML(dataArray)
    displayFindings(htmlArray, dataArray)
    textBoxEntry.value = ""
}



function parseCats(beansArray) {
    let dataArray = []
    for (let i = 0; i < beansArray.length; i++) {
        let fur
        if (beansArray[i].includes("longhair")) {
            fur = "longhair"
        }
        if (beansArray[i].includes("shorthair")) {
            fur = "shorthair"
        }

        let color = beansArray[i].split("with a ")[1].split(" ")[0] //

        let colortype
        if (beansArray[i].includes("trade markings")) {
            let color2 = beansArray[i].split("coat")[1].split(" ")[0]
            let colorList = ["black", "choco", "brown", "tan", "red", "ginger", "orange", "aprico", "charc", "grey", "smoke", "silver", "buff", "cream", "almond", "beige"]
            let color2WatercolorList = ["choco", "brown", "tan", "snow", "ginger", "orange", "aprico", "snow", "grey", "smoke", "silver", "snow", "cream", "almond", "beige", "snow"]
            let color2TortieList = ["red", "ginger", "orange", "aprico", "black", "choco", "brown", "tan", "buff", "cream", "almond", "beige", "charc", "grey", "smoke", "silver"]
            // st = standard, tor = tortie, pat = watercolor
            for (let i = 0; i< colorList.length; i++) {
                if (color == colorList[i]) {
                    if (color2 == color2WatercolorList[i]) {
                        colortype = "pat"
                    }
                    if (color2 == color2TortieList[i]) {
                        colortype = "tor"
                    }
                }
            }
        }
        else {
            colortype = "st"
        }
        let pattern = beansArray[i].split(" " + fur)[0].split(color+" ")[1]

        let whitemarkings = beansArray[i].split(" white markings")[0]

        if (whitemarkings.includes(pattern + " tail")) {
            whitemarkings = whitemarkings.split(pattern + " tail")[1]
        }
        if (whitemarkings.includes("coat")) {
            whitemarkings = whitemarkings.split("coat")[1]
        }
        if (whitemarkings.includes("trade markings")) {
            whitemarkings = whitemarkings.split("trade markings")[1]
        }
        if (whitemarkings.includes(" / ")) {
            whitemarkings = whitemarkings.split(" / ")[0]
        }
        
        let markingslist = [
            ["locket", "locket & toes", "bib & boots", "bib, boots, & belly", "classic bicolor", "piebald", "spotted piebald", "freckled piebald", "van"],
            ["nose", "nose & toes", "nose, bib & boots", "bib, ears, & belly", "true piebald", "scattered piebald", "painted spots", "confetti", "speckled van"],
            ["toes", "tie & toes", "tie, toes & chin", "chin, boots, & belly", "left bicolor", "left piebald", "left patches", "left spots", "left van"],
            ["tail tip", "tail tip & toes", "tail, toes, & tie", "tail, boots, & belly", "right bicolor", "right piebald", "right patches", "right spots", "right van"],
            ["ear tips", "ear & tail tips", "ears, tail, & toes", "snowspots", "snowmelt", "ghost", "owl mantle", "heart mantle", "heart"],
            ["tail bands", "tail & ear bands", "small stripes", "small ribbons", "fishspine", "full stripes", "full ribbons", "birch", "scratch"]
        ]


        let whitetypelist = ["classic", "piebald", "left", "right", "inverse", "tabby"]

        let whitelevel 
        let whitetype
        // if cat is albino, we gotta redo our whitemarkings check via the eye color
        if (whitemarkings.includes("albino")) {
            let eyecolors = ["red", "violet", "blue", "green", "gold", "cool odd"]
            let eyecolor = beansArray[i].split(" eyes")[0].split("white markings")[1].split(" ")
            for (let i = 0; i < eyecolors.length; i++) {
                if (eyecolor.includes(eyecolors[i])) {
                    whitetype = whitetypelist[i]
                    whitelevel = 10
                    whitemarkings = "albino"
                    pattern = "hidden"
                    color = "hidden"
                    colortype = "hidden"
                    break
                }
            }
        }
        else {
            if (whitemarkings === "no") {
                whitemarkings = "none"
                whitelevel = "hidden"
                whitetype = "hidden"
            }
            else {
                let found = false;
                
                for (let i = 0; i < markingslist.length && found != true; i++) {
                    for (let j = 0; j < markingslist[i].length; j++) {
                        if (whitemarkings === markingslist[i][j]) {
                            whitelevel = j+1
                            whitetype = whitetypelist[i]
                            found=true
                            break
                        }
                    }
                }
            }
            
        }
        let accentcolor
        if (beansArray[i].includes("Mercat")) {
            accentcolor = beansArray[i].split("tail")[0]
            accentcolor = accentcolor.split("coat")[1]
            if (accentcolor.includes("trade markings")) {
                accentcolor = accentcolor.split("trade markings")[1]
            }
            accentcolor = accentcolor.split(" " + pattern)[0]
        }
        else {
            accentcolor = "hidden"
        }
        dataArray[i] = [fur, color, colortype, pattern, whitemarkings, whitelevel, whitetype, accentcolor]
        
    }

    console.log(dataArray)
    return dataArray
}




function generateInnerHTML(dataArray) {
    let colorslist = ["black", "choco", "brown", "tan", "red", "ginger", "orange", "aprico", "charc", "grey", "smoke", "silver", "buff", "cream", "almond", "beige", "snow"]
    let colorList = ["black", "chocolate", "brown", "tan", "red", "ginger", "orange", "apricot", "charcoal", "grey", "smoke", "silver", "buff", "cream", "almond", "beige", "snow"]
    let densityList = ["4", "3", "2", "1", "4", "3", "2", "1", "4", "3", "2", "1", "4", "3", "2", "1", "?"]
    let dilutesList = ["full", "full", "full", "full", "full", "full", "full", "full", "dilute", "dilute", "dilute", "dilute", "dilute", "dilute", "dilute", "dilute", "?"]
    let colorGeneList = ["has black", "has black", "has black", "has black", "has orange", "has orange", "has orange", "has orange", "has black", "has black", "has black", "has black", "has orange", "has orange", "has orange", "has orange", "?"]
    let invertedColorGeneList = ["has orange", "has orange", "has orange", "has orange", "has black", "has black", "has black", "has black", "has orange", "has orange", "has orange", "has orange", "has black", "has black", "has black", "has black", "?"]
    let patternList = ["mackerel", "classic", "broken", "lynxpoint", "clouded", "rosette", "cloudpoint", "spotted", "mink", "colorpoint", "solid", "ticked", "ripple", "agouti", "karpati", "freckle"]
    let patternGeneList = ["TT", "TM", "TS", "TP", "MM", "MS", "MP", "SS", "SP", "PP", "hidden", "TA", "MA", "SA", "PA", "AA"]
    let accentList = ["ruby", "violet", "amber", "pink", "blue", "green", "indigo", "gold", "teal", "black"]
    let accentGeneList = ["RR", "RB", "RY", "RL", "BB", "BY", "BL", "YY", "YL", "LL"]

    
    let innerHTMLArray = ["<ul>", "<ul>", "<ul>", "<ul>", "<ul>", "<ul>", "<ul>", "<ul>"]
    
    for (let i = 0; i < dataArray.length; i++) {
        innerHTMLArray[i] += "<li><b>fur:</b> " + dataArray[i][0] + "</li>"
        //color parsing info
        for (let j = 0; j < colorslist.length; j++) {
            if (dataArray[i][1] == colorslist[j]) {
                innerHTMLArray[i] += "<li><b>color:</b> " + colorList[j] + "</li>"
                innerHTMLArray[i] += "<li><b>is:</b> " + dilutesList[j] + "</li>"
                innerHTMLArray[i] += "<li><b>density:</b> " + densityList[j] + "</li>"
                innerHTMLArray[i] += "<li>" + colorGeneList[j] + "</li>"
                if (dataArray[i][2] == "tor") {
                    innerHTMLArray[i] += "<li>" + invertedColorGeneList[j] + "</li>"
                }
                break
            }
        }
        innerHTMLArray[i] += "<li><b>pattern:</b> " + dataArray[i][3] + "</li>"
        //pattern parsing info
        for (let j = 0; j < patternList.length; j++) {
            if (dataArray[i][3] == patternList[j]) {
                innerHTMLArray[i] += "<li><b>pattern genes:</b> " + patternGeneList[j] + "</li>"
            }
        }
        innerHTMLArray[i] += "<li><b>white:</b> " + dataArray[i][4] + "</li>"
        innerHTMLArray[i] += "<li><b>level:</b> " + dataArray[i][5] + "</li><li><b>type:</b> " + dataArray[i][6] + "</li>"

        for (let j = 0; j < accentList.length; j++) {
            if (dataArray[i][7] == accentList[j]) {
                innerHTMLArray[i] += "<li><b>accent:</b> " + dataArray[i][7] + "</li><li><b>accent genes:</b> " + accentGeneList[j] + "</li>"
            }
        }

        
    }
    return innerHTMLArray
}

// function makeCatImage(furlength, color, colortype, whitelevel, whitetype, pattern, accentcolor, eyes, eyecolor, pose, age, species, location)

function displayFindings(htmlArray, dataArray) {
    for (let i = 0; i < 7; i++) {
        let number = i+1
        let id = "cat"+number
        let tableentry = document.getElementById(id)
        let furlength = capitalizeFirstLetter(dataArray[i][0])
        let colorslist = ["black", "choco", "brown", "tan", "red", "ginger", "orange", "aprico", "charc", "grey", "smoke", "silver", "buff", "cream", "almond", "beige", "snow"]
        let colorList = ["black", "chocolate", "brown", "tan", "red", "ginger", "orange", "apricot", "charcoal", "grey", "smoke", "silver", "buff", "cream", "almond", "beige", "snow"]
        let color = dataArray[i][1]
        for (let j = 0; j < colorslist.length; j++) { 
            if (colorslist[j] == color) {
                color = capitalizeFirstLetter(colorList[j])
                break
            }
        }
        
        let colortypes = [["Standard", "st"], ["Tortoiseshell", "tor"], ["Watercolor", "pat"]]
        let colortype = ""
        for (let j = 0; j < colortypes.length; j++) {
            if (colortypes[j][1] == dataArray[i][2]) {
                colortype = colortypes[j][0]
                if (j > 0) {
                    if (colortype == "Tortoiseshell") {
                        let colorgenes = [["Apricot", "Orange", "Ginger", "Red", "Beige", "Almond", "Cream", "Buff"], 
                                          ["Tan", "Brown", "Chocolate", "Black", "Silver", "Smoke", "Grey", "Charcoal"]
                        ]
                        for (let k = 0; k < colorgenes[0].length; k++) {
                            if (color == colorgenes[0][k]) {
                                color += "-" + colorgenes[1][k]
                                break
                            }
                        }
                        for (let k = 0; k < colorgenes[1].length; k++) {
                            if (color == colorgenes[1][k]) {
                                color += "-" + colorgenes[0][k]
                                break
                            }
                        }
                    }
                    if (colortype == "Watercolor") {
                        let colorgenes = [["Snow", "Apricot", "Orange", "Ginger", "Red", "Snow", "Beige", "Almond", "Cream", "Buff"], 
                                          ["Snow", "Tan", "Brown", "Chocolate", "Black", "Snow", "Silver", "Smoke", "Grey", "Charcoal"]]
                        for (let k = 1; k < colorgenes[0].length; k++) {
                            if (color == colorgenes[0][k]) {
                                color += "-" + colorgenes[0][k-1]
                                break
                            }
                        }
                        for (let k = 0; k < colorgenes[1].length; k++) {
                            if (color == colorgenes[1][k]) {
                                color += "-" + colorgenes[1][k-1]
                                break
                            }
                        }
                    }
                }
                break
            }
        }
        let whitelevel = dataArray[i][5]
        let whitetypelist = ["classic", "piebald", "left", "right", "inverse", "tabby"]
        let whitetypeletterlist = ["C", "P", "L", "R", "I", "T"]
        let whitetype = dataArray[i][6]
        for (let j = 0; j < whitetypelist.length; j++) {
            if (whitetype == whitetypelist[j]) {
                whitetype = whitetypeletterlist[j]
            }
        }
        let pattern = capitalizeFirstLetter(dataArray[i][3])
        let accentcolor = dataArray[i][7]
        let species = "Not-cat"
        if (accentcolor !== "hidden") {
            species = "Mercat"
            accentcolor = capitalizeFirstLetter(accentcolor)
        }
        else {
            accentcolor = "-hidden-"
        }

        if (whitelevel == "hidden") {
            whitelevel = "-hidden-"
        }
        if (whitetype == "hidden") {
            whitetype == "hidden"
        }
        makeCatImage(furlength, color, colortype, whitelevel, whitetype, pattern, accentcolor, "neutral", "Dark Brown", "standing", "Adult", species, tableentry)
        let tempdiv = document.createElement("div")
        tempdiv.innerHTML = htmlArray[i]
        tableentry.insertAdjacentElement("beforeend", tempdiv)
    }
}

// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


function ensmallenData(beansArray) {
    let correctLineFound = false
    let correctLine = [-1, -1]
    let beansArrayNew = []
    for (let i = 0; i < beansArray.length; i++) {
        if (beansArray[i].includes("South or Trade Wind Cat ID:")) {
            correctLineFound = true
            correctLine[0] = i+1
        }
        if (beansArray[i].includes("Users Online")) {
            correctLine[1] = i
        }
    }
    if (correctLineFound == true) {
        for (let i = 0; i < beansArray.length-correctLine[0]; i++) {
            beansArrayNew[i] = beansArray[i+correctLine[0]]
        }
        for (let i = 0; i < beansArray.length-correctLine[1]; i++) {
            beansArrayNew.pop()
        }
        let temp = beansArrayNew.length
        let skiparray = []
        for (let i = 0; i < temp; i++) {
            if (beansArrayNew[i] == "") {
                skiparray[i] = "skip"
            }
            else {
                skiparray[i] = "keep"
            }
        }
        let tempArray = []
        let j = 0
        for (let i = 0; i < temp; i++) {
            if (skiparray[i] == "keep") {
                tempArray[j] = beansArrayNew[i]
                j++
            }
        }
        beansArrayNew = tempArray
        if (tempArray.length > 7) {
            let j = 0
            let tempArray2 = []
            for (let i = 0; i < tempArray.length; i++) {
                if (tempArray[i].includes("hair")) {
                    tempArray2[j] = tempArray[i]
                    j++
                }
            }
            beansArrayNew = tempArray2
        }

    }
    return beansArrayNew
    
}