// comments look like this if they are one line
/*Comments look like this if you want to
spread them out over several lines for some
reason*/
// 
//

//localStorage only stores strings
//let testA = "eeee"
//localStorage.setItem(testA, "peepee")

////// BASE PROFILE STATS DONE AL CATS HAVE THOSE
///// NOW GOTTA DIFFERENTIATE FOR BEANS BC THEY DO NOT HAVE STATS
// OTHER THAN THE ABOVE BIO INFO THEY HAVE:
// bean: friends, family, bio. *IMPORTANT, NO PERSONALITY YET EITHER, NEED TO MARK THAT DOWN. WIND EXISTS BUT NOT PERSONALITY.
// young kitten: personality stats, held trinket, day job, adventuring class, occupations, friends, family. p much an adult but wrong stats


// ok  I think the way to go about this is to have like. the below GAME PLAN

// function 1: calls functions for everything that is essential to every cat/will always be on every cat's page. save to a TEMPORARY stat in case they r still kiddo
// function 2: marks down what age the cat is
//                if bean: record all this in bean data and move on
//                if young kitten-adolescent: search for the rest of the data and then record it in the corresponding age data set
//                if adult: search for the rest of the data and then record it in their permanent/adult stats set
//     * function 3: search the rest of the data (gets called by the above ones)
//     * function 4: save the data once it's all finished (take in what age they are and record it according to that), will be called wherever the end of their recorded data is. for beans it's vry soon
//
// profit

// thinking maybe when I store non-adult data it can save to different variables. like, main sequence is just gonna be the id number as the key
// but maybe for each age it'll have something like an id of "######-bean" "######-young-kitten" etc. Would make it easier to store the datasets I think
// for the contents I think that storing by id in any of them, the contents/data contained will just be a very long string of all of the above information
// with spacers that can be easily tracked/not repeated by users frequently so I can just split it up piece by piece when I read from it
// cool

function readLocalStorageInfo() {
    let sectionHeadSymbol = "[☎⌦]"
    let keyTitleSymbol = "[⬤⊝]"
    let singleValueSymbol = "[⧯▣]"
    let multipleValueSymbol = "[⧮🈩]"
    let subValue1Symbol = "[▲⊝]"
    let subValue2Symbol = "[△☉]"
    let symbols = [sectionHeadSymbol, keyTitleSymbol, singleValueSymbol, multipleValueSymbol, subValue1Symbol, subValue2Symbol]
    let catIDsList = localStorage.getItem("catIDsList")
    console.log(catIDsList)
    let arrayMaker = catIDsList.split("<>")
    for (let i = 0; i < arrayMaker.length; i++) {
        let catIDGet = arrayMaker[i]
        let catInfoByID = localStorage.getItem(catIDGet)
        let catInfoArray = catInfoByID.split(symbols)
        let catInfoArrayLengthInitial = catInfoArray.length
        let catInfoArrayNew = []
        for (let j = 0; j < catInfoArrayLengthInitial; j++) {
            catInfoArrayNew = catInfoArray[j].split(keyTitleSymbol)
            console.log(catInfoArrayNew)
        }
        let catInfoArrayNew2 = []
        for (let k = 0; k < catInfoArrayNew.length; k++) {
            catInfoArrayNew2[k] = catInfoArrayNew[k].split(singleValueSymbol)
        }
        console.log(catInfoArrayNew2)
        console.log("==========================================================================================================================")
    }
    localStorage.setItem("catIDsList", catIDsList)
    console.log(catIDsList)
    return
}

function kibbyDirector() {
    //readLocalStorageInfo()                // commented out for now so it doesn't record in localStorage
    let textBoxEntry = document.querySelector(".testTextBox")
    let catPageInfoINITIAL = textBoxEntry.value.split("\n")
    let catVillageRole = checkForTravelingText(catPageInfoINITIAL) ?? ""
    console.log(catVillageRole)
    let catPageInfo = ensmallenCatPageInfo(catPageInfoINITIAL)
    textBoxEntry.value = ""                    //  UNCOMMENT THIS FOR THE OFFICIAL VERSION. sometimes helpful to comment during testing tho
    let catKeyDataList = ""
    catKeyDataList = findPhysicalTraits(catPageInfo, catVillageRole)
    let ageSuffix = catKeyDataList.shift()
    if (ageSuffix == "Young Kitten") {
        ageSuffix = "YoungKitten"
    }
    let catID = catKeyDataList.shift()
    catKeyDataList = catKeyDataList[0]
    let displayText = catKeyDataList.replaceAll("[☎⌦]", "\n").replaceAll("[⬤⊝]", "\n").replaceAll("[⧯▣]", "\n").replaceAll("[⧮🈩]", "\n").replaceAll("[▲⊝]", "\n").replaceAll("[△☉]", "\n")
    document.querySelector(".poopee").innerText = displayText
    console.log(catID)
    let catKey = ""
    //AGE CHECK HERE THAT DETERMINES WHAT ELSE GETS CALLED
    catKey = catID + "-" + ageSuffix
    console.log(catKey)
    //localStorage.setItem(catKey, catKeyDataList)             // commented out for now so it doesn't record in localStorage
    ///console.log(localStorage.getItem("catIDsList"))
    //checkLocalStorageForID(catKey)

    // ADD IN A VARIABLE FOR USER NOTES OTHER THAN THE CAT BIO! ONE THEY CAN EDIT IN-PROGRAM
    // ALSO ADD IN A VARIABLE THAT'LL BE A PLACEHOLDER FOR WHEN EVENTUALLY I'LL HAVE IT AUTO RECORD DATES OF STAT INCREASES FOR STUDENTS
    // OOO I COULD JUST MAKE IT SO THIS IS STORED IN THE NON-ADULT DATA? then it won't clutter the adult data as much for stuff that will never apply to MFE/gardenhome adults
}

