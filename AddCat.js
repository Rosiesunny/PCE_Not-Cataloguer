function addCat(plaintext) {
    document.getElementById("catpreview").innerHTML = ""
    let trimmedTexts = trimWebsiteText(plaintext)
    let text = trimmedTexts[0] // main section of cat profile
    let relationshipsText = trimmedTexts[1] // just cat relationships
    let biographyText = trimmedTexts[2] // just the biography
    let wearingText = trimmedTexts[3] // just the clothes

    let catOwnerPoseEyesNameLocationPersonality = parseCatOwnerPoseEyesNameLocationPersonality(text)
    let catBasicInfo = parseBasicData(text)
    let catAppearanceInfo = parseAppearanceData(text, catBasicInfo)
    let catRelationships = parseRelationships(relationshipsText)

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


function trimWebsiteText(text) {
    const topSectionRegEx = /(?:Nestor's Wood ★|Gardenhome City ★|Crescent Pier ★)/gm
    let topsectiontrimm = text.split(topSectionRegEx)[1]
    const usersOnlineRegEx = /[0-9]+ Users Online\n?Terms of Service\n?Community Guidelines/gm
    let bottomsectiontrim = topsectiontrimm.split(usersOnlineRegEx)[0] // cut off bottom section
    let temp = bottomsectiontrim.split("Biography") ?? bottomsectiontrim // the rest = temp[0], biography and wearing = temp[1] - still needs to be split more
    const relationshipsRegEx = /(?:Relationships|Pre-City Contacts)/
    let mainandrelationships = temp[0].split(relationshipsRegEx) ?? "" // main section = mainandrelationships[0], relationships = mainandrelationships[1] - split #1 done
    let bioandwearing = ""
    if (temp[1]) {
        bioandwearing = temp[1].split("Currently Wearing: ") ?? "" //biography = bioandwearing[0], wearing = bioandwearing[1] - split #2 done
    }
    let finalTrims = [mainandrelationships[0], mainandrelationships[1], bioandwearing[0], bioandwearing[1]] // [mainsection, relationships, biography, wearing]
    return finalTrims
}

// UNUSED ON THIS PAGE BUT I WANNA KEEP IT FOR THE FUTURE
// not set up for official storage methods
// Parses multiple cats, for example on village pages. I need to add an optional part to also parse names/pronouns vs just this generic info. 
// Village pages have names/pronouns but for example, forum posts or cat biographies do not by default
// currently only grabs physical appearance data! but if we wanna do village pages we could also grab name job pronouns
function parseCatAltTextMultiple(text) {
    // we learning how regex works babiey 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    // https://www.freecodecamp.org/news/how-do-i-make-regex-optional-specify-optional-pattern-in-regular-expressions/
    // https://www.regular-expressions.info/lookaround.html
    const catAltTextRegEx = /(playing|standing|sleeping|upsidedown|sitting) (Not-cat|Mercat) (adult|kitten|bean) with a (black|choco|brown|tan|charc|grey|smoke|silver|red|ginger|orange|aprico|buff|cream|almond|beige|snow|albino) (solid|mackerel|classic|broken|lynxpoint|clouded|rosette|cloudpoint|spotted|mink|colorpoint)? ?(shorthair|longhair) coat ?(?:and )?(black|choco|brown|tan|charc|grey|smoke|silver|red|ginger|orange|aprico|buff|cream|almond|beige|snow)? ?(solid|mackerel|classic|broken|lynxpoint|clouded|rosette|cloudpoint|spotted|mink|colorpoint)? ?(?:trade markings)?(ruby|violet|amber|pink|blue|green|indigo|gold|teal|black)? ?(solid|mackerel|classic|broken|lynxpoint|clouded|rosette|cloudpoint|spotted|mink|colorpoint)? ?(?:tail)?(no white markings|locket \/ C1 white markings|locket & toes \/ C2 white markings|bib & boots \/ C3 white markings|bib, boots, & belly \/ C4 white markings|classic bicolor \/ C5 white markings|piebald \/ C6 white markings|spotted piebald \/ C7 white markings|freckled piebald \/ C8 white markings|van \/ C9 white markings|albino \/ C10 white markings|nose \/ P1 white markings|nose & toes \/ P2 white markings|nose, bib & boots \/ P3 white markings|bib, ears, & belly \/ P4 white markings|true piebald \/ P5 white markings|scattered piebald \/ P6 white markings|painted spots \/ P7 white markings|confetti \/ P8 white markings|speckled van \/ P9 white markings|albino \/ P10 white markings|toes \/ L1 white markings|tie & toes \/ L2 white markings|tie, toes & chin \/ L3 white markings|chin, boots, & belly \/ L4 white markings|left bicolor \/ L5 white markings|left piebald \/ L6 white markings|left patches \/ L7 white markings|left spots \/ L8 white markings|left van \/ L9 white markings|albino \/ L10 white markings|tail tip \/ R1 white markings|tail tip & toes \/ R2 white markings|tail, toes, & tie \/ R3 white markings|tail, boots, & belly \/ R4 white markings|right bicolor \/ R5 white markings|right piebald \/ R6 white markings|right patches \/ R7 white markings|right spots \/ R8 white markings|right van \/ R9 white markings|albino \/ R10 white markings|ear tips \/ I1 white markings|ear & tail tips \/ I2 white markings|ears, tail, & toes \/ I3 white markings|snowspots \/ I4 white markings|snowmelt \/ I5 white markings|ghost \/ I6 white markings|owl mantle \/ I7 white markings|heart mantle \/ I8 white markings|heart \/ I9 white markings|albino \/ I10 white markings) (dark brown|dark aqua|pale red|pale violet|pale blue|pale green|pale gold) (neutral|squint|sleepy|uwu|content|danger|sad|stern|right|left|wink|happy|pensive|ough|sparkling|wimdy|whoa|zoinks|sneer|cute) eyes\.(?:.+)?\n?(.+)\n(.+)\n?Wind \[(.+)\]\n?(.+) Personality\n?(.+) Aspect/gm
    let cats = []  
    let match    
    // Has the functionality for if they ever introduce separating pattern by trade/accent but for now we just ignore extra patterns
    // if we use the new regex (not updated in this function but is in parseCatOwnerPoseEyesNameLocationPersonality(text)), most of the matches are off by 1 number
    while ((match = catAltTextRegEx.exec(text)) !== null) {
        let cat = {
            pose: match[1],
            species: match[2],
            age: match[3],
            color: match[4],
            pattern: match[5],
            furlength: match[6],
            tradecolor: match[7],
            tradepattern: match[8],
            accentcolor: match[9],
            accentpattern: match[10],
            whitemarkings: match[11],
            eyecolor: match[12],
            eyes: match[13],
            name: match[14]
        }
        cats.push(cat)
    }
    return cats
}

// Does the same as parseCatAltText but only returns the cat object with pose and expression
// used for individual cat pages where the rest of the info is extracted from the cat page more cleanly than from the alt text
function parseCatOwnerPoseEyesNameLocationPersonality(text) {
    const catAltTextRegEx = /(?:(.+)'s Village: Profile » Scenery » Cats » Collections)?\n?\n?(This not-cat is a resident of Gardenhome City.|This not-cat is a resident of Crescent Pier.|Note: This not-cat is currently out traveling the world!)?\n?\n?‹?\n?›?\n?(playing|standing|sleeping|upsidedown|sitting) (Not-cat|Mercat) (adult|kitten|bean) with a (black|choco|brown|tan|charc|grey|smoke|silver|red|ginger|orange|aprico|buff|cream|almond|beige|snow|albino) (solid|mackerel|classic|broken|lynxpoint|clouded|rosette|cloudpoint|spotted|mink|colorpoint|ticked|ripple|agouti|karpati|freckle)? ?(shorthair|longhair) coat ?(?:and )?(black|choco|brown|tan|charc|grey|smoke|silver|red|ginger|orange|aprico|buff|cream|almond|beige|snow)? ?(solid|mackerel|classic|broken|lynxpoint|clouded|rosette|cloudpoint|spotted|mink|colorpoint|ticked|ripple|agouti|karpati|freckle)? ?(?:trade markings)?(ruby|violet|amber|pink|blue|green|indigo|gold|teal|black)? ?(solid|mackerel|classic|broken|lynxpoint|clouded|rosette|cloudpoint|spotted|mink|colorpoint|ticked|ripple|agouti|karpati|freckle)? ?(?:tail)?(.+) (dark brown|dark aqua|pale red|pale violet|pale blue|pale green|pale gold|cool odd) (neutral|squint|sleepy|uwu|content|danger|sad|stern|right|left|wink|happy|pensive|ough|sparkle|wimdy|whoa|zoinks|sneer|cute) eyes\.(?:.+)?\n?(.+)\n(?:(.+) (?:Wind)? \[(.+)\])?\n?(?:(.+) Personality)?\n?(?:(.+) Aspect)?/gm
    let match = catAltTextRegEx.exec(text)
    let cat = {
        owner: match[1],
        location: match[2],
        pose: match[3],
        eyes: match[15],
        name: match[16],
        personality: {
            type: match[19]
        }
    }
    if (typeof cat.location !== "undefined") {
        if (cat.location === "Note: This not-cat is currently out traveling the world!") {
            cat.location = "Traveling"
        }
        if (cat.location === "This not-cat is a resident of Gardenhome City.") {
            cat.location = "Gardenhome City"
            delete cat.owner
        }
        if (cat.location === "This not-cat is a resident of Crescent Pier.") {
            cat.location = "Crescent Pier"
            delete cat.owner
        }
    }
    else {
        cat.location = "Active"
    }
    return cat
}

function parseBasicData(text) {
    const basicDataRegEx = /Physical Traits\n?Basic Data:\n?Birthday:\n?(Spring|Summer|Autumn|Winter) ([0-9]+), Year ([0-9]+)\n?Age:\n?(Bean|Young Kitten|Kitten|Adolescent|Adult) \(.+\)\n?Wind:\n?(North|South|Trade|Null)\n?Pronouns:\n?(.+)\n?Aspect:\n?(Undiscovered)\n?Origin:\n?(Custom Cat|Migrated from Earth|Born in Nestor's Wood|Born in Gardenhome City|Born in Crescent Pier)\n?ID Code:\n?\[cat=([0-9]+)\]/gm
    let match = basicDataRegEx.exec(text)
    let seasons = ["Spring", "Summer", "Autumn", "Winter"]
    let seasonnum
    for (let i = 0; i < seasons.length; i++) {
        if (match[1].includes(seasons[i])) {
            seasonnum = i+1
            break
        }
    }

    let cat = {
        birthday: {season: seasonnum, day: Number(match[2]), year: Number(match[3])},
        age: match[4],
        wind: match[5],
        pronouns: {primary: match[6].split("/")[0], secondary: match[6].split("/")[1]},
        aspect: match[7],
        origin: match[8],
        id: Number(match[9])
    }
    return cat
}

function parseAppearanceData(text, basicdata) {
    const appearanceRegEx = /Appearance:\n?Species:\n?(Not-cat|Mercat)\n?Size:\n?([0-9]+\.?(?:[0-9]+)?) lbs. \/ ([0-9]+\.?(?:[0-9]+)?) kg\n?Fur:\n?(Shorthair|Longhair)\n?Color:\n?(-hid|.+[^ ]) ?(Tortoiseshell|Watercolor|Standard|den-)\n?Pattern:\n?(Solid|Mackerel|Classic|Broken|Lynxpoint|Clouded|Rosette|Cloudpoint|Spotted|Mink|Colorpoint|Ticked|Ripple|Agouti|Karpati|Freckle|-hidden-)\n?(?:Accent Color:)?\n?(Ruby|Violet|Amber|Pink|Blue|Green|Indigo|Gold|Teal|Black|-hidden-)?\n?White Marks:\n?(.+)\n?Eye Color:\n?(Dark Brown|Dark Aqua|Pale Red|Pale Violet|Pale Blue|Pale Green|Pale Gold|Cool Odd)\n?(?:\[ (C|M) ] \[ (N|S|O)(N|S|O) ] \[ (S|L)(S|L) ] \[ (B|O)(B|O)(F|D)(F|D)([1-4]) ] \[ (Y|N)(Y|N)(T|S|M|P|A)(T|S|M|P|A) ] \[ (Y|N)(Y|N)([0-9]+)(C|P|L|R|I|T) ] \[ (A|B|C)(A|B|C) ] \[ (R|B|Y|L)(R|B|Y|L) ])?/gm
    let match = appearanceRegEx.exec(text)
    let cat = {
        species: match[1],
        size: {lbs: Number(match[2]), kg: Number(match[3])},
        fur: {length: match[4], color: match[5], type: match[6]},
        pattern: match[7],
        accentColor: match[8],
        white: {markings: match[9]},
        eyeColor: match[10], 
        genes: [match[11], match[12], match[13], match[14], match[15], match[16], match[17], match[18], match[19], Number(match[20]), match[21], match[22], match[23], match[24], match[25], match[26], Number(match[27]), match[28], match[29], match[30], match[31], match[32]]
    }
    // data fixes for storage
    if (cat.fur.color == "-hid" && cat.fur.type == "den-") {
        cat.fur.color = "-hidden-"
        cat.fur.type = "-hidden-"
    }
    if (typeof cat.accentColor == "undefined") {
        cat.accentColor = "-hidden-"
    }
    if (cat.white.markings == "None") {
        cat.white.level = "-hidden-"
        cat.white.type = "-hidden-"
    }
    else {
        const whiteRegEx = /(.+) \/ (.)([0-9]+)/gm 
        let match2 = whiteRegEx.exec(cat.white.markings)
        cat.white.level = Number(match2[3])
        cat.white.type = match2[2]
        cat.white.markings = match2[1]
    }
    if (typeof cat.genes[0] == "undefined") {
        cat.genes = findKnownGenes(cat.species, basicdata.wind, cat.fur.length, cat.fur.color, cat.fur.type, cat.pattern, cat.accentColor, cat.white.type, cat.white.level)
    }
    return cat
}


function parsePersonalityAndTrinketData(text) {
    const personalityRegEx = /Personality Traits\n?(Adventurous|Commanding|Curious|Dramatic|Gentle|Imaginative|Jovial|Mysterious|Ordinary|Pleasant|Protective|Rebellious) Personality:\n?Bravery:\n?([0-9]+)\n?Benevolence:\n?([0-9]+)\n?Energy:\n?([0-9]+)\n?Extroversion:\n?([0-9]+)\n?Dedication:\n?([0-9]+)\n?Held Trinket:\n?(.+)\n?(?:\[(.+) (.+)\])?/gm
    let match = personalityRegEx.exec(text)

    let cat = {
        personality: {
            type: match[1],
            Bravery: Number(match[2]),
            Benevolence: Number(match[3]),
            Energy: Number(match[4]),
            Extroversion: Number(match[5]),
            Dedication: Number(match[6])
        },
        trinket: {name: match[7], stat: match[8], mod: Number(match[9])}
    }
    if (cat.trinket.name === "None") {
        cat.trinket.stat = "None"
        cat.trinket.mod = 0
    }
    return cat
}

function parseJobAndAdvClassData(text) {
    const jobAndAdvClassRegEx = /Attributes and Occupations\n?Day Job: ([A-z ]+)(?: .+)?\n?(?:Hunter Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Gatherer Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Miner Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Fisher Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Bug Catcher Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Gardener Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Herbalist Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Farmer Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Flockherd Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Apothecary Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Clothier Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Scribe Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Artist Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Blacksmith Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Craftscat Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Builder Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Mason Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Baker Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?Adventuring Class: (.+)\n?(?:Fighter Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Thief Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Guardian Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Ranger Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Medic Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Scout Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?(?:Bard Level ([0-9]) \[([0-9]+|Maximum Level).+)?\n?/gm
    let match = jobAndAdvClassRegEx.exec(text)
    for (let i = 2; i < match.length; i++) {
        if (typeof match[i] == "undefined") {
            match[i] = 0
        }
        else {
            if (!isNaN(match[i])) {
                match[i] = Number(match[i])
            }
        }
    }

    let cat = {
        job: match[1],
        jobs: {
            Hunter: {level: match[2], exp: match[3]},
            Gatherer: {level: match[4], exp: match[5]},
            Miner: {level: match[6], exp: match[7]},
            Fisher: {level: match[8], exp: match[9]},
            Bugcatcher: {level: match[10], exp: match[11]},
            Gardener: {level: match[12], exp: match[13]},
            Herbalist: {level: match[14], exp: match[15]},
            Farmer: {level: match[16], exp: match[17]},
            Flockherd: {level: match[18], exp: match[19]},
            Apothecary: {level: match[20], exp: match[21]},
            Clothier: {level: match[22], exp: match[23]},
            Scribe: {level: match[24], exp: match[25]},
            Artist: {level: match[26], exp: match[27]},
            Blacksmith: {level: match[28], exp: match[29]},
            Craftscat: {level: match[30], exp: match[31]},
            Builder: {level: match[32], exp: match[33]},
            Mason: {level: match[34], exp: match[35]},
            Baker: {level: match[36], exp: match[37]}
        },
        class: match[38],
        classes: {
            Fighter: {level: match[39], exp: match[40]},
            Thief: {level: match[41], exp: match[42]},
            Guardian: {level: match[43], exp: match[44]},
            Ranger: {level: match[45], exp: match[46]},
            Medic: {level: match[47], exp: match[48]},
            Scout: {level: match[49], exp: match[50]},
            Bard: {level: match[51], exp: match[52]}
        } 
    }
    return cat
}

function parseAttributeAndMayorBoostData(text) {
    const attributeRegEx = /Strength\n?\n?([0-9]+)\n?\n?.+\n?\n?.+\n?\n?.+\n?\n?Agility\n?\n?([0-9]+)\n?\n?.+\n?\n?.+\n?\n?.+\n?\n?Health\n?\n?([0-9]+)\n?\n?.+\n?\n?.+\n?\n?.+\n?\n?Finesse\n?\n?([0-9]+)\n?\n?.+\n?\n?.+\n?\n?.+\n?\n?Cleverness\n?\n?([0-9]+)\n?\n?.+\n?\n?.+\n?\n?.+\n?\n?Perception\n?\n?([0-9]+)\n?\n?.+\n?\n?.+\n?\n?.+\n?\n?Luck\n?\n?([0-9]+)\n?\n?.+\n?\n?.+\n?\n?.+\n?\n?(?:The Mayor is currently providing the following effects to this cat:)?\n?(?:\+([0-9]) Strength)?(?:, )?(?:\+([0-9]) Agility)?(?:, )?(?:\+([0-9]) Health)?(?:, )?(?:\+([0-9]) Finesse)?(?:, )?(?:\+([0-9]) Cleverness)?(?:, )?(?:\+([0-9]) Perception)?(?:, )?(?:\+([0-9]) Luck)?(?:, )?&? ?(-[0-9]|\+[0-9])? ?(Bravery|Benevolence|Energy|Extroversion|Dedication)?/gm
    let match = attributeRegEx.exec(text)
    for (let i = 1; i < match.length-1; i++) {
        if (typeof match[i] == "undefined") {
            match[i] = 0
        }
        else {
            match[i] = Number(match[i])
        }
    }
    let cat = {
        stats: {
            Strength: match[1],
            Agility: match[2],
            Health: match[3],
            Finesse: match[4],
            Cleverness: match[5],
            Perception: match[6],
            Luck: match[7]
        },
        mayorboosts: {
            Strength: match[8],
            Agility: match[9],
            Health: match[10],
            Finesse: match[11],
            Cleverness: match[12],
            Perception: match[13],
            Luck: match[14],
            personality: {
                mod: match[15],
                stat: match[16]
            }
        }
    }
    return cat
}

function parseRelationships(text) {
    let friendsandfamily = text.split("Friends:")[1]
    let relationships = friendsandfamily.split("Family:")
    const relationshipsRegEx = /(.+) - (.+)\n?/gm
    let friends = []  
    let family = []
    let match    
    // Has the functionality for if they ever introduce separating pattern by trade/accent but for now we just ignore extra patterns
    while ((match = relationshipsRegEx.exec(relationships[0])) !== null) {
        let cat = {
            name: match[1],
            relationship: match[2]
        }
        friends.push(cat)
    }
    while ((match = relationshipsRegEx.exec(relationships[1])) !== null) {
        let cat = {
            name: match[1],
            relationship: match[2]
        }
        family.push(cat)
    }
    let cat = {
        friends: friends,
        family: family
    }
    return cat
}

function parseWearing(text) {
    if (text) {
        text = text.trim()
    }
    let cat = {
        clothes: {
            wearing: {}
        }
    }
    let wearing = []
    if (typeof text != "undefined") {
        const wearingRegEx = /([^#]*) #([0-9]+),? ?(?:by ([^,]*))?,? ?/gm
        let match 
        while ((match = wearingRegEx.exec(text)) !== null) {
            let clothing = {name: match[1], id: Number(match[2])}
            if (typeof match[3] != "undefined") {
                clothing.creator = match[3]
            }
            wearing.push(clothing)
        }
    }
    cat.clothes.wearing = wearing
    
    return cat
}

function adjustStats(attributesandmayorboosts, personalityandtrinket) {
    // https://www.geeksforgeeks.org/how-to-use-dynamic-variable-names-in-javascript/
    const persoStatsArray = ["Bravery", "Benevolence", "Energy", "Extroversion", "Dedication"]
    const statsArray = ["Strength", "Agility", "Health", "Finesse", "Cleverness", "Perception", "Luck"]
    // match trinket stat to statsarray
    let cat = {...attributesandmayorboosts, ...personalityandtrinket}
    
    for (let i = 0; i < persoStatsArray.length; i++) {
        if (cat.trinket.stat == persoStatsArray[i]) {
            eval("cat.personality." + persoStatsArray[i] + "-=" + cat.trinket.mod)
        }
        if (cat.mayorboosts.personality.stat == persoStatsArray[i]) {
            eval("cat.personality." + persoStatsArray[i] + "-=" + cat.mayorboosts.personality.mod)
        }
    }
    for (let i = 0; i < statsArray.length; i++) {
        eval("cat.stats." + statsArray[i] + "-= cat.mayorboosts." + statsArray[i])
    }
    delete cat.mayorboosts
    return cat
}


// add more requirements as I go
function saveCat(poseeyesnamelocationpersonality, basicdata, appearancedata, catjobandadvclassdata, statsdata, relationshipsdata, wearingdata, biographydata) {
    //MERGE OBJECTS: https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects
    let cat = {...basicdata, ...appearancedata, ...poseeyesnamelocationpersonality, ...catjobandadvclassdata, ...statsdata, ...relationshipsdata, ...wearingdata}
    cat.biography = biographydata
    if (cat.biography.includes("\n\nCurrently Wearing:\n")) {
        cat.biography = cat.biography.split("\n\nCurrently Wearing:\n")[0]
    }
    //fix eye data to be one object
    let eyesdata = {eyes: cat.eyes, color: cat.eyeColor}
    delete cat.eyes
    delete cat.eyeColor
    cat.eyes = eyesdata

    // DATA STORAGE SETTING CHECKS, REMOVED UNWANTED STORED ITEMS
    cat = localStorageSettingChecks(cat)

    // Initialize cat in village
    village.cats[cat.id] = cat
    console.log(village.cats[cat.id])
    tempDisplay(cat)
    return cat
}



function localStorageSettingChecks(cat) {
    if (typeof localStorage.getItem("storeFriends") !== "string") {
        fixLocalUndefined() // if storage settings don't exist yet, set to default
    }
    if (localStorage.getItem("storeFriends") == "false") {
        delete cat.friends
    }
    else {
        if (localStorage.getItem("autoMatchFriends") == "true") {
            autoMatchFamilyFriends(cat.friends, "friends", cat.id, cat.name)
        }
    }
    // in the future run auto match checks in another function here
    if (localStorage.getItem("storeFamily") == "false") {
        delete cat.family
    }
    else {
        if (localStorage.getItem("autoMatchFamily") == "true") {
            autoMatchFamilyFriends(cat.family, "family", cat.id, cat.name)
        }
    }
    if (localStorage.getItem("storePose") == "false") {
        delete cat.pose
    }
    if (localStorage.getItem("storeEyes") == "false") {
        delete cat.eyes.eyes
    }
    if (localStorage.getItem("storeSize") == "false") {
        delete cat.size
    }
    if (localStorage.getItem("storeClothes") == "false") {
        delete cat.clothes
    }
    if (localStorage.getItem("storeJobs") == "false") {
        delete cat.jobs
    }
    else {
        if (localStorage.getItem("storeJobsEXP") == "false") {
            let jobsArray = ["Apothecary", "Artist", "Baker", "Blacksmith", "Bugcatcher", "Builder", "Clothier", "Craftscat", "Farmer", "Fisher", "Flockherd", "Gardener", "Gatherer", "Herbalist", "Hunter", "Mason", "Miner", "Scribe"]
            for (let i = 0; i < jobsArray.length; i++) {
                eval("delete cat.jobs." + jobsArray[i] + ".exp")
            }
        }
    }
    if (localStorage.getItem("storeAdventuringClasses") == "false") {
        delete cat.classes
    }
    else {
        if (localStorage.getItem("storeAdventuringClassesEXP") == "false") {
            let classesArray = ["Bard", "Fighter", "Guardian", "Medic", "Ranger", "Scout", "Thief"]
            for (let i = 0; i < classesArray.length; i++) {
                eval("delete cat.classes." + classesArray[i] + ".exp")
            }
        }
    }
    if (localStorage.getItem("storeTrinket") == "false") {
        delete cat.trinket
    }
    if (localStorage.getItem("storeBiography") == "false") {
        delete cat.biography
    }
    if (localStorage.getItem("overwriteGeneString") == "false") {
        let savedcat = village.cats[cat.id] //if the cat is already saved this won't be undefined
        if (typeof savedcat !== "undefined") {
            if (savedcat.hasOwnProperty("genes")) {
                cat.genes = savedcat.genes
            }
        }
    }
    cat.lastUpdated = Date()
    return cat
}

// set default settings if there are no storage settings set
function fixLocalUndefined() {
    let defaultSettingsArray = [["storeFriends", "false"], ["autoMatchFriends", "false"], ["storeFamily", "false"], ["autoMatchFamily", "false"], ["storePose", "true"], ["storeSize", "true"], ["storeClothes", "false"], ["storeJobs", "true"], ["storeJobsEXP", "true"], ["storeAdventuringClasses", "true"], ["storeAdventuringClassesEXP", "true"], ["storeTrinket", "true"], ["storeBiography", "false"], ["overwriteGeneString", "true"], ["colorBBCode", "true"], ["listHiddenRecessive", "true"]]
    for (let i = 0; i < defaultSettingsArray.length; i++) {
        localStorage.setItem(defaultSettingsArray[i][0], defaultSettingsArray[i][1])
    }
    alert("No storage settings found- Default storage settings applied!")
}

function autoMatchFamilyFriends(relations, friendsorfamily, catid, name) {
    let myVillageArray = Object.entries(village.cats)
    // storedName is from myVillage in localstorage, relations is sent from the cat we're checking's friend/family list. first we find a name that matches
    for (let i = 0; i < relations.length; i++) {
        if (typeof(relations[i].id) === "undefined") { // there is no id assigned to the cat searched
            for (let j = 0; j < myVillageArray.length; j++) {
                let storedId = myVillageArray[j][0] // id of the cat we're looking up from storage, not current cat's id
                let storedName = village.cats[storedId].name
                if (storedName === relations[i].name) {
                    // name match found, now check if the other cat has that match too, and if the relationship matches
                    let storedRelations
                    if (friendsorfamily == "friends") {
                        storedRelations = village.cats[storedId].friends
                    }
                    if (friendsorfamily == "family") {
                        storedRelations = village.cats[storedId].family
                    }
                    if (typeof storedRelations !== "undefined") {
                        for (let k = 0; k < storedRelations.length; k++) {
                            if (name === storedRelations[k].name) {
                                // double name match, they both have the same name on their friends lists. but let's check relationship still
                                if (relations[i].relationship === storedRelations[k].relationship) {
                                    // the relations match too, let's add the ids to both of them
                                    relations[i].id = Number(storedId)
                                    if (friendsorfamily == "friends") {
                                        village.cats[storedId].friends[k].id = catid
                                    }
                                    if (friendsorfamily == "family") {
                                        village.cats[storedId].family[k].id = catid
                                    }
                                    myVillageArray.splice(j, 1) // delete cat from myVillageArray so it is skipped in future checks of friends/family
                                    break
                                }   
                            }
                        }
                    }
                    break
                }
            }
        }
    }

}

function tempDisplay(cat) {
    let test = document.querySelector(".display")
    test.innerHTML = cat

    const myArray = JSON.stringify(cat)
    test.innerHTML = myArray
    
    let displayhtml = "Location: " + cat.location + "<br>Name: " + cat.name + "<br>Birthday: "
    let seasons = ["None", "Spring", "Summer", "Autumn", "Winter"]
    for (let i = 0; i < seasons.length; i++) {
        if (cat.birthday.season === i) {
            displayhtml += seasons[i] + " " + cat.birthday.day + ", Year " + cat.birthday.year
            break
        }
    }
    displayhtml += "<br>Age: " + cat.age + "<br>Wind: " + cat.wind + "<br>Pronouns: " + cat.pronouns.primary + "/" + cat.pronouns.secondary + "<br>Aspect: " + cat.aspect + "<br>Origin: " + cat.origin + "<br>ID: " + cat.id + "<br>Species: " + cat.species + "<br>Size: " + cat.size.lbs + " lbs / " + cat.size.kg + "kg<br>Fur: " + cat.fur.length + "<br>Color: " +   cat.fur.color + " " + cat.fur.type + "<br>Pattern: " + cat.pattern + "<br>Accent Color: " + cat.accentColor + "<br>White Marks: " + cat.white.markings + " - " + cat.white.type + cat.white.level + "<br>Eyes: " + cat.eyes.color + " " + cat.eyes.eyes 
    displayhtml += addToDisplayHtml("Personality Type: ", cat.personality?.type)
    displayhtml += addToDisplayHtml("Personality Stats:<br> - Bravery: ", cat.personality?.Bravery)
    displayhtml += addToDisplayHtml(" - Benevolence: ", cat.personality?.Benevolence)
    displayhtml += addToDisplayHtml(" - Energy: ", cat.personality?.Energy)
    displayhtml += addToDisplayHtml(" - Extroversion: ", cat.personality?.Extroversion)
    displayhtml += addToDisplayHtml(" - Dedication: ", cat.personality?.Dedication)
    displayhtml += addToDisplayHtml("Held Trinket: ", cat.trinket?.name + " [" + cat.trinket?.stat + " " + cat.trinket?.mod + "]")

    displayhtml += addToDisplayHtml("Day Job: ", cat.job)
    if (cat.age !== "Bean") {
        let jobNamesArray = ["Hunter", "Gatherer", "Miner", "Fisher", "Bug Catcher", "Gardener", "Herbalist", "Farmer", "Flockherd", "Apothecary", "Clothier", "Scribe", "Artist", "Blacksmith", "Craftscat", "Builder", "Mason", "Baker"]
        for (let i = 0; i < jobNamesArray.length; i++) {
            let jobstring = ""
            if (localStorage.getItem("storeJobs") == "true") {
                if (i == 0) {
                    jobstring += "Jobs:<br>"
                }
                if (i == 4) {
                    jobstring += " - " + jobNamesArray[i] + ": Level " +cat.jobs?.Bugcatcher.level
                }
                else {
                    jobstring += " - " + jobNamesArray[i] + ": Level " + eval("cat.jobs?." + jobNamesArray[i] + ".level")
                }
                if (localStorage.getItem("storeJobsEXP") == "true") {
                    if (i == 4) {
                        jobstring += " [" + cat.jobs?.Bugcatcher.exp + " EXP]"
                    }
                    else {
                        jobstring += " [" + eval("cat.jobs?." + jobNamesArray[i] + ".exp") + " EXP]"
                    }
                }
                displayhtml += "<br>" + jobstring
            }
        }
    }
    
    
    displayhtml += addToDisplayHtml("Adventuring Class: ", cat.class)
    if (cat.age !== "Bean") {
        let classNamesArray = ["Fighter", "Thief", "Guardian", "Ranger", "Medic", "Scout", "Bard"]
        for (let i = 0; i < classNamesArray.length; i++) {
            let classstring = ""
            if (localStorage.getItem("storeAdventuringClasses") == "true") {
                if (i == 0) {
                    classstring += "Adventuring Classes:<br>"
                }
                classstring += " - " + classNamesArray[i] + ": Level " + eval("cat.classes?." + classNamesArray[i] + ".level")
                if (localStorage.getItem("storeAdventuringClassesEXP") == "true") {
                    classstring += " [" + eval("cat.classes?." + classNamesArray[i] + ".exp") + " EXP]"
                }
                displayhtml += "<br>" + classstring
            }
        }
    }
    

    displayhtml += addToDisplayHtml("Stats:<br> - Strength: ", cat.stats?.Strength)
    displayhtml += addToDisplayHtml(" - Agility: ", cat.stats?.Agility)
    displayhtml += addToDisplayHtml(" - Health: ", cat.stats?.Health)
    displayhtml += addToDisplayHtml(" - Finesse: ", cat.stats?.Finesse)
    displayhtml += addToDisplayHtml(" - Cleverness: ", cat.stats?.Cleverness)
    displayhtml += addToDisplayHtml(" - Perception: ", cat.stats?.Perception)
    displayhtml += addToDisplayHtml(" - Luck: ", cat.stats?.Luck)
    displayhtml += displayRelationships("Friends: ", cat.friends)
    displayhtml += displayRelationships("Family: ", cat.family)
    displayhtml += displayWearing("Wearing: ", cat.clothes?.wearing)
    displayhtml += displayKnownGenes("Known Gene String: ", cat.genes)
    displayhtml += addToDisplayHtml("Owner: ", cat.owner)
    


    test.innerHTML = displayhtml
}

function addToDisplayHtml(text, trait) {
    let newtext = ""
    if (trait) {
        if (typeof trait === "string") {
            if (trait.includes("undefined")) {
                return newtext
            }
            else {
                newtext += "<br>" + text + trait
            }
        }
        else {
            newtext += "<br>" + text + trait
        }   
    }
    return newtext
}

function displayRelationships(label, relationships) {
    if (relationships) {
        let newtext = "<br>" + label
        if (relationships.length == 0) {
            newtext += "<br> - None"
            return newtext
        }
        for (let i = 0; i < relationships.length; i++) {
            newtext += "<br> - " + relationships[i].name + " - " + relationships[i].relationship
            if (typeof relationships[i].id !== "undefined") {
                newtext += " - ID: " + relationships[i].id
            }
        }
        return newtext
    }
    else {
        return ""
    }
    
}

function displayWearing(label, wearing) {
    let newtext = "<br>" + label
    if (typeof wearing == "undefined") {
        return ""
    }
    if (wearing.length == 0) {
        newtext += "<br> - None"
        return newtext
    }
    for (let i = 0; i < wearing.length; i++) {
        newtext += "<br> - " + wearing[i].name + " #" + wearing[i].id
        if (wearing[i].creator) {
            newtext += " by " + wearing[i].creator
        }
    }
    return newtext
}

function displayKnownGenes(label, genes) {
    let newtext = "<br>" + label
    let groups = [1, 2, 2, 5, 4, 4, 2, 2]
    let num = 0
    for (let i = 0; i < groups.length; i++) {
        newtext += "["
        for (let j = 0; j < groups[i]; j++) {
            newtext += genes[num]
            num++
        }
        newtext += "] "
    }
    newtext = newtext.trim()
    return newtext
}









































function findKnownGenes(species, wind, fur, color, colortype, pattern, accentcolor, whitetype, whitelevel) {
    let geneString = ["?",   "?","?",   "?","?",    "?","?","?","?","?",    "?","?","?","?",    "?","?","?","?",    "?","?",    "?","?"]
        sectionSpecies(geneString, species)
        sectionWind(geneString, wind)
        sectionFur(geneString, fur)
        sectionColor(geneString, color, colortype, wind)
        sectionPattern(geneString, pattern)
        sectionAccentColor(geneString, accentcolor)
        sectionWhite(geneString, whitetype, whitelevel)
        return geneString
}

function sectionSpecies(geneString, species) {
    switch(species) {
        case "Not-cat": 
            geneString[0] = "C"
            break
        case "Mercat":
            geneString[0] = "M"
            break
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
    let densityList = [4, 3, 2, 1, 4, 3, 2, 1, 4, 3, 2, 1, 4, 3, 2, 1]
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
        case "Ticked":
            geneString[12] = "T"
            geneString[13] = "A"
            break
        case "Ripple":
            geneString[12] = "M"
            geneString[13] = "A"
            break
        case "Agouti":
            geneString[12] = "S"
            geneString[13] = "A"
            break
        case "Karpati":
            geneString[12] = "P"
            geneString[13] = "A"
            break
        case "Freckle":
            geneString[12] = "A"
            geneString[13] = "A"
            break
    }
}

function sectionAccentColor(geneString, accentcolor) {
    switch(accentcolor) {
        case "Ruby":
            geneString[20] = "R"
            geneString[21] = "R"
            break
        case "Violet":
            geneString[20] = "R"
            geneString[21] = "B"
            break
        case "Amber":
            geneString[20] = "R"
            geneString[21] = "Y"
            break
        case "Pink":
            geneString[20] = "R"
            geneString[21] = "L"
            break
        case "Blue":
            geneString[20] = "B"
            geneString[21] = "B"
            break
        case "Green":
            geneString[20] = "B"
            geneString[21] = "Y"
            break
        case "Indigo":
            geneString[20] = "B"
            geneString[21] = "L"
            break
        case "Gold":
            geneString[20] = "Y"
            geneString[21] = "Y"
            break
        case "Teal":
            geneString[20] = "Y"
            geneString[21] = "L"
            break
        case "Black":
            geneString[20] = "L"
            geneString[21] = "L"
            break
    }
}

//YN7C
//14 15 16 17
function sectionWhite(geneString, whitetype, whitelevel) {
    if (whitelevel != "-hidden-") {
        geneString[14] = "Y"
        geneString[16] = Number(whitelevel)
        geneString[17] = whitetype
    }
}

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA


