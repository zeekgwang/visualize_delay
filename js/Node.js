
export class Node {
    constructor(eqp, inTime, tkinTime, tkoutTime) {
        this.eqpId = eqp.id;
        this.eqpX = eqp.x;
        this.eqpY = eqp.y;
        this.inTime = inTime;
        this.tkinTime = tkinTime;
        this.tkoutTime = tkoutTime;
    }
}

