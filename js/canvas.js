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
    "30": 2
}

var transaction = []
transaction.push(["LOT001", "EQP001", 0, 3, 10, 11]);
transaction.push(["LOT001", "EQP021", 11, 12, 15, 30]);
transaction.push(["LOT002", "EQP002", 0, 1, 9, 10]);
transaction.push(["LOT002", "EQP021", 10, 17, 19, 30]);
transaction.push(["LOT003", "EQP002", 0, 10, 16, 18]);
transaction.push(["LOT003", "EQP021", 18, 20, 25, 30]);

eqpSet['EQP001'] = new Equipment(stepOrder['10'] * 200 + left_margin, 1 * 100, 'EQP001', '10', stepOrder['10'], 1)
eqpSet['EQP002'] = new Equipment(stepOrder['10'] * 200 + left_margin, 2 * 100, 'EQP002', '10', stepOrder['10'], 2)
eqpSet['EQP021'] = new Equipment(stepOrder['20'] * 200 + left_margin, 1 * 100, 'EQP021', '20', stepOrder['10'], 1)


for (var row of transaction) {
    if (lotSet[row[0]] === undefined) {
        lotSet[row[0]] = (new Lot(0, 0, row[0]))
        lotSet[row[0]].eqpSet = eqpSet
    }

    lotSet[row[0]].addNode(new Node(eqpSet[row[1]], "wait", row[2], row[3]))
    lotSet[row[0]].addNode(new Node(eqpSet[row[1]], "running", row[3], row[4]))
    lotSet[row[0]].addNode(new Node(eqpSet[row[1]], "end", row[4], row[5]))
}

eqpSet['EQP001'].lotSet = lotSet
eqpSet['EQP002'].lotSet = lotSet
eqpSet['EQP021'].lotSet = lotSet

export function update(time) {
    for (var eqpId in eqpSet) {
        eqpSet[eqpId].clearList()
    }

    for (var lotId in lotSet) {
        lotSet[lotId].updatePos(time)
        // lotSet[lotId].printRoute()
    }

    for (var eqpId in eqpSet) {
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

export function changeLotColor(lotId, color){
    lotSet[lotId].color = color;
}

