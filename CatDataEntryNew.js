// KIBBYDIRECTOR/MAIN FUNCTION THAT CALLS ALL OF THESE WILL HAVE
// initialdataArray
// dataArray
// dataArrayCheckpointsList  - will use the findlinenumber whatever function to make an array of all lines. maybe 2 dimensional array? so it can be like. or could just. already account for that. and not be an idiot
//                                            catIDLine: [16, "same"] (same line or next line)
// then the search is reserved for main function, and all the mini functions are designated for dataArray formatting from the info on the designated line
// use the array to get the line and send that to functions

function kibbyDirector() {
    let textBoxEntry = document.querySelector(".testTextBox")
    let catPageInfoINITIAL = textBoxEntry.value.split("\n")
    let catVillageRole = checkForTravelingText(catPageInfoINITIAL) ?? ""          // checks for traveling text before deleting unneeded stuff
    console.log(catVillageRole)
    let catPageInfo = ensmallenCatPageInfo(catPageInfoINITIAL)
    console.log(catPageInfo)
    let checkpointArray = getDataCheckpoints(catPageInfo)
    console.log(checkpointArray)
    // data checkpoints gotten let's do the actual processing
    // NOTE: FOR STATS, I STILL NEED TO ACCOUNT FOR MAYOR BONUS!! I HAVEN'T ADDED THAT IN HERE YET
    console.log(parseName(catPageInfo, checkpointArray[1]))
    console.log(parseBirthday(catPageInfo, checkpointArray[3]))
    console.log(parseAge(catPageInfo, checkpointArray[5]))
    console.log(parseWind(catPageInfo, checkpointArray[7]))
    console.log(parsePronouns(catPageInfo, checkpointArray[9]))
    console.log(parseAspect(catPageInfo, checkpointArray[11]))
    console.log(parseOrigin(catPageInfo, checkpointArray[13]))
    console.log(parseID(catPageInfo, checkpointArray[15]))
    console.log(parseSpecies(catPageInfo, checkpointArray[17]))
    console.log(parseSize(catPageInfo, checkpointArray[19]))
    console.log(parseFurLength(catPageInfo, checkpointArray[21]))
    console.log(parseColor(catPageInfo, checkpointArray[23]))
    console.log(parsePattern(catPageInfo, checkpointArray[25]))
    console.log(parseWhiteMarks(catPageInfo, checkpointArray[27]))
    console.log(parseEyeColor(catPageInfo, checkpointArray[29]))
    console.log(parsePersonalityType(catPageInfo, checkpointArray[33]))
    let basePersonalityStats = parsePersonalityStats(catPageInfo, checkpointArray)
    let heldTrinketInfo = parseHeldTrinket(catPageInfo, checkpointArray[45], checkpointArray[46])
    console.log(parseDayJob(catPageInfo, checkpointArray[48]))
    console.log(parseJobs(catPageInfo, checkpointArray))
    console.log(parseAdvClass(catPageInfo, checkpointArray[86]))
    console.log(parseAdvClasses(catPageInfo, checkpointArray))
    let baseStats = parseBaseStats(catPageInfo, checkpointArray)
    let mayorBonuses = parseMayorBonus(catPageInfo, checkpointArray[114]) ?? "None"
    modifyStats(baseStats, basePersonalityStats, heldTrinketInfo, mayorBonuses)
    // CURRENTLY THE SYSTEM BREAKS IF YOU HAVE SOMEONE WHO DOES NOT HAVE A MAYOR BONUS ACTIVE! HAS TO DO WITH THE THINGS FOL

}

function checkForTravelingText(catPageInfoINITIAL) {
    for (let i = 0; i < catPageInfoINITIAL.length; i++) {
        if (catPageInfoINITIAL[i].includes("This not-cat is currently out traveling the world!")) {
            return "Traveler"
        }
    }
    return "Active"
}

