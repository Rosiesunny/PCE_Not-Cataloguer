// comments look like this if they are one line
/*Comments look like this if you want to
spread them out over several lines for some
reason*/

// unsure how data is gonna get passed here but for now I'll just have it check a text string that's just regular text
//example string 
// [C] [SO] [LL] [BBDD4] [YNTT] [YN7P] [??] [??]
// [C] [S?] [LL] [?BDD4] [Y?TT] [Y?7P] [??] [??]
// [C] [N?] [S?] [?????] [????] [Y?10P] [??] [??] 
// [C] [NO] [LL] [BODD2] [YNTM] [NN6C] [??] [??]
 
//used for now since I don't have the program auto sending data over, for testing I just temp have this
function checkTextGeneString() {
    document.querySelector(".poopee").innerText = ""
    let textBoxEntry = document.querySelector(".testTextBox").value
    console.log(textBoxEntry)
    let catgenecode = document.querySelector("#genecodefull")
    catgenecode.textContent = textBoxEntry 
    let sections = make1darray(textBoxEntry)
    console.log(sections)
    let newsections = make2darray(sections)
    console.log(newsections)
    initialGenesSetup(newsections)
    let testList = checkWhatTestsAreNeeded(newsections)
  
    changeSelectText(testList)
    // do a function that changes the "select test" options to all of those
    // then figure out how to get the page to react when they select a test and add in the info needed
    // 3 arrays (testtypes (already done), testlookingfor (what the looking for text should display), and testexamples (image links))
    // when a test type is selected, use those 3 arrays to fill in the data with whatever test type matches the currently selected one
}

function changeExisting(ID, value) {
    let idarray = ["#wind-1", "#wind-2", "#fur-1", "#fur-2", "#color-1", "#color-2", "#dilute-1", "#dilute-2", "#density", "#pattern-yes-no-1", "#pattern-yes-no-2", "#pattern-1", "#pattern-2", "#white-yes-no-1", "#white-yes-no-2", "#white-level", "#white-type"]
    let positionarray = [5, 6, 10, 11, 15, 16, 17, 18, 19, 23, 24, 25, 26, 30, 31, 32, 33]
    //gotta check for albino since it messes with the length
    console.log(ID + " Change Existing: " + value)

}




function make1darray(textgenes) {
    let sections = textgenes.split("]")
    for (let i=0; i<sections.length-1; i++) {
        sections[i] = sections[i].split("[")[1]
    }
    sections.pop()
    let temp = sections.length
    if (temp < 8) {
        for (let i = 6; i < 8; i++) {
            sections[i] = "??"
        }
    }
    return sections
}

function make2darray(sections) {
    let newsectionsstart = ["C"]
    let array1 = arrayensmallen(sections[1])
    let array2 = arrayensmallen(sections[2])
    let array3 = arrayensmallen(sections[3])
    let array4 = arrayensmallen(sections[4])
    let array5 = arrayensmallen(sections[5], true)
    let newsections = [newsectionsstart, array1, array2, array3, array4, array5]
    return newsections
}

function arrayensmallen(gene, check) {
    let arraything = []
    let albinocheck = false
    if (check == true) {
        if (gene.length > 4) {
            albinocheck = true
        }
    }
    for (let i = 0; i < gene.length; i++) {
        arraything[i] = gene[i]
    }
    if (albinocheck == true) {
        arraything[2] = "10"
        arraything.splice(3, 1)
    }
    console.log(arraything)
    return arraything
}

