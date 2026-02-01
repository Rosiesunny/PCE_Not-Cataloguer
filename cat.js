var url_vars = window.location.href.split("?");

if (url_vars[1] === undefined) {
    var prefix = window.location.href.split("cat.html");
    window.location.href = prefix + "index.html";
}

thisCat = village.cats[url_vars[1]];

if (thisCat === undefined) {
    var prefix = window.location.href.split("cat.html")[0];
    window.location.href = prefix + "index.html";
}

document.getElementById("cat-name").innerText = thisCat.name;
document.getElementById("cat-id").innerText = "#" + thisCat.id;
document.getElementById("cat-wind").innerText = thisCat.wind + " Wind";
document.getElementById("cat-personality").innerText = thisCat.personality.type + " Personality";

var basicData = "";
basicData += "Birthday: " + seasonsDict[thisCat.birthday.season] + " " + thisCat.birthday.day + ", Year " + thisCat.birthday.year + "\n";
basicData += "Age: " + thisCat.age + "\n";
basicData += "Pronouns: " + thisCat.pronouns.primary + "/" + thisCat.pronouns.secondary + "\n";
basicData += "Aspect: " + thisCat.aspect + "\n";
basicData += "Origin: " + thisCat.origin + "\n";
basicData += "ID Code: [cat=" + thisCat.id + "]\n";

document.getElementById("basic-data").innerText = basicData;

var appearanceData = "";
appearanceData += "Species: " + thisCat.species + "\n";
if (thisCat.size) {
    appearanceData += "Size: " + thisCat.size.lbs + " lbs. / " + thisCat.size.kg + " kg\n";
}
appearanceData += "Fur: " + thisCat.fur.length + "\n";
appearanceData += "Color: " + thisCat.fur.color + " " + thisCat.fur.type + "\n";
appearanceData += "Pattern: " + thisCat.pattern + "\n";
appearanceData += "Accent Color: " + thisCat.accentColor + "\n"
appearanceData += "White Marks: " + thisCat.white.markings + " / " + thisCat.white.type + thisCat.white.level + "\n";
appearanceData += "Eyes: " + thisCat.eyes.color + " " + thisCat.eyes.eyes + "\n";
appearanceData += "Pose: " + thisCat.pose + "\n"
document.getElementById("appearance-data").innerText = appearanceData;

var geneData = getGeneString(thisCat.genes);
document.getElementById("gene-data").innerText = geneData;
geneTestingButton(thisCat.genes, thisCat.id, thisCat.name, thisCat.wind, thisCat.fur, thisCat.white, thisCat.pattern, thisCat.accentcolor, thisCat.eyes, thisCat.pose, thisCat.age, thisCat.species, document.getElementById("genetest-button-zone"))
bbcodeButton(thisCat.genes, thisCat.wind, document.getElementById("bbcode-button-zone"))

var personalityData = "";
personalityData += thisCat.personality.type + " Personality: \n";
var traits_list = Object.keys(thisCat.personality);
var traits_vals = Object.values(thisCat.personality);
for (var i = 1; i < traits_list.length; i++) {
    personalityData += "+ " + traits_list[i] + ": " + traits_vals[i] + "\n";
}
document.getElementById("personality-data").innerText = personalityData;


if (thisCat.hasOwnProperty("trinket")) {
    var trinketData = "Held Trinket: ";
    if (thisCat.trinket.mod == 0) {
        trinketData += "None\n";
    } else {
        trinketData += thisCat.trinket.name + " [" + thisCat.trinket.stat + " +" + thisCat.trinket.mod + "]\n";
    }
    document.getElementById("trinket-data").innerText = trinketData;
}


