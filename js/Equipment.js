import {Object} from './Object.js'

export class Equipment extends Object{

    lotSet;

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
        this.runList = [];
        this.endList = [];
    }

    printInfo(){
        console.log(this.x, this.y, this.id)
        console.log(this.step, this.stepOrder, this.order)
    }

    updatePos(){
        for(var i = 0 ; i < this.waitList.length ; i++){
            this.lotSet[this.waitList[i][0]].x -= (this.lotSet[this.waitList[i][0]].size * 2 + 2) * parseInt(i / 2)
            if(i % 2 === 0){
                this.lotSet[this.waitList[i][0]].y -= (this.lotSet[this.waitList[i][0]].size + 1)
            }else{
                this.lotSet[this.waitList[i][0]].y += (this.lotSet[this.waitList[i][0]].size + 1)
            }
        }

        var endList_r = [...this.endList].reverse()
        for(var i = 0 ; i < endList_r.length ; i++){
            this.lotSet[endList_r[i][0]].x += (this.lotSet[endList_r[i][0]].size * 2 + 2) * parseInt(i / 2)
            if(i % 2 === 0){
                this.lotSet[endList_r[i][0]].y += (this.lotSet[endList_r[i][0]].size + 1)
            }else{
                this.lotSet[endList_r[i][0]].y -= (this.lotSet[endList_r[i][0]].size + 1)
            }
        }
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

    addRunList(lotId, tkinTime){
        var i;

        for(i = 0 ; i < this.runList.length ; i++){
            if(this.runList[i][1] > tkinTime){
                break
            }
        }

        this.runList.splice(i, 0, [lotId, tkinTime])
    }

    removeRunList(lotId){
        for(var i = 0 ; i < this.runList.length ; i++){
            if(this.runList[i][0] === lotId){
                this.runList.splice(i, 1)
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
        var wList = []
        for (var wLot of this.waitList){
            wList.push(wLot[0])
        }

        var rList = []
        for (var rLot of this.runList){
            rList.push(rLot[0])
        }

        var eList = []
        for (var eLot of this.endList){
            eList.push(eLot[0])
        }

        console.log(this.id)

        console.log("wList : ", wList.join(", "))
        console.log("rList : ", rList.join(", "))
        console.log("eList : ", eList.join(", "))

    }
}