//checks if the specified ID is already stored, and if it isn't, adds it to the list
function checkLocalStorageForID(catKey) {
    let catIDsList = localStorage.getItem("catIDsList")
    console.log(catIDsList)
    let arrayMaker = catIDsList.split("<>")
    console.log(arrayMaker)
    for (let i = 0; i < arrayMaker.length; i++) {
        if (arrayMaker[i] == catKey) {
            console.log("Key already exists")
            return
        }
    }
    catIDsList += catKey + "<>"
    localStorage.setItem("catIDsList", catIDsList)
    console.log(catIDsList)
    return
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
        console.log(catPageInfoINITIAL)
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
    console.log(catPageInfo)
    return catPageInfo
}

function findPhysicalTraits(catPageInfo, catVillageRole) {
    let lastCheckedLandmark = 0
    let catName = catPageInfo[0].replace(" ", "")
    console.log("Name: " + catName)
    let catWind = catPageInfo[1].split(" ")[0]
    console.log("Wind: " + catWind)
    let catPronouns = catPageInfo[1].split("[")[1].split("]")[0]
    let pronounsSearchList = ["they/them", "he/him", "she/her", "ae/aer", "xe/xem", "it/its"]
    let catPrimaryPronouns = ""
    let catSecondaryPronouns = ""
    // if the way pronouns are listed in the future changes this will be broken but for now it checks for the slash and relies on consistent formatting of he/it, ae/aer etc. if in the future they were like, they/them and she/her it could change.
    for (let i = 0; i < pronounsSearchList.length; i++) {
        if(catPronouns == pronounsSearchList[i]) {
            catPrimaryPronouns = catPronouns
            catSecondaryPronouns = "none"
            break;
        }
    }
    if (catPrimaryPronouns == "") {
        for (let i = 0; i < pronounsSearchList.length; i++) {
            if (catPronouns.split("/")[0] == pronounsSearchList[i].split("/")[0]) {
                catPrimaryPronouns = pronounsSearchList[i]
            }
            if (catPronouns.split("/")[1] == pronounsSearchList[i].split("/")[0]) {
                catSecondaryPronouns = pronounsSearchList[i]
            }
            if (catPrimaryPronouns != "" && catSecondaryPronouns != "") {
                break;
            }
        }
    }
    console.log("Pronouns: " + catPrimaryPronouns + ", " + catSecondaryPronouns)
    let catPersonality = catPageInfo[simpleLineNumberSearch(catPageInfo, "Personality", lastCheckedLandmark)].split(" ")[0] 
    console.log("Personality: " + catPersonality)
    let catBirthday = simpleLineSearch(catPageInfo, "Birthday:", lastCheckedLandmark)
    console.log("Birthday: "+catBirthday)
    let catAge = simpleLineSearch(catPageInfo, "Age:", lastCheckedLandmark).split(" (")[0]
    console.log("Age: "+catAge)
    let catAspect = "Undiscovered" // for now this is all cats so just auto assigning it to any of them
    console.log("Aspect: "+catAspect)
    let catOrigin = simpleLineSearch(catPageInfo, "Origin:", lastCheckedLandmark)
    console.log("Origin: "+catOrigin)
    let catID = simpleLineSearch(catPageInfo, "ID Code:", lastCheckedLandmark).split("=")[1].split("]")[0]
    console.log("ID: "+catID)
    let catSpecies = "Not-Cat" // for now this is all cats so just auto assigning it to any of them
    console.log("Species: "+catSpecies + " species")
    let catSize = simpleLineSearch(catPageInfo, "Size:", lastCheckedLandmark)
    console.log("Size: "+catSize)
    let catFurLength = simpleLineSearch(catPageInfo, "Fur:", lastCheckedLandmark)
    console.log("Fur: "+catFurLength)
    let catColor = simpleLineSearch(catPageInfo, "Color:", lastCheckedLandmark)
    let catColorType
    if (catColor != "-hidden-") {
        catColor = catColor.split(" ")[0]
    }
    else {
        catColorType = "-hidden-"
    }
    console.log("Color: "+catColor)
    if (catColorType != "-hidden-") {
        catColorType = simpleLineSearch(catPageInfo, "Color:", lastCheckedLandmark)
        catColorType = catColorType.split(" ")[1]
    }
    console.log("Color Type: "+catColorType)
    let catPattern = simpleLineSearch(catPageInfo, "Pattern:", lastCheckedLandmark)
    console.log("Pattern: "+catPattern)
    let catWhiteMarks = simpleLineSearch(catPageInfo, "White Marks:", lastCheckedLandmark).split(" /")[0]
    console.log("White Marks: "+catWhiteMarks)
    let catWhiteTypeLevel = ""
    if (catWhiteMarks != "None") {
        catWhiteTypeLevel = simpleLineSearch(catPageInfo, "White Marks:", lastCheckedLandmark).split("/ ")[1]
        console.log(catWhiteTypeLevel)
    }
    else {
        catWhiteTypeLevel = "-hidden-"
    }
    let catEyeColor = simpleLineSearch(catPageInfo, "Eye Color:", lastCheckedLandmark)
    let eyeColorOffset = simpleLineNumberSearch(catPageInfo, "Eye Color:", lastCheckedLandmark)+2
    console.log("Eye Color: "+catEyeColor)
    let tempGeneticString = catPageInfo[eyeColorOffset]
    console.log("Genetic String on page: "+tempGeneticString)
    let catGeneString = ""
    let physicalTraitsArray = [catAge, catID, catName, catWind, catPrimaryPronouns, catSecondaryPronouns, catPersonality, catBirthday, catAspect, catOrigin, catSpecies, catSize, catFurLength, catColor, catColorType, catPattern, catWhiteMarks, catWhiteTypeLevel, catEyeColor]
    if (tempGeneticString == "[ Unknown Genetic String ]") {
        let tempPhysicalTraitsArray = physicalTraitsArray.slice()
        tempPhysicalTraitsArray.shift()
        catGeneString = autoFillGeneticStringFromPhysicalTraits(tempPhysicalTraitsArray)
        console.log("Genetic String generated from Physical Traits: " + catGeneString)
    }
    else {
        catGeneString = tempGeneticString
    }
    console.log(physicalTraitsArray)
    // IMPORTANT, I NEED TO SEND OVER ALL THE DATA I GATHERED FROM HERE TO THE NEXT FUNCTION! GOTTA PUT IT ALL TOGETHER IN A STRING HERE N MOVE IT OVER
    if (physicalTraitsArray[0] != "Bean") {
        let finalString = findCatStats(catPageInfo, lastCheckedLandmark, physicalTraitsArray, catVillageRole, catGeneString)
        return finalString
    }
    else {
        let finalString = findCatFriendsAndFamily(catPageInfo, lastCheckedLandmark, "", physicalTraitsArray, catVillageRole, catGeneString)
        return finalString
    }
    
}

