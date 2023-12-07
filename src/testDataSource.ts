import { DataSource, DataSourceOptions } from "typeorm"
import {User} from "./entity/User";

export let AppDataStore: DataSource = null

export async function initDbStore() {
    const dbSettings = getDbSettings();
    try {
        AppDataStore = new DataSource(dbSettings)
        await AppDataStore.initialize()
        console.log(`Db initialized`)
    } catch (err) {
        console.error(`dbConnectionManager - error initializing db. Error: ${err.message}`)
    }
}

export async function initDbStoreForTests() {
    const dbSettings ={
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [User],
        synchronize: true,
        logging: false
    } as any;
    try {
        AppDataStore = new DataSource(dbSettings)
        return await AppDataStore.initialize()
    } catch (err) {
        console.error(`dbConnectionManager - error initializing db. Error: ${err.message}`)
    }
}

function getDbSettings() {
    const dbSettings: DataSourceOptions = {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "test",
        password: "test",
        database: "test",
    }
    return dbSettings
}