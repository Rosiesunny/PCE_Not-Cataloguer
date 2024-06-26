// Gou's version of CatDataEntry.js for Backend work and integration

function addCat() {
    // Init output display
    document.querySelector(".output").innerText = "";

    // Get input and parse
    let textBoxEntry = document.querySelector(".input")

    // catPageInfoINITIAL is an array of the lines of the input
    let catPageInfoINITIAL = textBoxEntry.value.split("\n")

    // Get travelling vs. active
    let catVillageRole = checkForTravelingText(catPageInfoINITIAL) ?? ""          // checks for traveling text before deleting unneeded stuff

    // Shrinks page info
    let catPageInfo = ensmallenCatPageInfo(catPageInfoINITIAL)
    let checkpointArray = getDataCheckpoints(catPageInfo)
    textBoxEntry.value = ""

    // Parses catPageInfo
    let catName = parseName(catPageInfo, checkpointArray[1])
    let catBirthday = parseBirthday(catPageInfo, checkpointArray[3])
    let catAge = parseAge(catPageInfo, checkpointArray[5])
    let catWind = parseWind(catPageInfo, checkpointArray[7])
    let catPronouns = parsePronouns(catPageInfo, checkpointArray[9])
    let catAspect = parseAspect(catPageInfo, checkpointArray[11])
    let catOrigin = parseOrigin(catPageInfo, checkpointArray[13])
    let catID = parseID(catPageInfo, checkpointArray[15])
    let catSpecies = parseSpecies(catPageInfo, checkpointArray[17])
    let catSize = parseSize(catPageInfo, checkpointArray[19])
    let catFurLength = parseFurLength(catPageInfo, checkpointArray[21])
    let catColor = parseColor(catPageInfo, checkpointArray[23], catWind)
    let catPattern = parsePattern(catPageInfo, checkpointArray[25])
    let catWhiteMarks = parseWhiteMarks(catPageInfo, checkpointArray[27])
    let catEyeColor = parseEyeColor(catPageInfo, checkpointArray[29])
    let catPersonalityType = parsePersonalityType(catPageInfo, checkpointArray[33])
    let catPersonalityStats = parsePersonalityStats(catPageInfo, checkpointArray)
    let catHeldTrinketInfo = parseHeldTrinket(catPageInfo, checkpointArray[45], checkpointArray[46])
    let catDayJob = parseDayJob(catPageInfo, checkpointArray[48])
    let catJobs = parseJobs(catPageInfo, checkpointArray)
    let catAdventuringClass = parseAdvClass(catPageInfo, checkpointArray[86])
    let catAdventuringClasses = parseAdvClasses(catPageInfo, checkpointArray)
    let catStats = parseBaseStats(catPageInfo, checkpointArray)
    let mayorBonuses = parseMayorBonus(catPageInfo, checkpointArray[116]) ?? "None"
    let modifiedStats = modifyStats(catStats, catPersonalityStats, catHeldTrinketInfo, mayorBonuses)

    catStats = modifiedStats[0]
    catPersonalityStats = modifiedStats[1]
    let catGeneString = findKnownGenes(catWind, catFurLength, catColor[0], catColor[1], catPattern, catWhiteMarks[1], catWhiteMarks[2])

    // Add Cat to Village
    village.cats[catID] = {};
    let thisCat = village.cats[catID];

    thisCat.id = catID;
    thisCat.name = catName;
    thisCat.travelling = !(catVillageRole == "Active");

    let parseBday = catBirthday.split(" ");
    parseBday[1] = parseBday[1].split(",")[0];
    let seasons = ["Spring", "Summer", "Autumn", "Winter"];
    var i;
    for (i = 1; i < seasons.length+1; i++) {
        if(parseBday[0] == seasons[i-1]) {
            break;
        }
    }
    thisCat.birthday = {year: Number(parseBday[3]), season: i, day: Number(parseBday[1])};
    thisCat.age = catAge;    
    
    thisCat.pronouns = {primary: catPronouns[0], secondary: catPronouns[1]};
    
    thisCat.wind = catWind;
    thisCat.aspect = catAspect;
    thisCat.origin = catOrigin;
    thisCat.species = catSpecies;
    thisCat.size = catSize;

    thisCat.furLength = catFurLength;
    thisCat.furColor = catColor;
    thisCat.pattern = catPattern;
    thisCat.white = {
        markings: catWhiteMarks[0],
        type: catWhiteMarks[1],
        level: catWhiteMarks[2]
    };
    thisCat.eyeColor = catEyeColor;

    thisCat.personality = {
        type: catPersonalityType,
        Bravery: catPersonalityStats[0],
        Benevolence: catPersonalityStats[1],
        Energy: catPersonalityStats[2],
        Extroversion: catPersonalityStats[3],
        Dedication: catPersonalityStats[4]
    };

    thisCat.trinket = {
        name: catHeldTrinketInfo[0],
        stat: catHeldTrinketInfo[1],
        mod: catHeldTrinketInfo[2]
    };

    thisCat.job = catDayJob;
    thisCat.jobs = {
        Hunter: {level: catJobs[0][0], exp: catJobs[1][0]},
        Gatherer: {level: catJobs[0][1], exp: catJobs[1][1]},
        Miner: {level: catJobs[0][2], exp: catJobs[1][2]},
        Fisher: {level: catJobs[0][3], exp: catJobs[1][3]},
        Bugcatcher: {level: catJobs[0][4], exp: catJobs[1][4]},
        Gardener: {level: catJobs[0][5], exp: catJobs[1][5]},
        Herbalist: {level: catJobs[0][6], exp: catJobs[1][6]},
        Farmer: {level: catJobs[0][7], exp: catJobs[1][7]},
        Flockherd: {level: catJobs[0][8], exp: catJobs[1][8]},
        Apothecary: {level: catJobs[0][9], exp: catJobs[1][9]},
        Clothier: {level: catJobs[0][10], exp: catJobs[1][10]},
        Scribe: {level: catJobs[0][11], exp: catJobs[1][11]},
        Artist: {level: catJobs[0][12], exp: catJobs[1][12]},
        Blacksmith: {level: catJobs[0][13], exp: catJobs[1][13]},
        Craftscat: {level: catJobs[0][14], exp: catJobs[1][14]},
        Builder: {level: catJobs[0][15], exp: catJobs[1][15]},
        Mason: {level: catJobs[0][16], exp: catJobs[1][16]},
        Baker: {level: catJobs[0][17], exp: catJobs[1][17]}
    };

    thisCat.class = catAdventuringClass;
    thisCat.classes = {
        Fighter: {level: catAdventuringClasses[0][0], exp: catAdventuringClasses[1][0]},
        Thief: {level: catAdventuringClasses[0][1], exp: catAdventuringClasses[1][1]},
        Guardian: {level: catAdventuringClasses[0][2], exp: catAdventuringClasses[1][2]},
        Ranger: {level: catAdventuringClasses[0][3], exp: catAdventuringClasses[1][3]},
        Medic: {level: catAdventuringClasses[0][4], exp: catAdventuringClasses[1][4]},
        Scout: {level: catAdventuringClasses[0][5], exp: catAdventuringClasses[1][5]},
        Bard: {level: catAdventuringClasses[0][6], exp: catAdventuringClasses[1][6]}
    };

    thisCat.stats = {
        Strength: catStats[0],
        Agility: catStats[1],
        Health: catStats[2],
        Finesse: catStats[3],
        Cleverness: catStats[4],
        Perception: catStats[5],
        Luck: catStats[6]
    };

    // TODO: Relationships

    // TODO: Clothing

    thisCat.genes = catGeneString;
    thisCat.lastUpdated = Date();

    console.log(thisCat);
    
    // Display
    displayInfo("Role: ", catVillageRole)
    displayInfo("Name: ", catName)
    displayInfo("Birthday: ", catBirthday)
    displayInfo("Age: ", catAge)
    displayInfo("Wind: ", catWind)
    displayInfo("Pronouns: ", catPronouns, "1D")
    displayInfo("Aspect: ", catAspect)
    displayInfo("Origin: ", catOrigin)
    displayInfo("ID: ", catID)
    displayInfo("Species: ", catSpecies)
    displayInfo("Size: ", catSize, "1D")
    displayInfo("Fur Length: ", catFurLength)
    displayInfo("Color: ", catColor, "1D")
    displayInfo("Pattern: ", catPattern)
    displayInfo("White Marks: ", catWhiteMarks, "1D")
    displayInfo("Eye Color: ", catEyeColor)
    displayInfo("Personality Type: ", catPersonalityType)
    displayInfo("Cat Held Trinket: ", catHeldTrinketInfo, "Trinket")
    displayInfo("Day Job: ", catDayJob)
    displayInfo("Jobs: ", catJobs, "Jobs")
    displayInfo("Adventuring Class: ", catAdventuringClass)
    displayInfo("Adventuring Classes: ", catAdventuringClasses, "Classes")
    displayInfo("Stats: ", catStats, "Stats")
    displayInfo("Personality Stats", catPersonalityStats, "PersoStats")
    displayInfo("Known Gene String: ", catGeneString, "GeneString")
}

