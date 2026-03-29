function addVillage(plaintext) {
    //document.getElementById("catpreview").innerHTML = ""
    let trimmedTexts = trimText(plaintext)
    let tab = checkColumnHeads(trimmedTexts[0])
    console.log(trimmedTexts)
    let catsInfo = parseCatData(trimmedTexts[1], tab)
    console.log(catsInfo)
    let displaybox = document.querySelector(".display")
    displaybox.innerText = catsInfo
}

function trimText(text) {
    let trimRegEx = /.+\nAll Cats\nActive Cats Only\nTraveling Cats Only\nBasic Information\nPersonality \[Base\]\nAttributes \[Base\]\nPersonality \[w\/Bonus\]\nAttributes \[w\/Bonus\]\nDay Job Bonuses\nAdventuring Levels\nAdventuring Dice\nAppearances\nBirthdays\n\n((?:.|\n)+)\n[0-9]+ Users Online\nTerms of Service\nCommunity Guidelines\nPrivacy Policy\nCredits\nContact Us/gm
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
        ["Name	ID	Species	Wind	Fur Length	Color	Colortype	Pattern	White Level	White Type	Size	Eye Color	Accent", "Appearances"],
        ["Name	ID	Birth Season	Birth Day	Birth Year	Meta Birthday", "Birthdays"]
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
        case "Birthdays":
            if (confirm("Press OK to confirm that this is a paste of your Birthdays tab")) {
                return currentTab
                break
            }
    }
}

