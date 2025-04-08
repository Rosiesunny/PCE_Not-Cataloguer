function generateSalesPost() {

}

function findRecessiveGenes(cat) {
    let genes = cat.genes
    let recessivesList = []
    
    // if cat is not null, and has O gene, it carries null
    console.log(cat.wind)
    if (cat.wind != "Null") {
        if (genes[1] == "O" || genes[2] == "O") {
            recessivesList.push("Null")
        }
    }
    // if cat is shorthair, and carries L gene, it carries longhair
    if (cat.fur.length == "Shorthair") {
        if (genes[3] == "L" || genes[4] == "L") {
            recessivesList.push("Longhair")
        }
    }
    // if cat is full, and carries D, it carries dilute
    if (genes[7] == "F" || genes[8] == "F") {
        if (genes[7] == "D" || genes[8] == "D") {
            recessivesList.push("Dilute")
        }
    }
    // if cat is not solid, and carries N pattern gene, it carries solid
    if (cat.pattern != "Solid") {
        if (genes[10] == "N" || genes[11] == "N") {
            recessivesList.push("Solid")
        }
    }
    // if cat has white, and carries N white gene, it carries no white
    if (cat.white.markings != "None") {
        if (genes[14] == "N" || genes[15] == "N") {
            recessivesList.push("No-white")
        }
    }
    console.log("Carries:" + recessivesList)
    return recessivesList
}