function displayInfo(name, data, formatter) {
    // console.log(name)
    // console.log(data)
    if (formatter) {
        switch(formatter) {
            case "1D":
                let displayText = document.querySelector(".output").innerText
                displayText += name + "\n"
                for (let i=0; i<data.length; i++) {
                    displayText += " - " + data[i] + "\n"
                }
                document.querySelector(".output").innerText = displayText
                break
            case "Trinket":
                let displayText7 = document.querySelector(".output").innerText
                displayText7 += name + "\n"
                for (let i=0; i<data.length; i++) {
                    if (typeof data[i] === 'number') {
                        if ((data[i]) > 0) {
                            displayText7 += " - +" + data[i] + "\n"
                        }
                        else {
                            displayText7 += " - " + data[i] + "\n"
                        }
                    }
                    else {
                        displayText7 += " - " + data[i] + "\n"
                    }
                }
                document.querySelector(".output").innerText = displayText7
                break
            case "Jobs":
                // console.log(data)
                let levels = data[0]
                let exp = data[1]
                // console.log(levels)
                // console.log(exp)
                let displayText2 = document.querySelector(".output").innerText
                displayText2 += name + "\n"
                let jobsList = ["Hunter", "Gatherer", "Miner", "Fisher", "Bug Catcher", "Gardener", "Herbalist", "Farmer", "Flockherd", "Apothecary", "Clothier", "Scribe", "Artist", "Blacksmith", "Craftscat", "Builder", "Mason", "Baker",]
                for (let i=0; i<jobsList.length; i++) {
                    if (levels[i] == 0) {
                        displayText2 += "- " + jobsList[i] + " ---\n"
                    }
                    else {
                        displayText2 += "- " + jobsList[i] + " Level: " + levels[i] + "   EXP: " + exp[i] + "\n"
                    } 
                }
                document.querySelector(".output").innerText = displayText2
                break

            case "Classes":
                let levels2 = data[0]
                let exp2 = data[1]
                // console.log(levels2)
                // console.log(exp2)
                let displayText3 = document.querySelector(".output").innerText
                displayText3 += name + "\n"
                let classesList = ["Fighter", "Thief", "Guardian", "Ranger", "Medic", "Scout", "Bard"]
                for (let i=0; i<classesList.length; i++) {
                    if (levels2[i] == 0) {
                        displayText3 += "- " + classesList[i] + " ---\n"
                    }
                    else {
                        displayText3 += "- " + classesList[i] + " Level: " + levels2[i] + "   EXP: " + exp2[i] + "\n"
                    }
                    document.querySelector(".output").innerText = displayText3
                }
                break

            case "Stats":
                let displayText4 = document.querySelector(".output").innerText
                displayText4 += name + "\n"
                let statsList = ["Strength", "Agility", "Health", "Finesse", "Cleverness", "Perception", "Luck"]
                for (let i=0; i<statsList.length; i++) {
                    displayText4 += "- " + statsList[i] + ": " + data[i] + "\n"
                }
                document.querySelector(".output").innerText = displayText4
                break

            case "PersoStats":
                let displayText5 = document.querySelector(".output").innerText
                displayText5 += name + "\n"
                let persoStatsList = ["Bravery", "Benevolence",  "Energy", "Extroversion", "Dedication"]
                for (let i=0; i<persoStatsList.length; i++) {
                    displayText5 += "- " + persoStatsList[i] + ": " + data[i] + "\n"
                }
                document.querySelector(".output").innerText = displayText5
                break

            case "GeneString": 
                let displayText6 = document.querySelector(".output").innerText
                displayText6 += name + "\n"
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
                displayText6 += geneStringText
                document.querySelector(".output").innerText = displayText6
                break
        }
    }
    else {
        let displayText = document.querySelector(".output").innerText
        displayText += name + data + "\n"
        document.querySelector(".output").innerText = displayText
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
    // console.log(initialLine)
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
    // console.log("Job Levels: ")
    // console.log(catJobLevel)
    // console.log("Job Experiences: ")
    // console.log(catJobEXP)
    return([catJobLevel, catJobEXP])
}

function parseAdvClass(dataArray, line) {
    // console.log(dataArray[line])
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
    // console.log("Class Levels: ")
    // console.log(catClassLevel)
    // console.log("Class Experiences: ")
    // console.log(catClassEXP)
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
    // console.log("Mayor Bonuses:")
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
        // console.log(catMayorBonusStatName)
        // console.log(catMayorBonusStatMod)
        return([catMayorBonusStatName, catMayorBonusStatMod])
    }
}

