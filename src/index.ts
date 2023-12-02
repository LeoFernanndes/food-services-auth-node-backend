import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import {config} from "dotenv";
import express, {Express, Request, Response} from "express";
import {router} from "./controller/rest/UserRestController";
import "reflect-metadata";


AppDataSource.initialize().then(async () => {
    console.log("Here you can setup and run express / fastify / any other framework.")
}).catch(error => console.log(error))


config();

const app: Express = express();
const port = process.env.WEBSERVICE_PORT;

app.use(express.json())
app.use('/users', router)

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server!');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


export default app;