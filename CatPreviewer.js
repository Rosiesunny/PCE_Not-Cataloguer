function setTheme(themeName){
    localStorage.setItem('theme',themeName);document.documentElement.className=themeName;
}

function switchTheme(){
    if(localStorage.getItem('theme')==='theme-dark'){
        setTheme('theme-light');}else{setTheme('theme-dark');
    }
}

(function(){
    if(localStorage.getItem('theme')==='theme-dark'){
        setTheme('theme-dark');
    }
    else{
        setTheme('theme-light');
    }
})();

function imageUpdate(){
    var catPose=document.getElementById("pose").value;
    var catEyes=document.getElementById("eyes").value;
    var catFur=document.getElementById("fur").value;
    var catColor=document.getElementById("color").value;
    var catColortype=document.getElementById("colortype").value;
    var catPattern=document.getElementById("pattern").value;
    if(typeof document.getElementById("age")!=='undefined' && document.getElementById("age")!==null){
        var catAge=document.getElementById("age").value;
    }
    if(document.getElementById("whitecombo")==null){
        var catWhitemarks=document.getElementById("whitemarks").value;
        var catWhitetype="classic";
    }
    else{
        var catWhite=document.getElementById("whitecombo").value;
        var catWhitesplit=catWhite.split("-");
        var catWhitemarks=catWhitesplit[1];
        var catWhitetype=catWhitesplit[0];
        if(catWhitemarks == 10) {
            eyesUpdate(catWhitemarks,"eyes")
        }
    }
    var blankLink="assets/PCE_Assets/Cat/blank.png";
    
    var colorLink="assets/PCE_Assets/Cat/BaseColors/"+catColor+"_main_"+catPattern+".png";
    var whiteLink="assets/PCE_Assets/Cat/WhiteMarkings/white_"+catWhitetype+"_"+catWhitemarks+".png";
    if(catColortype=='pat'){
        switch(catColor){
            case "black":
                catTradeColor="choco";
                break;
            case "choco":
                catTradeColor="brown";
                break;
            case "brown":
                catTradeColor="tan";
                break;
            case "tan":
                catTradeColor="snow";
                break;
            case "charc":
                catTradeColor="grey";
                break;
            case "grey":
                catTradeColor="smoke";
                break;
            case "smoke":
                catTradeColor="silver";
                break;
            case "silver":
                catTradeColor="snow";
                break;
            case "red":
                catTradeColor="ginger";
                break;
            case "ginger":
                catTradeColor="orange";
                break;
            case "orange":
                catTradeColor="aprico";
                break;
            case "aprico":
                catTradeColor="snow";
                break;
            case "buff":
                catTradeColor="cream";
                break;
            case "cream":
                catTradeColor="almond";
                break;
            case "almond":
                catTradeColor="beige";
                break;
            case "beige":
                catTradeColor="snow";
                break;
            default:
                break;
            }
        var tradeLink="assets/PCE_Assets/Cat/TradeColors/"+catTradeColor+"_trade_"+catPattern+".png";
        }
    else if(catColortype=='tor'){
        switch(catColor){
            case "black":
                catTradeColor="red";
                break;
            case "choco":
                catTradeColor="ginger";
                break;
            case "brown":
                catTradeColor="orange";
                break;
            case "tan":
                catTradeColor="aprico";
                break;
            case "charc":
                catTradeColor="buff";
                break;
            case "grey":
                catTradeColor="cream";
                break;
            case "smoke":
                catTradeColor="almond";
                break;
            case "silver":
                catTradeColor="beige";
                break;
            case "red":
                catTradeColor="black";
                break;
            case "ginger":
                catTradeColor="choco";
                break;
            case "orange":
                catTradeColor="brown";
                break;
            case "aprico":
                catTradeColor="tan";
                break;
            case "buff":
                catTradeColor="charc";
                break;
            case "cream":
                catTradeColor="grey";
                break;
            case "almond":
                catTradeColor="smoke";
                break;
            case "beige":
                catTradeColor="silver";
                break;
            default:
                break;
        }
        var tradeLink="assets/PCE_Assets/Cat/TradeColors/"+catTradeColor+"_trade_"+catPattern+".png";
    }

    var oldClothesClass="cat-clothes";
    if(catWhitemarks==10){
        document.getElementById("cat-base").src=blankLink;
        var eyesLink="assets/PCE_Assets/Cat/Eyes/eyes_"+catEyes+"_a_"+catWhitetype+".png";
    }
    else{
        document.getElementById("cat-base").src=colorLink;
        var eyesLink="assets/PCE_Assets/Cat/Eyes/eyes_"+catEyes+".png";
    }
    if(catWhitemarks==0){
        document.getElementById("cat-white").src=blankLink;
    }
    else{
        document.getElementById("cat-white").src=whiteLink;
    }
    if(catColortype=="st"){
        document.getElementById("cat-trade").src=blankLink;
    }
    else{
        document.getElementById("cat-trade").src=tradeLink;
    }
    document.getElementById("cat-eyes").src=eyesLink;
    if(catAge=='kitten'){
        var age='kitten';
    }
    else if(catAge=='bean'){
        var age='bean';
    }
    else{
        var age='adult';
    }
    var baseClass=age+"-"+catFur+"-"+catPose+" cat-base";
    var whiteClass=age+"-"+catFur+"-"+catPose+" cat-white";
    var eyesClass=age+"-"+catFur+"-"+catPose+" cat-eyes";
    var clothesClass=age+"-"+catFur+"-"+catPose+" cat-clothes";
    var tradeClass=age+"-"+catFur+"-"+catPose+" cat-base";
    document.getElementById("cat-base").className=baseClass;
    document.getElementById("cat-trade").className=tradeClass;
    document.getElementById("cat-white").className=whiteClass;
    document.getElementById("cat-eyes").className=eyesClass;
    var allClothes=document.getElementsByClassName(oldClothesClass);
    for(var i=0; i<allClothes.length; i++){
        allClothes[i].className=clothesClass;
    }
}
    
function eyesUpdate(catWhite,eyesImg){
    var catEyes=document.getElementById("eyes").value;
    var catWhitesplit=catWhite.split("-");
    var catWhitemarks=catWhite[1];
    var catWhitetype=catWhite[0];
    if(catWhitemarks==10){
        var eyesLink="assets/PCE_Assets/Cat/Eyes/eyes_"+catEyes+"_a_"+catWhitetype+".png";
    }
    else{
        var eyesLink="assets/PCE_Assets/Cat/Eyes/eyes_"+catEyes+".png";
    }
    document.getElementById(eyesImg).src=eyesLink;
}