function findHiddenGenes(cat) {
    let genes = cat.genes
    let hiddensList = []
    if (cat.fur.color == "-hidden-") {  //cat has to be albino to be hiding color
        if (genes[5] != "?" && genes[6] != "?" && genes[7] != "?" && genes[8] != "?" && genes[9] != "?") {
            let color1 = genes[5]
            let color2 = genes[6]
            let dilute1 = genes[7]
            let dilute2 = genes[8]
            let density = genes[9]

            let colorsList = [
                ["B", "F", "4", "Black"], 
                ["B", "F", "3", "Chocolate"],
                ["B", "F", "2", "Brown"],
                ["B", "F", "1", "Tan"],
                ["B", "D", "4", "Charcoal"], 
                ["B", "D", "3", "Grey"],
                ["B", "D", "2", "Smoke"],
                ["B", "D", "1", "Silver"],
                ["O", "F", "4", "Red"], 
                ["O", "F", "3", "Ginger"],
                ["O", "F", "2", "Orange"],
                ["O", "F", "1", "Apricot"],
                ["O", "D", "4", "Buff"], 
                ["O", "D", "3", "Cream"],
                ["O", "D", "2", "Almond"],
                ["O", "D", "1", "Beige"]
            ]
            let finalColors = []
            if (color1 == color2) {
                finalColors.push(color1)
            }
            else {
                finalColors.push(color1, color2)
            }
            let diluteStatus
            if (dilute1 == "F" || dilute2 == "F") {
                diluteStatus = "F"
            } else {
                diluteStatus = "D"
            }

            let matchingColors = []
            finalColors.forEach(color => {
                colorsList.forEach(colorCombo => {
                    if (colorCombo[0] === color && colorCombo[1] === diluteStatus && colorCombo[2] == density) {
                        matchingColors.push(colorCombo[3])
                    }
                })
            })
            if (matchingColors.length > 1) {
                hiddensList.push(matchingColors[0] + "/" + matchingColors[1] + " Color")
            }
            else {
                hiddensList.push(matchingColors[0] + " Color")
            }
        }
    }
    // cat is not albino but could be hiding color genes still if they're not trade
    else {
        if (cat.wind == "North") {
            // first gene is north gene
            if (genes[6] == "O") {
                hiddensList.push("Orange gene")
            }
            if (genes[6] == "B") {
                hiddensList.push("Black gene")
            }
        }
        if (cat.wind == "South") {
            if (genes[5] == "O") {
                hiddensList.push("Orange gene")
            }
            if (genes[5] == "B") {
                hiddensList.push("Black gene")
            }
        }
        if (cat.wind == "Null") {
            if (genes[5] == genes[6]) {
                if (genes[5] == "O") {
                    hiddensList.push("Orange gene")
                }
                if (genes[5] == "B") {
                    hiddensList.push("Black gene")
                }
            }
            else {
                hiddensList.push("Black/Orange genes")
            }
        }
    }
    if (cat.pattern == "-hidden-" || cat.pattern == "Solid") {
        if (genes[12] != "?" && genes[13] != "?") {
            switch (genes[12]) {
                case "T": {
                    let stripeslist = [["T", "Mackerel"], ["M", "Classic"], ["S", "Broken"], ["P", "Lynxpoint"]]
                    hiddensList.push(hiddenPatternOrAccentCheck(genes[13], stripeslist, "Pattern"))
                    break
                }
                case "M": {
                    let marbleslist = [["T", "Classic"], ["M", "Clouded"], ["S", "Rosette"], ["P", "Cloudpoint"]]
                    hiddensList.push(hiddenPatternOrAccentCheck(genes[13], marbleslist, "Pattern"))
                    break
                }
                case "S": {
                    let spotslist = [["T", "Broken"], ["M", "Rosette"], ["S", "Spotted"], ["P", "Mink"]]
                    hiddensList.push(hiddenPatternOrAccentCheck(genes[13], spotslist, "Pattern"))
                    break
                }
                case "P": {
                    let pointslist = [["T", "Lynxpoint"], ["M", "Cloudpoint"], ["S", "Mink"], ["P", "Colorpoint"]]
                    hiddensList.push(hiddenPatternOrAccentCheck(genes[13], pointslist, "Pattern"))
                    break
                }      
            }
        }

    }
    if (cat.white.level == "-hidden-") {
        if (genes[16] != "?" && genes[17] != "?") {
            hiddensList.push(genes[16]+genes[17] + " White")
        }
    }

    if (cat.accentColor == "-hidden-") {
        if (genes[21] != "?" && genes[22] != "?") {
            switch(genes[21]) {
                case "R": {
                    let redslist = [["R", "Ruby"], ["B", "Violet"], ["Y", "Amber"], ["L", "Pink"]]
                    hiddensList.push(hiddenPatternOrAccentCheck(genes[22], redslist, "Accent"))
                    break
                }
                case "B": {
                    let blueslist = [["R", "Violet"], ["B", "Blue"], ["Y", "Green"], ["L", "Indigo"]]
                    hiddensList.push(hiddenPatternOrAccentCheck(genes[22], blueslist, "Accent"))
                    break
                }
                case "Y": {
                    let yellowslist = [["R", "Amber"], ["B", "Green"], ["Y", "Gold"], ["L", "Teal"]]
                    hiddensList.push(hiddenPatternOrAccentCheck(genes[22], yellowslist, "Accent"))
                    break
                }
                case "L": {
                    let blackslist = [["R", "Pink"], ["B", "Indigo"], ["Y", "Teal"], ["L", "Black"]]
                    hiddensList.push(hiddenPatternOrAccentCheck(genes[22], blackslist, "Accent"))
                    break
                }
            }
        }
    }
    console.log("Hides: " + hiddensList)
    return hiddensList
}

function hiddenPatternOrAccentCheck(gene2, list, accentorpattern) {
    for (let i = 0; i < list.length; i++) {
        if (gene2 == list[i][0]) {
            return list[i][1] + " " + accentorpattern
        }
    }
}

function checkCat(cat) {
    console.log(cat)
    getBST(cat.stats)
    narrowDownJobAffinity(cat.stats, cat.personality)
    mayorBoostsCounter(cat.stats)
    checkDoctorAffinity(cat.stats, cat.personality)
    checkInnkeeperMerchantAffinity(cat.personality)
    checkTeacherAffinity(cat.stats, cat.personality)
    listGoodStats(cat.stats)
    findRecessiveGenes(cat)
    findHiddenGenes(cat)
    checkID(cat.id.toString())
}

