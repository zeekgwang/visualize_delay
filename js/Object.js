
export class Object{
    x;
    y;
    id;
    size;
    color;

    drawObj(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x-this.size, this.y-this.size, this.size * 2, this.size * 2);
    }
}