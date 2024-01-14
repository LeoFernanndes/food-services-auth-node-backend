import {Entity, Column, PrimaryColumn, BeforeInsert} from "typeorm";
import {FSBaseEntity} from "./FSBaseEntity";
import {v4 as uuidV4} from "uuid";


@Entity({name: "user"})
export class UserEntity extends FSBaseEntity {

    @PrimaryColumn()
    id: string

    @Column({name: "first_name"})
    firstName: string

    @Column({name: "last_name"})
    lastName: string

    @Column({name: "age"})
    age: number

    @Column({name: "username", unique: true})
    username: string

    @Column({name: "password"})
    password: string
}
