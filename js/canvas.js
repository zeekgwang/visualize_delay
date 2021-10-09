const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

var stepOrder = {
    "10": 0,
    "20": 1,
    "30": 2
}

import {Node} from './Node.js'
import {Lot} from './Lot.js'
import {Equipment} from './Equipment.js'

var left_margin = 200
var eqpSet = {}
var lotSet = {}

var transaction = []
transaction.push(["LOT001", "EQP001", 0, 3, 10]);
transaction.push(["LOT001", "EQP021", 10, 12, 15]);
transaction.push(["LOT002", "EQP002", 0, 1, 9]);
transaction.push(["LOT002", "EQP021", 10, 17, 29]);
transaction.push(["LOT003", "EQP002", 0, 10, 16]);
transaction.push(["LOT003", "EQP021", 18, 30, 35]);

eqpSet['EQP001'] = new Equipment(stepOrder['10'] * 200 + left_margin, 1 * 100, 'EQP001', '10', stepOrder['10'], 1)
eqpSet['EQP002'] = new Equipment(stepOrder['10'] * 200 + left_margin, 2 * 100, 'EQP002', '10', stepOrder['10'], 2)
eqpSet['EQP021'] = new Equipment(stepOrder['20'] * 200 + left_margin, 1 * 100, 'EQP021', '20', stepOrder['10'], 1)
eqpSet['EQP021'] = new Equipment(stepOrder['20'] * 200 + left_margin, 1 * 100, 'EQP021', '20', stepOrder['10'], 1)


for (var row of transaction) {
    if (lotSet[row[0]] === undefined) {
        lotSet[row[0]] = (new Lot(0, 0, row[0]))
        lotSet[row[0]].eqpSet = eqpSet
    }

    const node = new Node(eqpSet[row[1]], row[2], row[3], row[4])
    lotSet[row[0]].addNode(node)
}


var time = 0

function update(time) {
    for (var lotId in lotSet) {
        lotSet[lotId].updatePos(time)
        // lotSet[lotId].printInfo()
        // lotSet[lotId].printRoute()
    }

    for (var eqpId in eqpSet) {
        eqpSet[eqpId].printList()
    }
}

function draw() {
    ctx.clearRect(0, 0, 10000, 10000)

    for (var eqpId in eqpSet) {
        eqpSet[eqpId].drawObj(ctx)
    }

    for (var lotId in lotSet) {
        lotSet[lotId].drawObj(ctx)
    }
}


function run() {
    console.log(time)

    update(time)
    draw();
    time++;
}

setInterval(run, 1000);


// lot 위치 확인
// var lotSet = {}
// lotSet['LOT001'] = new Lot(160, 100, 'LOT001');
// lotSet['LOT002'] = new Lot(140, 100, 'LOT002');
// lotSet['LOT003'] = new Lot(160, 200, 'LOT003');
// lotSet['LOT004'] = new Lot(360, 100, 'LOT004');
// lotSet['LOT005'] = new Lot(400, 100, 'LOT005');
// lotSet['LOT006'] = new Lot(240, 200, 'LOT006');
// //240, 200 -> 360, 100
// lotSet['LOT007'] = new Lot(240 + (360 - 240) * (1-0.4), 200 + (100 - 200) * (1-0.4), 'LOT007');
// lotSet['LOT008'] = new Lot(240 + (360 - 240) * (1-0.7), 200 + (100 - 200) * (1-0.7), 'LOT008');