var jobData = "";
jobData += "Day Job: " + thisCat.job + "\n";
if (thisCat.hasOwnProperty("jobs")) {
    
    var jobs_list = Object.keys(thisCat.jobs);
    for (var i = 0; i < jobs_list.length; i++) {
        if (thisCat.jobs[jobs_list[i]].level > 0) {
            jobData += "+ " + jobs_list[i] + " Level " + thisCat.jobs[jobs_list[i]].level + " [";
            switch(typeof(thisCat.jobs[jobs_list[i]].exp)) {
                case 'string':
                    jobData += thisCat.jobs[jobs_list[i]].exp + "]\n";
                    break;
                case 'number':
                    jobData += thisCat.jobs[jobs_list[i]].exp;
                    jobData += "/" + jobEXPDict[thisCat.jobs[jobs_list[i]].level];
                    jobData += " EXP]\n";
                    break;
                default:
                    break;
            }
        }
    }
}
document.getElementById("job-data").innerText = jobData;


var classData = "";
classData += "Adventuring Class: " + thisCat.class + "\n";
if (thisCat.hasOwnProperty("classes")) {
    var classes_list = Object.keys(thisCat.classes);
    for (var i = 0; i < classes_list.length; i++) {
        if (thisCat.classes[classes_list[i]].level > 0) {
            classData += "+ " + classes_list[i] + " Level " + thisCat.classes[classes_list[i]].level + " [";
            switch(typeof(thisCat.classes[classes_list[i]].exp)) {
                case 'string':
                    classData += thisCat.classes[classes_list[i]].exp + "]\n";
                    break;
                case 'number':
                    classData += thisCat.classes[classes_list[i]].exp;
                    classData += "/" + classEXPDict[thisCat.classes[classes_list[i]].level];
                    classData += " EXP]\n";
                    break;
                default:
                    break;
            }
        }
    }
}

document.getElementById("class-data").innerText = classData;

var attributeData = "";
attributeData += "Attributes: \n";
var stats_list = Object.keys(thisCat.stats);
for (var i = 0; i < stats_list.length; i++) {
    attributeData += "+ " + stats_list[i] + ": " + thisCat.stats[stats_list[i]] + "\n";
}
document.getElementById("attribute-data").innerText = attributeData;

if (thisCat.hasOwnProperty("friends")) {
    let friendsList = thisCat.friends
    let friendsData = "Friends: \n"
    if (friendsList.length > 0) {
        for (let i = 0; i < friendsList.length; i++) {
            friendsData += friendsList[i].name + " - " + friendsList[i].relationship
            if (friendsList[i].id) {
                friendsData += " - id: " + friendsList[i].id
            }
            friendsData += "\n"
        }
    }
    else {
        friendsData += "None\n"
    }
    document.getElementById("friends-data").innerText = friendsData
}


if (thisCat.hasOwnProperty("family")) {
    let familyList = thisCat.family
    let familyData = "Family: \n"
    if (familyList.length > 0) {
        for (let i = 0; i < familyList.length; i++) {
            familyData += familyList[i].name + " - " + familyList[i].relationship
            if (familyList[i].id) {
                familyData += " - id: " + familyList[i].id
            }
            familyData += "\n"
        }
    }
    else {
        familyData += "None\n"
    }
    document.getElementById("family-data").innerText = familyData
}




if (thisCat.biography) {
    document.getElementById("biography-data").innerText = "Biography:\n" + thisCat.biography
}
















var clothesData = "";
clothesData += "Currently Wearing:\n";
if (thisCat.hasOwnProperty("clothes")) {
    if (thisCat.clothes.wearing.length == 0) {
    clothesData += "None";
    } 
    else {
        for (var i = 0; i < thisCat.clothes.wearing.length; i++) {
            clothesData += thisCat.clothes.wearing[i].name + " #" + thisCat.clothes.wearing[i].id
            if (thisCat.clothes.wearing[i].creator) {
                clothesData += " by " + thisCat.clothes.wearing[i].creator
            }
            
            if (i < thisCat.clothes.wearing.length-1) {
                clothesData += ",\n"
            }
        }
    }
    document.getElementById("clothes-data").innerText = clothesData;
}


var locationData = "";
if (thisCat.location) {
    locationData = thisCat.location
} else {
    locationData = "Unknown Location";
}
document.getElementById("location-data").innerText = locationData;

var updateData = "";
var timestamp = new Date(thisCat.lastUpdated);
updateData += "Entry Last Updated: " + timestamp.toLocaleDateString();
document.getElementById("update-data").innerText = updateData;

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