//eventually add a third variable here for the above screaming
function findCatStats(catPageInfo, lastCheckedLandmark, physicalTraitsArray, catVillageRole, catGeneString) {
    //personality stats start here
    let catPersonalityTraitsList = []
    let personalityTraitsList = ["Bravery:", "Benevolence:", "Energy:", "Extroversion:", "Dedication:"]
    for (let i = 0; i < personalityTraitsList.length; i++) {
        catPersonalityTraitsList[i] = simpleLineSearch(catPageInfo, personalityTraitsList[i], lastCheckedLandmark)
    }
    console.log("Cat Personality Traits:")
    console.log(catPersonalityTraitsList)
    let catHeldTrinketStat 
    let catHeldTrinketName = simpleLineSearch(catPageInfo, "Held Trinket:", lastCheckedLandmark)
    if (catHeldTrinketName != "None") {
        let heldTrinketOffset = simpleLineNumberSearch(catPageInfo, "Held Trinket:", lastCheckedLandmark)+2
        catHeldTrinketStat = catPageInfo[heldTrinketOffset].split("[")[1].split("]")[0]
    }
    else {
        catHeldTrinketStat = "None"
    }
    console.log("Trinket: " + catHeldTrinketName + " - " + catHeldTrinketStat)  
    let jobLineNumber = simpleLineNumberSearch(catPageInfo, "Day Job:", lastCheckedLandmark)
    let jobList = ["Hunter", "Gatherer", "Miner", "Fisher", "Bug Catcher", "Gardener", "Herbalist", "Farmer", "Flockherd", "Apothecary", "Clothier", "Scribe", "Artist", "Blacksmith", "Craftscat", "Builder", "Mason", "Baker"]
    let catJobLevelList = []
    let catJobExperienceList = []
    let catJobCurrent = catPageInfo[jobLineNumber].split(": ")[1].split(" (")[0]
    console.log("Current Job: " + catJobCurrent)
    let specialtyOccupationsList = ["Mayor", "Doctor", "Innkeeper", "Merchant", "Teacher", "Mail Carrier"]
    for (let i = 0; i < specialtyOccupationsList.length; i++) {
        if (catJobCurrent == specialtyOccupationsList[i]) {
            catVillageRole = catJobCurrent
        }
    }
    let currentJobData = ""
    for (let i=0; i < jobList.length; i++) {
        currentJobData = simpleLineSearchSameLine(catPageInfo, jobList[i], jobLineNumber+1) ?? ""      
        if (currentJobData != "") {
            catJobLevelList[i] = currentJobData.split("Level ")[1].split(" [")[0]
            if (currentJobData.includes("Maximum Level")) {
                catJobExperienceList[i] = "Maximum Level"
            }
            else{
                catJobExperienceList[i] = currentJobData.split("[")[1].split("/")[0]
            }
        }
        else {
            catJobLevelList[i] = "0"
            catJobExperienceList[i] = "0"
        }
    }
    console.log("Job Level/Experience Lists:")
    console.log(catJobLevelList)
    console.log(catJobExperienceList)
    let adventureClassLineNumber = simpleLineNumberSearch(catPageInfo, "Adventuring Class:", lastCheckedLandmark)
    let adventureClassList = ["Fighter", "Thief", "Guardian", "Ranger", "Medic", "Scout", "Bard"]
    let catAdventureClassLevelList = []
    let catAdventureClassExperienceList = []
    let catAdventureClassCurrent = catPageInfo[adventureClassLineNumber].split(": ")[1]
    console.log("Current Adventuring Class: " + catAdventureClassCurrent)
    // for adventure classes I'm also gonna just do 2 arrays that have the exact positions like the last one
    // fighter will always be 0, thief always 1, etc
    let currentClassData = ""
    for (let i=0; i < adventureClassList.length; i++) {
        currentClassData = simpleLineSearchSameLine(catPageInfo, adventureClassList[i], adventureClassLineNumber+1) ?? ""
        if (currentClassData != "") {
            catAdventureClassLevelList[i] = currentClassData.split("Level ")[1].split(" [")[0]
            if (currentClassData.includes("Maximum Level")) {
                catAdventureClassExperienceList[i] = "Maximum Level"
            }
            else{
                catAdventureClassExperienceList[i] = currentClassData.split("[")[1].split("/")[0]
            }
        }
        else {
            catAdventureClassLevelList[i] = "0"
            catAdventureClassExperienceList[i] = "0"
        }
    }
    console.log("Adventuring Class Level/Experience Lists:")
    console.log(catAdventureClassLevelList)
    console.log(catAdventureClassExperienceList)
    lastCheckedLandmark = adventureClassLineNumber+1

    let attributeList = ["Strength", "Agility", "Health", "Finesse", "Cleverness", "Perception", "Luck"]
    let attributeLineStartPosition = simpleLineNumberSearch(catPageInfo, "Strength", lastCheckedLandmark)+2
    let catAttributeList = []
    for (let i = 0; i < attributeList.length; i++) {
        catAttributeList[i] = catPageInfo[attributeLineStartPosition]
        console.log(catAttributeList[i])
        attributeLineStartPosition += 10
    }
    console.log("Stat Attributes:")
    console.log(catAttributeList)
    let personalityMayorList = ["Bravery", "Benevolence", "Energy", "Extroversion", "Dedication"]
    let catMayorBoostModifiers = ["", "", "", "", "", "", "", "", "", "", "", ""]
    let mayorBoostStartPosition = simpleLineNumberSearch(catPageInfo, "The Mayor is currently providing the following effects to this cat:", lastCheckedLandmark)+1 ?? -1
    if (mayorBoostStartPosition > 1) { // checks if there is a mayor basically
        for (let i = 0; i < attributeList.length; i++) {
            if (catPageInfo[mayorBoostStartPosition].includes(attributeList[i])) {     
                catMayorBoostModifiers[i] = catPageInfo[mayorBoostStartPosition].split(" "+attributeList[i])[0]
                if (catMayorBoostModifiers[i].includes(", ")) {
                    let tempSplitVariable = catMayorBoostModifiers[i].lastIndexOf(", ")
                    catMayorBoostModifiers[i] = catMayorBoostModifiers[i].slice(tempSplitVariable + 1).replaceAll(" ", "")
                }
            }
        }
        for (let i = 0; i < personalityMayorList.length; i++) {
            if (catPageInfo[mayorBoostStartPosition].includes(personalityMayorList[i])) {  
                catMayorBoostModifiers[i+attributeList.length] = catPageInfo[mayorBoostStartPosition].split("& ")[1].split(" ")[0] ?? ""
                break
            }
        }
    }
    console.log("Mayor Boosts: ")
    console.log(catMayorBoostModifiers) //all the numbers in order, first str agi hlth fin clv per lck, then personality stats in order bravery, benv, enrgy, extroversion, dedi
    // Mayor attribute deductions from stats to get base stats accurate
    for (let i = 0; i < catAttributeList.length; i++) {
        catAttributeList[i] = Number(catAttributeList[i])-Number(catMayorBoostModifiers[i])
        //if trinket matches, subtracting it from the total too for that slot
        if (catHeldTrinketStat.includes(attributeList[i])) {
            catAttributeList[i] = catAttributeList[i] - Number(catHeldTrinketStat.split(" ")[1])
        }
    }
    // Mayor personality deductions from stats to get base stats accurate
    for (let i = 0; i < catPersonalityTraitsList.length; i++) {
        catPersonalityTraitsList[i] = Number(catPersonalityTraitsList[i])-Number(catMayorBoostModifiers[i+catAttributeList.length])
        //if trinket matches, subtracting it from the total too for that slot
        if (catHeldTrinketStat.includes(personalityMayorList[i])) {
            catPersonalityTraitsList[i] = catPersonalityTraitsList[i] - Number(catHeldTrinketStat.split(" ")[1])
        }
    }

    // RIGHT NOW the program relies on people copying the page WITHOUT clicking "View Base Stats", so "View Base Stats" copied cats currently give the wrong scores
    // hard to change that though since the button doesn't show up in copied text so like. Idk just do it correctly. I did *want* to make a check so it'd work regardless but alas
    console.log("Adjusted Personality Traits:")
    console.log(catPersonalityTraitsList)
    console.log("Adjusted Stat Attributes:")
    console.log(catAttributeList)
    let statsArray = []
    let overallcounter = 0
    for (let i = 0; i < catPersonalityTraitsList.length; i++) {
        statsArray[i] = catPersonalityTraitsList[i].toString()
        overallcounter++
    }
    statsArray[overallcounter] = catHeldTrinketName
    statsArray[overallcounter+1] = catHeldTrinketStat
    statsArray[overallcounter+2] = catJobCurrent
    overallcounter+=3
    for (let i = 0; i < catJobLevelList.length; i++) {
        statsArray[i+overallcounter] = catJobLevelList[i]
        statsArray[i+overallcounter+1] = catJobExperienceList[i]
        overallcounter++
    }
    overallcounter += catJobLevelList.length
    statsArray[overallcounter] = catAdventureClassCurrent
    overallcounter++
    for (let i = 0; i < catAdventureClassLevelList.length; i++) {
        statsArray[i+overallcounter] = catAdventureClassLevelList[i]
        statsArray[i+overallcounter+1] = catAdventureClassExperienceList[i]
        overallcounter++
    }
    overallcounter += catAdventureClassLevelList.length

    for (let i = 0; i < catAttributeList.length; i++) {
        statsArray[i+overallcounter] = catAttributeList[i].toString()
    }
    console.log(statsArray)
    let finalString = findCatFriendsAndFamily(catPageInfo, lastCheckedLandmark, statsArray, physicalTraitsArray, catVillageRole, catGeneString)
    return finalString
    //IMPORTANT, ALSO GOTTA TRANSFER DATA OVER THIS TIME!!
}

