// handles adding buttons for various pages that are repeated across multiple pages, like gene testing button 

function geneTestingButton(catGeneString, id, name, wind, fur, white, pattern, accentcolor, eyes, pose, age, species, location) {
    if (catGeneString) {
        let geneString = geneStringifier(catGeneString)
        let functionName = "redirectToGeneTesting('" + geneString + "', '" + id + "', '" + name + "', '" + wind + "', '" + fur.length  + "', '" + fur.color + "', '" + fur.type  + "', '" + white.level  + "', '" + white.type + "', '"  + pattern + "', '" + accentcolor + "', '" + eyes.eyes + "', '" + eyes.color + "', '" + pose + "', '" + age + "', '" + species + "')"
        if (document.getElementById("continuetogenetester")) {
            let geneTestButton = document.getElementById("continuetogenetester")
            geneTestButton.setAttribute("onclick", functionName)
        }
        else {
            let geneTestButton = document.createElement('button')
            geneTestButton.setAttribute("id", "continuetogenetester")
            geneTestButton.textContent = "Continue to Gene Testing"
            
            geneTestButton.setAttribute("onclick", functionName)
            location.appendChild(geneTestButton)
        }
        localStorage.setItem('geneTesterCatData',"")
    }
}

// converts genestring array to genestring text, reuses code from displayInfo gene section. Could prob replace the displayinfo section with a call to this later but lazy for now
function geneStringifier(data) {
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
    geneStringText = geneStringText.trim()
    return geneStringText
}
// genestring, id, name, wind, furlength, color, colortype, whitelevel, whitetype, pattern, accentcolor, eyes, eyecolor, pose, age, species
function redirectToGeneTesting(genestring, id, name, wind, furlength, color, colortype, whitelevel, whitetype, pattern, accentcolor, eyes, eyecolor, pose, age, species) {
    console.log(genestring)
    if (wind == "Null") {
        alert("This cat is Null and can't be bred to be gene tested! Cancelling redirect")
        return
    }
    else {
        let cat = {
            geneString: genestring,
            id: id,
            name: name,
            wind: wind,
            furlength: furlength,
            color: color,
            colortype: colortype,
            whitelevel: whitelevel,
            whitetype: whitetype,
            pattern: pattern,
            accentColor: accentcolor,
            eyes: eyes,
            eyecolor: eyecolor,
            pose: pose,
            age: age,
            species: species
        }
        console.log(cat)
        localStorage.setItem('geneTesterCatData', JSON.stringify(cat))
        window.open("geneTesting.html", "_self")
    }
    
}
