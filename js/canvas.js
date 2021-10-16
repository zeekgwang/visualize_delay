const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

import {Node} from './Node.js'
import {Lot} from './Lot.js'
import {Equipment} from './Equipment.js'

var left_margin = 200
var eqpSet = {}
var lotSet = {}

var stepOrder = {
    "10": 0,
    "20": 1,
    "30": 2,
    "40": 3
}

var eqpOrder = {}

var transaction = []
transaction.push(["LOT001", "EQP001", "10", 3, 10, 12]);
transaction.push(["LOT001", "EQP011", "20", 12, 17, 20]);
transaction.push(["LOT001", "EQP021", "30", 20, 23, 30]);
transaction.push(["LOT001", "EQP031", "40", 30, 40, 40]);
transaction.push(["LOT002", "EQP002", "10", 1, 5, 7]);
transaction.push(["LOT002", "EQP012", "20", 7, 17, 25]);
transaction.push(["LOT002", "EQP022", "30", 25, 28, 35]);
transaction.push(["LOT002", "EQP032", "40", 35, 37, 37]);

for (var row of transaction) {
    if(eqpSet[row[1]] === undefined){
        if(eqpOrder[row[2]] === undefined){
            eqpOrder[row[2]] = 1
        }else{
            eqpOrder[row[2]] = eqpOrder[row[2]] + 1
        }

        eqpSet[row[1]] = new Equipment(stepOrder[row[2]] * 200 + left_margin, eqpOrder[row[2]] * 100, row[1], row[2], stepOrder[row[2]], eqpOrder[row[2]])
        eqpSet[row[1]].lotSet = lotSet
    }
}

for (var row of transaction) {
    if (lotSet[row[0]] === undefined) {
        lotSet[row[0]] = new Lot(0, 0, row[0])
        lotSet[row[0]].eqpSet = eqpSet
    }

    lotSet[row[0]].addNode(new Node(eqpSet[row[1]], "running", row[3], row[4]))
    lotSet[row[0]].addNode(new Node(eqpSet[row[1]], "end", row[4], row[5]))
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