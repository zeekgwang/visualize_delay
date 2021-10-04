
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.save();
ctx.rect(0, 0, 200, 120);
ctx.stroke();
ctx.clip(); //구멍뚫기!
ctx.fillStyle = "green";
ctx.fillRect(0, 0, 400, 400);  //맨 위의 사각형 영역만 나온다.
ctx.restore();

var stepOrder = {"10" : 1,
"20": 2,
"30": 3}

import {Node} from './Node.js'
import {Lot} from './Lot.js'
import {Equipment} from './Equipment.js'

var lot1 = new Lot(1,2, 'first');
var lot2 = new Lot(2,3, 'second');
var eqp1 = new Equipment(1, 2, 'firstEqp', '10', stepOrder['10'])
lot1.printInfo()
lot2.printInfo()
eqp1.printInfo()

lot1.addNode(new Node('firstEqp', '2021-05-15 12:00:00', '2021-05-15 12:59:29'))
lot1.addNode(new Node('firstEqp', '2021-05-15 13:00:00', '2021-05-15 13:59:29'))
lot1.printRoute()
