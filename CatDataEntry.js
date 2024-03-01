// KIBBYDIRECTOR/MAIN FUNCTION THAT CALLS ALL OF THESE WILL HAVE
// initialdataArray
// dataArray
// dataArrayCheckpointsList  - will use the findlinenumber whatever function to make an array of all lines. maybe 2 dimensional array? so it can be like. or could just. already account for that. and not be an idiot
//                                            catIDLine: [16, "same"] (same line or next line)
// then the search is reserved for main function, and all the mini functions are designated for dataArray formatting from the info on the designated line
// use the array to get the line and send that to functions

function kibbyDirector() {
    document.querySelector(".poopee").innerText = ""
    let textBoxEntry = document.querySelector(".testTextBox")
    let catPageInfoINITIAL = textBoxEntry.value.split("\n")
    let catVillageRole = checkForTravelingText(catPageInfoINITIAL) ?? ""          // checks for traveling text before deleting unneeded stuff
    displayInfo("Role: ", catVillageRole)
    console.log(catPageInfoINITIAL)
    let catPageInfoFull = ensmallenCatPageInfo(catPageInfoINITIAL)
    let catPageInfo = catPageInfoFull[0]
    console.log(catPageInfo)
    let biographyInfo = catPageInfoFull[1]
    console.log(biographyInfo)
    let checkpointArray = getDataCheckpoints(catPageInfo)
    console.log(checkpointArray)
    textBoxEntry.value = ""

    let catName = parseName(catPageInfo, checkpointArray[1])
    displayInfo("Name: ", catName)

    let catBirthday = parseBirthday(catPageInfo, checkpointArray[3])
    displayInfo("Birthday: ", catBirthday)

    let catAge = parseAge(catPageInfo, checkpointArray[5])
    displayInfo("Age: ", catAge)

    let catWind = parseWind(catPageInfo, checkpointArray[7])
    displayInfo("Wind: ", catWind)

    let catPronouns = parsePronouns(catPageInfo, checkpointArray[9])
    displayInfo("Pronouns: ", catPronouns, "1D")

    let catAspect = parseAspect(catPageInfo, checkpointArray[11])
    displayInfo("Aspect: ", catAspect)

    let catOrigin = parseOrigin(catPageInfo, checkpointArray[13])
    displayInfo("Origin: ", catOrigin)

    let catID = parseID(catPageInfo, checkpointArray[15])
    displayInfo("ID: ", catID)

    let catSpecies = parseSpecies(catPageInfo, checkpointArray[17])
    displayInfo("Species: ", catSpecies)

    let catSize = parseSize(catPageInfo, checkpointArray[19])
    displayInfo("Size: ", catSize, "1D")

    let catFurLength = parseFurLength(catPageInfo, checkpointArray[21])
    displayInfo("Fur Length: ", catFurLength)

    let catColor = parseColor(catPageInfo, checkpointArray[23], catWind)
    displayInfo("Color: ", catColor, "1D")

    let catPattern = parsePattern(catPageInfo, checkpointArray[25])
    displayInfo("Pattern: ", catPattern)

    let catWhiteMarks = parseWhiteMarks(catPageInfo, checkpointArray[27])
    displayInfo("White Marks: ", catWhiteMarks, "1D")

    let catEyeColor = parseEyeColor(catPageInfo, checkpointArray[29])
    displayInfo("Eye Color: ", catEyeColor)

    if (catAge != "Bean") {
        let catPersonalityType = parsePersonalityType(catPageInfo, checkpointArray[33])
        displayInfo("Personality Type: ", catPersonalityType)

        let catPersonalityStats = parsePersonalityStats(catPageInfo, checkpointArray)
        // not logged yet bc it is later

        let catHeldTrinketInfo = parseHeldTrinket(catPageInfo, checkpointArray[45], checkpointArray[46])
        displayInfo("Cat Held Trinket: ", catHeldTrinketInfo, "Trinket")

        let catDayJob = parseDayJob(catPageInfo, checkpointArray[48])
        displayInfo("Day Job: ", catDayJob)

        let catJobs = parseJobs(catPageInfo, checkpointArray)
        displayInfo("Jobs: ", catJobs, "Jobs")

        let catAdventuringClass = parseAdvClass(catPageInfo, checkpointArray[86])
        displayInfo("Adventuring Class: ", catAdventuringClass)

        let catAdventuringClasses = parseAdvClasses(catPageInfo, checkpointArray)
        displayInfo("Adventuring Classes: ", catAdventuringClasses, "Classes")

        let catStats = parseBaseStats(catPageInfo, checkpointArray)
        //not logged yet bc it is later

        let mayorBonuses = parseMayorBonus(catPageInfo, checkpointArray[116]) ?? "None"
        // log is in function

        let modifiedStats = modifyStats(catStats, catPersonalityStats, catHeldTrinketInfo, mayorBonuses)
        // log is in function
        catStats = modifiedStats[0]
        catPersonalityStats = modifiedStats[1]
        displayInfo("Stats: ", catStats, "Stats")
        displayInfo("Personality Stats", catPersonalityStats, "PersoStats")
    }
    let catFriends = parseFriendsFamily(catPageInfo, checkpointArray[118], checkpointArray[119]) ?? "None"
    displayInfo("Friends: ", catFriends, "FriendsFamily")

    let catFamily = parseFriendsFamily(catPageInfo, checkpointArray[121], checkpointArray[122]) ?? "None"
    displayInfo("Family: ", catFamily, "FriendsFamily")

    let catCurrentlyWearing = parseCurrentlyWearing(biographyInfo) 
    displayInfo("Currently Wearing: ", catCurrentlyWearing, "Wearing")

    console.log(catColor)
    console.log(catPattern)
    console.log(catWhiteMarks)

    let catGeneString = findKnownGenes(catWind, catFurLength, catColor[0], catColor[1], catPattern, catWhiteMarks[1], catWhiteMarks[2], catPageInfo, checkpointArray[31])
    displayInfo("Known Gene String: ", catGeneString, "GeneString")
}

