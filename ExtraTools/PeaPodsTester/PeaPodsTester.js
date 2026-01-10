function parseText() {
    let textBoxEntry = document.querySelector(".input").value
    console.log("PEPEPEPEP")
    let plantRegEx = /a (normal|miniature) pea plant with a (straight|curly), (dark green|lavender|white|gold) stem(a tiny amount of|a small amount of|a medium amount of|a large amount of|full)? ?(white|gold)? ?(?:variegation.+)?.+(?:pot labeled with .+)(wrinkly|smooth), (green|gold) pea pods(blue|indigo|purple|white) (ghost bells|moose pansies|button blooms|squid bells|candle drops|eye daisies)/gm
    let matches = []
    let match  
    while ((match = plantRegEx.exec(textBoxEntry)) !== null) {
        matches.push(match)
    }
    let plantgenes = []
    for (let i = 0; i < matches.length; i++) {
        let genes = genePlant(matches[i])
        plantgenes.push(genes)
        let num = i+1
        document.getElementById("plant" + num).innerText = getGeneString(genes)
        
    }
    console.log(matches)
    console.log(plantgenes)
}


function genePlant(planttraits) {
    let genes = ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?"]
    
    
    console.log(planttraits)
    // genes[0] & genes[1] - plant size (N|M) M recessive 
    switch(planttraits[1]) {
        case "normal":
            genes[0] = "N"
            break
        case "miniature":
            genes[0] = "M"
            genes[1] = "M"
            break
    }

    // genes[2] & genes[3] - stem style (S|C) C recessive
    switch (planttraits[2]) {
        case "straight":
            genes[2] = "S"
            break
        case "curly":
            genes[2] = "C"
            genes[3] = "C"
    }

    // genes[4] & genes[5] - stem color (D|L) L recessive
    switch (planttraits[3]) {
        case "dark green":
            genes[4] = "D"
            break
        case "lavender":
            genes[4]= "L"
            genes[5] = "L"
            break
    }

    // genes[6] & genes[7] - pea pod texture (S|W) W recessive
    switch(planttraits[6]) {
        case "smooth":
            genes[6] = "S"
            break
        case "wrinkly":
            genes[6] = "W"
            genes[7] = "W"
            break
    }

    // genes[8] & genes[9] - pea pod color (G|Y) Y recessive
    switch(planttraits[7]) {
        case "green":
            genes[8] = "G"
            break
        case "gold":
            genes[8] = "Y"
            genes[9] = "Y"
            break
    }
    
    // genes[10] & genes[11] - displays variegation (Y|N) N recessive
    if (planttraits[4] || planttraits[5]) {
        genes[10] = "Y"
        // genes[12] & genes[13] - variegation color (W|Y) Y recessive
        switch (planttraits[5]) {
            case "white":
                genes[12] = "W"
                break
            case "gold":
                genes[12] = "Y"
                genes[13] = "Y"
                break
        }
        // genes [14] - variegation amount (0|1|2|3|4|5)
        switch(planttraits[4]) {
            case "a tiny amount of":
                genes[14] = 1
                break
            case "a small amount of":
                genes[14] = 2
                break
            case "a medium amount of":
                genes[14] = 3
                break
            case "a large amount of":
                genes[14] = 4
                break
            case "full":
                genes[14] = 5
                break            
        }
    }

    // genes[15] & genes[16] - flower type (A|B|C)
    switch(planttraits[9]) {
        case "ghost bells":
            genes[15] = "B"
            genes[16] = "B"
            break
        case "moose pansies":
            genes[15] = "A"
            genes[16] = "A"
            break
        case "button blooms":
            genes[15] = "C"
            genes[16] = "C"
            break

        case "squid bells":
            genes[15] = "A"
            genes[16] = "B"
            break

        case "candle drops":
            genes[15] = "B"
            genes[16] = "C"
            break

        case "eye daisies":
            genes[15] = "A"
            genes[16] = "C"
            break
    }    
    
    // genes[17] & genes[18] - flower color (B|P|O) O recessive
    switch(planttraits[8]) {
        case "blue":
            genes[17] = "B"
            break
        case "purple":
            genes[17] = "P"
            break
        case "indigo":
            genes[17] = "B"
            genes[18] = "P"
            break
        case "white":
            genes[17] = "O"
            genes[18] = "O"
            break
    }
    console.log(genes)
    return genes
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