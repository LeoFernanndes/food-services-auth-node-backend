import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {config} from "dotenv"

// TODO: check why environt variables were not properly loaded from .env
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "food-services-admin",
    password: "password123",
    database: "food-services",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})