function displayInfo(name, data, formatter) {
    console.log(name)
    console.log(data)
    let displayText = document.querySelector(".poopee").innerText
    if (formatter) {
        displayText += name + "\n"
        switch(formatter) {
            case "1D":
                for (let i=0; i<data.length; i++) {
                    displayText += " - " + data[i] + "\n"
                }
                document.querySelector(".poopee").innerText = displayText
                break
            case "Trinket":
                for (let i=0; i<data.length; i++) {
                    if (typeof data[i] === 'number') {
                        if ((data[i]) > 0) {
                            displayText += " - +" + data[i] + "\n"
                        }
                        else {
                            displayText += " - " + data[i] + "\n"
                        }
                    }
                    else {
                        displayText += " - " + data[i] + "\n"
                    }
                }
                document.querySelector(".poopee").innerText = displayText
                break
            case "Jobs":
                console.log(data)
                let levels = data[0]
                let maxEXPdisplayJobs = ["/140 EXP", "/280 EXP", "/560 EXP", "/1120 EXP"]
                let exp = data[1]
                console.log(levels)
                console.log(exp)
                let jobsList = ["Hunter", "Gatherer", "Miner", "Fisher", "Bug Catcher", "Gardener", "Herbalist", "Farmer", "Flockherd", "Apothecary", "Clothier", "Scribe", "Artist", "Blacksmith", "Craftscat", "Builder", "Mason", "Baker",]
                for (let i=0; i<jobsList.length; i++) {
                    if (levels[i] == 0) {
                        displayText += "- " + jobsList[i] + " ---\n"
                    }
                    else {
                        let expDisplay = exp[i]
                        if (levels[i] < 5) {
                            expDisplay = expDisplay+maxEXPdisplayJobs[levels[i]-1]
                        }
                        displayText += "- " + jobsList[i] + " Level: " + levels[i] + "   EXP: " + expDisplay + "\n"
                    } 
                }
                document.querySelector(".poopee").innerText = displayText
                break

            case "Classes":
                let levels2 = data[0]
                let maxEXPdisplayClasses = ["/50 EXP", "/150 EXP", "/300 EXP"]
                let exp2 = data[1]
                console.log(levels2)
                console.log(exp2)
                let classesList = ["Fighter", "Thief", "Guardian", "Ranger", "Medic", "Scout", "Bard"]
                for (let i=0; i<classesList.length; i++) {
                    if (levels2[i] == 0) {
                        displayText += "- " + classesList[i] + " ---\n"
                    }
                    else {
                        let expDisplay = exp2[i]
                        if (levels2[i] < 4) {
                            expDisplay = expDisplay+maxEXPdisplayClasses[levels2[i]-1]
                        }
                        displayText += "- " + classesList[i] + " Level: " + levels2[i] + "   EXP: " + expDisplay + "\n"
                    }
                    document.querySelector(".poopee").innerText = displayText
                }
                break

            case "Stats":
                let statsList = ["Strength", "Agility", "Health", "Finesse", "Cleverness", "Perception", "Luck"]
                for (let i=0; i<statsList.length; i++) {
                    displayText += "- " + statsList[i] + ": " + data[i] + "\n"
                }
                document.querySelector(".poopee").innerText = displayText
                break

            case "PersoStats":
                let persoStatsList = ["Bravery", "Benevolence",  "Energy", "Extroversion", "Dedication"]
                for (let i=0; i<persoStatsList.length; i++) {
                    displayText += "- " + persoStatsList[i] + ": " + data[i] + "\n"
                }
                document.querySelector(".poopee").innerText = displayText
                break

            case "GeneString": 
                let geneStringText = ""
                let sectionLengthsList = [1, 2, 2, 5, 4, 4, 2, 2]
                let counter = 0
                for (let i = 0; i < sectionLengthsList.length; i++) {
                    geneStringText += "["
                    for (let j = 0; j < sectionLengthsList[i]; j++) {
                        geneStringText += data[counter]
                        counter++
                    }
                    geneStringText += "] "
                }
                displayText += geneStringText
                document.querySelector(".poopee").innerText = displayText
                break

            case "FriendsFamily": 
                if (Array.isArray(data)) {
                    let friendsFamilyName = data[0]
                    let friendsFamilyRelationship = data[1]
                    for (let i = 0; i < friendsFamilyName.length; i++) {
                        displayText += " - " + friendsFamilyName[i] + " - " + friendsFamilyRelationship[i] + "\n"
                    }
                }
                else {
                    displayText += " - " + data + "\n"
                }
                document.querySelector(".poopee").innerText = displayText
                break
            case "Wearing": 
                if (Array.isArray(data)) {
                    for (let i = 0; i < data.length; i++) {
                        displayText += " - " + data[i] + "\n"
                    }
                }
                document.querySelector(".poopee").innerText = displayText
                break
        }
    }
    else {
        displayText += name + data + "\n"
        document.querySelector(".poopee").innerText = displayText
    }
    

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
    let bioLine = -1
    if (catPageInfoINITIAL[1].includes("[") == false) {
        let catNameLineStart = -1
        let correctLineFound = false
        for (let i = 0; i < catPageInfoINITIAL.length && correctLineFound == false; i++) {
            if (catPageInfoINITIAL[i].includes("[")) {
                if (catPageInfoINITIAL[i].includes("[Custom]") == false) {
                    catNameLineStart = i-1
                    correctLineFound = true
                    break
                }           
            }
        }
        for (let i = 0; i < catPageInfoINITIAL.length-catNameLineStart; i++) {
            catPageInfo[i] = catPageInfoINITIAL[i+catNameLineStart]
            if (catPageInfo[i].includes("Biography")) {
                bioLine = i
            }
        }
    }
    else {
        catPageInfo = catPageInfoINITIAL
    }
    let lastLine = -1
    for (let i = 50; i < catPageInfo.length; i++) {
        if (catPageInfo[i].includes("Users Online")) {
            lastLine = i+1
            break
        }
    }
    let initialLength = catPageInfo.length
    console.log("lastline = " + lastLine)
    if (lastLine > 0) {
        console.log("lastline > 0")
        for (let i = 0; i < initialLength-lastLine; i++) {
            catPageInfo.pop()
        }
    }
    // trim bio into its own array
    let biographyArray = catPageInfo.splice(bioLine, catPageInfo.length)
    console.log(catPageInfo)
    console.log(biographyArray)
    return [catPageInfo, biographyArray]
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
        "Fighter", -6, "Thief", -6, "Guardian", -6, "Ranger", -6, "Medic", -6, "Scout", -6, "Bard", -6,
        "Strength", -7, "Agility", -7, "Health", -7, "Finesse", -7, "Cleverness", -7, "Perception", -7, "Luck", -7, 
        "The Mayor is currently providing the following effects to this cat:", -1, 
        "Friends", -8, -8, "Family", -8, -8, "family of beans", -2
    ]  
    for (let i = 2; i < searchNums.length; i = i+2) {
        lineNum = simpleLineNumberSearch(dataArray, searchNums[i], currentLine) ?? "NOT FOUND"   
        if (i == 28) {
            currentLine = currentLine+5 // spacer to keep personality check on the actual personality, not "personality traits" 
            searchNums[i+3] = lineNum+2 // defines the gene sequence line
        }
        switch(searchNums[i+1]) {
            case -1: 
                currentLine = lineNum-1 // just in case buffer -1
                searchNums[i+1] = lineNum+1  // because it's -1/line after, we add 1 to line
                break
            case -2: 
                currentLine = lineNum-1 // just in case buffer -1
                searchNums[i+1] = lineNum  // because it's -2 it's the same line, no +1
                break
            case -4: 
                currentLine = lineNum-1  // just in case buffer -1
                searchNums[i+1] = lineNum+1 //trinket name
                searchNums[i+2] = lineNum+2 //trinket boost
                i = i+1
                break
            case -6: 
                if (lineNum != "NOT FOUND") {
                    searchNums[i+1] = lineNum  // because it's -2 it's the same line, no +1
                }
                else {
                    searchNums[i+1] = "NOT FOUND"
                }
                if (searchNums[i] == "Day Job" || searchNums[i] == "Adventuring Class") {
                    if (lineNum != "NOT FOUND") {
                        currentLine = lineNum+1 // spacer so it doesn't repeat day job line
                    }
                }
                break
            case -7: 
                currentLine = lineNum+9 // just in case buffer -1
                searchNums[i+1] = lineNum+2  // because it's -1/line after, we add 1 to line
                break
            case -8: 
                if (searchNums[i] == "Friends") {
                    searchNums[i+1] = lineNum+1
                    searchNums[i+2] = simpleLineNumberSearch(dataArray, "Family", currentLine)-1 ?? "NOT FOUND"
                    i += 1
                }
                else {
                    searchNums[i+1] = lineNum+1
                    let beancheck = simpleLineNumberSearch(dataArray, "recently had a family of beans and is on cooldown for", currentLine)
                    //beancheck is to keep it from including "x had a family of beans" as a family member
                    if (beancheck) {
                        searchNums[i+2] = beancheck-1
                    }
                    else {
                        searchNums[i+2] = dataArray.length
                        if (dataArray[searchNums[i+2]] == undefined) {
                            searchNums[i+2] = dataArray.length - 2
                        }
                    }
                    i += 1
                }

        }
        //console.log(searchNums[i])
        //console.log("Current Line: " + currentLine)
        //console.log("Line Num " + lineNum)
        //console.log("\n")
    }
    return searchNums
}