function findCatFriendsAndFamily(catPageInfo, lastCheckedLandmark, statsArray, physicalTraitsArray, catVillageRole, catGeneString) {
    let friendsStartPosition = simpleLineNumberSearch(catPageInfo, "Friends:", lastCheckedLandmark)+1 // first friend on the list, not the header
    let familyStartPosition = simpleLineNumberSearch(catPageInfo, "Family:", lastCheckedLandmark)+1 // first family on the list, not the header
    let catFriendsList = []
    let tempNAcheck = ""
    for (let i = 0; i < (familyStartPosition-friendsStartPosition-1); i++) {
        tempNAcheck = catPageInfo[friendsStartPosition+i]
        if (tempNAcheck == "n/a") {
            catFriendsList[i] = ""
            break
        }
        else {
            catFriendsList[i] = catPageInfo[friendsStartPosition+i].split(" - ")
        }
    }
    console.log("Friends:")
    console.log(catFriendsList)
    let familyEndPosition = -1
    let biographyStartPosition = -1
    if (simpleLineNumberSearch(catPageInfo, "Biography", lastCheckedLandmark)) {
        familyEndPosition = simpleLineNumberSearch(catPageInfo, "Biography", lastCheckedLandmark)-1
        biographyStartPosition = familyEndPosition+2
    }
    let catFamilyList = []
    tempNAcheck = ""
    let familyOfBeansCheck = 0
    let familyOfBeansTravelDate = ""
    let familyOfBeansLineCheck = simpleLineNumberSearch(catPageInfo, "recently had a family of beans and is on cooldown for another", lastCheckedLandmark)
    if (familyOfBeansLineCheck != undefined) {
        console.log("FAMILY OF BEANS DETECTED. Days until freedom: ")
        familyOfBeansCheck = 1
        let tempBeanDaysNumber = parseInt(catPageInfo[familyOfBeansLineCheck].split("recently had a family of beans and is on cooldown for another ")[1].split(" day")[0])
        console.log(tempBeanDaysNumber)
        familyOfBeansTravelDate = getCanTravelDate(tempBeanDaysNumber)
    }  
    
    for (let i = 0; i < (biographyStartPosition-familyStartPosition-2-familyOfBeansCheck); i++) {
        tempNAcheck = catPageInfo[familyStartPosition+i]
        if (tempNAcheck == "n/a") {
            catFamilyList[i] = ""
            break
        }
        else {
            catFamilyList[i] = catPageInfo[familyStartPosition+i].split(" - ")
        }
    }
    console.log("Family:")
    console.log(catFamilyList)
    console.log(biographyStartPosition + ": Biography Start Position")
    let finalString = buildKeyValueString(statsArray, physicalTraitsArray, catVillageRole, familyOfBeansTravelDate, catFriendsList, catFamilyList, catGeneString)
    return finalString
}