function modifyStats(basestats, basepersostats, trinketinfo, mayorbonusinfo) {
    let statNamesDictionary = ["Strength", "Agility", "Health", "Finesse", "Cleverness", "Perception", "Luck", "Bravery", "Benevolence", "Energy", "Extroversion", "Dedication"]
    // console.log("Base Stats:")
    // console.log(basestats)
    // console.log(basepersostats)
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
    // console.log("New Stats:")
    // console.log(basestats)
    // console.log(basepersostats)
    return([basestats, basepersostats])
}

//NEED TO DO FRIENDS/FAMILY

function parseFriends(dataArray, line) {

}

function parseFamily(dataArray, line) {

}

function parseWearing(dataArray, line) {
    
}


//wind, fur, color, colortype, pattern, whitetype, whitelevel
function findKnownGenes(wind, fur, color, colortype, pattern, whitetype, whitelevel) {
    let geneString = ["C",   "?","?",   "?","?",    "?","?","?","?","?",    "?","?","?","?",    "?","?","?","?",    "?","?",    "?","?"]
    // console.log(geneString)
    sectionWind(geneString, wind)
    sectionFur(geneString, fur)
    sectionColor(geneString, color, colortype, wind)
    sectionPattern(geneString, pattern)
    sectionWhite(geneString, whitetype, whitelevel)
    // console.log(geneString)
    return geneString
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