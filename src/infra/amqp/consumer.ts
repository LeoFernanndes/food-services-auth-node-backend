import amqp, { Message } from 'amqplib/callback_api'

const createMQConsumer = (amqpURl: string, queueName: string) => {
    console.log('Connecting to RabbitMQ...')
    return () => {
        amqp.connect(amqpURl, (errConn, conn) => {
            if (errConn) {
                throw errConn
            }

            conn.createChannel((errChan, chan) => {
                if (errChan) {
                    throw errChan
                }

                const authExchange = process.env.RABBITMQ_AUTH_EXCHANGE || 'auth-topic-exchange';
                chan.assertExchange(authExchange, 'topic', {
                    durable: true
                });
                chan.bindQueue(queueName, authExchange, '#')
                
                const recipeExchange = process.env.RABBITMQ_RECIPE_EXCHANGE || 'recipe-topic-exchange';
                chan.assertExchange(recipeExchange, 'topic', {
                    durable: true
                });

                chan.assertQueue(queueName, {durable: true})
                chan.bindQueue(queueName, recipeExchange, '#')

                console.log('Connected to RabbitMQ')

                chan.consume(queueName, (msg: Message | null) => {
                    try {
                        if (msg) {
                            const parsed = JSON.parse(msg.content.toString())
                            switch (parsed.action) {
                                case 'authValidateToken':
                                    console.log('Consuming authValidateToken action', parsed.data)
                                    break
                                case 'authLogin':
                                    console.log('Consuming authLogin action', parsed.data)
                                    break
                                case 'recipeCreateRecipe':
                                    console.log('Consuming recipeCreateRecipe action', parsed.data)
                                    break
                                default:
                                    console.log('Consuming default action', parsed)
                                    break
                            }
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }, { noAck: true })
            })
        })
    }
}

export default createMQConsumer