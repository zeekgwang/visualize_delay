
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

var eqpSet = {}
var lotSet = {}

export function setObject(_eqpSet, _lotSet){
    eqpSet = _eqpSet;
    lotSet = _lotSet;
}

export function update(time) {
    var eqpId
    var lotId

    for (eqpId in eqpSet) {
        eqpSet[eqpId].clearList()
    }

    for (lotId in lotSet) {
        lotSet[lotId].updatePos(time)
        // lotSet[lotId].printInfo()
        // lotSet[lotId].printRoute()
    }

    for (eqpId in eqpSet) {
        eqpSet[eqpId].updatePos()
        // eqpSet[eqpId].printList()
    }
}

export function draw() {
    ctx.clearRect(0, 0, 10000, 10000)

    for (var eqpId in eqpSet) {
        eqpSet[eqpId].drawObj(ctx)
    }

    for (var lotId in lotSet) {
        lotSet[lotId].drawObj(ctx)
    }
}

export function changeLotColor(lotId, color) {
    lotSet[lotId].color = color;
}

export function getRectClicked(x, y) {
    for (var eqpId in eqpSet) {
        if (eqpSet[eqpId].isClicked(x, y)) {
            return eqpId
        }
    }
    return "";
}

export function setEqpPos(eqpId, x, y) {
    eqpSet[eqpId].x = x
    eqpSet[eqpId].y = y
}