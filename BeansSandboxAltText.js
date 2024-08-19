function parseText() {
    // Get input and parse
    let textBoxEntry = document.querySelector(".input");

    // beansSandboxPageInfoINITIAL is an array of the lines of the input
    let beansSandboxPageInfoINITIAL = textBoxEntry.value.split("\n");
    let beansSandboxArray = ensmallenData(beansSandboxPageInfoINITIAL)
    let dataArray = parseCats(beansSandboxArray)
    let htmlArray = generateInnerHTML(dataArray)
    displayFindings(htmlArray)
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
        if (whitemarkings.includes("coat")) {
            whitemarkings = whitemarkings.split("coat")[1]
        }
        if (whitemarkings.includes("trade markings")) {
            whitemarkings = whitemarkings.split("trade markings")[1]
        }
        if (whitemarkings.includes(" / ")) {
            whitemarkings = whitemarkings.split(" / ")[0]
        }
        console.log(whitemarkings)
        let markingslist = [
            ["locket", "locket & toes", "bib & boots", "bib, boots, & belly", "classic bicolor", "piebald", "spotted piebald", "freckled piebald", "van"],
            ["nose", "nose & toes", "nose, bib & boots", "bib, ears, & belly", "true piebald", "scattered piebald", "painted spots", "confetti", "speckled van"],
            ["toes", "tie & toes", "tie, toes & chin", "chin, boots, & belly", "left bicolor", "left piebald", "left patches", "left spots", "left van"],
            ["tail tip", "tail tip & toes", "tail, toes, & tie", "tail, boots, & belly", "right bicolor", "right piebald", "right patches", "right spots", "right van"],
            ["ear tips", "ear & tail tips", "ear, tail, & toes", "snowspots", "snowmelt", "ghost", "owl mantle", "heart mantle", "heart"]
        ]
        let whitetypelist = ["classic", "piebald", "left", "right", "inverse"]

        let whitelevel 
        let whitetype
        // if cat is albino, we gotta redo our whitemarkings check via the eye color
        if (whitemarkings.includes("albino")) {
            let eyecolors = ["red", "violet", "blue", "green", "gold"]
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
                whitelevel = "unknown"
                whitetype = "unknown"
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

        dataArray[i] = [fur, color, colortype, pattern, whitemarkings, whitelevel, whitetype]
        
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
    let patternList = ["mackerel", "classic", "broken", "lynxpoint", "clouded", "rosette", "cloudpoint", "spotted", "mink", "colorpoint", "solid"]
    let patternGeneList = ["TT", "TM", "TS", "TP", "MM", "MS", "MP", "SS", "SP", "PP", "hidden"]
    
    let innerHTMLArray = ["<ul>", "<ul>", "<ul>", "<ul>", "<ul>", "<ul>", "<ul>"]
    
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
    }
    return innerHTMLArray
}

function displayFindings(htmlArray) {
    for (let i = 0; i < 7; i++) {
        let number = i+1
        let id = "cat"+number
        let tableentry = document.getElementById(id)
        tableentry.innerHTML = htmlArray[i]
    }
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
    console.log(beansArrayNew)
    return beansArrayNew
    
}