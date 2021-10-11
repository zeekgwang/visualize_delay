import {Object} from './Object.js'

export class Lot extends Object{

    eqpSet;

    constructor(x, y, id){
        super();
        this.x = x;
        this.y = y;
        this.id = id;
        this.waitOrder = 0;
        this.route = [];
        this.curR = 0;

        this.color = 'red';
        this.size = 8;
    }

    printInfo(){
        console.log(this.x, this.y, this.id)
    }

    addNode(node){
        this.route.push(node)
    }

    updatePos(time){
        if(this.curR < this.route.length){
            var curNode = this.route[this.curR];

            // Wait
            if(time >= curNode.inTime && time < curNode.tkinTime){
                this.x = curNode.eqpX - 40;
                this.y = curNode.eqpY;

                if(time === curNode.inTime){
                    this.eqpSet[curNode.eqpId].addWaitList(this.id, curNode.tkinTime)
                    if(this.curR > 0){
                        var prevNode = this.route[this.curR - 1]
                        this.eqpSet[prevNode.eqpId].removeEndList(this.id)
                    }
                }
            }
            // Run
            else if(time >= curNode.tkinTime && time < curNode.tkoutTime){
                this.x = curNode.eqpX;
                this.y = curNode.eqpY;

                if(time === curNode.tkinTime){
                    this.eqpSet[curNode.eqpId].removeWaitList(this.id)
                    this.eqpSet[curNode.eqpId].addRunList(this.id)
                }
            }
            // End
            else if (time >= curNode.tkoutTime){
                this.x = curNode.eqpX + 40;
                this.y = curNode.eqpY;

                if(time === curNode.tkoutTime) {
                    this.eqpSet[curNode.eqpId].removeRunList(this.id)
                    this.eqpSet[curNode.eqpId].addEndList(this.id)
                    this.curR += 1;
                }
            }
        }
    }

    printRoute(){
        console.log(this.id)
        for(var r of this.route){
            console.log(r.eqpId)
        }
    }
}