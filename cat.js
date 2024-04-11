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

document.querySelector(".cat-name").innerText = thisCat.name;
document.querySelector(".cat-id").innerText = "#" + thisCat.id;
document.querySelector(".cat-wind").innerText = thisCat.wind + " Wind";
document.querySelector(".cat-personality").innerText = thisCat.personality.type + " Personality";

var basicData = "";
basicData += "Birthday: " + seasonsDict[thisCat.birthday.season] + " " + thisCat.birthday.day + ", Year " + thisCat.birthday.year + "\n";
basicData += "Age: " + thisCat.age + "\n";
basicData += "Pronouns: " + thisCat.pronouns.primary + "/" + thisCat.pronouns.secondary + "\n";
basicData += "Aspect: " + thisCat.aspect + "\n";
basicData += "Origin: " + thisCat.origin + "\n";
basicData += "ID Code: [cat=" + thisCat.id + "]\n";

document.querySelector(".basic-data").innerText = basicData;

var appearanceData = "";
appearanceData += "Species: " + thisCat.species + "\n";
appearanceData += "Size: " + thisCat.size.lbs + " lbs. / " + thisCat.size.kg + " kg\n";
appearanceData += "Fur: " + thisCat.fur.length + "\n";
appearanceData += "Color: " + thisCat.fur.color + " " + thisCat.fur.type + "\n";
appearanceData += "Pattern: " + thisCat.pattern + "\n";
appearanceData += "White Marks: " + thisCat.white.markings + " / " + thisCat.white.type + thisCat.white.level + "\n";
appearanceData += "Eye Color: " + thisCat.eyeColor + "\n";
document.querySelector(".appearance-data").innerText = appearanceData;

var geneData = getGeneString(thisCat);
document.querySelector(".gene-data").innerText = geneData;

var personalityData = "";
personalityData += thisCat.personality.type + " Personality: \n";
var traits_list = Object.keys(thisCat.personality);
var traits_vals = Object.values(thisCat.personality);
for (var i = 1; i < traits_list.length; i++) {
    personalityData += "+ " + traits_list[i] + ": " + traits_vals[i] + "\n";
}
document.querySelector(".personality-data").innerText = personalityData;

var trinketData = "Held Trinket: ";
if (thisCat.trinket.mod == 0) {
    trinketData += "None\n";
} else {
    trinketData += thisCat.trinket.name + " [" + thisCat.trinket.stat + " +" + thisCat.trinket.mod + "]\n";
}
document.querySelector(".trinket-data").innerText = trinketData;

var jobData = "";
jobData += "Day Job: " + thisCat.job + "\n";
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
document.querySelector(".job-data").innerText = jobData;

var classData = "";
classData += "Adventuring Class: " + thisCat.class + "\n";
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
document.querySelector(".class-data").innerText = classData;

var attributeData = "";
attributeData += "Attributes: \n";
var stats_list = Object.keys(thisCat.stats);
for (var i = 0; i < stats_list.length; i++) {
    attributeData += "+ " + stats_list[i] + ": " + thisCat.stats[stats_list[i]] + "\n";
}
document.querySelector(".attribute-data").innerText = attributeData;

var clothesData = "";
clothesData += "Currently Wearing: ";
if (thisCat.clothes.wearing.numslots == 0) {
    clothesData += "None";
} else {
    for (var i = 1; i <= thisCat.clothes.wearing.numslots; i++) {
        clothesData += thisCat.clothes.wearing[i].name + " #" + thisCat.clothes.wearing[i].id;
        if (!(i == (thisCat.clothes.wearing.numslots))) {
            clothesData += ", ";
        }
    }
}
document.querySelector(".clothes-data").innerText = clothesData;

var travellingData = "";
if (thisCat.travelling) {
    travellingData = "This not-cat is currently out traveling the world!";
} else {
    travellingData = "This not-cat is currently home in your active village!";
}
document.querySelector(".travelling-data").innerText = travellingData;

var updateData = "";
var timestamp = new Date(thisCat.lastUpdated);
updateData += "Entry Last Updated: " + timestamp.toLocaleDateString();
document.querySelector(".update-data").innerText = updateData;