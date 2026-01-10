function loadStoredCat() {
    var url_vars = window.location.href.split("?")

    thisCat = village.cats[url_vars[1]]
    console.log(thisCat)

    if (thisCat) {
        changeInnerHTML("cat-id", "#" + thisCat.id + "<a href = 'https://www.pixelcatsend.com/cat&id=" + thisCat.id +"'><img class = 'toPCE scaleUpImage' src = 'assets/toPCE.png'></a>")
        changeInnerText("cat-name", thisCat.name)
        changeInnerText("cat-pronouns", thisCat.pronouns.primary + "/" + thisCat.pronouns.secondary)
        changeWind(thisCat.wind)
        changePersonality(thisCat.personality.type)
        changeAspect(thisCat.aspect)
        changeInnerText("cat-location", thisCat.location)
        changeInnerText("cat-owner", thisCat.owner ?? "Unknown")
        let genestringtext = getGeneString(thisCat.genes)
        changeInnerText("cat-gene-string", genestringtext)
        changeInnerText("cat-carries-list", listHiddenRecessive(genestringtext, thisCat.wind))
        changeInnerText("cat-birthday", seasonsDict[thisCat.birthday.season] + " " + thisCat.birthday.day + ", Year " + thisCat.birthday.year)
        changeInnerText("cat-age", thisCat.age) // ADD IN YEARS LATER WITH getAge(thisCat.birthday) once I have that done
        changeInnerText("cat-origin", thisCat.origin)
        changeInnerText("cat-species", thisCat.species)
        changeInnerText("cat-size", thisCat.size.lbs + " lbs. / " + thisCat.size.kg + " kg")
        changeInnerText("cat-fur-length", thisCat.fur.length)
        changeInnerText("cat-color", thisCat.fur.color + " " + thisCat.fur.type)
        changeInnerText("cat-pattern", thisCat.pattern)
        changeInnerText("cat-accent", thisCat.accentColor)
        changeCatWhite(thisCat.white)
        changeInnerText("cat-eye-color", thisCat.eyes.color)
        changeHeldTrinket(thisCat.trinket)
        changPersonalityStats(thisCat.personality)


    }

}

function changeInnerText(div_id, value) {
    let div = document.getElementById(div_id)
    div.innerText = value
}

function changeInnerHTML(div_id, value) {
    let div = document.getElementById(div_id)
    div.innerHTML = value
}

function changeWind(wind) {
    let symbol = document.getElementById("cat-wind-symbol")
    symbol.src = "assets/PCE_Assets/Symbols/Wind/wind_" + wind.toLowerCase() + ".png"
    let div = document.getElementById("cat-wind")
    div.innerText = wind
}

function changePersonality(personality) {
    console.log(personality)
    let personalityfile = personality
    if (personality == "Unknown") {
        personalityfile = "None"
    }
    let symbol = document.getElementById("cat-personality-symbol")
    symbol.src = "assets/PCE_Assets/Symbols/Personality/person_" + personalityfile.toLowerCase() + ".png"
    let div = document.getElementById("cat-personality")
    div.innerText = personality
}

function changeAspect(aspect) {
    let aspectfile = aspect
    if (aspect == "Undiscovered") {
        aspectfile = "None"
    }
    let symbol = document.getElementById("cat-aspect-symbol")
    symbol.src = "assets/PCE_Assets/Symbols/Aspect/aspect_" + aspectfile.toLowerCase() + ".png"
    let div = document.getElementById("cat-aspect")
    div.innerText = aspect
}

function getGeneString(genes) {
    var geneString = "";
    geneString += "[" + genes[0] + "]";
    geneString += " [" + genes[1] + genes[2] + "]";
    geneString += " [" + genes[3] + genes[4] + "]";
    geneString += " [" + genes[5] + genes[6] + genes[7] + genes[8] + genes[9] + "]";
    geneString += " [" + genes[10] + genes[11] + genes[12] + genes[13] + "]";
    geneString += " [" + genes[14] + genes[15] + genes[16] + genes[17] + "]";
    geneString += " [" + genes[18] + genes[19] + "]";
    geneString += " [" + genes[20] + genes[21] + "]";
    return geneString;
}

function getAge(birthday) {
    console.log(birthday)

}

function changeCatWhite(white) {
    if (white.markings == "None") {
        changeInnerText("cat-white-markings", white.markings)
    }
    else {
        changeInnerText("cat-white-markings", white.markings + " / " + white.type + white.level)
    }
}

function changeHeldTrinket(trinket) {
    if (trinket) {
        console.log(trinket)  // ADD IN TRINKET IMAGE HANDLING EVENTUALLY 
        if (trinket.name == "None") {
            document.getElementById("cat-trinket-name").innerText = trinket.name
            document.getElementById("cat-trinket-stats").innerText = ""
        }
        else {
            document.getElementById("cat-trinket-name").innerText = trinket.name
            let plusorminus = ""
            if (trinket.mod >= 0) {
                plusorminus = "+"
            }
            document.getElementById("cat-trinket-stats").innerText = trinket.stat + " " + plusorminus + trinket.mod

        }
        
    }
    else {
        document.getElementById("held-trinket-section").classList.add("hidden")
    }
}

function changPersonalityStats(stats) {
    let tempstats = structuredClone(stats)
    delete tempstats.type
    statNames = Object.keys(tempstats)
    for (let i = 0; i < statNames.length; i++) {
        let div = document.getElementById("cat-" + statNames[i].toLowerCase())
        let statlabel = eval("stats." + statNames[i]) + "/10"
        let labeldiv = div.querySelector(".bar-text")
        labeldiv.innerText = statlabel
        let bardiv = document.getElementById("cat-" + statNames[i].toLowerCase() + "-bar")
        let statpercent = String(eval("stats." + statNames[i]))+"0"
        let styletext = "width: " + statpercent + "%"
        bardiv.style = styletext
    }

}