// KIBBYDIRECTOR/MAIN FUNCTION THAT CALLS ALL OF THESE WILL HAVE
// initialdataArray
// dataArray
// dataArrayCheckpointsList  - will use the findlinenumber whatever function to make an array of all lines. maybe 2 dimensional array? so it can be like. or could just. already account for that. and not be an idiot
//                                            catIDLine: [16, "same"] (same line or next line)
// then the search is reserved for main function, and all the mini functions are designated for dataArray formatting from the info on the designated line
// use the array to get the line and send that to functions

function addCat() {
    // Init output display
    document.querySelector(".display").innerText = "";

    // Get input and parse
    let textBoxEntry = document.querySelector(".input");

    // catPageInfoINITIAL is an array of the lines of the input
    let catPageInfoINITIAL = textBoxEntry.value.split("\n");

    // Get travelling vs. active before we chop off the rest of the unneeded text
    let catVillageRole = checkForTravelingText(catPageInfoINITIAL) ?? "";
    displayInfo("Role: ", catVillageRole);

    // DEBUG: console.log(catPageInfoINITIAL)
    // Crops page info to the section we're concerned with
    let catPageInfoFull = ensmallenCatPageInfo(catPageInfoINITIAL);

    // Checks input validity - exits if invalid input
    if (catPageInfoFull == "no name found") {
        alert("The text you input was invalid! Make sure you're copying a full cat's page. As a note: expected beans can't be entered until they're born");
        textBoxEntry.value = "";
        document.querySelector(".output").innerText = "";
        return;
    }

    // Grab sections
    let catPageInfo = catPageInfoFull[0];
    let familyFriendsInfo = catPageInfoFull[1];
    let biographyInfo = catPageInfoFull[2];
    let checkpointArray = getDataCheckpoints(catPageInfo);

    // DEBUG: console.log(catPageInfo)
    // DEBUG: console.log(familyFriendsInfo)
    // DEBUG: console.log(biographyInfo)
    // DEBUG: console.log(checkpointArray)

    // Clear textbox
    textBoxEntry.value = "";

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

    // Initialize cat in village
    village.cats[catID] = {};
    let thisCat = village.cats[catID];

    // Set basic info
    thisCat.id = catID;
    thisCat.name = catName;
    thisCat.travelling = !(catVillageRole == "Active");

    // Set birthday as numerical values year, season (1-4, spring-winter), and day
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
    
    // These will index into pronounsDict
    thisCat.pronouns = {primary: catPronouns[0], secondary: catPronouns[1]};
    

    thisCat.wind = catWind;
    thisCat.aspect = catAspect;
    thisCat.origin = catOrigin;
    thisCat.species = catSpecies;
    thisCat.size = catSize;
    thisCat.furLength = catFurLength;
    thisCat.furColor = catColor;
    thisCat.pattern = catPattern;

    // will get white info with cat.white.type or cat.white.level
    thisCat.white = {
        markings: catWhiteMarks[0],
        type: catWhiteMarks[1],
        level: catWhiteMarks[2]
    };

    thisCat.eyeColor = catEyeColor;

    if (catAge != "Bean" && catVillageRole != "Citied") {
        let catPersonalityType = parsePersonalityType(catPageInfo, checkpointArray[33])
        displayInfo("Personality Type: ", catPersonalityType)

        let catPersonalityStats = parsePersonalityStats(catPageInfo, checkpointArray)
        // Logged later

        let catHeldTrinketInfo = parseHeldTrinket(catPageInfo, checkpointArray[45], checkpointArray[46])
        displayInfo("Cat Held Trinket: ", catHeldTrinketInfo, "Trinket")

        thisCat.trinket = {
            name: catHeldTrinketInfo[0],
            stat: catHeldTrinketInfo[1],
            mod: catHeldTrinketInfo[2]
        };

        let catDayJob = parseDayJob(catPageInfo, checkpointArray[48])
        displayInfo("Day Job: ", catDayJob)

        let catJobs = parseJobs(catPageInfo, checkpointArray)
        displayInfo("Jobs: ", catJobs, "Jobs")

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

        let catAdventuringClass = parseAdvClass(catPageInfo, checkpointArray[86])
        displayInfo("Adventuring Class: ", catAdventuringClass)

        let catAdventuringClasses = parseAdvClasses(catPageInfo, checkpointArray)
        displayInfo("Adventuring Classes: ", catAdventuringClasses, "Classes")

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

        let catStats = parseBaseStats(catPageInfo, checkpointArray)
        // Logged later

        let mayorBonuses = parseMayorBonus(catPageInfo, checkpointArray[116]) ?? "None"
        // Logged in function

        let modifiedStats = modifyStats(catStats, catPersonalityStats, catHeldTrinketInfo, mayorBonuses)
        // Logged in function

        catStats = modifiedStats[0]
        catPersonalityStats = modifiedStats[1]

        // get a cat's personality with cat.personality.type, and a stat with cat.personality.stat or cat.personality['stat']
        thisCat.personality = {
            type: catPersonalityType,
            Bravery: catPersonalityStats[0],
            Benevolence: catPersonalityStats[1],
            Energy: catPersonalityStats[2],
            Extroversion: catPersonalityStats[3],
            Dedication: catPersonalityStats[4]
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
        
        displayInfo("Stats: ", catStats, "Stats")
        displayInfo("Personality Stats", catPersonalityStats, "PersoStats")
        
    } else {
        thisCat.job = "Unassigned";
        thisCat.jobs = {
            Hunter: {level: 0, exp: 0},
            Gatherer: {level: 0, exp: 0},
            Miner: {level: 0, exp: 0},
            Fisher: {level: 0, exp: 0},
            Bugcatcher: {level: 0, exp: 0},
            Gardener: {level: 0, exp: 0},
            Herbalist: {level: 0, exp: 0},
            Farmer: {level: 0, exp: 0},
            Flockherd: {level: 0, exp: 0},
            Apothecary: {level: 0, exp: 0},
            Clothier: {level: 0, exp: 0},
            Scribe: {level: 0, exp: 0},
            Artist: {level: 0, exp: 0},
            Blacksmith: {level: 0, exp: 0},
            Craftscat: {level: 0, exp: 0},
            Builder: {level: 0, exp: 0},
            Mason: {level: 0, exp: 0},
            Baker: {level: 0, exp: 0}
        };

        thisCat.class = "Unassigned";
        thisCat.classes = {
            Fighter: {level: 0, exp: 0},
            Thief: {level: 0, exp: 0},
            Guardian: {level: 0, exp: 0},
            Ranger: {level: 0, exp: 0},
            Medic: {level: 0, exp: 0},
            Scout: {level: 0, exp: 0},
            Bard: {level: 0, exp: 0}
        };

        thisCat.personality = {
            type: "Unknown",
            Bravery: 0,
            Benevolence: 0,
            Energy: 0,
            Extroversion: 0,
            Dedication: 0
        };

        thisCat.stats = {
            Strength: 0,
            Agility: 0,
            Health: 0,
            Finesse: 0,
            Cleverness: 0,
            Perception: 0,
            Luck: 0
        };
    }

    let catFriends = parseFriendsFamily(familyFriendsInfo, "Friends") ?? "None"
    displayInfo("Friends: ", catFriends, "FriendsFamily")

    let catFamily = parseFriendsFamily(familyFriendsInfo, "Family") ?? "None"
    displayInfo("Family: ", catFamily, "FriendsFamily")

    // TODO: Relationships - Gou

    let catCurrentlyWearing = parseCurrentlyWearing(biographyInfo) 
    displayInfo("Currently Wearing: ", catCurrentlyWearing, "Wearing")

    // TODO: Clothing - Gou

    // DEBUG: console.log(catColor)
    // DEBUG: console.log(catPattern)
    // DEBUG: console.log(catWhiteMarks)

    let catGeneString = findKnownGenes(catWind, catFurLength, catColor[0], catColor[1], catPattern, catWhiteMarks[1], catWhiteMarks[2], catPageInfo, checkpointArray[31])
    displayInfo("Known Gene String: ", catGeneString, "GeneString")

    thisCat.genes = catGeneString;
    thisCat.lastUpdated = Date();

    console.log(thisCat);
}

function displayInfo(name, data, formatter) {
    // DEBUG: console.log(name)
    // DEBUG: console.log(data)
    let displayText = document.querySelector(".display").innerText
    if (formatter) {
        displayText += name + "\n"
        switch(formatter) {
            case "1D":
                for (let i=0; i<data.length; i++) {
                    displayText += " - " + data[i] + "\n"
                }
                document.querySelector(".display").innerText = displayText
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
                document.querySelector(".display").innerText = displayText
                break
            case "Jobs":
                // DEBUG: console.log(data)
                let levels = data[0]
                let maxEXPdisplayJobs = ["/140 EXP", "/280 EXP", "/560 EXP", "/1120 EXP"]
                let exp = data[1]
                // DEBUG: console.log(levels)
                // DEBUG: console.log(exp)
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
                document.querySelector(".display").innerText = displayText
                break

            case "Classes":
                let levels2 = data[0]
                let maxEXPdisplayClasses = ["/50 EXP", "/150 EXP", "/300 EXP"]
                let exp2 = data[1]
                // DEBUG: console.log(levels2)
                // DEBUG: console.log(exp2)
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
                    document.querySelector(".display").innerText = displayText
                }
                break

            case "Stats":
                let statsList = ["Strength", "Agility", "Health", "Finesse", "Cleverness", "Perception", "Luck"]
                for (let i=0; i<statsList.length; i++) {
                    displayText += "- " + statsList[i] + ": " + data[i] + "\n"
                }
                document.querySelector(".display").innerText = displayText
                break

            case "PersoStats":
                let persoStatsList = ["Bravery", "Benevolence",  "Energy", "Extroversion", "Dedication"]
                for (let i=0; i<persoStatsList.length; i++) {
                    displayText += "- " + persoStatsList[i] + ": " + data[i] + "\n"
                }
                document.querySelector(".display").innerText = displayText
                break

            case "GeneString": 
                let geneStringText = ""
                let sectionLengthsList = [1, 2, 2, 5, 4, 4, 2, 2]
                if (data.length == 23) {
                    sectionLengthsList = [1, 2, 2, 5, 4, 5, 2, 2]
                }
                
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
                document.querySelector(".display").innerText = displayText
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
                document.querySelector(".display").innerText = displayText
                break
            case "Wearing": 
                if (Array.isArray(data)) {
                    for (let i = 0; i < data.length; i++) {
                        displayText += " - " + data[i] + "\n"
                    }
                }
                else {
                    displayText += " - " + data + "\n"
                }
                document.querySelector(".display").innerText = displayText
                break
        }
    }
    else {
        displayText += name + data + "\n"
        document.querySelector(".display").innerText = displayText
    }
}

