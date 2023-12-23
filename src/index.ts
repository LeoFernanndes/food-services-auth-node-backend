import { AppDataSource } from "./DataSource"
import {config} from "dotenv";
import express, {Express, Request, Response} from "express";
import {router as UserExpressRouter} from "./controller/rest/UserExpressController";
import "reflect-metadata";
import {logPayloadMiddleware} from "./controller/rest/middlewares/logPayloadMiddleware";
import createMQProducer from "./infra/amqp/producer";
import createMQConsumer from "./infra/amqp/consumer";


AppDataSource.initialize().then(async () => {
    console.log("Here you can setup and run express / fastify / any other framework.")
}).catch(error => console.log(error))


config();

const app: Express = express();
const port = process.env.WEBSERVICE_PORT || 3000;

const rabbitMQPort = process.env.RABBITMQ_PORT || 5672;
const rabbitMQHost = process.env.RABBITMQ_HOST || "localhost";
const rabbitMQQueueName = process.env.RABBITMQ_AUTH_QUEUE || "auth";
const rabbitMQUser = process.env.RABBITMQ_USERNAME || "guest"
const rabbitMQPassword = process.env.RABBITMQ_PASSWORD || "guest"
export const rabbitMQConsumer = createMQConsumer(`amqp://${rabbitMQUser}:${rabbitMQPassword}@${rabbitMQHost}:${rabbitMQPort}`, rabbitMQQueueName);
export const rabbitMQProducer = createMQProducer(`amqp://${rabbitMQUser}:${rabbitMQPassword}@${rabbitMQHost}:${rabbitMQPort}`, rabbitMQQueueName);


rabbitMQConsumer()
app.use(express.json())
app.use(logPayloadMiddleware)
app.use('/users', UserExpressRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server!');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


export default app;