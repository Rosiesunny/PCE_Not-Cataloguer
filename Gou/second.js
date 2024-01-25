import { display, extra } from './first.js'

function myfunction() {
    let out = display() + "\n" + extra()
    out += "This is real! This is me! I'm exactly who I'm supposed to be, nowwww"
    document.querySelector(".databox").innerText = out
}
