// comments look like this if they are one line
/*Comments look like this if you want to
spread them out over several lines for some
reason*/

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



function kibbyDirector() {
    let textBoxEntry = document.querySelector(".testTextBox")
    let catPageInfoINITIAL = textBoxEntry.value.split("\n")
    let catVillageRole = checkForTravelingText(catPageInfoINITIAL) ?? ""
    console.log(catVillageRole)
    let catPageInfo = ensmallenCatPageInfo(catPageInfoINITIAL)
    //textBoxEntry.value = ""                      UNCOMMENT THIS FOR THE OFFICIAL VERSION
    let catKeyDataList = ""
    catKeyDataList = findPhysicalTraits(catPageInfo, catVillageRole)
    
    let ageSuffix = catKeyDataList.shift()
    catKeyDataList = catKeyDataList[0]
    let displayTest = catKeyDataList.replaceAll("[☎⌦]", "\n").replaceAll("[⬤⊝]", "\n").replaceAll("[⧯▣]", "\n").replaceAll("[⧮🈩]", "\n").replaceAll("[▲⊝]", "\n").replaceAll("[△☉]", "\n")
    document.querySelector(".poopee").innerText = displayTest
    
    //AGE CHECK HERE THAT DETERMINES WHAT ELSE GETS CALLED
    if (ageSuffix != "Bean") {
        console.log("not a bean")
         // add in whatever here that I need as variables for params
    }

    // ADD IN A VARIABLE FOR USER NOTES OTHER THAN THE CAT BIO! ONE THEY CAN EDIT IN-PROGRAM
    // ALSO ADD IN A VARIABLE THAT'LL BE A PLACEHOLDER FOR WHEN EVENTUALLY I'LL HAVE IT AUTO RECORD DATES OF STAT INCREASES FOR STUDENTS
    // OOO I COULD JUST MAKE IT SO THIS IS STORED IN THE NON-ADULT DATA? then it won't clutter the adult data as much for stuff that will never apply to MFE/gardenhome adults
}

function checkForTravelingText(catPageInfoINITIAL) {
    for (let travelcounter = 0; travelcounter < catPageInfoINITIAL.length; travelcounter++) {
        if (catPageInfoINITIAL[travelcounter].includes("This not-cat is currently out traveling the world!")) {
            return "Traveler"
        }
    }
    return "Active"
}

