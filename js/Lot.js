import {Object} from './Object.js'

export class Lot extends Object{

    eqpSet;

    constructor(fx, fy, id){
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

    printInfo(){
        console.log(this.fx, this.fy, this.id)
    }

    addNode(node){
        this.route.push(node)
    }

    updatePos(time){
        if(this.curR < this.route.length){
            var curNode = this.route[this.curR];

            // Wait
            if(time >= curNode.inTime && time < curNode.tkinTime){
                this.fx = curNode.eqpX - 40;
                this.fy = curNode.eqpY;

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
                this.fx = curNode.eqpX;
                this.fy = curNode.eqpY;

                if(time === curNode.tkinTime){
                    this.eqpSet[curNode.eqpId].removeWaitList(this.id)
                    this.eqpSet[curNode.eqpId].addRunList(this.id, curNode.tkoutTime)
                }
            }
            // End
            else if (time >= curNode.tkoutTime){
                this.fx = curNode.eqpX + 40;
                this.fy = curNode.eqpY;

                if(time === curNode.tkoutTime) {
                    this.eqpSet[curNode.eqpId].removeRunList(this.id)
                    this.eqpSet[curNode.eqpId].addEndList(this.id, curNode.tkoutTime)
                    this.curR += 1;
                }
            }
        }

        this.x = this.fx;
        this.y = this.fy;
    }

    printRoute(){
        console.log(this.id)
        for(var r of this.route){
            console.log(r.eqpId)
        }
    }
}