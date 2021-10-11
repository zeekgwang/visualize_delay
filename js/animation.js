
import {draw, update} from './canvas.js'

var RUN = 0
var PAUSE = 1
var STATUSDICT = {0 : "RUN", 1 : "PAUSE"}

var mInterval
var time = 0
var intervalSpeed = 1
var intervalStatus = PAUSE
var intervalStatusStr = "PAUSE"

function start() {
    mInterval = setInterval(run, 1000 * intervalSpeed)
    intervalStatus = RUN
    intervalStatusStr = STATUSDICT[intervalStatus]
    setIntervalInfo(time, 1 / intervalSpeed, intervalStatusStr)
}

function pause() {
    clearInterval(mInterval)
    intervalStatus = PAUSE
    intervalStatusStr = STATUSDICT[intervalStatus]
    setIntervalInfo(time, 1 / intervalSpeed, intervalStatusStr)
}

function restart() {
    pause()
    start()
}

function makeFaster() {
    intervalSpeed /= 2
    if(intervalStatus === RUN){
        restart()
    }
    setIntervalInfo(time, 1 / intervalSpeed, intervalStatusStr)
}

function makeSlower() {
    intervalSpeed *= 2
    if(intervalStatus === RUN){
        restart()
    }
    setIntervalInfo(time, 1 / intervalSpeed, intervalStatusStr)
}

function setIntervalInfo(time, speed, status){
    document.getElementById("time").textContent = time
    document.getElementById("speed").textContent = speed
    document.getElementById("status").textContent = status
}

function run() {
    // console.log(time)
    time++;
    update(time)
    draw();
    setIntervalInfo(time, 1 / intervalSpeed, intervalStatusStr)
}

function init() {
    setIntervalInfo(time, 1 / intervalSpeed, intervalStatusStr)
    update(0)
    draw()
}

init()

document.getElementById("startBtn").onclick = start
document.getElementById("pauseBtn").onclick = pause
document.getElementById("fasterBtn").onclick = makeFaster
document.getElementById("slowerBtn").onclick = makeSlower