function parseName(dataArray, line) {
    let catName = dataArray[line].trim()
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

// Some extra variables in here I added in case I wanted to do easier gene testing variables, altho I think I might not use them so??? 
function parseColor(dataArray, line, wind) {
    let colorcheck = dataArray[line]
    let catColor = colorcheck
    let catColorType = colorcheck
    let catColorNorth, catColorSouth
    if (colorcheck != "-hidden-") {
        catColor = colorcheck.split(" ")[0]
        catColorType = colorcheck.split(" ")[1]
    }
    else {
        catColorNorth = catColorSouth = catColorType = "-hidden-"
    }
    if (wind == "North") {
        catColorNorth = catColor
        catColorSouth = "-hidden-"
    }
    if (wind == "South") {
        catColorSouth = catColor
        catColorNorth = "-hidden-"
    }
    if (wind == "Trade") {
        catColorNorth = catColor.split("-")[0]
        catColorSouth = catColor.split("-")[1]
    }
    if (wind == "Null") {
        catColorNorth = catColorSouth = "-hidden-"
    }
    //decide if I wanna return the color north/south too or not, for now no just so the display of the data is easier
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
        if (catWhiteMarks != "Albino") {
            catWhiteLevel = Number(whitecheck.split(" / ")[1][1])
        }
        else {
            catWhiteLevel = 10
        }
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
            catJobLevel[counter] = Number(dataArray[lines[i]].split(" Level ")[1].split(" [")[0]) 
            catJobEXP[counter] = dataArray[lines[i]].split("[")[1].split(" EXP]")[0]
            if (catJobEXP[counter].includes("Maximum Level")) {
                catJobEXP[counter] = "Maximum Level"
            }
            else {
                catJobEXP[counter] = Number(catJobEXP[counter].split("/")[0])
            }
        } 
        else {
            catJobLevel[counter] = 0
            catJobEXP[counter] = 0
        }
        counter++
    }
    console.log("Job Levels: ")
    console.log(catJobLevel)
    console.log("Job Experiences: ")
    console.log(catJobEXP)
    return([catJobLevel, catJobEXP])
}

