import {Equipment} from "./Equipment.js";
import {Lot} from "./Lot.js";
import {Node} from "./Node.js";

import {makeLotElement} from "./initialize.js";
import {setObject, draw} from "./canvas.js";
import {init} from "./animation.js";

const EQP_MARGIN_HORIZONTAL = 200
const EQP_MARGIN_VERTICAL = 200

document.getElementById("run").onclick = initialize

function getTransaction(jsonData) {
    var curLot = jsonData[0][0]

    for (var i = 0; i < jsonData.length - 1; i++) {
        if (curLot === jsonData[i + 1][0]) {
            jsonData[i][5] = jsonData[i + 1][3]
        } else {
            jsonData[i][5] = jsonData[i][3]
            curLot = jsonData[i + 1][0]
        }

        jsonData[i][3] = parseInt(jsonData[i][3])
        jsonData[i][4] = parseInt(jsonData[i][4])
        jsonData[i][5] = parseInt(jsonData[i][5])
    }
    jsonData[jsonData.length - 1][5] = jsonData[jsonData.length - 1][4]
    jsonData[jsonData.length - 1][3] = parseInt(jsonData[jsonData.length - 1][3])
    jsonData[jsonData.length - 1][4] = parseInt(jsonData[jsonData.length - 1][4])
    jsonData[jsonData.length - 1][5] = parseInt(jsonData[jsonData.length - 1][5])

    return jsonData
}

function makeStepOrder(transaction){
    var stepSet = new Set()
    var stepOrder = {}

    for (var r = 0 ; r < transaction.length ; r++) {
        var row = transaction[r]
        var step = row[2]

        stepSet.add(step)
    }

    var s_i = 0
    for (var s of Array.from(stepSet).sort()) {
        stepOrder[s] = s_i
        s_i++
    }

    return stepOrder
}

export function makeLotAndEqpSet(transaction) {

    var eqpSet = {}
    var lotSet = {}

    var eqpOrder = {}

    var stepOrder = makeStepOrder(transaction)

    var row
    for (var r = 0 ; r < transaction.length ; r++) {
        row = transaction[r]
        
        var eqpId = row[1]
        var step = row[2]
        
        if (eqpSet[eqpId] === undefined) {
            if (eqpOrder[step] === undefined) {
                eqpOrder[step] = 1
            } else {
                eqpOrder[step] = eqpOrder[step] + 1
            }

            eqpSet[eqpId] = new Equipment(stepOrder[step] * EQP_MARGIN_HORIZONTAL + EQP_MARGIN_VERTICAL, eqpOrder[step] * 100, eqpId, step, stepOrder[step], eqpOrder[step])
            eqpSet[eqpId].lotSet = lotSet
        }
    }

    for (var r = 0 ; r < transaction.length ; r++) {
        row = transaction[r]
        var lotId = row[0]
        var eqpId = row[1]
        var tkinTime = row[3]
        var tkoutTime = row[4]
        var nextTkinTime = row[5]

        if (lotSet[lotId] === undefined) {
            lotSet[lotId] = new Lot(-10000, -10000, lotId)
            lotSet[lotId].eqpSet = eqpSet
        }

        lotSet[lotId].addNode(new Node(eqpSet[eqpId], "running", tkinTime, tkoutTime))
        lotSet[lotId].addNode(new Node(eqpSet[eqpId], "end", tkoutTime, nextTkinTime))
    }

    return [eqpSet, lotSet]
}

function getMaxTime(transaction){
    var maxTime = 0
    for (var r = 0 ; r < transaction.length ; r++) {
        if(maxTime < transaction[r][5]){
            maxTime = transaction[r][5]
        }
    }
    return maxTime + 5
}

function initialize() {
    var jsonData = JSON.parse(document.getElementById("jsonData").value)
    var transaction = getTransaction(jsonData)

    var setArr = makeLotAndEqpSet(transaction)

    var eqpSet = setArr[0]
    var lotSet = setArr[1]

    init();
    makeLotElement(Object.keys(lotSet))
    document.getElementById("timeSlider").setAttribute("max", getMaxTime(transaction));
    setObject(eqpSet, lotSet)
    draw()
}
