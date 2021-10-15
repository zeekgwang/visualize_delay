import {Object} from './Object.js'

export class Lot extends Object {

    eqpSet;

    constructor(fx, fy, id) {
        super();
        //fx(fixed X)
        this.fx = fx;
        this.fy = fy;
        this.x = fx;
        this.y = fy;

        this.id = id;
        this.waitOrder = 0;
        this.route = [];
        this.curR = 0;

        this.color = 'red';
        this.size = 8;
    }

    printInfo() {
        console.log(this.fx, this.fy, this.id)
    }

    addNode(node) {
        this.route.push(node)
    }

    // 추후 이진 검색으로 리팩토링
    findNode(time) {
        if (this.route.length === 0) {
            alert(this.id + "의 Event 가 존재하지 않습니다.")
            return -1
        }

        var i

        for(i = 0; i < this.route.length ; i++){
            if(time >= this.route[i].startTime && time < this.route[i].endTime){
                return this.route[i]
            }
        }

        return this.route[this.route.length-1]
    }

    updatePos(time) {
        var curNode = this.findNode(time)
        console.log(this.id, time, curNode)

        if (curNode.eventType === "wait") {
            this.fx = curNode.eqpX - 40;
            this.fy = curNode.eqpY;

            if (time === curNode.startTime) {
                this.eqpSet[curNode.eqpId].addWaitList(this.id, curNode.endTime)
                if (this.curR > 0) {
                    var prevNode = this.route[this.curR - 1]
                    this.eqpSet[prevNode.eqpId].removeEndList(this.id)
                }
            }
        } else if (curNode.eventType === "running") {
            this.fx = curNode.eqpX;
            this.fy = curNode.eqpY;

            if (time === curNode.startTime) {
                this.eqpSet[curNode.eqpId].removeWaitList(this.id)
                this.eqpSet[curNode.eqpId].addRunList(this.id, curNode.startTime)
            }
        } else if (curNode.eventType === "end") {
            this.fx = curNode.eqpX + 40;
            this.fy = curNode.eqpY;

            if (time === curNode.startTime) {
                this.eqpSet[curNode.eqpId].removeRunList(this.id)
                this.eqpSet[curNode.eqpId].addEndList(this.id, curNode.startTime)
                this.curR += 1;
            }
        }

        this.x = this.fx;
        this.y = this.fy;
    }

    printRoute() {
        console.log(this.id)
        for (var r of this.route) {
            console.log(r.eqpId, r.eventType, r.startTime, r.endTime)
        }
    }
}