function parseAdvClass(dataArray, line) {
    console.log(dataArray[line])
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
    for (let i = 88; i < 101; i = i+2) {
        if (lines[i] != "NOT FOUND") {
            catClassLevel[counter] = Number(dataArray[lines[i]].split(" Level ")[1].split(" [")[0])
            catClassEXP[counter] = dataArray[lines[i]].split("[")[1].split(" EXP]")[0]
            if (catClassEXP[counter].includes("Maximum Level")) {
                catClassEXP[counter] = "Maximum Level"
            }
            else {
                catClassEXP[counter] = Number(catClassEXP[counter].split("/")[0])
            }
        }
        else {
            catClassLevel[counter] = 0
            catClassEXP[counter] = 0
        } 
        counter++
    }
    console.log("Class Levels: ")
    console.log(catClassLevel)
    console.log("Class Experiences: ")
    console.log(catClassEXP)
    return([catClassLevel, catClassEXP])
}

function parseBaseStats(dataArray, lines) {
    let catBaseStats = []
    let counter = 0
    for (let i = 102; i < 115; i = i+2) {
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
    if (trinketinfo[0] != "None") {
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
    return([basestats, basepersostats])
}

//NEED TO DO FRIENDS/FAMILY
function parseFriendsFamily(dataArray, linestart, lineend) {
    let friendName = []
    let friendRelationship = []
    if (dataArray[linestart] != "NOT FOUND") {
        if (linestart != lineend) {
            for (let i = 0; i < lineend-linestart+1; i++) {
                friendName[i] = dataArray[linestart+i].split(" - ")[0]
                friendRelationship[i] = dataArray[linestart+i].split(" - ")[1]
            }
            return([friendName, friendRelationship])
        }
    }
}

// the data for this is in the bio array and not the regular cat info array
function parseCurrentlyWearing(biographyArray) {
    let line = simpleLineNumberSearch(biographyArray, "Currently Wearing: ", 0)
    if (line) {
        let wearing = biographyArray[line].split("Currently Wearing: ")[1]
        let wearingList = wearing.split(", ")
        return wearingList
    }
    else {
        return "None"
    }
}


//wind, fur, color, colortype, pattern, whitetype, whitelevel
function findKnownGenes(wind, fur, color, colortype, pattern, whitetype, whitelevel, dataArray, line) {
    let geneString = ["C",   "?","?",   "?","?",    "?","?","?","?","?",    "?","?","?","?",    "?","?","?","?",    "?","?",    "?","?"]
    if (dataArray[line].includes("[ Unknown Genetic String ]")) {
        console.log(geneString)
        sectionWind(geneString, wind)
        sectionFur(geneString, fur)
        sectionColor(geneString, color, colortype, wind)
        sectionPattern(geneString, pattern)
        sectionWhite(geneString, whitetype, whitelevel)
        console.log(geneString)
        return geneString
    }
    else {
        if (dataArray[line].includes("[ C ]")) {
            let geneStringString = dataArray[line].replaceAll("[", "")
            geneStringString = geneStringString.replaceAll("]", "")
            geneStringString = geneStringString.replaceAll(" ", "")
            geneString = geneStringString.split("")
            return geneString
        }
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
    let densityList = ["4", "3", "2", "1", "4", "3", "2", "1", "4", "3", "2", "1", "4", "3", "2", "1"]
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
    }
}

//YN7C
//14 15 16 17
function sectionWhite(geneString, whitetype, whitelevel) {
    if (whitelevel != "-hidden-") {
        geneString[14] = "Y"
        geneString[16] = whitelevel
        geneString[17] = whitetype
    }
}