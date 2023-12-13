import { DataSource, DataSourceOptions } from "typeorm"
import {User} from "./entity/User";

export let AppDataStore: DataSource = null

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