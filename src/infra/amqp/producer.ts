import amqp, { Connection } from 'amqplib/callback_api'
import {channel} from "diagnostics_channel";

const createMQProducer = (amqpUrl: string, queueName: string) => {
    console.log('Connecting to RabbitMQ...')
    let ch: any
    let exc: any
    amqp.connect(amqpUrl, (errorConnect: Error, connection: Connection) => {
        if (errorConnect) {
            console.log('Error connecting to RabbitMQ: ', errorConnect)
            return
        }

        connection.createChannel((errorChannel, channel) => {
            if (errorChannel) {
                console.log('Error creating channel: ', errorChannel)
                return
            }
            const exchange = process.env.RABBITMQ_AUTH_EXCHANGE || 'auth-topic-exchange'
            channel.assertExchange(exchange, 'topic', {
                durable: true
            });

            channel.assertQueue(queueName, {durable: true})

            ch = channel
            exc = exchange
            console.log('Connected to RabbitMQ')
        })
    })
    return (msg: string) => {
        console.log('Produce message to RabbitMQ...')
        ch.publish(exc, '', Buffer.from(msg))
    }
}

export default createMQProducer