function buildKeyValueString(statsArray, physicalTraitsArray, catVillageRole, familyOfBeansTravelDate, catFriendsList, catFamilyList, catGeneString) {
    console.log(physicalTraitsArray)
    console.log(statsArray)
    console.log(catVillageRole)
    console.log("Can Travel On: " +familyOfBeansTravelDate)
    let catAge = physicalTraitsArray.shift()

    let sectionHeadSymbol = "[☎⌦]"
    let keyTitleSymbol = "[⬤⊝]"
    let singleValueSymbol = "[⧯▣]"
    let multipleValueSymbol = "[⧮🈩]"
    let subValue1Symbol = "[▲⊝]"
    let subValue2Symbol = "[△☉]"

    
    let finalString = ""
    finalString += 
    sectionHeadSymbol+"Physical Traits"
    +keyTitleSymbol+"ID"+singleValueSymbol+physicalTraitsArray[0]
    +keyTitleSymbol+"Name"+singleValueSymbol+physicalTraitsArray[1]
    +keyTitleSymbol+"Wind"+singleValueSymbol+physicalTraitsArray[2]
    +keyTitleSymbol+"Primary Pronouns"+singleValueSymbol+physicalTraitsArray[3]
    +keyTitleSymbol+"Secondary Pronouns"+singleValueSymbol+physicalTraitsArray[4]
    +keyTitleSymbol+"Personality"+singleValueSymbol+physicalTraitsArray[5]
    +keyTitleSymbol+"Birthday"+singleValueSymbol+physicalTraitsArray[6]
    +keyTitleSymbol+"Aspect"+singleValueSymbol+physicalTraitsArray[7]
    +keyTitleSymbol+"Origin"+singleValueSymbol+physicalTraitsArray[8]
    +keyTitleSymbol+"Species"+singleValueSymbol+physicalTraitsArray[9]
    +keyTitleSymbol+"Size"+singleValueSymbol+physicalTraitsArray[10]
    +keyTitleSymbol+"Fur"+singleValueSymbol+physicalTraitsArray[11]
    +keyTitleSymbol+"Color"+singleValueSymbol+physicalTraitsArray[12]
    +keyTitleSymbol+"Color Type"+singleValueSymbol+physicalTraitsArray[13]
    +keyTitleSymbol+"Pattern"+singleValueSymbol+physicalTraitsArray[14]
    +keyTitleSymbol+"White Marks"+singleValueSymbol+physicalTraitsArray[15]
    +keyTitleSymbol+"White Type/Level"+singleValueSymbol+physicalTraitsArray[16]
    +keyTitleSymbol+"Eye Color"+singleValueSymbol+physicalTraitsArray[17]
    +keyTitleSymbol+"Genetic String"+singleValueSymbol+catGeneString

    if (catAge != "Bean") {
        finalString +=
        sectionHeadSymbol+"Stats, Trinket, Jobs, and Classes"
        +keyTitleSymbol+"Personality Stats"
        +multipleValueSymbol+"Bravery"+subValue1Symbol+statsArray[0]
        +multipleValueSymbol+"Benevolence"+subValue1Symbol+statsArray[1]
        +multipleValueSymbol+"Energy"+subValue1Symbol+statsArray[2]
        +multipleValueSymbol+"Extroversion"+subValue1Symbol+statsArray[3]
        +multipleValueSymbol+"Dedication"+subValue1Symbol+statsArray[4]
        +keyTitleSymbol+"Trinket Name"+singleValueSymbol+statsArray[5]
        +keyTitleSymbol+"Trinket Stat"+singleValueSymbol+statsArray[6]
        +keyTitleSymbol+"Current Day Job"+singleValueSymbol+statsArray[7]
        +keyTitleSymbol+"Job Level/Experience List"
        +multipleValueSymbol+"Hunter"+subValue1Symbol+statsArray[8]+subValue2Symbol+statsArray[9]
        +multipleValueSymbol+"Gatherer"+subValue1Symbol+statsArray[10]+subValue2Symbol+statsArray[11]
        +multipleValueSymbol+"Miner"+subValue1Symbol+statsArray[12]+subValue2Symbol+statsArray[13]
        +multipleValueSymbol+"Fisher"+subValue1Symbol+statsArray[14]+subValue2Symbol+statsArray[15]
        +multipleValueSymbol+"Bug Catcher"+subValue1Symbol+statsArray[16]+subValue2Symbol+statsArray[17]
        +multipleValueSymbol+"Gardener"+subValue1Symbol+statsArray[18]+subValue2Symbol+statsArray[19]
        +multipleValueSymbol+"Herbalist"+subValue1Symbol+statsArray[20]+subValue2Symbol+statsArray[21]
        +multipleValueSymbol+"Farmer"+subValue1Symbol+statsArray[22]+subValue2Symbol+statsArray[23]
        +multipleValueSymbol+"Flockherd"+subValue1Symbol+statsArray[24]+subValue2Symbol+statsArray[25]
        +multipleValueSymbol+"Apothecary"+subValue1Symbol+statsArray[26]+subValue2Symbol+statsArray[27]
        +multipleValueSymbol+"Clothier"+subValue1Symbol+statsArray[28]+subValue2Symbol+statsArray[29]
        +multipleValueSymbol+"Scribe"+subValue1Symbol+statsArray[30]+subValue2Symbol+statsArray[31]
        +multipleValueSymbol+"Artist"+subValue1Symbol+statsArray[32]+subValue2Symbol+statsArray[33]
        +multipleValueSymbol+"Blacksmith"+subValue1Symbol+statsArray[34]+subValue2Symbol+statsArray[35]
        +multipleValueSymbol+"Craftscat"+subValue1Symbol+statsArray[36]+subValue2Symbol+statsArray[37]
        +multipleValueSymbol+"Builder"+subValue1Symbol+statsArray[38]+subValue2Symbol+statsArray[39]
        +multipleValueSymbol+"Mason"+subValue1Symbol+statsArray[40]+subValue2Symbol+statsArray[41]
        +multipleValueSymbol+"Baker"+subValue1Symbol+statsArray[42]+subValue2Symbol+statsArray[43]
        +keyTitleSymbol+"Current Adventuring Class"+singleValueSymbol+statsArray[44]
        +keyTitleSymbol+"Adventuring Class Level/Experience List"
        +multipleValueSymbol+"Fighter"+subValue1Symbol+statsArray[45]+subValue2Symbol+statsArray[46]
        +multipleValueSymbol+"Thief"+subValue1Symbol+statsArray[47]+subValue2Symbol+statsArray[48]
        +multipleValueSymbol+"Guardian"+subValue1Symbol+statsArray[49]+subValue2Symbol+statsArray[50]
        +multipleValueSymbol+"Ranger"+subValue1Symbol+statsArray[51]+subValue2Symbol+statsArray[52]
        +multipleValueSymbol+"Medic"+subValue1Symbol+statsArray[53]+subValue2Symbol+statsArray[54]
        +multipleValueSymbol+"Scout"+subValue1Symbol+statsArray[55]+subValue2Symbol+statsArray[56]
        +multipleValueSymbol+"Bard"+subValue1Symbol+statsArray[57]+subValue2Symbol+statsArray[58]
        +keyTitleSymbol+"Attribute Stats"
        +multipleValueSymbol+"Strength"+subValue1Symbol+statsArray[59]
        +multipleValueSymbol+"Agility"+subValue1Symbol+statsArray[60]
        +multipleValueSymbol+"Health"+subValue1Symbol+statsArray[61]
        +multipleValueSymbol+"Finesse"+subValue1Symbol+statsArray[62]
        +multipleValueSymbol+"Cleverness"+subValue1Symbol+statsArray[63]
        +multipleValueSymbol+"Perception"+subValue1Symbol+statsArray[64]
        +multipleValueSymbol+"Luck"+subValue1Symbol+statsArray[65]
    }
    finalString +=
    sectionHeadSymbol+"Friends, Family, and Biography"
    +keyTitleSymbol+"Friends"

    if (catFriendsList[0] != "") {
        for (let i = 0; i < catFriendsList.length; i++) {
            finalString += multipleValueSymbol+catFriendsList[i][0]+subValue1Symbol+catFriendsList[i][1]
        }
    }

    finalString +=
    keyTitleSymbol+"Family"

    if (catFamilyList[0] != "") {
        for (let i = 0; i < catFamilyList.length; i++) {
            finalString += multipleValueSymbol+catFamilyList[i][0]+subValue1Symbol+catFamilyList[i][1]
        }
    }
    finalString +=
    keyTitleSymbol+"Bean Cooldown Date?"+singleValueSymbol+familyOfBeansTravelDate
    +sectionHeadSymbol+"Pose and Edit Bio Settings"
    +keyTitleSymbol+"Pose"+singleValueSymbol
    +keyTitleSymbol+"Eyes"+singleValueSymbol
    +keyTitleSymbol+"Relationship Preferences"+singleValueSymbol
    +keyTitleSymbol+"Open to Biological Beans?"+singleValueSymbol
    +keyTitleSymbol+"Open to Adoptions?"+singleValueSymbol
    +sectionHeadSymbol+"Background Settings"
    +keyTitleSymbol+"Sort Group"+singleValueSymbol
    +keyTitleSymbol+"Sort Group Position"+singleValueSymbol
    +keyTitleSymbol+"Flags"+multipleValueSymbol
    console.log(finalString)
    let ageAndFinalStringArray = [catAge, physicalTraitsArray[0], finalString]
    return ageAndFinalStringArray
}

