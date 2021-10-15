
export class Node {
    constructor(eqp, eventType, startTime, endTime) {
        this.eqpId = eqp.id
        this.eqpX = eqp.x
        this.eqpY = eqp.y
        this.eventType = eventType
        this.startTime = startTime
        this.endTime = endTime
    }
}

