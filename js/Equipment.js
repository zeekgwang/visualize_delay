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
    }

    printInfo(){
        console.log(this.x, this.y, this.id)
        console.log(this.step, this.order)
    }
}