function ensmallenCatPageInfo(catPageInfoINITIAL) {
    //make new variable after sorting out possible initial redundant text
    let catPageInfo = []
    if (catPageInfoINITIAL[1].includes("[") == false) {
        console.log(catPageInfoINITIAL)
        let catNameLineStart = -1
        let correctLineFound = false
        for (findstartofcatprofilecounter = 0; findstartofcatprofilecounter < catPageInfoINITIAL.length && correctLineFound == false; findstartofcatprofilecounter++) {
            if (catPageInfoINITIAL[findstartofcatprofilecounter].includes("[")) {
                catNameLineStart = findstartofcatprofilecounter
                correctLineFound = true
                break
            }
        }
        for (let newarraycounter = 0; newarraycounter < catPageInfoINITIAL.length-catNameLineStart; newarraycounter++) {
            catPageInfo[newarraycounter] = catPageInfoINITIAL[newarraycounter+catNameLineStart-1]
        }
    }
    else {
        catPageInfo = catPageInfoINITIAL
    }
    let lastLine = -1
    for (let findendofcatprofilecounter = 125; findendofcatprofilecounter < catPageInfo.length; findendofcatprofilecounter++) {
        if (catPageInfo[findendofcatprofilecounter].includes("Users Online")) {
            lastLine = findendofcatprofilecounter
            break
        }
    }
    let initialLength = catPageInfo.length
    if (lastLine > 0) {
        for (let trimendcounter = 0; trimendcounter < initialLength-lastLine; trimendcounter++) {
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
    for (let pronouncount = 0; pronouncount < pronounsSearchList.length; pronouncount++) {
        if(catPronouns == pronounsSearchList[pronouncount]) {
            catPrimaryPronouns = catPronouns
            catSecondaryPronouns = "none"
            break;
        }
    }
    if (catPrimaryPronouns == "") {
        for (let pronouncount = 0; pronouncount < pronounsSearchList.length; pronouncount++) {
            if (catPronouns.split("/")[0] == pronounsSearchList[pronouncount].split("/")[0]) {
                catPrimaryPronouns = pronounsSearchList[pronouncount]
            }
            if (catPronouns.split("/")[1] == pronounsSearchList[pronouncount].split("/")[0]) {
                catSecondaryPronouns = pronounsSearchList[pronouncount]
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
    let catAspect = "unknown" // for now this is all cats so just auto assigning it to any of them
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
    let catColor = simpleLineSearch(catPageInfo, "Color:", lastCheckedLandmark).split(" ")[0]
    console.log("Color: "+catColor)
    let catColorType = simpleLineSearch(catPageInfo, "Color:", lastCheckedLandmark).split(" ")[1]
    console.log("Color Type: "+catColorType)
    let catPattern = simpleLineSearch(catPageInfo, "Pattern:", lastCheckedLandmark)
    console.log("Pattern: "+catPattern)
    let catWhiteMarks = simpleLineSearch(catPageInfo, "White Marks:", lastCheckedLandmark).split(" /")[0]
    console.log("White Marks: "+catWhiteMarks)
    let catWhiteTypeLevel = simpleLineSearch(catPageInfo, "White Marks:", lastCheckedLandmark).split("/ ")[1]
    console.log(catWhiteTypeLevel)
    let catEyeColor = simpleLineSearch(catPageInfo, "Eye Color:", lastCheckedLandmark)
    let eyeColorOffset = simpleLineNumberSearch(catPageInfo, "Eye Color:", lastCheckedLandmark)+2
    console.log("Eye Color: "+catEyeColor)
    let catGeneticString = catPageInfo[eyeColorOffset]
    console.log("Genetic String: "+catGeneticString)
    let physicalTraitsArray = [catAge, catID, catName, catWind, catPrimaryPronouns, catSecondaryPronouns, catPersonality, catBirthday, catAspect, catOrigin, catSpecies, catSize, catFurLength, catColor, catColorType, catPattern, catWhiteMarks, catWhiteTypeLevel, catEyeColor, catGeneticString]
    console.log(physicalTraitsArray)
    // IMPORTANT, I NEED TO SEND OVER ALL THE DATA I GATHERED FROM HERE TO THE NEXT FUNCTION! GOTTA PUT IT ALL TOGETHER IN A STRING HERE N MOVE IT OVER
    if (physicalTraitsArray[0] != "Bean") {
        let finalString = findCatStats(catPageInfo, lastCheckedLandmark, physicalTraitsArray, catVillageRole)
        return finalString
    }
    else {
        let finalString = findCatFriendsAndFamily(catPageInfo, lastCheckedLandmark, "", physicalTraitsArray, catVillageRole)
        return finalString
    }
    
}

//eventually add a third variable here for the above screaming
function findCatStats(catPageInfo, lastCheckedLandmark, physicalTraitsArray, catVillageRole) {
    //personality stats start here
    let catPersonalityTraitsList = []
    let personalityTraitsList = ["Bravery:", "Benevolence:", "Energy:", "Extroversion:", "Dedication:"]
    for (let personalitylistcounter = 0; personalitylistcounter < personalityTraitsList.length; personalitylistcounter++) {
        catPersonalityTraitsList[personalitylistcounter] = simpleLineSearch(catPageInfo, personalityTraitsList[personalitylistcounter], lastCheckedLandmark)
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
    for (let specialtyoccupationcounter = 0; specialtyoccupationcounter < specialtyOccupationsList.length; specialtyoccupationcounter++) {
        if (catJobCurrent == specialtyOccupationsList[specialtyoccupationcounter]) {
            catVillageRole = catJobCurrent
        }
    }
    let currentJobData = ""
    for (let jobcheckcounter=0; jobcheckcounter < jobList.length; jobcheckcounter++) {
        currentJobData = simpleLineSearchSameLine(catPageInfo, jobList[jobcheckcounter], jobLineNumber+1) ?? ""
        console.log(jobList[jobcheckcounter])                                                   //// TEMP HERE
        if (currentJobData != "") {
            catJobLevelList[jobcheckcounter] = currentJobData.split("Level ")[1].split(" [")[0]
            if (currentJobData.includes("Maximum Level")) {
                catJobExperienceList[jobcheckcounter] = "Maximum Level"
            }
            else{
                catJobExperienceList[jobcheckcounter] = currentJobData.split("[")[1].split("/")[0]
            }
        }
        else {
            catJobLevelList[jobcheckcounter] = "0"
            catJobExperienceList[jobcheckcounter] = "0"
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
    for (let classcheckcounter=0; classcheckcounter < adventureClassList.length; classcheckcounter++) {
        currentClassData = simpleLineSearchSameLine(catPageInfo, adventureClassList[classcheckcounter], adventureClassLineNumber+1) ?? ""
        console.log(adventureClassList[classcheckcounter])
        if (currentClassData != "") {
            catAdventureClassLevelList[classcheckcounter] = currentClassData.split("Level ")[1].split(" [")[0]
            if (currentClassData.includes("Maximum Level")) {
                catAdventureClassExperienceList[classcheckcounter] = "Maximum Level"
            }
            else{
                catAdventureClassExperienceList[classcheckcounter] = currentClassData.split("[")[1].split("/")[0]
            }
        }
        else {
            catAdventureClassLevelList[classcheckcounter] = "0"
            catAdventureClassExperienceList[classcheckcounter] = "0"
        }
    }
    console.log("Adventuring Class Level/Experience Lists:")
    console.log(catAdventureClassLevelList)
    console.log(catAdventureClassExperienceList)
    lastCheckedLandmark = adventureClassLineNumber+1

    let attributeList = ["Strength", "Agility", "Health", "Finesse", "Cleverness", "Perception", "Luck"]
    let attributeLineStartPosition = simpleLineNumberSearch(catPageInfo, "Strength", lastCheckedLandmark)+2
    let catAttributeList = []
    for (let attributecheckcounter = 0; attributecheckcounter < attributeList.length; attributecheckcounter++) {
        catAttributeList[attributecheckcounter] = catPageInfo[attributeLineStartPosition]
        attributeLineStartPosition += 10
    }
    console.log("Stat Attributes:")
    console.log(catAttributeList)
    let personalityMayorList = ["Bravery", "Benevolence", "Energy", "Extroversion", "Dedication"]
    let catMayorBoostModifiers = ["", "", "", "", "", "", "", "", "", "", "", ""]
    let mayorBoostStartPosition = simpleLineNumberSearch(catPageInfo, "The Mayor is currently providing the following effects to this cat:", lastCheckedLandmark)+1 ?? -1
    if (mayorBoostStartPosition > 1) { // checks if there is a mayor basically
        for (let mayorboostcounter = 0; mayorboostcounter < attributeList.length; mayorboostcounter++) {
            if (catPageInfo[mayorBoostStartPosition].includes(attributeList[mayorboostcounter])) {      
                catMayorBoostModifiers[mayorboostcounter] = catPageInfo[mayorBoostStartPosition].split(" "+attributeList[mayorboostcounter])[0]
                if (catMayorBoostModifiers[mayorboostcounter].includes(", ")) {
                    catMayorBoostModifiers[mayorboostcounter] = catMayorBoostModifiers[mayorboostcounter].split(", ")[1]
                }
            }
        }
        for (let mayorpersonalityboostcounter = 0; mayorpersonalityboostcounter < personalityMayorList.length; mayorpersonalityboostcounter++) {
            if (catPageInfo[mayorBoostStartPosition].includes(personalityMayorList[mayorpersonalityboostcounter])) {  
                catMayorBoostModifiers[mayorpersonalityboostcounter+attributeList.length] = catPageInfo[mayorBoostStartPosition].split("& ")[1].split(" ")[0] ?? ""
                break
            }
        }
    }
    console.log("Mayor Boosts: ")
    console.log(catMayorBoostModifiers) //all the numbers in order, first str agi hlth fin clv per lck, then personality stats in order bravery, benv, enrgy, extroversion, dedi
    for (let mayorboostdeductionscounter = 0; mayorboostdeductionscounter < catAttributeList.length; mayorboostdeductionscounter++) {
        catAttributeList[mayorboostdeductionscounter] = Number(catAttributeList[mayorboostdeductionscounter])-Number(catMayorBoostModifiers[mayorboostdeductionscounter])
    }
    for (let mayorboostpersodeductionscounter = 0; mayorboostpersodeductionscounter < catPersonalityTraitsList.length; mayorboostpersodeductionscounter++) {
        catPersonalityTraitsList[mayorboostpersodeductionscounter] = Number(catPersonalityTraitsList[mayorboostpersodeductionscounter])-Number(catMayorBoostModifiers[mayorboostpersodeductionscounter+catAttributeList.length])
    }
    console.log("Adjusted Personality Traits:")
    console.log(catPersonalityTraitsList)
    console.log("Adjusted Stat Attributes:")
    console.log(catAttributeList)
    let statsArray = []
    let overallcounter = 0
    for (let persotraitcounter = 0; persotraitcounter < catPersonalityTraitsList.length; persotraitcounter++) {
        statsArray[persotraitcounter] = catPersonalityTraitsList[persotraitcounter].toString()
        overallcounter++
    }
    statsArray[overallcounter] = catHeldTrinketName
    statsArray[overallcounter+1] = catHeldTrinketStat
    statsArray[overallcounter+2] = catJobCurrent
    overallcounter+=3
    for (let joblistcounter = 0; joblistcounter < catJobLevelList.length; joblistcounter++) {
        statsArray[joblistcounter+overallcounter] = catJobLevelList[joblistcounter]
        statsArray[joblistcounter+overallcounter+1] = catJobExperienceList[joblistcounter]
        overallcounter++
    }
    overallcounter += catJobLevelList.length
    statsArray[overallcounter] = catAdventureClassCurrent
    overallcounter++
    for (let classlistcounter = 0; classlistcounter < catAdventureClassLevelList.length; classlistcounter++) {
        statsArray[classlistcounter+overallcounter] = catAdventureClassLevelList[classlistcounter]
        statsArray[classlistcounter+overallcounter+1] = catAdventureClassExperienceList[classlistcounter]
        overallcounter++
    }
    overallcounter += catAdventureClassLevelList.length

    for (let attributecounter = 0; attributecounter < catAttributeList.length; attributecounter++) {
        statsArray[attributecounter+overallcounter] = catAttributeList[attributecounter].toString()
    }
    console.log(statsArray)
    let finalString = findCatFriendsAndFamily(catPageInfo, lastCheckedLandmark, statsArray, physicalTraitsArray, catVillageRole)
    return finalString
    //IMPORTANT, ALSO GOTTA TRANSFER DATA OVER THIS TIME!!
}

function findCatFriendsAndFamily(catPageInfo, lastCheckedLandmark, statsArray, physicalTraitsArray, catVillageRole) {
    let friendsStartPosition = simpleLineNumberSearch(catPageInfo, "Friends:", lastCheckedLandmark)+1 // first friend on the list, not the header
    let familyStartPosition = simpleLineNumberSearch(catPageInfo, "Family:", lastCheckedLandmark)+1 // first family on the list, not the header
    let catFriendsList = []
    let tempNAcheck = ""
    for (let friendcounter = 0; friendcounter < (familyStartPosition-friendsStartPosition-1); friendcounter++) {
        tempNAcheck = catPageInfo[friendsStartPosition+friendcounter]
        if (tempNAcheck == "n/a") {
            catFriendsList[friendcounter] = ""
            break
        }
        else {
            catFriendsList[friendcounter] = catPageInfo[friendsStartPosition+friendcounter].split(" - ")
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
    
    for (let familycounter = 0; familycounter < (biographyStartPosition-familyStartPosition-2-familyOfBeansCheck); familycounter++) {
        tempNAcheck = catPageInfo[familyStartPosition+familycounter]
        if (tempNAcheck == "n/a") {
            catFamilyList[familycounter] = ""
            break
        }
        else {
            catFamilyList[familycounter] = catPageInfo[familyStartPosition+familycounter].split(" - ")
        }
    }
    console.log("Family:")
    console.log(catFamilyList)
    console.log("uwu")
    console.log(biographyStartPosition)
    let finalString = buildKeyValueString(statsArray, physicalTraitsArray, catVillageRole, familyOfBeansTravelDate, catFriendsList, catFamilyList)
    return finalString
}

function buildKeyValueString(statsArray, physicalTraitsArray, catVillageRole, familyOfBeansTravelDate, catFriendsList, catFamilyList) {
    console.log(physicalTraitsArray)
    console.log(statsArray)
    console.log(catVillageRole)
    console.log(familyOfBeansTravelDate+"eEEEEEEEEEEEEEEE family of beans")
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
    +keyTitleSymbol+"Genetic String"+singleValueSymbol+physicalTraitsArray[18]

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
        for (let friendscounter = 0; friendscounter < catFriendsList.length; friendscounter++) {
            finalString += multipleValueSymbol+catFriendsList[friendscounter][0]+subValue1Symbol+catFriendsList[friendscounter][1]
        }
    }

    finalString +=
    keyTitleSymbol+"Family"

    if (catFamilyList[0] != "") {
        for (let familycounter = 0; familycounter < catFamilyList.length; familycounter++) {
            finalString += multipleValueSymbol+catFamilyList[familycounter][0]+subValue1Symbol+catFamilyList[familycounter][1]
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

    let ageAndFinalStringArray = [catAge, finalString]
    return ageAndFinalStringArray
}

// UTILITY FUNCTIONS
// finds the text requested and returns the next line, for things where the "answer" to the searched things is on the next line
function simpleLineSearch(catPageInfo, textToCheck, lastCheckedLandmark) {
    for (let arraycounter = lastCheckedLandmark; arraycounter < catPageInfo.length; arraycounter++) {
        if (catPageInfo[arraycounter].includes(textToCheck)) {
            return catPageInfo[arraycounter+1]
        }
    }
}
// same as last but returns the same line for things that are found on the same line, like adventure class
function simpleLineSearchSameLine(catPageInfo, textToCheck, lastCheckedLandmark) {
    for (let arraycounter = lastCheckedLandmark; arraycounter < catPageInfo.length; arraycounter++) {
        if (catPageInfo[arraycounter].includes(textToCheck)) {
            return catPageInfo[arraycounter]
        }
    }
}

//finds what line some text is on
function simpleLineNumberSearch(catPageInfo, textToCheck, lastCheckedLandmark) {
    for (let arraycounter = lastCheckedLandmark; arraycounter < catPageInfo.length; arraycounter++) {
        if (catPageInfo[arraycounter].includes(textToCheck)) {
            return arraycounter
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
    

// ngl prob don't need this here so much as in search functions and stuff so it'll auto find if a cat has aged up
function getCatAge() {}