function getBST(stats) {
    let BST = stats.Agility + stats.Cleverness + stats.Finesse + stats.Health + stats.Luck + stats.Perception + stats.Strength
    console.log("BST: " + BST) 
    return BST
}

function narrowDownJobAffinity(stats, persoStats) {
    jobgroups = [
        ["Gatherer/Gardener/Farmer", "Perception", "pos", "Dedication"], 
        ["Hunter/Fisher/Bugcatcher", "Agility", "pos", "Energy"], 
        ["Miner", "Strength", "pos", "Bravery"], 
        ["Artist", "Finesse", "neg", "Energy"], 
        ["Scribe", "Cleverness", "neg", "Energy"], 
        ["Herbalist/Apothecary", "Cleverness", "pos", "Dedication"], 
        ["Clothier/Craftscat", "Finesse", "pos", "Dedication"], 
        ["Blacksmith/Builder/Mason", "Strength", "pos", "Dedication"], 
        ["Flockherd/Baker", "Perception", "pos", "Benevolence"]
    ]
    let highestModifier = -69
    let bestJobGroup = null;
    for (let i = 0; i < jobgroups.length; i++) {
        let modifier = regularJobModifierCheck(stats[jobgroups[i][1]]) + regularJobPersonalityBonusCheck(persoStats[jobgroups[i][3]], jobgroups[i][2])
        jobgroups[i][4] = modifier
        if (modifier == highestModifier) {
            bestJobGroup += "/" + jobgroups[i][0]
        }
        if (modifier > highestModifier) {
            highestModifier = modifier
            bestJobGroup = jobgroups[i][0]
        }
    }
    console.log("Highest Job Potential: " + bestJobGroup + " +" + highestModifier)
    if (highestModifier >= 5) {
        return ("+" + highestModifier + " " + bestJobGroup)
    }
}

// used by the narrowDownJobAffinity function
function regularJobModifierCheck(stat) {
    let minvalues = [0, 4, 7, 10, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39]
    let modifiers = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    for (let i = minvalues.length; i >= 0; i--) {
        if (stat >= minvalues[i]) {
            return modifiers[i]
        }
    }
}

// used by the narrowDownJobAffinity function
function regularJobPersonalityBonusCheck(stat, posorneg) {
    if (stat >= 8) {  // if stat is 8+
        switch(posorneg) {
            case "pos": // and we want 8+
                return 2 // we get +2
            case "neg": // and we don't want 8+
                return -2 // we get -2
        }
    }
    if (stat <=3) {
        switch(posorneg) {
            case "pos":
                return -2
            case "neg":
                return 2
        }
    }
    // if no stat has been returned, then we're in the middle where it doesn't add anything. +0
    return 0
}

function mayorBoostsCounter(stats) {
    let statsArray = ["Agility", "Cleverness", "Finesse", "Health", "Luck", "Perception", "Strength"]
    let minvalues = [19, 23, 27, 31]
    let boostcounter = 0
    for (let i = 0; i < statsArray.length; i++) {
        for (let j = 0; j < minvalues.length; j++) {
            if (stats[statsArray[i]] >= minvalues[j]) {
                boostcounter += 1
            }
            else {
                break
            }
        }
    }
    console.log("Mayor Boost Stats: " + boostcounter)
    if (boostcounter >= 3) {
        return ("[b]" + boostcounter + " Mayor stat boosts[/b]")
    }
}

function checkDoctorAffinity(stats, persoStats) {
    let mincleverness = [17, 20, 23, 26, 29]
    let doctorBoost = 0
    for (let i = 0; i < mincleverness.length; i++) {
        if (stats.Cleverness >= mincleverness[i]) {
            doctorBoost += 5
        }
        else {
            break
        }
    }
    let minbenevolence = [8, 11, 14]
    for (let i = 0; i < minbenevolence.length; i++) {
        if (persoStats.Benevolence >= minbenevolence[i]) {
            doctorBoost += 4
        }
        else {
            break
        }
    }
    console.log("Doctor Affinity: " + doctorBoost + "% health boost")
}