function parseCatData(text, tab) {
    let log = ""
    switch (tab) {
        case "Basic Information":
            log += "Basic Information:\n"
            let basicRegEx = /(.+)	([0-9]+)	(Trade|South|North|Null)	(n\/a|[A-z]+)	(n\/a|.+)	(n\/a|[A-z ]+)	(n\/a|[A-z]+)/gm
            let basicinfoMatch 
            while ((basicinfoMatch = basicRegEx.exec(text)) !== null) {
                let cat = {
                    name: basicinfoMatch[1],
                    id: Number(basicinfoMatch[2]),
                    wind: basicinfoMatch[3],
                    personality: {
                        type: basicinfoMatch[4]
                    },
                    aspect: basicinfoMatch[5],
                    job: basicinfoMatch[6],
                    class: basicinfoMatch[7]
                }
                if (cat.aspect == "n/a") {
                    cat.aspect = "Undiscovered"
                }
                if (cat.job == "n/a") {
                    cat.job = "Unassigned"
                }
                if (cat.class == "n/a") {
                    cat.class = "Unassigned"
                }
                log += saveCheck(cat)
            }     
            break
        case "Personality":
            log += "Personality:\n"
            let personalityRegEx = /(.+)	([0-9]+)	(n\/a|Adventurous|Commanding|Curious|Dramatic|Gentle|Imaginative|Jovial|Mysterious|Ordinary|Pleasant|Protective|Rebellious)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)/gm
            let personalityMatch
            while ((personalityMatch = personalityRegEx.exec(text)) !== null) {
                let cat = {
                    name: personalityMatch[1],
                    id: Number(personalityMatch[2]),
                    personality: {
                        type: personalityMatch[3],
                        Bravery: Number(personalityMatch[4]),
                        Benevolence: Number(personalityMatch[5]),
                        Energy: Number(personalityMatch[6]),
                        Extroversion: Number(personalityMatch[7]),
                        Dedication: Number(personalityMatch[8])
                    },
                }
                if (cat.personality.type == "n/a") {
                    cat.personality.type = "Unknown"
                }
                // logically if one stat is NaN right now, all of them are (bean age), so we delete them all if that's the case
                if (isNaN(cat.personality.Bravery)) {
                    delete cat.personality.Bravery
                    delete cat.personality.Benevolence
                    delete cat.personality.Energy
                    delete cat.personality.Extroversion
                    delete cat.personality.Dedication
                }
                log += saveCheck(cat)
            }
            break
        case "Attributes":
            log += "Attributes:\n"
            let attributesRegEx = /(.+)	([0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)/gm
            let attributesMatch
            while ((attributesMatch = attributesRegEx.exec(text)) !== null) {
                let cat = {
                    name: attributesMatch[1],
                    id: Number(attributesMatch[2]),
                    stats: {
                        Strength: Number(attributesMatch[3]),
                        Agility: Number(attributesMatch[4]),
                        Health: Number(attributesMatch[5]),
                        Finesse: Number(attributesMatch[6]),
                        Cleverness: Number(attributesMatch[7]),
                        Perception: Number(attributesMatch[8]),
                        Luck: Number(attributesMatch[9])
                    }
                }
                // logically if one stat is NaN right now, all of them are (bean age), so we delete them all if that's the case
                if (isNaN(cat.stats.Strength)) {
                    delete cat.stats
                }
                log += saveCheck(cat)
            }
            break
        case "Adventuring Levels":
            log += "Adventuring Levels:\n"
            let adventuringLevelsRegEx = /(.+)	([0-9]+)	(n\/a|Fighter|Thief|Guardian|Ranger|Medic|Scout|Bard|Unassigned)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)	(n\/a|[0-9]+)/gm
            let adventuringLevelsMatch
            while ((adventuringLevelsMatch = adventuringLevelsRegEx.exec(text)) !== null) {
                let cat = {
                    name: adventuringLevelsMatch[1],
                    id: Number(adventuringLevelsMatch[2]),
                    class: adventuringLevelsMatch[3],
                    classes: {
                        Fighter: {
                            level: Number(adventuringLevelsMatch[4])
                        },
                        Thief: {
                            level: Number(adventuringLevelsMatch[5])
                        },
                        Guardian: {
                            level: Number(adventuringLevelsMatch[6])
                        },
                        Ranger: {
                            level: Number(adventuringLevelsMatch[7])
                        },
                        Medic: {
                            level: Number(adventuringLevelsMatch[8])
                        },
                        Scout: {
                            level: Number(adventuringLevelsMatch[9])
                        },
                        Bard: {
                            level: Number(adventuringLevelsMatch[10])
                        }
                    }
                }
                if (cat.class == "n/a") {
                    delete cat.class
                }
                // logically if one stat is NaN right now, all of them are (bean age), so we delete them all if that's the case
                if (isNaN(cat.classes.Fighter.level)) {
                    delete cat.classes
                }
                log += saveCheck(cat)
            }
            break
        case "Appearances": 
            log += "Appearances:\n"
            let appearancesRegEx = /(.+)	([0-9]+)	(Not-cat|Mercat)	(North|South|Trade|Null)	(Longhair|Shorthair|n\/a)	(.+)	(Standard|Tortoiseshell|Watercolor|-hidden-|n\/a)	(.+)	([0-9]+|n\/a)	(Classic|Piebald|Left|Right|Inverse|Tabby|-hidden-|n\/a)	([0-9.]+|n\/a)	(.+)	(.+)/gm
            let appearancesMatch
            while ((appearancesMatch = appearancesRegEx.exec(text)) !== null) {
                let cat = {
                    name: appearancesMatch[1],
                    id: Number(appearancesMatch[2]),
                    species: appearancesMatch[3],
                    wind: appearancesMatch[4],
                    fur: {
                        length: appearancesMatch[5],
                        color: appearancesMatch[6],
                        type: appearancesMatch[7]
                    },
                    pattern: appearancesMatch[8],
                    white: {
                        level: Number(appearancesMatch[9]),
                        type: appearancesMatch[10]
                    },
                    size: {
                        lbs: Number(appearancesMatch[11])
                    },
                    eyes: {
                        color: appearancesMatch[12]
                    },
                    accentColor: appearancesMatch[13]
                }
                // if fur length is missing the cat is an unborn kitten, deleting any info we don't know
                if (cat.fur.length == "n/a") {
                    delete cat.fur
                    delete cat.pattern
                    delete cat.white
                    delete cat.size
                    delete cat.eyes // check if this needs to be deleted
                    delete cat.accentColor // check if this needs to be deleted
                }
                else {
                    // cat isn't unborn and has a size + other info
                    cat.size.kg = Number((cat.size.lbs / 2.205).toFixed(2))  
                    if (cat.white.type == "-hidden-") {
                        cat.white.level = "-hidden-"
                        cat.white.markings = "None"
                    }
                    else {
                        // cats that have white markings don't have the name defined in data, fixing that here
                        let whitetypesList = [["Classic", "C"], ["Piebald", "P"], ["Left", "L"], ["Right", "R"], ["Inverse", "I"], ["Tabby", "T"]]
                        let found = false
                        for (let i = 0; i < whitetypesList.length; i++) {
                            if (cat.white.type == whitetypesList[i][0]) {
                                cat.white.type = whitetypesList[i][1]
                                found = true
                                break
                            }
                        }
                        if (!found) {
                            alert("White type not recognized what is this? I'm just gonna have the program break here so it doesn't save weird data, please report if it ever does! This might happen when we get new white types, it's an easy fix just report it")
                            cout
                        }
                        let whitemarkings = [
                            ["C1", "Locket"],
                            ["C2", "Locket & Toes"],
                            ["C3", "Bib & Boots"],
                            ["C4", "Bib, Boots, & Belly"],
                            ["C5", "Classic Bicolor"],
                            ["C6", "Piebald"],
                            ["C7", "Spotted Piebald"],
                            ["C8", "Freckled Piebald"],
                            ["C9", "Van"],
                            ["C10", "Albino"],
                            ["P1", "Nose"],
                            ["P2", "Nose & Toes"],
                            ["P3", "Nose, Bib & Boots"],
                            ["P4", "Bib, Ears, & Belly"],
                            ["P5", "True Piebald"],
                            ["P6", "Scattered Piebald"],
                            ["P7", "Painted Spots"],
                            ["P8", "Confetti"],
                            ["P9", "Speckled Van"],
                            ["P10", "Albino"],
                            ["L1", "Toes"],
                            ["L2", "Tie & Toes"],
                            ["L3", "Tie, Toes & Chin"],
                            ["L4", "Chin, Boots, & Belly"],
                            ["L5", "Left Bicolor"],
                            ["L6", "Left Piebald"],
                            ["L7", "Left Patches"],
                            ["L8", "Left Spots"],
                            ["L9", "Left Van"],
                            ["L10", "Albino"],
                            ["R1", "Tail Tip"],
                            ["R2", "Tail Tip & Toes"],
                            ["R3", "Tail, Toes, & Tie"],
                            ["R4", "Tail, Boots, & Belly"],
                            ["R5", "Right Bicolor"],
                            ["R6", "Right Piebald"],
                            ["R7", "Right Patches"],
                            ["R8", "Right Spots"],
                            ["R9", "Right Van"],
                            ["R10", "Albino"],
                            ["I1", "Ear Tips"],
                            ["I2", "Ear & Tail Tips"],
                            ["I3", "Ears, Tail, & Toes"],
                            ["I4", "Snowspots"],
                            ["I5", "Snowmelt"],
                            ["I6", "Ghost"],
                            ["I7", "Owl Mantle"],
                            ["I8", "Heart Mantle"],
                            ["I9", "Heart"],
                            ["I10", "Albino"],
                            ["T1", "Tail Bands"],
                            ["T2", "Tail & Ear Bands"],
                            ["T3", "Small Stripes"],
                            ["T4", "Small Ribbons"],
                            ["T5", "Fishspine"],
                            ["T6", "Full Stripes"],
                            ["T7", "Full Ribbons"],
                            ["T8", "Birch"],
                            ["T9", "Scratch"],
                            ["T10", "Albino"]
                        ]
                        let thiswhite = cat.white.type + cat.white.level
                        for (let i = 0; i < whitemarkings.length; i++) {
                            if (thiswhite == whitemarkings[i][0]) {
                                cat.white.markings = whitemarkings[i][1]
                                break
                            }
                        }
                    }
                    cat.genes = findKnownGenes(cat.species, cat.wind, cat.fur.length, cat.fur.color, cat.fur.type, cat.pattern, cat.accentColor, cat.white.type, cat.white.level)
                }
                log += saveCheck(cat)
            }
            break
        case "Birthdays":
            log += "Birthdays:\n"
            let birthdaysRegEx = /(.+)	([0-9]+)	(Spring|Summer|Autumn|Winter)	([0-9]+)	([0-9]+)	([0-9]+)-([0-9]+)-([0-9]+)/gm
            let birthdaysMatch
            while ((birthdaysMatch = birthdaysRegEx.exec(text)) !== null) {
                let cat = {
                    name: birthdaysMatch[1],
                    id: Number(birthdaysMatch[2]),
                    birthday: {
                        season: birthdaysMatch[3],
                        day: Number(birthdaysMatch[4]),
                        year: Number(birthdaysMatch[5])
                    }
                }
                let seasons = ["Spring", "Summer", "Autumn", "Winter"]
                for (let i = 0; i < seasons.length; i++) {
                    if (cat.birthday.season == seasons[i]) {
                        cat.birthday.season = i+1
                        break
                    }
                }
                cat.age = getAge(cat.birthday)
                log += saveCheck(cat)
            }
            break
    }
    return log
}