function ensmallenCatPageInfo(catPageInfoINITIAL) {
    let catPageInfo = []
    if (catPageInfoINITIAL[1].includes("[") == false) {
        let catNameLineStart = -1
        let correctLineFound = false
        for (let i = 0; i < catPageInfoINITIAL.length && correctLineFound == false; i++) {
            if (catPageInfoINITIAL[i].includes("[")) {
                catNameLineStart = i
                correctLineFound = true
                break
            }
        }
        for (let i = 0; i < catPageInfoINITIAL.length-catNameLineStart; i++) {
            catPageInfo[i] = catPageInfoINITIAL[i+catNameLineStart-1]
        }
    }
    else {
        catPageInfo = catPageInfoINITIAL
    }
    let lastLine = -1
    for (let i = 125; i < catPageInfo.length; i++) {
        if (catPageInfo[i].includes("Users Online")) {
            lastLine = i
            break
        }
    }
    let initialLength = catPageInfo.length
    if (lastLine > 0) {
        for (let i = 0; i < initialLength-lastLine; i++) {
            catPageInfo.pop()
        }
    }
    return catPageInfo
}

//finds what line some text is on
function simpleLineNumberSearch(catPageInfo, textToCheck, lastCheckedLandmark) {
    for (let i = lastCheckedLandmark; i < catPageInfo.length; i++) {
        if (catPageInfo[i].includes(textToCheck)) {
            return i
        }
    }
}

function getDataCheckpoints(dataArray) {
    let initialLine = simpleLineNumberSearch(dataArray, "Basic Data:", 0)
    let currentLine = initialLine
    let lineNum = initialLine
    console.log(initialLine)
    //while determining lines w text patterns, -1 means line after // -2 means same line
    // the final line number should always be the line the actual data is on, not the title declaring what the data is
    // -5 is genetic string, for this one it's gonna be same line and then we need to increment currentLine +2 so it doesn't get stuck on "Personality Traits" instead of "X personality" line after that
    // -4 is the held trinket. in the list it has name line, effect line, name line again. idk make that work
    let searchNums = [
        "Name", 0, "Birthday", -1, "Age", -1, "Wind", -1, "Pronouns", -1, "Aspect", -1, "Origin", -1, "ID", -1, 
        "Species", -1, "Size", -1, "Fur", -1, "Color", -1, "Pattern", -1, "White Marks", -1, "Eye Color", -1, 
        "Genetic String", -5, "Personality", -2, 
        "Bravery", -1, "Benevolence", -1,  "Energy", -1, "Extroversion", -1, "Dedication", -1, "Held Trinket", -4, -4, //name and stat effect
        "Day Job", -6, 
        "Hunter", -6, "Gatherer", -6, "Miner", -6, 
        "Fisher", -6, "Bug Catcher", -6, "Gardener", -6, 
        "Herbalist", -6, "Farmer", -6, "Flockherd", -6, 
        "Apothecary", -6, "Clothier", -6, "Scribe", -6, 
        "Artist", -6, "Blacksmith", -6, "Craftscat", -6, 
        "Builder", -6, "Mason", -6, "Baker", -6,
        "Adventuring Class", -6,
        "Fighter", -6, "Thief", -6, "Ranger", -6, "Medic", -6, "Scout", -6, "Bard", -6,
        "Strength", -7, "Agility", -7, "Health", -7, "Finesse", -7, "Cleverness", -7, "Perception", -7, "Luck", -7, 
        "The Mayor is currently providing the following effects to this cat:", -1, 
        "Friends", -8, -8, "Family", -8, -8, 
        "Biography", -1
    ]  
    for (let i = 2; i < searchNums.length; i = i+2) {
        lineNum = simpleLineNumberSearch(dataArray, searchNums[i], currentLine) ?? "NOT FOUND"
        // console.log(searchNums[i-2]+ ":")
        // console.log("Line #: " + searchNums[i-1])
        // console.log("Line Contents: \"" + dataArray[searchNums[i-1]]+"\"")
        // console.log()
        
        if (searchNums[i+1] == -1) {
            currentLine = lineNum-1 // just in case buffer -1
            searchNums[i+1] = lineNum+1  // because it's -1/line after, we add 1 to line
        }
        if (searchNums[i+1] == -2) {
            currentLine = lineNum-1 // just in case buffer -1
            searchNums[i+1] = lineNum  // because it's -2 it's the same line, no +1
        }
        if (i == 28) {
            currentLine = currentLine+5 // spacer to keep personality check on the actual personality, not "personality traits" 
            searchNums[i+3] = lineNum+2 // defines the gene sequence line
        }
        if (searchNums[i+1] == -4) {
            currentLine = lineNum-1  // just in case buffer -1
            searchNums[i+1] = lineNum+1 //trinket name
            searchNums[i+2] = lineNum+2 //trinket boost
            i = i+1
        }
        if (searchNums[i+1] == -6) {
            if (lineNum != "NOT FOUND") {
                currentLine = lineNum-1 // just in case buffer -1
                searchNums[i+1] = lineNum  // because it's -2 it's the same line, no +1
            }
            else {
                searchNums[i+1] = "NOT FOUND"
            }

            if (searchNums[i] == "Day Job" || searchNums[i] == "Adventuring Class") {
                currentLine = lineNum+1 // spacer so it doesn't repeat day job line
            }
        }
        if (searchNums[i+1] == -7) {
            currentLine = lineNum+9 // just in case buffer -1
            searchNums[i+1] = lineNum+2  // because it's -1/line after, we add 1 to line
        }
        if (searchNums[i+1] == -8) {
            if (searchNums[i] == "Friends") {
                if (dataArray[lineNum+1] == "n/a") {
                    currentLine = lineNum+1
                }
                else {
                    currentLine = lineNum-1 // just in case buffer -1
                    searchNums[i+1] = lineNum+1  // because it's -1/line after, we add 1 to line
                    searchNums[i+2] = simpleLineNumberSearch(dataArray, "Family", currentLine)-1 ?? "NOT FOUND"
                    searchNums[i+4] = searchNums[i+2]+2 ?? "NOT FOUND"
                    searchNums[i+5] = simpleLineNumberSearch(dataArray, "Biography", currentLine)-2 ?? "NOT FOUND"
                }
            }
        }
    }
    return searchNums
}

