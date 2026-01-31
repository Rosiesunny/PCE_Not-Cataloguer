function addVillage(plaintext) {
    //document.getElementById("catpreview").innerHTML = ""
    let trimmedTexts = trimText(plaintext)
    let tab = checkColumnHeads(trimmedTexts[0])
    console.log(trimmedTexts)
    let catsInfo = parseCatData(trimmedTexts[1], tab)
    console.log(catsInfo)
    


    cout
    let cat
    if (catOwnerPoseEyesNameLocationPersonality.location !== "Gardenhome City") {
        if (catBasicInfo.age !== "Bean") {
            let catPersonalityAndTrinket = parsePersonalityAndTrinketData(text) // do not send to savecat
            let catJobAndAdvClass = parseJobAndAdvClassData(text)
            let catAttributeAndMayorBoost = parseAttributeAndMayorBoostData(text) // do not send to savecat
            let catAdjustedStats = adjustStats(catAttributeAndMayorBoost, catPersonalityAndTrinket)
            let catWearing = parseWearing(wearingText)
            cat = saveCat(catOwnerPoseEyesNameLocationPersonality, catBasicInfo, catAppearanceInfo, catJobAndAdvClass, catAdjustedStats, catRelationships, catWearing, biographyText)
        }
        else {
            cat = saveCat(catOwnerPoseEyesNameLocationPersonality, catBasicInfo, catAppearanceInfo, "", "", catRelationships, "", biographyText)
        }
    }
    else {
        cat = saveCat(catOwnerPoseEyesNameLocationPersonality, catBasicInfo, catAppearanceInfo, "", "", catRelationships, "", "")
    }

    let testbox = document.getElementById("catpreview")
    makeCatImage(cat.fur.length, cat.fur.color, cat.fur.type, cat.white.level, cat.white.type, cat.pattern, cat.accentColor, cat.eyes.eyes, cat.eyes.color, cat.pose, cat.age, cat.species, testbox)

    geneTestingButton(cat.genes, cat.id, cat.name, cat.wind, cat.fur, cat.white, cat.pattern, cat.accentColor, cat.eyes, cat.pose, cat.age, cat.species, document.getElementById("genetestingbutton"))
    bbcodeButton(cat.genes, cat.wind, document.getElementById("bbcodebutton"))
}

function trimText(text) {
    let trimRegEx = /.+\nAll Cats\nActive Cats Only\nTraveling Cats Only\nBasic Information\nPersonality \[Base\]\nAttributes \[Base\]\nPersonality \[w\/Bonus\]\nAttributes \[w\/Bonus\]\nDay Job Bonuses\nAdventuring Levels\nAdventuring Dice\nAppearances\n\n((?:.|\n)+)\n[0-9]+ Users Online\nTerms of Service\nCommunity Guidelines\nPrivacy Policy\nCredits\nContact Us/gm
    let match = trimRegEx.exec(text)
    let trimColumnHeadersRegEx = /(Name	ID	.+\n)((?:.|\n)+)*/gm
    let match2 = trimColumnHeadersRegEx.exec(match[1])
    return [match2[1], match2[2]]
}

function checkColumnHeads(text) {
    let columnHeadList = [
        ["Name	ID	Wind	Personality	Aspect	Occupation	Adventuring Class", "Basic Information"],
        ["Name	ID	Personality	Bravery	Benevolence	Energy	Extroversion	Dedication", "Personality"],
        ["Name	ID	STR	AGI	HLTH	FIN	CLEV	PERC	LUCK	Sum of Stats", "Attributes"],
        ["Name	ID	Occupation	Hunter	Gatherer	Miner	Fisher	Bug Catcher	Gardener	Herbalist	Farmer	Flockherd	Apothecary	Clothier	Scribe	Artist	Blacksmith	Craftscat	Builder	Mason	Baker", "Day Job Bonuses"],
        ["Name	ID	Adventuring Class	Fighter	Thief	Guardian	Ranger	Medic	Scout	Bard", "Adventuring Levels"],
        ["Name	ID	Melee Dice	Dodge Dice	Base Health	Range Dice	Support Dice	Base Initiative	Bravery Dice	Benev Dice	Spite Dice	Movement Tiles	Magic Dice", "Adventuring Dice"],
        ["Name	ID	Species	Wind	Fur Length	Color	Colortype	Pattern	White Level	White Type	Size	Eye Color	Accent", "Appearances"]
    ]
    let currentTab = ""
    for (let i = 0; i < columnHeadList.length; i++) {
        console.log(i)
        if (text.includes(columnHeadList[i][0])) {
            currentTab = columnHeadList[i][1]
            console.log("MATCH " + currentTab)
            break
        }
    }
    switch(currentTab) {
        case "Basic Information":
            if (confirm("Press OK if this is a paste of your Basic Information tab")) {
                return currentTab
            }
            break
        case "Personality":
            if (confirm("Press OK to confirm that this is a paste of your Personality [Base] tab! Please do not use the Personality [w/Bonus] tab, it will save inaccurate data")) {
                return currentTab
            }
            break
        case "Attributes":
            if (confirm("Press OK to confirm that this is a paste of your Attributes [Base] tab! Please do not use the Attributes [w/Bonus] tab, it will save inaccurate data")) {
                return currentTab
            }
            break
        case "Day Job Bonuses":
            alert("The paste you supplied is for Day Job Bonuses! We don't need this information, so we're skipping this paste")
            return
            break
        case "Adventuring Levels":
            if (confirm("Press OK to confirm that this is a paste of your Adventuring Levels tab")) {
                return currentTab
            }
            break
        case "Adventuring Dice":
            alert("The paste you supplied is for Adventuring Dice! We don't need this information, so we're skipping this paste")
            return
            break
        case "Appearances":
            if (confirm("Press OK to confirm that this is a paste of your Appearances tab")) {
                return currentTab
            }
            break
    }
}

function parseCatData(text, tab) {
    switch (tab) {
        case "Basic Information":
            let basicRegEx = /(.+)	([0-9]+)	(Trade|South|North|Null)	(n\/a|[A-z]+)	(n\/a|.+)	(n\/a|[A-z ]+)	(n\/a|[A-z]+)/gm
            break
        case "Personality":
            let personalityRegEx = /(.+)	([0-9]+)	(n\/a|Adventurous|Commanding|Curious|Dramatic|Gentle|Imaginative|Jovial|Mysterious|Ordinary|Pleasant|Protective|Rebellious)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)/gm
            break
        case "Attributes":
            let attributesRegEx = /(.+)	([0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)/gm
            break
        case "Adventuring Levels":
            let adventuringLevelsRegEx = /(.+)    ([0-9]+)    (n\/a|Fighter|Thief|Guardian|Ranger|Medic|Scout|Bard|Unassigned)    (n\/a|[0-9]+)    (n\/a|[0-9]+)    (n\/a|[0-9]+)    (n\/a|[0-9]+)    (n\/a|[0-9]+)    (n\/a|[0-9]+)    (n\/a|[0-9]+)/gm
            break
        case "Appearances":
            let appearancesRegEx = /(.+)	([0-9]+)	(Not-cat|Mercat)	(North|South|Trade|Null)	(Longhair|Shorthair|n\/a)	(.+)	(Standard|Tortoiseshell|Watercolor|-hidden-|n\/a)	(.+)	([0-9]+|n\/a)	(Classic|Piebald|Left|Right|Inverse|Tabby|-hidden-|n\/a)	([0-9.]+|n\/a)	(.+)	(.+)/gm
            break
    }


}