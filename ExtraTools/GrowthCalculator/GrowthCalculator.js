let growthpatterns = [
    {
        name: "Very Early",
        genes: "AA",
        Bean: .06,
        YoungKitten: .35,
        Kitten: .6,
        Adolescent: .85
    },
    {
        name: "Early",
        genes: "AB",
        Bean: .055,
        YoungKitten: .30,
        Kitten: .55,
        Adolescent: .80
    },
    {
        name: "Decreasing",
        genes: "AC",
        Bean: .06,
        YoungKitten: .35,
        Kitten: .55,
        Adolescent: .75
    },
    {
        name: "Arch",
        genes: "BA",
        Bean: .04,
        YoungKitten: .15,
        Kitten: .5,
        Adolescent: .85
    },
    {
        name: "Steady",
        genes: "BB",
        Bean: .05,
        YoungKitten: .25,
        Kitten: .5,
        Adolescent: .75
    },
    {
        name: "Dip",
        genes: "BC",
        Bean: .06,
        YoungKitten: .35,
        Kitten: .5,
        Adolescent: .65
    },
    {
        name: "Increasing",
        genes: "CC",
        Bean: .04,
        YoungKitten: .15,
        Kitten: .45,
        Adolescent: .75
    },
    {
        name: "Late",
        genes: "CB",
        Bean: .045,
        YoungKitten: .20,
        Kitten: .45,
        Adolescent: .70
    },
    {
        name: "Very Late",
        genes: "CA",
        Bean: .04,
        YoungKitten: .15,
        Kitten: .4,
        Adolescent: .65
    }
]

function submitInfo() {
    let weights = {
        Bean: Number(document.getElementById("beanweight").value),
        YoungKitten: Number(document.getElementById("youngkittenweight").value),
        Kitten: Number(document.getElementById("kittenweight").value),
        Adolescent: Number(document.getElementById("adolescentweight").value)
    }
    let possiblegrowths = trimIrrelevantGrowths(weights)
    console.log(possiblegrowths)

}

function trimIrrelevantGrowths(weights) {
    let possibleWholeNumberGrowths = wholeNumberFinalWeightCheck(weights)
    let possibleConsistentAcrossAgesGrowths = eliminateNonDuplicateOptions(possibleWholeNumberGrowths)
    let possibleBiologicalParentPatterns = eliminateWithParentWeights(possibleConsistentAcrossAgesGrowths)
    console.log(possibleBiologicalParentPatterns)
}

function wholeNumberFinalWeightCheck(weights) {
    let weightkeys = Object.keys(weights)
    let wholenumberGrowths = []
    for (let i = 0; i < weightkeys.length; i++) {
        let weight = eval("weights." + weightkeys[i])
        let growthgenes = checkWeight(weight, weightkeys[i])
        if (growthgenes !== 0) {
            wholenumberGrowths.push(growthgenes)
        }
    }
    return wholenumberGrowths

}

function checkWeight(weight, age) {
    let validgrowthpatterns = []
    if (weight == 0) {
        return 0
    }
    for (let i = 0; i < growthpatterns.length; i++) {
        let adultweight = eval(weight + " / growthpatterns[i]." + age)
        let adultweightround = Number(adultweight.toFixed(2))
        if (adultweightround !== 0) {
            if (adultweightround % 1 === 0) {
                // light up cell green equivalent in spreadsheet
                let growthinfo = {
                    adultweight: adultweightround,
                    growthgenes: growthpatterns[i].genes
                }
                validgrowthpatterns.push(growthinfo)
            }
        }
    }
    return validgrowthpatterns
}

function eliminateNonDuplicateOptions(growthpatterns) {
    //first check if the same weight AND same growth gene is shared across multiple ages
    let validgrowths = []
    // if we have multiple ages...
    if (growthpatterns.length > 1) {
        let totalgrowthpatterns = growthpatterns.length
        // for each growth value option in age[0] / first age...
        for (let j = 0; j < growthpatterns[0].length; j++) {
            // define currentgrowth so we can check if it has a match in other ages
            let currentgrowth = growthpatterns[0][j]
            // default matchall to false for all ages, we will change it to true if we find a match for currentgrowth
            let matchall = []
            for (let m = 0; m < totalgrowthpatterns; m++) {
                matchall.push(false)
            }
            matchall[0] = "Does it match me?:"
            // for each following age...
            for (let k = 1; k < totalgrowthpatterns; k++) {
                let matchthisage = false
                // for each option in that age...
                for (let l = 0; l < growthpatterns[k].length; l++) {
                    let currentgrowthcheckvalue = growthpatterns[k][l]
                    // if that new option matches the growth value we're checking...
                    if (currentgrowth.adultweight == currentgrowthcheckvalue.adultweight && currentgrowth.growthgenes == currentgrowthcheckvalue.growthgenes) {
                        matchall[k] = true
                        matchthisage = true
                        break
                    }
                }
            }
            let truematch = true
            for (let i = 1; i < matchall.length; i++) {
                if (matchall[i] == false) {
                    truematch = false
                    break
                }
            }
            if (truematch == true) {
                validgrowths.push(growthpatterns[0][j])
            }
        }
        return(validgrowths) 
    }
    else {
        return growthpatterns
    }
}

function eliminateWithParentWeights(growthpatterns) {
    let parent1weight = Number(document.getElementById("parent-weight-1").value)
    let parent2weight = Number(document.getElementById("parent-weight-2").value)
    if (parent1weight !== 0 && parent2weight !== 0) {
        let lowerweight = 10000
        let higherweight = 0
        if (parent1weight > parent2weight) {
            higherweight = parent1weight
            lowerweight = parent2weight
        }
        else {
            higherweight = parent2weight
            lowerweight = parent1weight
        }
        let parentcompatibleGrowths = []
        for (let i = 0; i < growthpatterns.length; i++) {
            let adultweight = growthpatterns[i].adultweight
            if (adultweight >= lowerweight && adultweight <= higherweight) {
                parentcompatibleGrowths.push(growthpatterns[i])
            }
        }
        return parentcompatibleGrowths
    }
    else {
        return growthpatterns
    }
}

function eliminateWithParentGenesAndWinds(growthpatterns) {
    let parent1 = {
        wind: document.getElementById("parent-wind-1").value,
        genes: document.getElementById("parent-genes-1").value
    }
    let parent2 = {
        wind: document.getElementById("parent-wind-2").value,
        genes: document.getElementById("parent-genes-2").value
    }

}