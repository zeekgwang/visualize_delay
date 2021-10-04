
export class Lot extends Object{
    constructor(x, y, id){
        super();
        this.x = x;
        this.y = y;
        this.id = id;
        this.route = [];
    }

    printInfo(){
        console.log(this.x, this.y, this.id)
    }

    addNode(node){
        this.route.push(node)
    }

    printRoute(){
        console.log(this.id)
        for(var r of this.route){
            console.log(r)
        }
    }
}