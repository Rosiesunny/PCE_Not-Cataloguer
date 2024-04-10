function parseText() {
    // Get input and parse
    let textBoxEntry = document.querySelector(".input");

    // beansSandboxPageInfoINITIAL is an array of the lines of the input
    let beansSandboxPageInfoINITIAL = textBoxEntry.value.split("\n");
    
    console.log(beansSandboxPageInfoINITIAL)
    let beansSandboxArray = ensmallenData(beansSandboxPageInfoINITIAL)
    console.log(beansSandboxArray)
    let dataArray = parseCats(beansSandboxArray)
    let htmlArray = generateInnerHTML(dataArray)
    displayFindings(htmlArray)
    textBoxEntry.value = ""
}



function parseCats(beansArray) {
    let dataArray = []
    for (let i = 0; i < beansArray.length; i++) {
        let fur = beansArray[i].split("hair")[0]+"hair" // shorthair or longhair
        let color = beansArray[i].split("hair ")[1].split(" ")[0] //
        let colortype = beansArray[i].split(color+ " ")[1].split(" ")[0] // st = standard, tor = tortie, pat = watercolor
        let pattern = ""
        if (beansArray[i].includes("with trade markings:")) {
            pattern = beansArray[i].split(colortype+ " ")[1].split("with trade markings: ")[0]
        }
        else {
            pattern = beansArray[i].split(colortype+" ")[1].split("whiteness")[0]
        }
        let whitelevel = beansArray[i].split("whiteness: ")[1][0]
        dataArray[i] = [fur, color, colortype, pattern, whitelevel]
        
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
        innerHTMLArray[i] += "<li>" + dataArray[i][0] + "</li>"
        //color parsing info
        for (let j = 0; j < colorslist.length; j++) {
            if (dataArray[i][1] == colorslist[j]) {
                innerHTMLArray[i] += "<li>" + colorList[j] + "</li>"
                innerHTMLArray[i] += "<li>is: " + dilutesList[j] + "</li>"
                innerHTMLArray[i] += "<li>density: " + densityList[j] + "</li>"
                innerHTMLArray[i] += "<li>" + colorGeneList[j] + "</li>"
                if (dataArray[i][2] == "tor") {
                    innerHTMLArray[i] += "<li>" + invertedColorGeneList[j] + "</li>"
                }
                break
            }
        }
        innerHTMLArray[i] += "<li>" + dataArray[i][3] + "</li>"
        //pattern parsing info
        for (let j = 0; j < patternList.length; j++) {
            if (dataArray[i][3] == patternList[j]) {
                innerHTMLArray[i] += "<li>pattern genes: " + patternGeneList[j] + "</li>"
            }
        }
        innerHTMLArray[i] += "<li>white level: " + dataArray[i][4] + "</li>"
    }
    return innerHTMLArray
}

function displayFindings(htmlArray) {
    for (let i = 0; i < 7; i++) {
        let number = i+1
        let id = "cat"+number
        let tableentry = document.getElementById(id)
        if (htmlArray[i].includes(" eyes")) {
            tableentry.innerHTML = "<li>Albinos break the parser!</li><li>White level is 10</li><li>that's all we know</li>"
        }
        else {
            tableentry.innerHTML = htmlArray[i]
        }
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
    console.log(beansArrayNew)
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
        console.log(tempArray)
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