// UTILITY FUNCTIONS
// finds the text requested and returns the next line, for things where the "answer" to the searched things is on the next line
function simpleLineSearch(catPageInfo, textToCheck, lastCheckedLandmark) {
    for (let i = lastCheckedLandmark; i < catPageInfo.length; i++) {
        if (catPageInfo[i].includes(textToCheck)) {
            return catPageInfo[i+1]
        }
    }
}
// same as last but returns the same line for things that are found on the same line, like adventure class
function simpleLineSearchSameLine(catPageInfo, textToCheck, lastCheckedLandmark) {
    for (let i = lastCheckedLandmark; i < catPageInfo.length; i++) {
        if (catPageInfo[i].includes(textToCheck)) {
            return catPageInfo[i]
        }
    }
}

//finds what line some text is on
function simpleLineNumberSearch(catPageInfo, textToCheck, lastCheckedLandmark) {
    for (let i = lastCheckedLandmark; i < catPageInfo.length; i++) {
        if (catPageInfo[i].includes(textToCheck)) {
            return i
        }
    }
}

function getCanTravelDate(days) {
    let seasons = ["Spring", "Summer", "Fall", "Winter"]
    // each season is 49 days, each year is 4 seasons, or 196 days  
    let Year1Day1Date = new Date("01 September 2019 00:00:00 EST")
    let todayDateInfo = new Date()
    let timedifference = todayDateInfo.getTime() - Year1Day1Date.getTime()
    let daysdifference = parseInt(timedifference / (1000 * 3600 * 24))+days

    let catDays, catSeasons, catYears
    if (daysdifference/196 >= 1) {
        catYears = parseInt((daysdifference/196))
        daysdifference = daysdifference-196*catYears
    }
    if (daysdifference/49 >= 1) {
        catSeasons = parseInt((daysdifference/49))
        daysdifference = daysdifference-49*catSeasons
    }
    catDays = daysdifference
    catDays +=1
    catYears+=1
    let returnDate = seasons[catSeasons] + " " + catDays + ", Year " + catYears
    return returnDate
}