function checkForTravelingText(catPageInfoINITIAL) {
    for (let i = 0; i < catPageInfoINITIAL.length; i++) {
        if (catPageInfoINITIAL[i].includes("This not-cat is currently out traveling the world!")) {
            return "Traveler"
        }
        if (catPageInfoINITIAL[i].includes("This not-cat is a resident of Gardenhome City.")) {
            return "Citied"
        }
    }
    return "Active"
}

function ensmallenCatPageInfo(catPageInfoINITIAL) {
    let catPageInfo = []
    let bioLine = -1
    let relationshipsLine = -1
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
        if (correctLineFound == false) {
            return ("no name found")
        }
        for (let i = 0; i < catPageInfoINITIAL.length-catNameLineStart; i++) {
            catPageInfo[i] = catPageInfoINITIAL[i+catNameLineStart]
            if (catPageInfo[i].includes("Biography")) {
                bioLine = i
            }
            if (catPageInfo[i].includes("Relationships")) {
                relationshipsLine = i
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
    // DEBUG: console.log("lastline = " + lastLine)
    if (lastLine > 0) {
        // DEBUG: console.log("lastline > 0")
        for (let i = 0; i < initialLength-lastLine; i++) {
            catPageInfo.pop()
        }
    }
    // trim bio into its own array
    let biographyArray = catPageInfo.splice(bioLine, catPageInfo.length)
    let friendsFamilyArray = catPageInfo.splice(relationshipsLine, catPageInfo.length)
    return [catPageInfo, friendsFamilyArray, biographyArray]
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
    // DEBUG: console.log(initialLine)
    //while determining lines w text patterns, -1 means line after // -2 means same line
    // the final line number should always be the line the actual data is on, not the title declaring what the data is
    // -5 is genetic string, for this one it's gonna be same line and then we need to increment currentLine +2 so it doesn't get stuck on "Personality Traits" instead of "X personality" line after that
    // -4 is the held trinket. in the list it has name line, effect line, name line again. idk make that work
    let searchNums = [
        "Name", 0, "Birthday", -1, "Age", -1, "Wind", -1, "Pronouns", -1, "Aspect", -1, "Origin", -1, "ID", -1, 
        "Species", -1, "Size", -1, "Fur", -1, "Color", -1, "Pattern", -1, "White Marks", -1, "Eye Color", -1, 
        "Genetic String", -5, "Personality", -1, 
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
        "The Mayor is currently providing the following effects to this cat:", -1
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
        // DEBUG: console.log(searchNums[i])
        // DEBUG: console.log("Current Line: " + currentLine)
        // DEBUG: console.log("Line Num " + lineNum)
        // DEBUG: console.log("\n")
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
    // DEBUG: console.log("Job Levels: ")
    // DEBUG: console.log(catJobLevel)
    // DEBUG: console.log("Job Experiences: ")
    // DEBUG: console.log(catJobEXP)
    return([catJobLevel, catJobEXP])
}

function parseAdvClass(dataArray, line) {
    // DEBUG: console.log(dataArray[line])
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
    // DEBUG: console.log("Class Levels: ")
    // DEBUG: console.log(catClassLevel)
    // DEBUG: console.log("Class Experiences: ")
    // DEBUG: console.log(catClassEXP)
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
    // DEBUG: console.log("Mayor Bonuses:")
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
        // DEBUG: console.log(catMayorBonusStatName)
        // DEBUG: console.log(catMayorBonusStatMod)
        return([catMayorBonusStatName, catMayorBonusStatMod])
    }
}

function modifyStats(basestats, basepersostats, trinketinfo, mayorbonusinfo) {
    let statNamesDictionary = ["Strength", "Agility", "Health", "Finesse", "Cleverness", "Perception", "Luck", "Bravery", "Benevolence", "Energy", "Extroversion", "Dedication"]
    // DEBUG: console.log("Base Stats:")
    // DEBUG: console.log(basestats)
    // DEBUG: console.log(basepersostats)
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
    // DEBUG: console.log("New Stats:")
    // DEBUG: console.log(basestats)
    // DEBUG: console.log(basepersostats)
    return([basestats, basepersostats])
}

function parseFriendsFamily(dataArray, friendsOrFamilyCheck) {
    let friendName = []
    let friendRelationship = []
    let linestart = -1
    let lineend = -1
    if (friendsOrFamilyCheck == "Friends") {
        linestart = simpleLineNumberSearch(dataArray, "Friends:", 0)+1   
        lineend = simpleLineNumberSearch(dataArray, "Family:", 1)-1        
    }
    else {
        linestart = simpleLineNumberSearch(dataArray, "Family:", 0)+1
        let familyOfBeansCheck = simpleLineNumberSearch(dataArray, "recently had a family of beans and is on cooldown for", 1)
        if (familyOfBeansCheck) {
            lineend = familyOfBeansCheck-1
        } 
        else {
            if (dataArray[dataArray.length-1].includes(" - ") == false) {
                lineend = dataArray.length-2
            }
            else {
                lineend = dataArray.length-1
            }
        }
    }

    // DEBUG: console.log(dataArray)
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].includes(friendsOrFamilyCheck)) {

        }
    }
    // DEBUG: console.log(linestart + " - " + lineend)
    if (linestart != "NOT FOUND") {
        if (linestart != lineend) {
            for (let i = 0; i < lineend-linestart+1; i++) {
                friendName[i] = dataArray[linestart+i].split(" - ")[0]
                friendRelationship[i] = dataArray[linestart+i].split(" - ")[1]
            }
            return([friendName, friendRelationship])
        }
        else {
            if (dataArray[linestart] != "n/a") {
                friendName[0] = dataArray[linestart].split(" - ")[0]
                friendRelationship[0] = dataArray[linestart].split(" - ")[1]
                return([friendName, friendRelationship])
            }
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

function findKnownGenes(wind, fur, color, colortype, pattern, whitetype, whitelevel, dataArray, line) {
    let geneString = ["C",   "?","?",   "?","?",    "?","?","?","?","?",    "?","?","?","?",    "?","?","?","?",    "?","?",    "?","?"]
    // DEBUG: console.log(dataArray[line])
    if (dataArray[line].includes("[ Unknown Genetic String ]") || dataArray[line].includes("About")) {
        // DEBUG: console.log(geneString)
        sectionWind(geneString, wind)
        sectionFur(geneString, fur)
        sectionColor(geneString, color, colortype, wind)
        sectionPattern(geneString, pattern)
        sectionWhite(geneString, whitetype, whitelevel)
        // DEBUG: console.log(geneString)
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