import { DataSource, DataSourceOptions } from "typeorm"
import {UserEntity} from "./entity/UserEntity";

export let AppDataStore: DataSource = null

export async function initDbStoreForTests() {
    const dbSettings ={
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [UserEntity],
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