function parseName(dataArray, line) {
    let catName = dataArray[line].replace(" ", "")
    return catName
}

function parseBirthday(dataArray, line) {
    let catBirthday = dataArray[line]
    return catBirthday
}

function parseAge(dataArray, line) {
    let catAge = dataArray[line].split(" (")[0]
    return catAge
}

function parseWind(dataArray, line) {
    let catWind = dataArray[line]
    return catWind
}

// @ Gou, not sure how you wanted to mess with pronouns dictionary stuff? just gonna do regular stuff for now
function parsePronouns(dataArray, line) {
    let catPronouns = dataArray[line]
    let catPrimaryPronouns = catPronouns.split("/")[0]
    let catSecondaryPronouns = catPronouns.split("/")[1]
    return([catPrimaryPronouns, catSecondaryPronouns])
}

function parseAspect(dataArray, line) {
    let catAspect = dataArray[line]
    return catAspect
}

function parseOrigin(dataArray, line) {
    let catOrigin = dataArray[line]
    return catOrigin
}


function parseID(dataArray, line) {
    let catID = Number(dataArray[line].split("[cat=")[1].split("]")[0])
    return catID
}

function parseSpecies(dataArray, line) {
    let catSpecies = dataArray[line]
    return catSpecies
}

function parseSize(dataArray, line) {
    let catSize = dataArray[line]
    let catSizePounds = Number(catSize.split(" lbs. / ")[0])
    let catSizeKilos = Number(catSize.split(" lbs. / ")[1].split(" kg")[0])
    return([catSizePounds, catSizeKilos])
}

