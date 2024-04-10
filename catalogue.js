const index = document.getElementById("index");
var prefix = window.location.href.split("catalogue.html")[0];

var cats_list = Object.keys(village.cats);
for(var i = 0; i < cats_list.length; i++) {
    var anchor = document.createElement('a');
    var linkText = document.createTextNode(village.cats[cats_list[i]].name);
    anchor.appendChild(linkText);
    anchor.title = village.cats[cats_list[i]].name;
    anchor.href = prefix + "cat.html?" + village.cats[cats_list[i]].id;

    index.appendChild(anchor);
    index.appendChild(document.createElement('br'));
}