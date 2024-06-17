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
}


function changeExisting(ID, value) {
    let idarray = ["#species", "#wind-1", "#wind-2", "#fur-1", "#fur-2", "#color-1", "#color-2", "#dilute-1", "#dilute-2", "#density", "#pattern-yes-no-1", "#pattern-yes-no-2", "#pattern-1", "#pattern-2", "#white-yes-no-1", "#white-yes-no-2", "#white-level", "#white-type", "#accent-color-1", "#accent-color-2"]
    let positionarray = [1, 5, 6, 10, 11, 15, 16, 17, 18, 19, 23, 24, 25, 26, 30, 31, 32, 33, 42, 43]
    // matching up positions with the official gene code array in cat storage data
    let plainpositionarray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 21]
    let catID = document.getElementById("yourCatID").innerText

    let genecodefull = document.getElementById("genecodefull")
    let genecodetext = genecodefull.innerText
    changeGenes(ID, value)
    for (let i = 0; i<idarray.length; i++) {
        if (idarray[i] == ID) {
            if (value == "10") { // fixing the 10 white error where it cuts out the white type
               value = value + genecodetext[33]
               let stringtemp1 = genecodetext.slice(0, 33)
               let stringtemp2 = genecodetext.split(stringtemp1)[1]
               genecodetext = stringtemp1 + "]" + stringtemp2
            }
            if (genecodetext.includes("10") && (ID.includes("#white-type"))) {
                positionarray[i] = positionarray[i]+1
            }
            genecodetext = replaceAt(genecodetext, positionarray[i], value)
            genecodefull.innerText = genecodetext
            // MAKE IT SAVE OVER THE GENE CODE HERE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            village.cats[catID].genes[plainpositionarray[i]] = value
            break
        }
    }
    //gotta check for albino since it messes with the length
    console.log(ID + " Change Existing: " + value)
    let sections = make1darray(genecodetext)
    let newsections = make2darray(sections)
    let testList = checkWhatTestsAreNeeded(newsections)
    changeSelectText(testList)

}

function replaceAt(string, index, replacement) {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length);
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
    let newsectionsstart = arrayensmallen(sections[0])
    let array1 = arrayensmallen(sections[1])
    let array2 = arrayensmallen(sections[2])
    let array3 = arrayensmallen(sections[3])
    let array4 = arrayensmallen(sections[4])
    let array5 = arrayensmallen(sections[5], true)
    let array6 = arrayensmallen(sections[6])
    let array7 = arrayensmallen(sections[7])
    let newsections = [newsectionsstart, array1, array2, array3, array4, array5, array6, array7]
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
    return arraything
}