// copied from cat.js and modified
function getAge(birthday) {
    // Spring 1 Year 1
    // September 1, 2019 EST in UTC for standardization
    const firstDay = new Date(Date.UTC(2019, 8, 1, 4))
    const seasonlength = 49
    const yearlength = seasonlength*4

    let catBirthdayDaysSince = (birthday.year-1)*yearlength + (birthday.season-1)*seasonlength + birthday.day-1

    // https://geshan.com.np/blog/2022/07/javascript-add-days-to-date/
    let catBaseDate = structuredClone(firstDay)
    let catBirthdayMS = catBaseDate.setDate(firstDay.getDate() + catBirthdayDaysSince)

    let currentDate = new Date()
    let currentDateMS = currentDate.getTime()
    let daysOldMS = currentDateMS - catBirthdayMS
    let daysOld = convertMiliseconds(daysOldMS, "d")

    if (daysOld > 111) {
        return "Adult"
    }
    if (daysOld > 83) {
        return "Adolescent"
    }
    if (daysOld > 55) {
        return "Kitten"
    }
    if (daysOld > 27) {
        return "Young Kitten"
    }
    if (daysOld >= 0) {
        return "Bean"
    }
    else {
        return "Expected Bean"
    }
}

// https://gist.github.com/flangofas/714f401b63a1c3d84aaa
function convertMiliseconds(miliseconds, format) {
  var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
  
  total_seconds = parseInt(Math.floor(miliseconds / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  hours = parseInt(total_hours % 24);
  
  switch(format) {
	case 's':
		return total_seconds;
	case 'm':
		return total_minutes;
	case 'h':
		return total_hours;
	case 'd':
		return days;
	default:
		return { d: days, h: hours, m: minutes, s: seconds };
  }
}



function saveCheck(cat) {
    let overrideSetting = document.getElementById("override-cats").checked
    cat = localStorageSettingChecks(cat)
    if (overrideSetting == true) {
        if (village.cats[cat.id]) {
            //MERGE OBJECTS: https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects
            let mergedCat = {...village.cats[cat.id], ...cat}
            village.cats[cat.id] = mergedCat
            return("Overrode: " + cat.name + " #" + cat.id + "\n")
        }
        else {
            village.cats[cat.id] = cat
            return("Saved new: " + cat.name + " #" + cat.id + "\n")
            
        }
    }
    if (overrideSetting == false) {
        if (village.cats[cat.id]) {
            return ""
        }
        else {
            village.cats[cat.id] = cat
            return("Saved new: " + cat.name + " #" + cat.id + "\n")
        }
    }
}

