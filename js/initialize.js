import {changeLotColor, draw} from "./canvas.js";

export function makeLotElement(LotIdList) {
    var container = document.getElementById("info-container")
    container.innerHTML = ""
    var lotId
    for (lotId of LotIdList) {
        var elemStr = ""
        elemStr += '<div style=\"height: 30px; alignment: center\">'
        elemStr += '<span>' + lotId + '</span>'
        elemStr += '<input id=\"' + lotId + '-color\" name=\"' + lotId + '\" type=\"color\" value=\"#ff0000\">'
        elemStr += '</div>'

        container.innerHTML += elemStr
    }

    for (lotId of LotIdList) {
        var elem = document.getElementById(lotId + "-color")
        elem.onchange = (function() {
            changeLotColor(this.name, this.value)
            draw()
        })
    }
}