function checkInnkeeperMerchantAffinity(persoStats) {
    let minextroversion = [8, 11, 14]
    let innkeeperBoost = 0;
    let merchantDiscount = 0
    for (let i = 0; i < minextroversion.length; i++) {
        if (persoStats.Extroversion >= minextroversion[i]) {
            innkeeperBoost += 1
            merchantDiscount -= 10
        }
    }
    console.log("Innkeeper cat boost odds: " + innkeeperBoost + "%")
    console.log("Merchant discount: " + merchantDiscount + "%")
}

function checkTeacherAffinity(stats, persoStats) {
    let statIncreaseOddsDenominator = 50 - stats.Cleverness - persoStats.Benevolence
    console.log("Teacher base stat increase odds: 1/" + statIncreaseOddsDenominator)
}

function checkMailcarrierAffinity(stats, persoStats) {
    let minagility = [17, 20, 23, 26, 29]
    let mailcarrierBoost = 0;
    for (let i = 0; i < minagility.length; i++) {
        if (stats.Agility >= minagility[i]) {
            mailcarrierBoost += 5
        }
        else {
            break
        }
    }
    let minextroversion = [8, 11, 14]
    for (let i = 0; i < minextroversion.length; i++) {
        if (persoStats.Extroversion >= minextroversion[i]) {
            mailcarrierBoost += 4
        }
        else {
            break
        }
    }
}

function checkCatFriendsFamily(friends, family) {

}

function checkID(id) {
    console.log(id)
    palindromeCheck(id)
    repeatingNumbersCheck(id)
    incrementalCheck(id)
    
}

function palindromeCheck(id) {
    // Palindrome Check
    let length = Math.floor(id.length / 2)
    for (let i = 0; i < length; i++) {
        if (id[i] !== id[id.length-i-1]) {
            return ""
        }
    }
    return "Palindrome ID"
}

function repeatingNumbersCheck(id) {
    let numsArray = [[id[0], 1]]
    for (let i = 1; i < id.length; i++) {  // i is id place counter
        let match = false
        for (let j = 0; j < numsArray.length; j++) { //j is temporary array place counter
            if (id[i] == numsArray[j][0]) {
                match = true
                numsArray[j][1] += 1
                break 
            }
        }
        if (match == false) {
            numsArray.push([id[i], 1])
        }
    }
    let returnArray = []
    let threshhold = 3
    if (id.length >= 6) {
        for (let i = 6; i < id.length; i++) {
            threshhold += 1
        }
    }
    for (let i = 0; i < numsArray.length; i++) {
        if (numsArray[i][1] >= threshhold) {
            returnArray.push(numsArray[i][1] + " " + numsArray[i][0] + "'s in ID")
        }
    }
    console.log(numsArray)
    console.log(returnArray)
    return returnArray
}

// incremental check
function incrementalCheck(id) {
    idNum = Number(id)
    let tempNum1 = Number(id[0])
    let tempNum2 = Number(id[1])
    let difference = tempNum2 - tempNum1
    let addNumberPattern = 1
    if (difference > 1 || difference < -1) {
        let doubledigitstoggle = false
        for (let i = 2; i < id.length; i++) {
            if (doubledigitstoggle == false) {
                tempNum1 = Number(id[i-1])
                tempNum2 = Number(id[i])
            }
            else {
                tempNum1 = Number(id[i-1] + id[i])
                tempNum2 = Number(id[i+1] + id[i+2])
            }
            let tempNum3 = Number(id[i] + id[i+1])
            if (tempNum1+difference > 9) {
                if (isNaN(tempNum3) || isNaN(tempNum2)) {
                    break
                }
                else {
                    if (doubledigitstoggle == false) {
                        if ((tempNum1+difference) == tempNum3) {
                            addNumberPattern += 1
                            doubledigitstoggle = true
                        }
                        else {
                            addNumberPattern = 1
                            difference = tempNum2 - tempNum1
                        }
                    }
                    else {
                        if ((tempNum1 + difference) == tempNum2) {
                            addNumberPattern +=1
                            i++
                        }
                        else {
                            addNumberPattern = 1
                            difference = tempNum2 - tempNum1
                        }
                    }
                }
            }
        }
    }
    else {
        if (difference == 0) {
            return ""
        }
        else {
            for (let i = 2; i < id.length; i++) {
                tempNum1 = Number(id[i-1])
                tempNum2 = Number(id[i])
                if (tempNum2 - tempNum1 == difference) {
                    addNumberPattern += 1
                }
                else {
                    addNumberPattern = 1
                    difference = tempNum2 - tempNum1
                }
            }
        }
        
    }
    
    if (addNumberPattern >= 3) {
        if (difference > 0) {
            console.log("Incremental ID of " + difference)
        }
        else {
            console.log("Decremental ID of " + difference)}
    }
}


