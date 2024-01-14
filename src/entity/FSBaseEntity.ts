import {CreateDateColumn, UpdateDateColumn} from "typeorm";


export abstract class FSBaseEntity {

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}