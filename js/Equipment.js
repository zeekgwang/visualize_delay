import {Object} from './Object.js'

export class Equipment extends Object{
    constructor(x, y, id, step, stepOrder, order){
        super();
        this.x = x;
        this.y = y;
        this.id = id;

        this.step = step;
        this.stepOrder = stepOrder;
        this.order = order;

        this.color = 'black'
        this.size = 20;

        this.waitList = [];
        this.endList = [];
    }

    printInfo(){
        console.log(this.x, this.y, this.id)
        console.log(this.step, this.stepOrder, this.order)
    }

    addWaitList(lotId, tkinTime){
        var i;

        for(i = 0 ; i < this.waitList.length ; i++){
            if(this.waitList[i][1] > tkinTime){
                break
            }
        }

        this.waitList.splice(i, 0, [lotId, tkinTime])
    }

    removeWaitList(lotId){
        for(var i = 0 ; i < this.waitList.length ; i++){
            if(this.waitList[i][0] === lotId){
                this.waitList.splice(i, 1)
                break
            }
        }
    }

    addEndList(lotId, tkoutTime){
        var i;

        for(i = 0 ; i < this.endList.length ; i++){
            if(this.endList[i][1] > tkoutTime){
                break
            }
        }

        this.endList.splice(i, 0, [lotId, tkoutTime])
    }

    removeEndList(lotId){
        for(var i = 0 ; i < this.endList.length ; i++){
            if(this.endList[i][0] === lotId){
                this.endList.splice(i, 1)
                break
            }
        }
    }

    printList(){
        console.log(this.id)
        var wList = []
        for (var wLot of this.waitList){
            wList.push(wLot[0])
        }
        console.log(wList.join(", "))

        // console.log(this.waitList)

        var eList = []
        for (var eLot of this.endList){
            eList.push(eLot[0])
        }
        console.log(eList.join(", "))

        // console.log(this.endList)
    }
}