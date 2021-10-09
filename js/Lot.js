import {Object} from './Object.js'

export class Lot extends Object{
    constructor(x, y, id){
        super();
        this.x = x;
        this.y = y;
        this.id = id;
        this.route = [];

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
        if(this.route.length > 0){
            var curNode = this.route[0];

            if(time < curNode.tkinTime){
                this.x = curNode.eqpX - 40;
                this.y = curNode.eqpY;
            }else if(time >= curNode.tkinTime && time < curNode.tkoutTime){
                this.x = curNode.eqpX;
                this.y = curNode.eqpY;
            }else if (time >= curNode.tkoutTime){
                this.x = curNode.eqpX + 40;
                this.y = curNode.eqpY;

                this.route.shift();
            }
        }
    }

    printRoute(){
        console.log(this.id)
        for(var r of this.route){
            console.log(r)
        }
    }
}