function checkWhatTestsAreNeeded(array) {
    let testsneededstring = ""
    if (array[1][0] == "O") {
        return // don't run tests, the cat is null it cannot breed
    }
    if (array[1][1] == "?") {
        // Wind test needed
        testsneededstring += "Recessive Wind Check(" + array[1][0] +")|" 
    }
    if (array[2][1] == "?") {
        // Fur length test needed
        testsneededstring += "Recessive Fur Length Check|" 
    }
    if (array[5][2] == "10") {
        // cat is albino
        testsneededstring += "Hidden Pattern Check|Recessive No-White Check|Albino Hidden Colors Check|Albino Hidden Dilutes Check|Albino Hidden Densities Check|"
    }
    else {
        //cat isn't albino
        if (array[4][0] == "?") {
            // cat is solid
            testsneededstring += "Hidden Pattern Check|"
        }
        if (array[3][3] == "?") {
            // Dilute test needed
            testsneededstring += "Recessive Dilute Check|"
        }
        if (array[3][0] == "?") {
            // color gene 1 missing
            let othercolor = array[3][1]
            if (othercolor == "O") {
                testsneededstring += "Hidden Color Check(orange)(1)|"
            }
            if (othercolor == "B") {
                testsneededstring += "Hidden Color Check(black)(1)|"
            }
        } 
        if (array[3][1] == "?") {
            // color gene 2 missing
            let othercolor = array[3][0]
            if (othercolor == "O") {
                testsneededstring += "Hidden Color Check(orange)(2)|"
            }
            if (othercolor == "B") {
                testsneededstring += "Hidden Color Check(black)(2)|"
            }
        }
        if (array[5][0] == "?") {
            //cat displays no white 
            testsneededstring += "0 White Possibility Check|"
        } 
        else {
            if (array[5][1] == "?") {
                //unknown recessive white gene
                testsneededstring += "Recessive No-White Check|"
            }
        }
        if (array[5][3] == "?") {
            // unknown white type
            testsneededstring += "Hidden White Type Check|"
        }
        if (array[5][2] == "?") {
            testsneededstring += "Hidden White Level Check|"
        }
    }
    console.log(testsneededstring)
    let testsNeeded = testsneededstring.split("|")
    testsNeeded.pop()
    return testsNeeded
}

// value needs to be ".classname" or "#idname" when the function is called
function changeGenes(ID, value) {
    let finddiv = document.querySelector(ID)
    finddiv.textContent = value
    if (value == "?") {
        changeDescText(ID, "Unknown")
    }
    switch(ID) {
        case "#wind-1":
        case "#wind-2":
            switch(value) {
                case "N":
                    changeDescText(ID, "North")
                    break;
                case "S": 
                    changeDescText(ID, "South")
                    break;
                case "O":
                    changeDescText(ID, "Null")
                    break;
            }
            break
        case "#fur-1":
        case "#fur-2":
            switch(value) {
                case "S":
                    changeDescText(ID, "Shorthair")
                    break; 
                case "L":
                    changeDescText(ID, "Longhair")
                    break; 
            }
            break
        case "#color-1":
        case "#color-2":
            switch(value) {
                case "O":
                    changeDescText(ID, "Orange")
                    break; 
                case "B":
                    changeDescText(ID, "Black")
                    break; 
            }
            break
        case "#dilute-1":
        case "#dilute-2":
            switch(value) {
                case "F":
                    changeDescText(ID, "Full")
                    break; 
                case "D":
                    changeDescText(ID, "Dilute")
                    break; 
            }
            break
        case "#density":
            // for some reason trying to simplify this to just value + "/4 Color Density" completely breaks the rest of the program and it thinks the rest of the IDs are all density?? so manual way Ig
            changeDescText(ID, value+ "/4 Color Density")
            break
        case "#pattern-yes-no-1":
        case "#pattern-yes-no-2":
            switch(value) {
                case "Y":
                    changeDescText(ID, "Yes Pattern")
                    break; 
                case "N":
                    changeDescText(ID, "No Pattern")
                    break; 
            }
            break
        case "#pattern-1":
        case "#pattern-2":
            switch(value) {
                case "T":
                    changeDescText(ID, "Stripe")
                    break; 
                case "S":
                    changeDescText(ID, "Spot")
                    break; 
                case "M":
                    changeDescText(ID, "Marble")
                    break; 
                case "P":
                    changeDescText(ID, "Point")
                    break; 
            }
            break
        case "#white-yes-no-1":
        case "#white-yes-no-2":
            switch(value) {
                case "Y":
                    changeDescText(ID, "Yes White")
                    break; 
                case "N":
                    changeDescText(ID, "No White")
                    break; 
            }
            break
        case "#white-level":
            changeDescText(ID, value+ "/10 White Level")
            break
        case "#white-type":
            switch(value) {
                case "C":
                    changeDescText(ID, "Classic")
                    break; 
                case "P":
                    changeDescText(ID, "Piebald")
                    break; 
                case "L":
                    changeDescText(ID, "Left")
                    break; 
                case "R":
                    changeDescText(ID, "Right")
                    break; 
                case "I":
                    changeDescText(ID, "Inverse")
                    break; 
            }
            break
    }
}

