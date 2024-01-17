// comments look like this if they are one line
/*Comments look like this if you want to
spread them out over several lines for some
reason*/

// unsure how data is gonna get passed here but for now I'll just have it check a text string that's just regular text
//example string 
// [C] [SO] [LL] [BBDD4] [YNTT] [YN7P] [??] [??]
// [C] [S?] [LL] [?BDD4] [Y?TT] [Y?7P] [??] [??]
// [C] [NS] [S?] [?????] [????] [Y?10P] [??] [??] 
// [C] [NO] [LL] [BODD2] [YNTM] [NN6C] [??] [??]
 
function checkTextGeneString() {
    document.querySelector(".poopee").innerText = ""
    let textBoxEntry = document.querySelector(".testTextBox").value
    console.log(textBoxEntry)
    let sections = textBoxEntry.split("]")
    for (let i=0; i<sections.length-1; i++) {
        sections[i] = sections[i].split("[")[1]
    }
    sections.pop()
    let newsections = director(sections)
    console.log(newsections)
}

function director(sections) {
    console.log(sections)
    let newsections = ["C"]
    if (sections[1] == "S?") {
        //
    }


    return newsections
}

// need this to display the shit like what cat needs to breed with what and what they're looking for
function UI() {

}

function checkRecessiveLonghair(furGene) {

}
