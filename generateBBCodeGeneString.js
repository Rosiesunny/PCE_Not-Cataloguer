function generateBBCodeGeneString(genestring) {


    // currently this grabs the gene string from the gene testing page's dedicated box to hold the gene code, if used on other pages we have to alter how the gene code is obtained
    let genestring = document.getElementById("genecodefull").innerText

    // https://www.geeksforgeeks.org/how-to-create-popup-box-using-html-and-css/#




    let genestringArray = genestring.split("]")
    for (let i = 0; i < genestringArray.length; i++) {
        genestringArray[i] = genestringArray[i].split("[")[1]
    }
    console.log(genestringArray)
    let genestringText = "[font=Verdana][C] "
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
    genestringText += "[" + genestringArray[6] + "] [" + genestringArray[7] + "][/font]"
    console.log(genestringText)

    return genestringText
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