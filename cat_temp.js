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
        changeAge(thisCat.birthday, thisCat.age)
        changeInnerText("cat-origin", thisCat.origin)
        changeInnerText("cat-species", thisCat.species)
        changeInnerText("cat-size", thisCat.size.lbs + " lbs. / " + thisCat.size.kg + " kg")
        changeInnerText("cat-fur-length", thisCat.fur.length)
        changeInnerText("cat-color", thisCat.fur.color + " " + thisCat.fur.type)
        changeInnerText("cat-pattern", thisCat.pattern)
        changeInnerText("cat-accent", thisCat.accentColor)
        changeCatWhite(thisCat.white)
        changeInnerText("cat-eye-color", thisCat.eyes.color)
        if (thisCat.trinket || thisCat.personality.Bravery || thisCat.stats) {
            if (thisCat.trinket) {
                changeHeldTrinket(thisCat.trinket)
            }
            if (thisCat.personality.Bravery) {
                changePersonalityStats(thisCat.personality)
            }
            if (thisCat.stats) {
                changeAttributeStats(thisCat.stats) 
                // add in something here to check if stats are accurate to current age
                // or if the cat has aged up since they were added

            }
        }
        else {
            hideColumn("col2")
        }
        if (thisCat.job || thisCat.jobs || thisCat.class || thisCat.classes || thisCat.clothes) {
            console.log("WEEWOOO")
        }
        else {
            hideColumn("col3")
        }
        
        
        
        

        


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
        // ADD IN TRINKET IMAGE HANDLING EVENTUALLY 
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

