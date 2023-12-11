import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from "./entity/User";
import {config} from "dotenv";

config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || "food-services-admin",
    password: process.env.DATABASE_PASSWORD || "password123",
    database: process.env.DATABASE || "food-services",
    entities: ["dist/**/entity/**/*.js"],
    migrations: ["dist/migration/**/*.js"],
    subscribers: [],
})