function primeNumbersCheck(id) {
    id = Number(id)
    if (id <= 1) {
        return ""
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return ""
        }
    }
    return "Prime Number ID"
}



function listGoodStats(stats) {
    let statsArray = Object.entries(stats)
    statsArray.sort((a, b) => b[1] - a[1])
    let statsBBCodeList = ""
    let pinkstart = false, purplestart = false, bluestart = false, greenstart = false
    for (let i = 0; i < statsArray.length; i++) {
        if (statsArray[i][1] >= 29) {
            if (pinkstart == false) {
                statsBBCodeList += "[color=pink]" + statsArray[i][1] + " " + abbreviateStat(statsArray[i][0])
                pinkstart = true
            }
            else {
                statsBBCodeList += ", " + statsArray[i][1] + " " + abbreviateStat(statsArray[i][0])
            }
        }
        else {
            if (pinkstart == true && purplestart == false) {
                statsBBCodeList += "[/color]"
            }
            if (statsArray[i][1] >= 25) {
                if (purplestart == false) {
                    if (pinkstart == true) {
                        statsBBCodeList += ", "
                    }
                    statsBBCodeList += "[color=purple]" + statsArray[i][1] + " " + abbreviateStat(statsArray[i][0])
                    purplestart = true
                }
                else {
                    statsBBCodeList += ", " + statsArray[i][1] + " " + abbreviateStat(statsArray[i][0])
                }
            }
            else {
                if (purplestart == true && bluestart == false) {
                    statsBBCodeList += "[/color]"
                }
                if (statsArray[i][1] >= 21) {
                    if (bluestart == false) {
                        if (purplestart == true) {
                            statsBBCodeList += ", "
                        }
                        statsBBCodeList += "[color=blue]" + statsArray[i][1] + " " + abbreviateStat(statsArray[i][0])
                        bluestart = true
                    }
                    else {
                        statsBBCodeList += ", " + statsArray[i][1] + " " + abbreviateStat(statsArray[i][0])
                    }
                }
                else {
                    if (bluestart == true && greenstart == false) {
                        statsBBCodeList += "[/color]"
                    }
                    if (statsArray[i][1] >= 17) {
                        if (greenstart == false) {
                            if (bluestart == true) {
                                statsBBCodeList += ", "
                            }
                            statsBBCodeList += "[color=green]" + statsArray[i][1] + " " + abbreviateStat(statsArray[i][0])
                            greenstart = true
                        }
                        else {
                            statsBBCodeList += ", " + statsArray[i][1] + " " + abbreviateStat(statsArray[i][0])
                        }
                    }
                    else {
                        if (greenstart == true) {
                            statsBBCodeList += "[/color]"
                        }
                        console.log(statsBBCodeList)
                        return (statsBBCodeList)
                    }
                }
            }
        }
    }
}

function abbreviateStat(stat) {
    let statsArray = ["Agility", "Cleverness", "Finesse", "Health", "Luck", "Perception", "Strength"]
    let abbreviations = ["AGI", "CLV", "FIN", "HLT", "LCK", "PER", "STR"]
    for (let i = 0; i < statsArray.length; i++) {
        if (stat == statsArray[i]) {
            return abbreviations[i]
        }
    }
}