function changeDescText(ID, value) {
    let newID = ID + "-desc"
    let finddiv = document.querySelector(newID)
    finddiv.textContent = value
    return
}

function initialGenesSetup(genes) {
    console.log(genes)
    //skipping species for now bc it's always not-cat
    changeGenes("#wind-1", genes[1][0])
    changeGenes("#wind-2", genes[1][1])
    changeGenes("#fur-1", genes[2][0])
    changeGenes("#fur-2", genes[2][1])
    changeGenes("#color-1", genes[3][0])
    changeGenes("#color-2", genes[3][1])
    changeGenes("#dilute-1", genes[3][2])
    changeGenes("#dilute-2", genes[3][3])
    changeGenes("#density", genes[3][4])
    changeGenes("#pattern-yes-no-1", genes[4][0])
    changeGenes("#pattern-yes-no-2", genes[4][1])
    changeGenes("#pattern-1", genes[4][2])
    changeGenes("#pattern-2", genes[4][3])
    changeGenes("#white-yes-no-1", genes[5][0])
    changeGenes("#white-yes-no-2", genes[5][1])
    changeGenes("#white-level", genes[5][2])
    changeGenes("#white-type", genes[5][3])
}

function changeSelectText(alltests) {
    let currentselect = document.getElementById("testquestion-select")
    currentselect.innerHTML = '\n<option>Select Test</option>'
    let currenttest = ""
    for (let i = 0; i < alltests.length; i++) {
        if (alltests[i].includes("(")) {
            let tempcolor = ""
            // all these set a value for the option along with the regular option name for special cases where we need to keep some hidden data
            if (alltests[i].includes("(black)")) {
                tempcolor = `"Hidden Color Check (black)` + alltests[i].split("(black)")[1] + `"`
            }
            if (alltests[i].includes("(orange)")) {
                tempcolor = `"Hidden Color Check (orange)` + alltests[i].split("(orange)")[1] + `"`
            }
            if (alltests[i].includes("(N)")||alltests[i].includes("(S)")) {
                tempcolor = `"Recessive Wind Check (` + alltests[i].split("(")[1] + `"`
            }
            currenttest = " value = " + tempcolor + ">" + alltests[i].split("(")[0]
        }
        else {
            currenttest = ">" + alltests[i]
        }
        currentselect.innerHTML += '\n<option' + currenttest + '</option>'
    }
}

