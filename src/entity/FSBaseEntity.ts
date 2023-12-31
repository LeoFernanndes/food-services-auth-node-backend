import {BaseEntity, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";

// @Entity()
export abstract class FSBaseEntity {

    // @PrimaryColumn()
    // id: string;

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}