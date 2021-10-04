
export class Equipment extends Object{
    constructor(x, y, id, step, order){
        super();
        this.x = x;
        this.y = y;
        this.id = id;

        this.step = step;
        this.order = order;
    }

    printInfo(){
        console.log(this.x, this.y, this.id)
        console.log(this.step, this.order)
    }
}