function changePersonalityStats(stats) {
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

function changeAttributeStats(stats) {
    statNames = Object.keys(stats)
    let statDiceAndModifiers = [
        {
            base_low: 0,
            base_high: 3,
            dice: "1d",
            modifier: -4,
            stat_desc: "Poor",
            class: "sb-poor"
        }, 
        {
            base_low: 4,
            base_high: 6,
            dice: "1d",
            modifier: -3,
            stat_desc: "Poor",
            class: "sb-poor"
        }, 
        {
            base_low: 7,
            base_high: 9,
            dice: "2d",
            modifier: -2,
            stat_desc: "Average",
            class: "sb-average"
        }, 
        {
            base_low: 10,
            base_high: 12,
            dice: "2d",
            modifier: -1,
            stat_desc: "Average",
            class: "sb-average"
        }, 
        {
            base_low: 13,
            base_high: 14,
            dice: "3d",
            modifier: 0,
            stat_desc: "Good",
            class: "sb-good"
        }, 
        {
            base_low: 15,
            base_high: 16,
            dice: "3d",
            modifier: 1,
            stat_desc: "Good",
            class: "sb-good"
        }, 
        {
            base_low: 17,
            base_high: 18,
            dice: "4d",
            modifier: 2,
            stat_desc: "Very Good",
            class: "sb-verygood"
        }, 
        {
            base_low: 19,
            base_high: 20,
            dice: "4d",
            modifier: 3,
            stat_desc: "Very Good",
            class: "sb-verygood"
        }, 
        {
            base_low: 21,
            base_high: 22,
            dice: "5d",
            modifier: 4,
            stat_desc: "Excellent",
            class: "sb-excellent"
        }, 
        {
            base_low: 23,
            base_high: 24,
            dice: "5d",
            modifier: 5,
            stat_desc: "Excellent",
            class: "sb-excellent"
        }, 
        {
            base_low: 25,
            base_high: 26,
            dice: "6d",
            modifier: 6,
            stat_desc: "Exceptional",
            class: "sb-exceptional"
        }, 
        {
            base_low: 27,
            base_high: 28,
            dice: "6d",
            modifier: 7,
            stat_desc: "Exceptional",
            class: "sb-exceptional"
        }, 
        {
            base_low: 29,
            base_high: 30,
            dice: "7d",
            modifier: 8,
            stat_desc: "Legendary",
            class: "sb-legendary"
        }, 
        {
            base_low: 31,
            base_high: 32,
            dice: "7d",
            modifier: 9,
            stat_desc: "Legendary",
            class: "sb-legendary"
        }, 
        {
            base_low: 33,
            base_high: 34,
            dice: "8d",
            modifier: 10,
            stat_desc: "Legendary+",
            class: "sb-legendary"
        }, 
        {
            base_low: 35,
            base_high: 36,
            dice: "8d",
            modifier: 11,
            stat_desc: "Legendary+",
            class: "sb-legendary"
        }, 
        {
            base_low: 37,
            base_high: 38,
            dice: "9d",
            modifier: 12
        }, 
        {
            base_low: 39,
            base_high: 40,
            dice: "9d",
            modifier: 13
        }   
    ]
    for (let i = 0; i < statNames.length; i++) {
        let stat = eval("stats." + statNames[i])
        let stat_value_id = "cat-" + statNames[i].toLowerCase() +"-value"
        let stat_value_div = document.getElementById(stat_value_id)
        stat_value_div.innerText = stat
        for (let j = 0; j < statDiceAndModifiers.length; j++) {
            if (stat <= statDiceAndModifiers[j].base_high && stat >= statDiceAndModifiers[j].base_low) {
                let attribute_box_id = statNames[i].toLowerCase() + "-box"
                let attribute_box_div = document.getElementById(attribute_box_id)
                attribute_box_div.classList.add(statDiceAndModifiers[j].class)
                let stat_dice_id = "cat-" + statNames[i].toLowerCase() + "-die"
                let stat_dice_div = document.getElementById(stat_dice_id)
                stat_dice_div.innerText = statDiceAndModifiers[j].dice
                let modifiernum = statDiceAndModifiers[j].modifier
                let modifierstring = ""
                if (modifiernum >= 0) {
                    modifierstring += "+"
                }
                modifierstring += String(statDiceAndModifiers[j].modifier)
                let stat_modifier_id = "cat-" + statNames[i].toLowerCase() + "-modifier"
                let stat_modifier_div = document.getElementById(stat_modifier_id)
                stat_modifier_div.innerText = modifierstring
                let stat_desc_id = "cat-" +  statNames[i].toLowerCase() + "-desc"
                let stat_desc_div = document.getElementById(stat_desc_id)
                stat_desc_div.innerText = statDiceAndModifiers[j].stat_desc
                break
            }
        }
    }

}

function changeAge(birthday, age) {
    // Spring 1 Year 1
    // September 1, 2019 EST in UTC for standardization
    const firstDay = new Date(Date.UTC(2019, 8, 1, 4))
    const seasonlength = 49
    const yearlength = seasonlength*4

    let catBirthdayDaysSince = (birthday.year-1)*yearlength + (birthday.season-1)*seasonlength + birthday.day-1

    // https://geshan.com.np/blog/2022/07/javascript-add-days-to-date/
    let catBaseDate = structuredClone(firstDay)
    let catBirthdayMS = catBaseDate.setDate(firstDay.getDate() + catBirthdayDaysSince)
    // irl date that the cat was born on
    let catBirthdayDate = new Date(catBirthdayMS)

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    const options = {
        timeZone: "America/New_York",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    // https://stackoverflow.com/questions/67473549/how-to-convert-new-date-gettime-to-est
    let catBirthdayDateServerTime = new Date(catBirthdayDate).toLocaleDateString("en-US", options)
    changeInnerText("cat-birthday-irl", catBirthdayDateServerTime)

    let currentDate = new Date()
    let currentDateMS = currentDate.getTime()
    let daysOldMS = currentDateMS - catBirthdayMS
    let daysOld = convertMiliseconds(daysOldMS, "d")

    if (daysOld > 111) {
        yearsOld = Math.floor(daysOld / yearlength)
        changeInnerText("cat-age", age + " (" + yearsOld + " Years)")
    }
    else {
        changeInnerText("cat-age", age + " (" + daysOld + " Days)")
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

function hideColumn(column_id) {
    let column = document.getElementById(column_id)
    column.style.display = "none"
}