function parseFurLength(dataArray, line) {
    let catFurLength = dataArray[line]
    return catFurLength
}

function parseColor(dataArray, line) {
    let colorcheck = dataArray[line]
    let catColor = colorcheck
    let catColorType = colorcheck
    if (colorcheck != "-hidden-") {
        catColor = colorcheck.split(" ")[0]
        catColorType = colorcheck.split(" ")[1]
    }
    return([catColor, catColorType])
}

function parsePattern(dataArray, line) {
    let catPattern = dataArray[line]
    return catPattern
}

function parseWhiteMarks(dataArray, line) {
    let whitecheck = dataArray[line]
    let catWhiteMarks = ""
    let catWhiteLevel = ""
    let catWhiteType = ""
    if (whitecheck != "None") {
        catWhiteMarks = whitecheck.split(" / ")[0]
        catWhiteLevel = Number(whitecheck.split(" / ")[1][1])
        catWhiteType = whitecheck.split(" / ")[1][0]
    }
    else {
        catWhiteMarks = "None"
        catWhiteLevel = "-hidden-"
        catWhiteType = "-hidden-"
    }
    return([catWhiteMarks, catWhiteType, catWhiteLevel])
}

function parseEyeColor(dataArray, line) {
    let catEyeColor = dataArray[line]
    return catEyeColor
}

function parsePersonalityType(dataArray, line) {
    let catPersonalityType = dataArray[line].split(" Personality:")[0]
    return catPersonalityType
}

function parsePersonalityStats(dataArray, lines) {
    let persoLines = [lines[35], lines[37], lines[39], lines[41], lines[43]]
    let catPersonalityStats = []
    for (let i = 0; i < persoLines.length; i++) {
        catPersonalityStats[i] = Number(dataArray[persoLines[i]])
    }
    return catPersonalityStats
}

// LINE in this case should be the line after "Held Trinket:". It will refer to the lines after that too tho for what it boosts
function parseHeldTrinket(dataArray, line1, line2) {
    let catTrinketName = ""
    let catTrinketStat = ""
    let catTrinketStatMod
    if (dataArray[line1] != "None") {
        catTrinketName = dataArray[line1]
        catTrinketStat = dataArray[line2].split(" ")[0].replace("[", "")
        catTrinketStatMod = Number(dataArray[line2].split(" ")[1].replace("]", ""))
    }
    else {
        catTrinketName = "None"
        catTrinketStat = "None"
        catTrinketStatMod = "0"
    }
    return ([catTrinketName, catTrinketStat, catTrinketStatMod])
}

function parseDayJob(dataArray, line) {
    let catDayJob = dataArray[line]
    if (catDayJob.includes("Unassigned")) {
        catDayJob = "Unassigned"
    }
    else {
        catDayJob = catDayJob.split("Day Job: ")[1].split(" (")[0]
    }
    return catDayJob
}

function parseJobs(dataArray, lines) {
    let catJobLevel = []
    let catJobEXP = []
    let counter = 0
    for (let i = 50; i < 85; i = i+2) {
        if (lines[i] != "NOT FOUND") {
            catJobLevel[counter] = dataArray[lines[i]].split(" Level ")[1].split(" [")[0]
            catJobEXP[counter] = dataArray[lines[i]].split("[")[1].split(" EXP]")[0]
            if (catJobEXP[counter].includes("Maximum Level")) {
                catJobEXP[counter] = "Maximum Level"
            }
        } 
        counter++
    }
    console.log(catJobLevel)
    console.log(catJobEXP)
    return([catJobLevel, catJobEXP])
}

function parseAdvClass(dataArray, line) {
    let catAdventuringClass = dataArray[line]
    if (catAdventuringClass.includes("Unassigned")) {
        catAdventuringClass = "Unassigned"
    }
    else {
        catAdventuringClass = catAdventuringClass.split("Adventuring Class: ")[1].split(" (")[0]
    }
    return catAdventuringClass
}

