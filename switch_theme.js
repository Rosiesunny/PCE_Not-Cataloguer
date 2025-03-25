function setTheme(themeName){
    localStorage.setItem('theme',themeName);
    document.documentElement.className=themeName;
}
function switchTheme(){
    if(localStorage.getItem('theme')==='theme-dark'){
        setTheme('theme-light');
        changeThemeText("Light Theme");
        
    }
    else {
        setTheme('theme-dark');
        changeThemeText("Dark Theme");
    }
}
function changeThemeText(text) {
    let themeSettingTextBox = document.getElementById("theme-setting-text")
    themeSettingTextBox.innerText = text
}

(function(){
    if(localStorage.getItem('theme')==='theme-dark'){
        setTheme('theme-dark');
        changeThemeText("Dark Theme");
    }
    else{
        setTheme('theme-light');
        changeThemeText("Light Theme");
    }
})(); //ily squid ty for the theme change code