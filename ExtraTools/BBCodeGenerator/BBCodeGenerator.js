let inputBox = document.querySelector(".input")
inputBox.value = ""
let outputBox = document.getElementById("display")
outputBox.value = ""

function checkGeneCode(input) {
    console.log(input)
    let genes = detectGeneStringInBiography(input)
    console.log(genes)
    let wind
    console.log(genes[1])
    switch(genes[1]) {
        case "?": {
            switch(genes[2]) {
                case "N":
                    wind = "North"
                    break
                case "S":
                    wind = "South"
                    break
            }
            break
        }
        case "N": {
            switch(genes[2]) {
                case "N":
                    wind = "North"
                    break
                case "S":
                    wind = "Trade"
                    break
                case "O":
                    wind = "North"
                    break
                case "?":
                    wind = "North"
                    break
            }
            break
        }
        case "S": {
            switch(genes[2]) {
                case "N":
                    wind = "Trade"
                    break
                case "S":
                    wind = "South"
                    break
                case "O":
                    wind = "South"
                    break
                case "?":
                    wind = "South"
                    break
            }
            break
        }
        case "O": {
            switch(genes[2]) {
                case "N":
                    wind = "North"
                    break
                case "S":
                    wind = "South"
                    break
                case "O":
                    wind = "Null"
                    break
            }
            break
        }
    }
    console.log(wind)
    generateBBCodeGeneString(genes, "display", wind, true)
    inputBox.value = ""


}