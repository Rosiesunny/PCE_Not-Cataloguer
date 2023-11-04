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
    let catVillageRole = checkForTravelingText(catPageInfoINITIAL) ?? ""          // checks for traveling text whatever
    let catPageInfo = ensmallenCatPageInfo(catPageInfoINITIAL)
    console.log(catPageInfo)
    makeArray("aaaaa", "B", "C", 14, "D")
    getDataCheckpoints(catPageInfo)
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
        "Species", -1, "Size", -1, "Fur", -1, "Color", -1, "Pattern", -1, "White Marks", -1, "Eye Color", -1, "Genetic String", -5, "Personality", -2, 
        "Bravery", -1, "Benevolence", -1,  "Energy", -1, "Extroversion", -1, "Dedication", -1, "Held Trinket", -4
    ]     // need to get jobs after this which is more complicated. also held trinket complicated a bit by above dealio
    for (let i = 2; i < searchNums.length; i = i+2) {
        console.log(searchNums[i])
        lineNum = simpleLineNumberSearch(dataArray, searchNums[i], currentLine) ?? "NOT FOUND"
        
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
            console.log(currentLine)
            searchNums[i+3] = lineNum+2 // defines the gene sequence
        }
        

    }
    console.log(searchNums)
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

// need to change prev method since I used to check wind below name instead of on the profile iirc? I mean should auto do that w/ new system but double check it worked
function parseWind(dataArray, line) {
    let catWind = dataArray[line]
    return catWind
}

// @ Gou, not sure how you wanted to mess with pronouns dictionary stuff? just gonna do regular stuff for now
function parsePronouns(dataArray, line) {
    let catPronouns = dataArray[line]
    // FIGURE OUT HOW WE WANNA STORE PRIMARY VS SECONDARY PRONOUNS! 
    // not returning for now bc Idek how this is gonna look
}

function parseAspect(dataArray, line) {
    let catAspect = dataArray[line]
    return catAspect
}

function parseOrigin(dataArray, line) {
    let catOrigin = dataArray[line]
    return catOrigin
}

// haven't tested if the number transformation here breaks stuff, prob should check that? might try n do decimals or smth
function parseID(dataArray, line) {
    let catID = Number(dataArray[line].split(" (")[0])
    return catID
}

function parseSpecies(dataArray, line) {
    let catSpecies = dataArray[line]
    return catSpecies
}

// figure out if we wanna save the lbs and kg as different things or both in one? Also could jsut record lbs and auto convert kg for people who use kg? would need to get the same decimal rounding tho
function parseSize(dataArray, line) {
    let catSize = dataArray[line]
}

function parseFurLength(dataArray, line) {
    let catFurLength = dataArray[line]
    return catFurLength
}

// for torties/watercolors, do we wanna save both colors separately? 
function parseColor(dataArray, line) {
    let colorcheck = dataArray[line]
    let catColor = colorcheck
    let catColorType = colorcheck
    if (colorcheck != "-hidden-") {
        catColor = colorcheck.split(" ")[0]
        catColorType = colorcheck.split(" ")[1]
    }
    // idk if u can return 2 things in this language? might need to combine them to an array and split in the main function
    return(catColor, catColorType)
}

function parsePattern(dataArray, line) {
    let catPattern = dataArray[line]
    return catPattern
}

// was thinking, do we wanna save the white type text too? but I think we could just do something similar to your pronoun dictionary thing to define those. or just a switch case or smth. that'd be a long switch case maybe not. or could just literally store it bc why not
function parseWhiteMarks(dataArray, line) {
    let whitecheck = dataArray[line]
    let catWhiteMarks = ""
    let catWhiteLevel = ""
    let catWhiteType = ""
    if (whitecheck != "None") {
        catWhiteMarks = whitecheck.split(" / ")[0]
        catWhiteLevel = whitecheck.split(" / ")[1][1]  // haven't tested if this works, might try n check a 2d array that doesn't exist instead of character 1 of the string. gotta do smth else if so. easy fix lol
        catWhiteType = whitecheck.split(" / ")[1][0]
    }
    else {
        catWhiteMarks = "None"
        catWhiteLevel = "-hidden-"
        catWhiteType = "-hidden-"
    }
    // again not sure if I can return multiple variables so might need to make an array
    return(catWhiteMarks, catWhiteType, catWhiteLevel)
}

function parseEyeColor(dataArray, line) {
    let catEyeColor = dataArray[line]
    return catEyeColor
}

// for the line on this one, we search for "Personality Traits" then 1 line down it'll say X personality, so that's the line, 1 after "Personality Traits"
function parsePersonalityType(dataArray, line) {
    let catPersonalityType = dataArray[line].split(" Personality:")[0]
    return catPersonalityType
}

// LINE in this case should be the line after "Bravery:", then every other line will be the stat name
function parsePersonalityStats(dataArray, line) {
    let catPersonalityStats = []
    for (let i = 0; i < 5; i++) {
       catPersonalityStats[i] = Number(dataArray[line+i*2])          // again haven't tested if Number works as intended or if it does decimals or something
    }
    return catPersonalityStats
}

// LINE in this case should be the line after "Held Trinket:". It will refer to the lines after that too tho for what it boosts
function parseHeldTrinket(dataArray, line) {
    let trinketcheck = dataArray[line]
    let catTrinketName = ""
    let catTrinketStat = ""
    let catTrinketStatMod = ""     // unsure if I wanna make this an int or a string ? for the sake of +2 or -2 etc. altho I think the default assumption is that 1 is +1 and -1 is -1 etc
    if (trinketcheck != "None") {
        catTrinketName = trinketcheck
        catTrinketStat = dataArray[line+1].split[" "][0].replace("[", "")        /// haven't tested if this works? hopefully it does
        catTrinketStatMod = dataArray[line+1].split[" "][1].replace("]", "")
    }
    else {
        catTrinketName = "None"
        catTrinketStat = "None"
        catTrinketStatMod = "0"
    }
    // still dunno if I can return multiple things yadda yadda
    return (catTrinketName, catTrinketStat, catTrinketStatMod)
}

function parseDayJob(dataArray, line) {

}

function parseJobEXP(dataArray, line) {

}

function parseAdvClass(dataArray, line) {

}

function parseAdvEXP(dataArray, line) {

}

function parseBaseStats(dataArray, line) {

}

function parsePartners(dataArray, line) {

}

function parseBestFriends(dataArray, line) {

}

function parseFriends(dataArray, line) {

}

function parseFamily(dataArray, line) {

}

function parseWearing(dataArray, line) {

}

function makeArray(par1name, par1, par2name, par2, par3name, par3, par4name, par4, par5name, par5, par6name, par6, par7name, par7) {
    let tempArray = [par1, par2, par3, par4, par5, par6, par7]
    console.log(tempArray)
}

function parseArray() {
    
}