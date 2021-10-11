import {changeLotColor, draw} from "./canvas.js";

function makeLotElement(LotIdList) {
    var container = document.getElementById("info-container")
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

makeLotElement(['LOT001', 'LOT002', 'LOT003'])
