export class RabbitMqMessage {
    id: string;
    action: string;
    producer: string;
    data: object | object[];

    constructor(id: string, action: string, producer: string, data: object | object[]) {
        this.id = id;
        this.action = action;
        this.producer = producer;
        this.data = data;
    }
}