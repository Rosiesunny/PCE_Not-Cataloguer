function generateBBCodeGeneString(genestring, locationID) {
    // https://www.geeksforgeeks.org/how-to-create-popup-box-using-html-and-css/#
    let genestringArray = genestring.split("]")
    for (let i = 0; i < genestringArray.length; i++) {
        genestringArray[i] = genestringArray[i].split("[")[1]
    }
    let genestringText = "[font=Verdana]"
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
    genestringText += "[" + genestringArray[6] + "] [" + switchAccentColorBBCode(genestringArray[7][0]) + switchAccentColorBBCode(genestringArray[7][1]) + "][/font]"
    console.log(genestringText)

    console.log("TESTING AREA:")
    console.log(localStorage.getItem("bbcodePrefix"))
    console.log(localStorage.getItem("bbcodeSuffix"))

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
    popupWindow(userStyleGeneStringText, locationID)
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

// Only accessed from the Settings page
function savePrefixOrSuffix(prefixOrSuffix, id) {
    let key = "bbcode" + prefixOrSuffix
    let text = document.getElementById(id).value
    localStorage.setItem(key, JSON.stringify(text))
}


// https://stackoverflow.com/questions/17772260/textarea-auto-height
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
  }