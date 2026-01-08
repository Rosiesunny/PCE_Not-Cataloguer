// Prefix/suffix box auto fill sections
let prefixBox = document.getElementById("bbcode-prefix")
let suffixBox = document.getElementById("bbcode-suffix")
let prefix = localStorage.getItem('bbcodePrefix')
let suffix = localStorage.getItem('bbcodeSuffix')
prefixBox.value = JSON.parse(prefix)
suffixBox.value = JSON.parse(suffix)
auto_grow(prefixBox)
auto_grow(suffixBox)

// Prevent label clicks from toggling the checkbox
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
// this whole section just adds expanding description boxes
document.querySelectorAll('label').forEach(label => {
    label.addEventListener('click', function(e) {
        // Only prevent default if clicking on label text, not the checkbox itself
        if (e.target.tagName !== 'INPUT') {
            e.preventDefault()
            // if we're clicking the label text and not the checkbox, then we're already in this section. then we enable display of description
            if (label.nextElementSibling) {
                if (label.nextElementSibling.classList.contains("explanation-box-display-on")) {
                    label.nextElementSibling.classList.remove("explanation-box-display-on")
                }
                else {
                    label.nextElementSibling.classList.add("explanation-box-display-on")
                }
            }
        }
    })
})

// Initialize data storage settings from localstorage
document.querySelectorAll('.data-storage-checkboxes').forEach(setting => {
    let key = setting.getAttribute("data-storage-key")
    
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, setting.hasAttribute('checked'))
    }
    else {
        let value = localStorage.getItem(String(key))
        if (value == "true") {
            setting.checked = true
        }
        if (value == "false") {
            setting.checked = false
        }
    }
    setting.onclick = function() {
        localStorageKeyEdit(String(key), setting)
    }
})



// Only accessed from the Settings page
function savePrefixOrSuffix(prefixOrSuffix, id) {
    let key = "bbcode" + prefixOrSuffix
    let text = document.getElementById(id).value
    localStorage.setItem(key, JSON.stringify(text))
}


// https://stackoverflow.com/questions/17772260/textarea-auto-height
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
  }

  function localStorageKeyEdit(key, value) {
    console.log("BUTTON CLICKED: " + key + "! CURRENTLY: " + value.checked)
    localStorage.setItem(key, value.checked)
  }