function parseAdvClasses(dataArray, lines) {
    let catClassLevel = []
    let catClassEXP = []
    let counter = 0
    for (let i = 88; i < 99; i = i+2) {
        if (lines[i] != "NOT FOUND") {
            catClassLevel[counter] = dataArray[lines[i]].split(" Level ")[1].split(" [")[0]
            catClassEXP[counter] = dataArray[lines[i]].split("[")[1].split(" EXP]")[0]
            if (catClassEXP[counter].includes("Maximum Level")) {
                catClassEXP[counter] = "Maximum Level"
            }
        } 
        counter++
    }
    console.log(catClassLevel)
    console.log(catClassEXP)
    return([catClassLevel, catClassEXP])
}

function parseBaseStats(dataArray, lines) {
    let catBaseStats = []
    let counter = 0
    for (let i = 100; i < 113; i = i+2) {
        catBaseStats[counter] = Number(dataArray[lines[i]])
        counter++
    }
    return catBaseStats
}

function parseMayorBonus(dataArray, line) {
    console.log("Mayor Bonuses:")
    if (dataArray[line]) { 
        let catMayorBonuses = dataArray[line].split(", ")
        let statNamesDictionary = ["Strength", "Agility", "Health", "Finesse", "Cleverness", "Perception", "Luck", "Bravery", "Benevolence", "Energy", "Extroversion", "Dedication"]
        let catMayorBonusStatName = []
        let catMayorBonusStatMod = []
        for (let i = 0; i < catMayorBonuses.length; i++) {
            for (let j = 0; j < statNamesDictionary.length; j++) {
                if (catMayorBonuses[i].includes(statNamesDictionary[j])) {
                    catMayorBonusStatName[i] = statNamesDictionary[j]
                    if (j > 6) {
                        catMayorBonusStatMod[i] = Number(catMayorBonuses[i].split("& ")[1].split(" ")[0])
                    }
                    else { 
                        catMayorBonusStatMod[i] = Number(catMayorBonuses[i].split(" ")[0])
                    }
                }
            }
        }
        console.log(catMayorBonusStatName)
        console.log(catMayorBonusStatMod)
        return([catMayorBonusStatName, catMayorBonusStatMod])
    }
}

function modifyStats(basestats, basepersostats, trinketinfo, mayorbonusinfo) {
    let statNamesDictionary = ["Strength", "Agility", "Health", "Finesse", "Cleverness", "Perception", "Luck", "Bravery", "Benevolence", "Energy", "Extroversion", "Dedication"]
    console.log("Base Stats:")
    console.log(basestats)
    console.log(basepersostats)
    // trinket bonus modify
    if (!trinketinfo[0] == "None") {
        for (let i = 0; i < statNamesDictionary.length; i++) {
            if (trinketinfo[1] == statNamesDictionary[i]) {
                if (i < 7) {
                    basestats[i] -= trinketinfo[2]
                    break
                }
                else {
                    basepersostats[i-7] -= trinketinfo[2]
                    break
                }
            }
        }
    } 
    if (mayorbonusinfo != "None") {
        for (let j = 0; j < mayorbonusinfo[1].length; j++) {
            for (let k = 0; j < statNamesDictionary.length; k++) {
                if (mayorbonusinfo[0][j] == statNamesDictionary[k]) {
                    if (k < 7) {
                        basestats[k] -= mayorbonusinfo[1][j]
                        break
                    }
                    else {
                        basepersostats[k-7] -= mayorbonusinfo[1][j]
                        break
                    }
                }
            }
        }
    }
    console.log("New Stats:")
    console.log(basestats)
    console.log(basepersostats)
}

function parseFriends(dataArray, line) {

}

function parseFamily(dataArray, line) {

}

function parseWearing(dataArray, line) {
    
}