function checkWhatTestsAreNeeded(array) {
    let testsneededstring = ""
    if (array[1][0] == "O" && array[1][1] == "O") {
        alert("This cat is null and cannot be gene tested! If you want to know its hidden genes, you have to use a Family Tree on the cat")
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
    if (array[3][0] == "?") {
        // color gene 1 missing
        let othercolor = array[3][1]
        if (othercolor == "O") {
            testsneededstring += "Hidden Color Check(orange)(1)|"
        }
        if (othercolor == "B") {
            testsneededstring += "Hidden Color Check(black)(1)|"
        }
        if (othercolor == "?") {
            testsneededstring += "Albino Hidden Colors Check|"
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
    if (array[3][3] == "?") {
        // Dilute test needed
        let othercolor = array[3][2]
        if (othercolor == "?") {
            testsneededstring += "Albino Hidden Dilutes Check|"
        }
        else {
            testsneededstring += "Recessive Dilute Check|"
        }
        
    }
    if (array[3][4] == "?") {
        testsneededstring += "Albino Hidden Densities Check|"
    }
    if (array[4][0] == "?") {
        testsneededstring += "Albino Pattern Display Check|"
    }
    if (array[4][1] == "?") {
        testsneededstring += "Recessive Solid Check|"
    } 
    // albino or solid unknown pattern
    if (array[4][2] == "?") {
        testsneededstring += "Hidden Pattern Check|"
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
    if (array[7][0] == "?") {
        testsneededstring += "Hidden Accent Color Check|"
    }
    
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
        case "#species":
            switch(value) {
                case "C":
                    changeDescText(ID, "Not-Cat")
                    break;
                case "M":
                    changeDescText(ID, "Mercat")
                    break;
            }
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
        case "#accent-color-1":
        case "#accent-color-2":
            switch(value) {
                case "R":
                    changeDescText(ID, "Red")
                    break;
                case "B":
                    changeDescText(ID, "Blue")
                    break;
                case "Y":
                    changeDescText(ID, "Yellow")
                    break;
                case "L":
                    changeDescText(ID, "Black")
                    break;
            }
    }
}

function changeDescText(ID, value) {
    let newID = ID + "-desc"
    let finddiv = document.querySelector(newID)
    finddiv.textContent = value
    return
}

function initialGenesSetup(genes) {
    changeGenes("#species", genes[0][0])
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
    changeGenes("#accent-color-1", genes[7][0])
    changeGenes("#accent-color-2", genes[7][1])
}

function changeSelectText(alltests) {
    let currentselect = document.getElementById("testquestion-select")
    currentselect.innerHTML = '\n<option>Select Test</option>'
    let currenttest = ""
    for (let i = 0; i < alltests.length; i++) {
        if (alltests[i].includes("(")) {
            // test specifier for which cat is needed for the test
            let tempcolor = ""
            
            if (alltests[i].includes("(black)")) {
                tempcolor = `"Hidden Color Check (black)` + alltests[i].split("(black)")[1] + `"`
            }
            if (alltests[i].includes("(orange)")) {
                tempcolor = `"Hidden Color Check (orange)` + alltests[i].split("(orange)")[1] + `"`
            }
            if (alltests[i].includes("(N)")||alltests[i].includes("(S)")) {
                tempcolor = `"Recessive Wind Check (` + alltests[i].split("(")[1] + `"`
            }
            // all these set a value for the option along with the regular option name for special cases where we need to keep some hidden data
            currenttest = " value = " + tempcolor + ">" + alltests[i].split("(")[0]
        }
        else {
            currenttest = ">" + alltests[i]
        }
        currentselect.innerHTML += '\n<option' + currenttest + '</option>'
    }
    let answersection = document.getElementById('answer-section')
    let buttonsection = document.getElementById('button-section')
    buttonsection.innerHTML = ""
    answersection.innerHTML = ""
    hideExamples()
    changeTestCatID("???")
}

function changeTestCatID(ID) {
    let testcatdiv = document.getElementById("testCatID")
    testcatdiv.innerText = ID
    let testcatimagediv = document.getElementById("testcatimage")
    if (ID == "???") {
        testcatimagediv.innerHTML = "<img src = 'assets/addcat.png'>"
    }
    else {
        testcatimagediv.innerHTML = "<img src = 'assets/Test_Cats/" + ID + ".png' id = 'testcatimg'>"
    }
}

function changeButtons() {
    hideExamples()
    let testTypesArray = ["Recessive Wind Check", "Recessive Fur Length Check", "Recessive Dilute Check", "Recessive Solid Check", "Hidden Color Check", "Hidden Pattern Check", "Recessive No-White Check", "0 White Possibility Check", "Hidden White Type Check", "Hidden White Level Check", "Albino Hidden Colors Check", "Albino Hidden Dilutes Check", "Albino Hidden Densities Check", "Albino Pattern Display Check", "Hidden Accent Color Check"]
    let lookingForArray = ["Any Null cats", "Any Longhair cats", "Any Dilute cats", "Any Solid cats", ["Any Black cats", "Any Orange cats"], "Check off seen patterns", "Any No-white cats", "Select how many cats are no-white", "Select white type from reference", "Mark highest white level found", "(hidden albino colors)", "Check what percentage of offspring are dilutes", "Select the lowest value density found", "Check what percentage of offspring are solid", "Check off seen accent colors"]
    let buttonsTextArray = [["Nulls Found", "No Nulls Found"], ["Longhairs Found", "No Longhairs Found"], ["Dilutes Found", "No Dilutes Found"], ["Solids Found", "No Solids Found"], ["Orange Cats Found", "No Orange Cats Found", "Black Cats Found", "No Black Cats Found"], ["Mackerel (TT)", "Classic (TM)", "Broken (TS)", "Lynxpoint (TP)"], ["No-whites found", "All cats have white"], ["No cats have White Marks", "55% of cats don't have White Marks", "9% of cats don't have White Marks"], ["Classic Only", "Right and Classic", "Left and Classic", "Piebald and Classic", "Inverse and Classic"],["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], ["Black and Orange", "Orange Only", "Black Only"], ["All Dilutes", "Half Dilutes", "No Dilutes"], ["1", "2", "3", "4"], ["All Solids", "Half Solids", "No Solids"], ["Blue (BB))", "Violet (BR)", "Green (BY)", "Indigo (BL)"]] 
    let idsArray = ["Skip (wind)", "#fur-2", "#dilute-2", "#pattern-yes-no-2", "Skip (hidden color check)", "Skip (HIDDEN PATTERN CHECK)", "#white-yes-no-2", "SKIP (0 WHITE POSSIBILITY CHECK)", "#white-type", "#white-level", "Skip (albino hidden colors check)", "Skip (albino hidden dilutes check)", "#density", "skip (albino pattern display check)", "skip (hidden accent color check)"]
    let valuesArray = ["Skip (wind)", ["L", "S"], ["D", "F"], ["N", "Y"], "Skip (hidden color)", "Skip (hidden pattern check)", ["N", "Y"], ["NN", "YN", "YY"], ["C", "R", "L", "P", "I"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "Skip (albino hidden colors)", ["DD", "FD", "FF"], ["1", "2", "3", "4"], ["NN", "YN", "YY"], "skip (hidden accent color check)"]
    let testCatIDArray = ["skip (wind)", "983", "983", "983", "skip (hidden color checK)", "skip (hidden pattern check)", "983", "skip (0 white possibility check)", "2014", "15075", "skip (albino hidden colors)", "319584", "663", "219202", "skip (accent color)but it's 572"]
    let examplesArray = ["NullsReference", "LonghairReference", ["Dilutes-BlackGroupReference", "Dilutes-OrangeGroupReference"], "SolidsReference", ["BlackGroupCatsReference", "OrangeGroupCatsReference"], "PatternsReference", "No-WhiteVSWhiteReference", "No-WhiteVSWhiteReference", ["ClassicWhiteTypeFullReference", "PiebaldWhiteTypeFullReference", "LeftWhiteTypeFullReference", "RightWhiteTypeFullReference", "InverseWhiteTypeFullReference"], ["ClassicWhiteTypeFullReference", "PiebaldWhiteTypeFullReference", "LeftWhiteTypeFullReference", "RightWhiteTypeFullReference", "InverseWhiteTypeFullReference"], ["BlackGroupCatsReference", "OrangeGroupCatsReference"], ["Dilutes-BlackGroupReference", "Dilutes-OrangeGroupReference"], "DensityReference", "SolidsReference"]

    let currentselect = document.getElementById("testquestion-select")
    console.log("changeButtons() ran")
    console.log(currentselect)


    let answersection = document.getElementById('answer-section')
    let buttonsection = document.getElementById('button-section')
    let currentselectvalue = currentselect.value

    console.log(currentselectvalue)
    buttonsection.innerHTML = ""
    answersection.innerHTML = ""

    let resultFoundButton = document.createElement('button');
    let resultNotFoundButton = document.createElement('button');
    resultFoundButton.textContent = "Result Found" 
    resultNotFoundButton.textContent = "Result Not Found"
    resultFoundButton.classList.add("answerbutton")
    resultNotFoundButton.classList.add("answerbutton")
    if (currentselectvalue == "Select Test") {
        buttonsection.innerHTML = "Select a test to start"
        changeTestCatID("???")
    }
    else {
        for (let i = 0; i < testTypesArray.length; i++) {
            if (currentselectvalue.includes(testTypesArray[i])) {
                // checking if it's hidden color or recessive wind since they change different values depending on input
                // hidden pattern type needs its own entry because it has buttons to checkbox and THEN confirm, not just 1 click
                if (currentselectvalue.includes("Hidden Color Check") || currentselectvalue.includes("Recessive Wind Check") || currentselectvalue.includes("0 White Possibility Check") || currentselectvalue.includes("Hidden Pattern Check") || currentselectvalue.includes("Albino Hidden Colors Check") || currentselectvalue.includes("Albino Hidden Dilutes Check") || currentselectvalue.includes("Albino Pattern Display Check") || currentselectvalue.includes("Hidden Accent Color Check") ) {
                    if (currentselectvalue.includes("Hidden Color Check")) {
                        changeExamples(["BlackGroupCatsReference", "OrangeGroupCatsReference"])
                        if (currentselectvalue.includes("(black)")) {
                            answersection.innerHTML = "Looking for: " + lookingForArray[i][1]
                            changeTestCatID("983")
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
                            changeTestCatID("3038")
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
                        buttonsection.appendChild(resultFoundButton);
                        buttonsection.appendChild(resultNotFoundButton);
                    }
                    if (currentselectvalue.includes("Recessive Wind Check")) {
                        changeExamples("NullsReference")
                        answersection.innerHTML = "Looking for: " + lookingForArray[i]
                        resultFoundButton.textContent = "Nulls Found" 
                        resultNotFoundButton.textContent = "Nulls Not Found"
                        if (currentselectvalue.includes("(S)")) {
                            changeTestCatID("9753")
                            resultFoundButton.setAttribute("onclick", "changeExisting('#wind-2', 'O')")
                            resultNotFoundButton.setAttribute("onclick", "changeExisting('#wind-2', 'S')")
                        }
                        if (currentselectvalue.includes("(N)")) {
                            changeTestCatID("4168")
                            resultFoundButton.setAttribute("onclick", "changeExisting('#wind-2', 'O')")
                            resultNotFoundButton.setAttribute("onclick", "changeExisting('#wind-2', 'N')")
                        }
                        buttonsection.appendChild(resultFoundButton);
                        buttonsection.appendChild(resultNotFoundButton);
                    }
                    if (currentselectvalue.includes("0 White Possibility Check")) {
                        changeExamples("No-WhiteVSWhiteReference")
                        answersection.innerHTML = "Looking for: " + lookingForArray[i]
                        changeTestCatID("43107")
                        for (let j = 0; j < buttonsTextArray[i].length; j++) {
                            let button = document.createElement('button');
                            button.textContent = buttonsTextArray[i][j]
                            button.classList.add("answerbutton")
                            let changeString = "zeroWhiteCheckChanges('" + valuesArray[i][j] + "')"
                            button.setAttribute("onclick", changeString)
                            buttonsection.appendChild(button)
                        }
                    }
                    if (currentselectvalue.includes("Hidden Pattern Check")) {
                        answersection.innerHTML = "Looking for: " + lookingForArray[i]
                        changeTestCatID("268864")
                        changeExamples("PatternsReference")
                        for (let j = 0; j < buttonsTextArray[i].length; j++) {
                            let outerdiv = document.createElement('div')
                            outerdiv.id = "outerdiv"
                            let checkbox = document.createElement('input')
                            checkbox.type = "checkbox"
                            checkbox.id = "idthing"
                            checkbox.classList.add("checkboxes")
                            let label = document.createElement('label')
                            labelFor = "idthing"
                            label.appendChild(document.createTextNode(buttonsTextArray[i][j]))
                            outerdiv.appendChild(checkbox)
                            outerdiv.appendChild(label)
                            buttonsection.appendChild(outerdiv)
                        }
                        let button = document.createElement('button');
                        button.textContent = "Submit"
                        button.classList.add("answerbutton")
                        button.setAttribute("onclick", "patternSubmit()")
                        button.id = "submitHiddenPattern"
                        buttonsection.appendChild(button)
                    }
                    if (currentselectvalue.includes("Hidden Accent Color Check")) {
                        answersection.innerHTML = "Looking for: " + lookingForArray[i]
                        changeTestCatID("572")
                        //ADD IN EXAMPLES HERE WHEN THEY ARE DONE
                        changeExamples("AccentsReference")
                        for (let j = 0; j < buttonsTextArray[i].length; j++) {
                            let outerdiv = document.createElement('div')
                            outerdiv.id = "outerdiv"
                            let checkbox = document.createElement('input')
                            checkbox.type = "checkbox"
                            checkbox.id = "idthing"
                            checkbox.classList.add("checkboxes")
                            let label = document.createElement('label')
                            labelFor = "idthing"
                            label.appendChild(document.createTextNode(buttonsTextArray[i][j]))
                            outerdiv.appendChild(checkbox)
                            outerdiv.appendChild(label)
                            buttonsection.appendChild(outerdiv)
                        }
                        let button = document.createElement('button');
                        button.textContent = "Submit"
                        button.classList.add("answerbutton")
                        button.setAttribute("onclick", "accentSubmit()")
                        button.id = "submitHiddenAccent"
                        buttonsection.appendChild(button)
                        
                    }
                    if (currentselectvalue.includes("Albino Hidden Colors Check")) {
                        changeTestCatID("663")
                        changeExamples(["BlackGroupCatsReference", "OrangeGroupCatsReference"])
                        answersection.innerHTML = "[Part 1] Looking for: black cats"
                        resultFoundButton.textContent = "Black cats found"
                        resultNotFoundButton.textContent = "ONLY Orange cats found"
                        resultFoundButton.setAttribute("onclick", "albinoColorSubmitPart1('B')")
                        resultNotFoundButton.setAttribute("onclick", "albinoColorSubmitPart1('O')")
                        buttonsection.appendChild(resultFoundButton)
                        buttonsection.appendChild(resultNotFoundButton)
                    }

                    if (currentselectvalue.includes("Albino Hidden Dilutes Check")) {
                        changeExamples(["Dilutes-BlackGroupReference", "Dilutes-OrangeGroupReference"])
                        answersection.innerHTML = "Looking for: " + lookingForArray[i]
                        changeTestCatID("319584")
                        for (let j = 0; j < buttonsTextArray[i].length; j++) {
                            let button = document.createElement('button');
                            button.textContent = buttonsTextArray[i][j]
                            button.classList.add("answerbutton")
                            let changeString = "albinoHiddenDilutesChanges('" + valuesArray[i][j] + "')"
                            button.setAttribute("onclick", changeString)
                            buttonsection.appendChild(button)
                        }
                    }
                    if (currentselectvalue.includes("Albino Pattern Display Check")) {
                        changeExamples(examplesArray[i])
                        answersection.innerHTML = "Looking for: " + lookingForArray[i]
                        changeTestCatID(testCatIDArray[i])
                        for (let j = 0; j < buttonsTextArray[i].length; j++) {
                            let button = document.createElement('button');
                            button.textContent = buttonsTextArray[i][j]
                            button.classList.add("answerbutton")
                            let changeString = "albinoPatternDisplayChanges('" + valuesArray[i][j] + "')"
                            button.setAttribute("onclick", changeString)
                            buttonsection.appendChild(button)
                        }
                    }
                }
                else {
                    answersection.innerHTML = "Looking for: " + lookingForArray[i]
                    if (currentselectvalue == "Hidden White Level Check") {
                        let whitereferencearray = ["P", "L", "R", "I"]
                        let whiteResultArray = ["PiebaldWhiteTypeFullReference", "LeftWhiteTypeFullReference", "RightWhiteTypeFullReference", "InverseWhiteTypeFullReference"]
                        let whitetype = document.getElementById("white-type").innerText
                        if (whitetype == "?") {
                            alert("It's recommended to do the White Type test before this test!")
                            whiteResultArray.unshift("ClassicWhiteTypeFullReference")
                            changeExamples(whiteResultArray)
                        }
                        else {
                            let whitefound = false
                            for (let i = 0; i < whitereferencearray.length; i++) {
                                if (whitetype == whitereferencearray[i]) {
                                    changeExamples(["ClassicWhiteTypeFullReference", whiteResultArray[i]])
                                    whitefound = true
                                }
                            }
                            if (whitefound == false) {
                                changeExamples("ClassicWhiteTypeFullReference")
                            }
                        }
                    }
                    else {
                        changeExamples(examplesArray[i])
                    }
                    changeTestCatID(testCatIDArray[i])
                    for (let j = 0; j < buttonsTextArray[i].length; j++) {
                        let button = document.createElement('button');
                        button.textContent = buttonsTextArray[i][j]
                        button.classList.add("answerbutton")
                        let changeString = "changeExisting('" + idsArray[i] + "', '" + valuesArray[i][j] + "')"
                        button.setAttribute("onclick", changeString)
                        buttonsection.appendChild(button)
                    }
                }
                break
            }
        }
    }
}


function albinoColorSubmitPart1(answer) {
    if (answer == "O") {
        changeExisting("#color-1", "O")
        changeExisting("#color-2", "O")
    }
    else {
        let answersection = document.getElementById('answer-section')
        let buttonsection = document.getElementById('button-section')
        let resultFoundButton = document.createElement('button');
        let resultNotFoundButton = document.createElement('button');
        resultFoundButton.classList.add("answerbutton")
        resultNotFoundButton.classList.add("answerbutton")
        buttonsection.innerHTML = ""
        answersection.innerHTML = ""
        changeTestCatID("227123")
        answersection.innerHTML = "[Part 2] Looking for: orange cats"
        resultFoundButton.textContent = "Orange cats found"
        resultNotFoundButton.textContent = "ONLY Black cats found"
        resultFoundButton.setAttribute("onclick", "albinoColorSubmitPart2('O')")
        resultNotFoundButton.setAttribute("onclick", "albinoColorSubmitPart2('B')")
        buttonsection.appendChild(resultFoundButton)
        buttonsection.appendChild(resultNotFoundButton)
    }
}

function albinoColorSubmitPart2(answer) {
    if (answer == "O") {
        changeExisting("#color-1", "B")
        changeExisting("#color-2", "O")
    }
    if (answer == "B") {
        changeExisting("#color-1", "B")
        changeExisting("#color-2", "B")
    }
}
    
function patternSubmit() {
    let checkboxes = document.querySelectorAll(".checkboxes")
    let count = 0;
    let hiddenPatternTypeArray = ["T", "M", "S", "P"]
    let twogenes = ""
    for (let i = 0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
            count = count+1
            twogenes += hiddenPatternTypeArray[i]
        }
    }
    if (count > 2) {
        alert("You should have a maximum of 2 boxes selected! Double check your answers and submit again")
    }
    else {
        if (count == 1) {
            //twogenes is applied for both pattern 1 and 2
            changeExisting("#pattern-1", twogenes)
            changeExisting("#pattern-2", twogenes)
        }
        if (count == 2) {
            //twogenes[0] is pattern 1, twogenes[1] is pattern 2
            changeExisting("#pattern-1", twogenes[0])
            changeExisting("#pattern-2", twogenes[1])
        }
    }
}

function accentSubmit() {
    let checkboxes = document.querySelectorAll(".checkboxes")
    let count = 0;
    let hiddenPatternTypeArray = ["B", "R", "Y", "L"]
    let twogenes = ""
    for (let i = 0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
            count = count+1
            twogenes += hiddenPatternTypeArray[i]
        }
    }
    if (count > 2) {
        alert("You should have a maximum of 2 boxes selected! Double check your answers and submit again")
    }
    else {
        if (count == 1) {
            //twogenes is applied for both pattern 1 and 2
            changeExisting("#accent-color-1", twogenes)
            changeExisting("#accent-color-2", twogenes)
        }
        if (count == 2) {
            //twogenes[0] is pattern 1, twogenes[1] is pattern 2
            changeExisting("#accent-color-1", twogenes[0])
            changeExisting("#accent-color-2", twogenes[1])
        }
    }
}

function zeroWhiteCheckChanges(answer) {
    changeExisting("#white-yes-no-1", answer[0])
    changeExisting("#white-yes-no-2", answer[1])
}

function albinoHiddenDilutesChanges(answer) {
    changeExisting("#dilute-1", answer[0])
    changeExisting("#dilute-2", answer[1])
}

function albinoPatternDisplayChanges(answer) {
    changeExisting("#pattern-yes-no-1", answer[0])
    changeExisting("#pattern-yes-no-2", answer[1])
}


function hideExamples() {
    document.querySelectorAll(".hidden").forEach((el) => {el.classList.remove("shown")})
}

function changeExamples(example) {
    document.querySelectorAll(".hidden").forEach((el) => {el.classList.remove("shown")})
    if (Array.isArray(example)) {
        for (let i = 0; i<example.length;i++) {
            let examplesearch = document.getElementById(example[i])
            examplesearch.classList.add("shown")
        }
    } 
    else {
        let examplesearch = document.getElementById(example)
        examplesearch.classList.add("shown")

    }
}

function loadStoredCatGene() {
    let localstorageSetup = localStorage.getItem('geneTesterCatData')
    localStorage.setItem('geneTesterCatData', "")
    let localstorageArray = localstorageSetup.split("|")

    let genecodestring = localstorageArray[2]
    console.log(genecodestring)
    let catgenecodesection = document.querySelector("#genecodefull")
    catgenecodesection.textContent = genecodestring

    let genecode1darray = make1darray(genecodestring)
    let genecode2darray = make2darray(genecode1darray)

    console.log(genecode2darray)
    
    initialGenesSetup(genecode2darray)
    
    let testList = checkWhatTestsAreNeeded(genecode2darray)
    changeSelectText(testList)

    changeYourCatName(localstorageArray[0])
    changeYourCatID(localstorageArray[1])
    generateYourCatImage(localstorageArray)
}

function generateYourCatImage(localstorageArray) {
    let imagearea = document.getElementById("yourCatImage")
    let furlength = localstorageArray[3].toLowerCase()
    let age = localstorageArray[4].toLowerCase()
    let species = localstorageArray[5]
    let speciesAbbreviation = species.toLowerCase()[0]
    if (species == "Not-cat") {
        species = "Not-Cat"
        speciesAbbreviation = "c"
    }
    
    // not sure why I have this here but I assume something was breaking in the past to cause me to do something this redundant
    if (age.includes("kitten")) {
        age = "kitten"
    }
    if (age.includes("adolescent")) {
        age = "adult"
    }
    let baseclass = speciesAbbreviation + "-" + age + "-" + furlength + "-standing"
    // main
    for (let i = 6; i < localstorageArray.length; i++) {
        // handles main and trade
        console.log(localstorageArray[i])
        if (localstorageArray[i].includes("_main_") || localstorageArray[i].includes("_trade_")) {
            let base = document.createElement("img")
            if (localstorageArray[i].includes("_main_")) {
                base.src = "assets/PCE_Assets/Cat/" + species + "/BaseColors/" + localstorageArray[i]
            }
            if (localstorageArray[i].includes("_trade_")) {
                base.src = "assets/PCE_Assets/Cat/" + species + "/TradeColors/" + localstorageArray[i]
            }
            base.classList.add(baseclass, "cat-base")
            imagearea.appendChild(base)
        }
        if (localstorageArray[i].includes("accent_")) {
            let accent = document.createElement("img")
            accent.src = "assets/PCE_Assets/Cat/" + species + "/AccentColors/" + localstorageArray[i]
            accent.classList.add(baseclass, "cat-base")
            imagearea.appendChild(accent)
        }
        if (localstorageArray[i].includes("white_")) {
            let white = document.createElement("img")
            white.src = "assets/PCE_Assets/Cat/" + species + "/WhiteMarkings/" + localstorageArray[i]
            white.classList.add(baseclass, "cat-white")
            imagearea.appendChild(white)
        }
        if (localstorageArray[i].includes("eyes_")) {
            let eyes = document.createElement("img")
            eyes.src = "assets/PCE_Assets/Cat/Eyes/" + localstorageArray[i]
            eyes.classList.add(baseclass, "cat-eyes")
            imagearea.appendChild(eyes)
        }
    }
}

function changeYourCatName(name) {
    let catnamesection = document.getElementById("yourCatName")
    catnamesection.innerText = name
}

function changeYourCatID(ID) {
    let catIDsection = document.getElementById("yourCatID")
    catIDsection.innerText = ID
}