function changeButtons() {
    let testTypesArray = ["Recessive Wind Check", "Recessive Fur Length Check", "Recessive Dilute Check", "Recessive Solid Check", "Hidden Color Check", "Hidden Pattern Check", "Recessive No-White Check", "0 White Possibility Check", "Hidden White Type Check", "Hidden White Level Check", "Albino Hidden Colors Check", "Albino Hidden Dilutes Check", "Albino Hidden Densities Check"]
    let lookingForArray = ["Any Null cats", "Any Longhair cats", "Any Dilute cats", "Any Solid cats", ["Any Black cats", "Any Orange cats"], "Check cat patterns", "Any No-white cats", "No-white cat frequency", "Check white types", "Highest white level found", "(hidden albino colors)", "(hidden albino dilutes)", "(hidden albino densities)"]
    let buttonsTextArray = [["Nulls Found", "No Nulls Found"], ["Longhairs Found", "No Longhairs Found"], ["Dilutes Found", "No Dilutes Found"], ["Solids Found", "No Solids Found"], ["Orange Cats Found", "No Orange Cats Found", "Black Cats Found", "No Black Cats Found"], ["Classic (TM)", "Mackerel (TT)", "Broken (TS)", "Lynxpoint (TP)"], ["No-whites found", "All cats have white"], ["No White Marks Found", "55% of cats have No White Marks", "9% of cats have No White Marks"], ["Classic Only", "Right and Classic", "Left and Classic", "Piebald and Classic", "Inverse and Classic"],["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], ["Black and Orange", "Orange Only", "Black Only"], ["All Dilutes", "Half Dilutes", "No Dilutes"], ["1", "2", "3", "4"]] 
    let idsArray = ["Skip (wind)", "#fur-2", "#dilute-2", "#pattern-yes-no-2", "Skip (hidden color check)", "Skip (HIDDEN PATTERN CHECK)", "#white-yes-no-2", "SKIP (0 WHITE POSSIBILITY CHECK)", "#white-type", "#white-level", "Skip (albino hidden colors check)", "Skip (albino hidden dilutes check)", "Skip (albino hidden densities check)"]
    let valuesArray = ["Skip (wind)", ["L", "S"], ["D", "F"], ["N", "Y"], "Skip (hidden color)", "Skip (hidden pattern check)", ["N", "Y"], ["NN", "YN", "YY"], ["C", "R", "L", "P", "I"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "Skip", "skip", "skip"]

    let currentselect = document.getElementById("testquestion-select")

    let answersection = document.getElementById('answer-section')
    let currentselectvalue = currentselect.value

    let resultFoundButton = document.createElement('button');
    let resultNotFoundButton = document.createElement('button');
    resultFoundButton.textContent = "Result Found" 
    resultNotFoundButton.textContent = "Result Not Found"
    if (currentselectvalue == "Select Test") {
        answersection.innerHTML = "Select a test to start"
    }
    else {
        for (let i = 0; i < testTypesArray.length; i++) {
            if (currentselectvalue.includes(testTypesArray[i])) {
                console.log(currentselectvalue)
                // checking if it's hidden color or recessive wind since they change different values depending on input
                // hidden pattern type needs its own entry because it has buttons to checkbox and THEN confirm, not just 1 click
                if (currentselectvalue.includes("Hidden Color Check") || currentselectvalue.includes("Recessive Wind Check") || currentselectvalue.includes("0 White Possibility Check") || currentselectvalue.includes("Hidden Pattern Check")) {
                    if (currentselectvalue.includes("Hidden Color Check")) {
                        if (currentselectvalue.includes("(black)")) {
                            answersection.innerHTML = "Looking for: " + lookingForArray[i][1]
                            resultFoundButton.textContent = buttonsTextArray[i][0]
                            resultNotFoundButton.textContent = buttonsTextArray[i][1]
                            if (currentselectvalue.includes("(1)")) {
                                resultFoundButton.setAttribute("onclick", "changeExisting('#color-1', 'O')")
                                resultNotFoundButton.setAttribute("onclick", "changeExisting('#color-1', 'B')")
                            }
                            else {
                                resultFoundButton.setAttribute("onclick", "changeExisting('#color-2', 'O')")
                                resultNotFoundButton.setAttribute("onclick", "changeExisting('#color-2', 'B')")
                            }
                            }
                        if (currentselectvalue.includes("(orange)")) {
                            answersection.innerHTML = "Looking for: " + lookingForArray[i][0] + "\n"
                            resultFoundButton.textContent = buttonsTextArray[i][2]
                            resultNotFoundButton.textContent = buttonsTextArray[i][3]
                            if (currentselectvalue.includes("(1)")) {
                                resultFoundButton.setAttribute("onclick", "changeExisting('#color-1', 'B')")
                                resultNotFoundButton.setAttribute("onclick", "changeExisting('#color-1', 'O')")
                            }
                            else {
                                resultFoundButton.setAttribute("onclick", "changeExisting('#color-2', 'B')")
                                resultNotFoundButton.setAttribute("onclick", "changeExisting('#color-2', 'O')")
                            }
                            }
                        answersection.appendChild(resultFoundButton);
                        answersection.appendChild(resultNotFoundButton);
                    }
                    if (currentselectvalue.includes("Recessive Wind Check")) {
                        answersection.innerHTML = "Looking for: " + lookingForArray[i]
                        if (currentselectvalue.includes("(S)")) {
                            resultFoundButton.setAttribute("onclick", "changeExisting('#wind-2', 'O')")
                            resultNotFoundButton.setAttribute("onclick", "changeExisting('#wind-2', 'S')")
                        }
                        if (currentselectvalue.includes("(N)")) {
                            resultFoundButton.setAttribute("onclick", "changeExisting('#wind-2', 'O')")
                            resultNotFoundButton.setAttribute("onclick", "changeExisting('#wind-2', 'N')")
                        }
                        answersection.appendChild(resultFoundButton);
                        answersection.appendChild(resultNotFoundButton);
                    }
                    if (currentselectvalue.includes("0 White Possibility Check")) {
                        answersection.innerHTML = "Looking for: " + lookingForArray[i]
                        for (let j = 0; j < buttonsTextArray[i].length; j++) {
                            let button = document.createElement('button');
                            button.textContent = buttonsTextArray[i][j]
                            let changeString = "zeroWhiteCheckChanges('" + valuesArray[i][j] + "')"
                            button.setAttribute("onclick", changeString)
                            answersection.appendChild(button)
                        }
                    }
                    if (currentselectvalue.includes("Hidden Pattern Check")) {
                        answersection.innerHTML = "Looking for: " + lookingForArray[i]
                        console.log("HIDDEN PATTERN CHECK KJSDHKJSDDSJK")
                        for (let j = 0; j < buttonsTextArray[i].length; j++) {
                            let outerdiv = document.createElement('div')
                            outerdiv.id = "outerdiv"
                            console.log("Piss" + j)
                            let checkbox = document.createElement('input')
                            checkbox.type = "checkbox"
                            checkbox.id = "idthing"
                            checkbox.classList.add("checkboxes")
                            let label = document.createElement('label')
                            label.htmlFor = "idthing"
                            label.appendChild(document.createTextNode(buttonsTextArray[i][j]))
                            console.log(label)
                            outerdiv.appendChild(checkbox)
                            outerdiv.appendChild(label)
                            answersection.appendChild(outerdiv)
                        }
                        
                    }
                }
                else {
                    // standard tests here (2 buttons, we know which slot is getting changed)
                    answersection.innerHTML = "Looking for: " + lookingForArray[i]
                    for (let j = 0; j < buttonsTextArray[i].length; j++) {
                        let button = document.createElement('button');
                        button.textContent = buttonsTextArray[i][j]
                        let changeString = "changeExisting('" + idsArray[i] + "', '" + valuesArray[i][j] + "')"
                        button.setAttribute("onclick", changeString)
                        answersection.appendChild(button)
                    }
                }
                break
            }
        }//call checkWhatTestsAreNeeded and then selectListOptions to narrow down what tests are still needed 
    }
    
}

// rn it's specific to just the 0 white check
function zeroWhiteCheckChanges(answer) {
    console.log(answer[0])
    console.log(answer[1])
    changeExisting("#white-yes-no-1", answer[0])
    changeExisting("#white-yes-no-2", answer[1])
}

function createButton() {
    
}

function selectListOptions() {
    // 3 arrays (testtypes (already done), testlookingfor (what the looking for text should display), and testexamples (image links))
    let testTypesArray = ["Recessive Wind Check", "Recessive Fur Length Check", "Recessive Dilute Check", "Recessive Solid Check", "Hidden Color Check", "Hidden Pattern Check", "Recessive No-White Check", "0 White Possibility Check", "Hidden White Type Check", "Hidden White Level Check", " Albino Hidden Colors Check", "Albino Hidden Dilutes Check", "Albino Hidden Densities Check"]
    // Tests:
    // Recessive Wind Check
    // Recessive Fur Length Check
    // Recessive Dilute Check
    // Recessive Solid Check
    // Hidden Color Check
    // Hidden Pattern Check
    // Recessive No-White Check
    // 0 White Possibility Check
    // Hidden White Type Check
    // Hidden White Level Check
    // Albino Hidden Color Check
    // Albino Hidden Dilute Check
    // Albino Hidden Density Check 
    let testLookingForArray = []
    let testExampleImagesArray = []
}