function autoFillGeneticStringFromPhysicalTraits(physicalTraitsArray) {
    let geneStringGenerated = "[C] " // auto filling in cat for now since everyone is cat
    let wind = ""
    //wind
    switch(physicalTraitsArray[2]) {
        case "North":
            geneStringGenerated += "[N?] "
            wind = "North"
            break
        case "South":
            geneStringGenerated += "[S?] "
            wind = "South"
            break
        case "Trade":
            geneStringGenerated += "[NS] "
            wind = "Trade"
            break
        case "Null":
            geneStringGenerated += "[OO] "
            wind = "Null"
            break
    }
    //fur
    switch(physicalTraitsArray[11]) {
        case "Shorthair":
            geneStringGenerated += "[S?] "
            break
        case "Longhair":
            geneStringGenerated += "[LL] "
            break
    }
    //color type, color, dilute, density
    switch(physicalTraitsArray[13]) {
        case "Standard":
            geneStringGenerated += checkStandardColorsFunction(physicalTraitsArray[12], wind)
            break
        case "Watercolor":
            geneStringGenerated += checkWatercolorsAndTortiesFunction(physicalTraitsArray[12], "Watercolor")
            break
        case "Tortoiseshell":
            geneStringGenerated += checkWatercolorsAndTortiesFunction(physicalTraitsArray[12], "Tortoiseshell")
            break
        case "-hidden-":
            geneStringGenerated += "[?????] "
            break
    }
    //pattern
    geneStringGenerated += checkPattern(physicalTraitsArray[14]) 
    //white 
    if (physicalTraitsArray[15] != "None") {
        console.log(physicalTraitsArray[15])
        console.log(physicalTraitsArray)
        if (physicalTraitsArray[16][2]) {
            geneStringGenerated += "[Y?" + physicalTraitsArray[16][1] + physicalTraitsArray[16][2] + physicalTraitsArray[16][0] + "]" // gonna leave no space here in case I add a setting later to not add growth/mystery genes automatically
        }
        else {
            geneStringGenerated += "[Y?" + physicalTraitsArray[16][1] + physicalTraitsArray[16][0] + "]" // gonna leave no space here in case I add a setting later to not add growth/mystery genes automatically
        }
    }
    else {
        geneStringGenerated += "[????]"
    }
    geneStringGenerated += " [??] [??]"
    return geneStringGenerated
}

