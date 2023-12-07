import { AppDataSource } from "./DataSource"
import {config} from "dotenv";
import express, {Express, Request, Response} from "express";
import {router as UserExpressRouter} from "./controller/rest/UserExpressController";
import "reflect-metadata";
import {logPayloadMiddleware} from "./controller/rest/middlewares/logPayloadMiddleware";


AppDataSource.initialize().then(async () => {
    console.log("Here you can setup and run express / fastify / any other framework.")
}).catch(error => console.log(error))


config();

const app: Express = express();
const port = process.env.WEBSERVICE_PORT;

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