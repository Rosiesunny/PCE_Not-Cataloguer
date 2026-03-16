function localStorageSettingChecks(cat) {
    if (typeof localStorage.getItem("storeFriends") !== "string") {
        fixLocalUndefined() // if storage settings don't exist yet, set to default
    }
    if (localStorage.getItem("storeFriends") == "false") {
        delete cat.friends
    }
    else {
        if (localStorage.getItem("autoMatchFriends") == "true") {
            if (cat.friends) {
                autoMatchFamilyFriends(cat.friends, "friends", cat.id, cat.name)
            }
            
        }
    }
    // in the future run auto match checks in another function here
    if (localStorage.getItem("storeFamily") == "false") {
        delete cat.family
    }
    else {
        if (localStorage.getItem("autoMatchFamily") == "true") {
            if (cat.family) {
                autoMatchFamilyFriends(cat.family, "family", cat.id, cat.name)
            }
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
            if (cat.jobs) {
                let jobsArray = ["Apothecary", "Artist", "Baker", "Blacksmith", "Bugcatcher", "Builder", "Clothier", "Craftscat", "Farmer", "Fisher", "Flockherd", "Gardener", "Gatherer", "Herbalist", "Hunter", "Mason", "Miner", "Scribe"]
                for (let i = 0; i < jobsArray.length; i++) {
                    eval("delete cat.jobs." + jobsArray[i] + ".exp")
                }
            }
            
        }
    }
    if (localStorage.getItem("storeAdventuringClasses") == "false") {
        delete cat.classes
    }
    else {
        if (localStorage.getItem("storeAdventuringClassesEXP") == "false") {
            if (cat.classes) {
                let classesArray = ["Bard", "Fighter", "Guardian", "Medic", "Ranger", "Scout", "Thief"]
                for (let i = 0; i < classesArray.length; i++) {
                    eval("delete cat.classes." + classesArray[i] + ".exp")
                }
            }
        }
    }
    if (localStorage.getItem("storeTrinket") == "false") {
        delete cat.trinket
    }
    if (localStorage.getItem("checkBioForGeneString") == "true") {
        cat.genes = detectGeneStringInBiography(cat.biography, cat.genes)
    }
    if (localStorage.getItem("overwriteGeneString") == "false") {
        let savedcat = village.cats[cat.id] //if the cat is already saved this won't be undefined
        if (typeof savedcat !== "undefined") {
            if (savedcat.hasOwnProperty("genes")) {
                cat.genes = savedcat.genes
            }
        }
    }
    if (localStorage.getItem("storeBiography") == "false") {
        delete cat.biography
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
                                let relationmatch = checkRelationshipMatch(relations[i].relationship, storedRelations[k].relationship, friendsorfamily)
                                if (relationmatch == true) {
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
                }
            }
        }
    }

}

function checkRelationshipMatch(relation1, relation2, friendsorfamily) {
    let relationsMatchTerms
    if (friendsorfamily == "friends") {
        relationsMatchTerms = [
            ["Friend"],
            ["Rival"],
            ["Partner"],
            ["Best Friend"],
            ["Partner in Crime"],
            ["Best Nemesis"],
            ["Battle Buddy"],
            ["Sparring Partner"],
            ["Mentor", "Fosterling"]
        ]
    }
    if (friendsorfamily == "family") {
        // close or mischevious modifier can happen on all of these
        relationsMatchTerms = [
            ["Parent", "Child"],
            ["Not-Parent", "Not-Child"],
            ["Littermate"],
            ["Not-Littermate"],
            ["Sibling"],
            ["Not-Sibling"],
            ["Grandparent", "Grandchild"],
            ["Great Grandparent", "Great Grandchild"],
            ["Great Great Grandparent", "Great Great Grandchild"],
            ["Pibling", "Nibling"],
            ["Good Pibling", "Good Nibling"],
            ["Cousin"],
            ["Not-Cousin"],
            ["Good Cousin"]
        ]
        let modifiers = ["Close", "Mischievous"]
        for (let i = 0; i < modifiers.length; i++) {
            if (relation1.includes(modifiers[i])) {
                if (relation2.includes(modifiers[i])) {
                    relation1 = relation1.split(modifiers[i] + " ")[1]
                    relation2 = relation2.split(modifiers[i] + " ")[1]
                    break
                }
                else {
                    // first relationship is close/mischief, and the second isn't, return false already, it can't be a match
                    return false
                }
            }
        }
    }
    for (let i = 0; i < relationsMatchTerms.length; i++) {
        if (relationsMatchTerms[i].length > 1) {
            if (relation1 == relationsMatchTerms[i][0]) {
                if (relation2 == relationsMatchTerms[i][1]) {
                    // MATCH
                    return true
                }
                else {
                    return false
                }
            }
            if (relation1 == relationsMatchTerms[i][1]) {
                if (relation2 == relationsMatchTerms[i][0]) {
                    // MATCH
                    return true
                }
                else {
                    return false
                }

            }
        }
        else {
            if (relation1 == relationsMatchTerms[i][0]) {
                if (relation1 == relation2) {
                    // MATCH
                    return true
                }
                else {
                    return false
                }
            }
        }
    }
}

function detectGeneStringInBiography(biography, genes) {
    let genesRegEx = /\[ ?(.) ?\] ?\[ ?(.)(.) ?\] ?\[ ?(.)(.) ?\] ?\[ ?(.)(.)(.)(.)(.) ?\] ?\[ ?(.)(.)(.)(.) ?\] ?\[ ?(.)(.)([0-9]+|\?)(.) ?\] ?\[ ?(.)(.) ?\] ?\[ ?(.)(.) ?\]/gm
    let match = genesRegEx.exec(biography)
    if (match) {
        match.shift()
        let newarray = []
        for (let i = 0; i < match.length; i++) {
            newarray[i] = match[i]
        }
        return newarray
    }
    else {
        // check if the person is writing the white type wrong (C4 instead of 4C for example) and still accept that but fix the data
        let genesRegEx2 = /\[ ?(.) ?\] ?\[ ?(.)(.) ?\] ?\[ ?(.)(.) ?\] ?\[ ?(.)(.)(.)(.)(.) ?\] ?\[ ?(.)(.)(.)(.) ?\] ?\[ ?(.)(.)(.)([0-9]+|\?) ?\] ?\[ ?(.)(.) ?\] ?\[ ?(.)(.) ?\]/gm
        let match2 = genesRegEx2.exec(biography)
        if (match2) {
            match2.shift()
            let newarray = []
            for (let i = 0; i < match2.length; i++) {
                newarray[i] = match2[i]
            }
            let whitelevel = newarray[17]
            let whitetype = newarray[16]
            // fixing incorrect gene code
            newarray[16] = whitelevel
            newarray[17] = whitetype
            return newarray
        }
        else {
            return genes
        }
    }
}
