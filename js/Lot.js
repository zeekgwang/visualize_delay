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

        this.fx_next = -10000;
        this.fy_next = -10000;
        this.x_next = this.fx_next;
        this.y_next = this.fy_next;

        this.drawNextLot = false;

        this.id = id;
        this.waitOrder = 0;
        this.route = [];

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
            return undefined
        }

        if(time < this.route[0].startTime){
            return undefined
        }

        for(var i = 0; i < this.route.length ; i++){
            if(time >= this.route[i].startTime && time < this.route[i].endTime){
                return i
            }
        }

        return this.route.length-1
    }

    updatePos(time) {
        var curNodeIdx = this.findNode(time)

        if(curNodeIdx === undefined){
            this.fx = -10000
            this.fy = -10000

            this.fx_next = -10000
            this.fy_next = -10000
        }else{
            var curNode = this.route[curNodeIdx]

            if (curNode.eventType === "wait") {
                this.fx = curNode.eqp.x - 40;
                this.fy = curNode.eqp.y;

                curNode.eqp.addWaitList(this.id, curNode.endTime)
            } else if (curNode.eventType === "running") {
                this.fx = curNode.eqp.x;
                this.fy = curNode.eqp.y;

                this.drawNextLot = false;
                curNode.eqp.addRunList(this.id, curNode.startTime)
            } else if (curNode.eventType === "end") {
                this.fx = curNode.eqp.x + 40;
                this.fy = curNode.eqp.y;

                curNode.eqp.addEndList(this.id, curNode.startTime)

                // 마지막 노드가 아니라면 next 노드에 wait Lot을 그려줌
                if(curNodeIdx !== this.route.length-1){
                    var nextNode = this.route[curNodeIdx + 1]

                    this.fx_next = nextNode.eqp.x - 40;
                    this.fy_next = nextNode.eqp.y;

                    this.drawNextLot = true;
                    nextNode.eqp.addWaitList(this.id, nextNode.startTime)
                }
            }
        }

        this.x = this.fx;
        this.y = this.fy;

        this.x_next = this.fx_next
        this.y_next = this.fy_next
    }

    drawObj(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x-this.size, this.y-this.size, this.size * 2, this.size * 2);
        if(this.drawNextLot){
            ctx.strokeStyle = this.color;
            ctx.beginPath()
            ctx.moveTo(this.x_next-this.size, this.y_next-this.size)
            ctx.lineTo(this.x_next+this.size, this.y_next-this.size)
            ctx.lineTo(this.x_next+this.size, this.y_next+this.size)
            ctx.lineTo(this.x_next-this.size, this.y_next+this.size)
            ctx.lineTo(this.x_next-this.size, this.y_next-this.size)
            ctx.stroke();
        }
    }

    printRoute() {
        console.log(this.id)
        for (var r of this.route) {
            console.log(r.eqp, r.eventType, r.startTime, r.endTime)
        }
    }
}