function checkPattern(pattern) {
    let finalstring = ""
    switch(pattern) {
        case "Solid":
            finalstring = "[NN??] "
            break
        case "Mackerel":
            finalstring = "[Y?TT] "
            break
        case "Classic":
            finalstring = "[Y?TM] "
            break
        case "Broken":
            finalstring = "[Y?TS] "
            break
        case "Clouded":
            finalstring = "[Y?MM] "
            break     
        case "Spotted":
            finalstring = "[Y?SS] "
            break
        case "Rosette":
            finalstring = "[Y?MS] "
            break
        case "Lynxpoint":
            finalstring = "[Y?TP] "
            break
        case "Mink":
            finalstring = "[Y?SP] "
            break  
        case "Cloudpoint":
            finalstring = "[Y?MP] "
            break
        case "Colorpoint":
            finalstring = "[Y?PP] "
            break
        case "-hidden-":
            finalstring = "[????] "
            break
    }
    return finalstring
}

function checkWatercolorsAndTortiesFunction(color, colortype) {
    let blackList = ["Tan", "Chocolate", "Brown", "Black", "Silver", "Smoke", "Grey","Charcoal"]
    let orangeList = ["Apricot", "Orange", "Ginger", "Red", "Beige", "Almond", "Cream", "Buff"]
    let densityList = [1, 2, 3, 4, 1, 2, 3, 4]
    let i = 0
    let dilute = ""
    let colorGene = ""
    let density = ""
    let finalstring = "["
    let primarycolor = color.split("-")[0]
    switch (colortype) {
        case "Tortoiseshell":
            for (i = 0; i < blackList.length; i++) {
                if (primarycolor == blackList[i]) {
                    colorGene = "BO"
                    break
                }
                if (primarycolor == orangeList[i]) {
                    colorGene = "OB"
                    break
                }
            }
            break
        case "Watercolor":
            for (i = 0; i < blackList.length; i++) {
                if (primarycolor == blackList[i]) {
                    colorGene = "BB"
                    break
                }
                if (primarycolor == orangeList[i]) {
                    colorGene = "OO"
                    break
                }
            }
            break
    }
    if (i>3) {
        dilute = "DD"
        density = densityList[i]
    }
    else {
        dilute = "F?"
        density = densityList[i]
    }
    finalstring += colorGene + dilute + density + "] "
    return finalstring
}
    
function checkStandardColorsFunction(color, wind) {
    let blackList = ["Tan", "Chocolate", "Brown", "Black", "Silver", "Smoke", "Grey","Charcoal"]
    let orangeList = ["Apricot", "Orange", "Ginger", "Red", "Beige", "Almond", "Cream", "Buff"]
    let densityList = [1, 2, 3, 4, 1, 2, 3, 4]
    let i = 0
    let dilute = ""
    let colorGene = ""
    let density = ""
    let finalstring = "["
    for (i = 0; i < blackList.length; i++) {
        if (color == blackList[i]) {
            colorGene = "B"
            break
        }
        if (color == orangeList[i]) {
            colorGene = "O"
            break
        }
    }
    if (i>3) {
        dilute = "DD"
        density = densityList[i]
    }
    else {
        dilute = "F?"
        density = densityList[i]
    }
    switch(wind) {
        case "North":
            finalstring += colorGene + "?" + dilute + density + "] "
            break
        case "South":
            finalstring += "?" + colorGene + dilute + density + "] "
            break
    }
    return finalstring
}

// ngl prob don't need this here so much as in search functions and stuff so it'll auto find if a cat has aged up
function getCatAge() {}