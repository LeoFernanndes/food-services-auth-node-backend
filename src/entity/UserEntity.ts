import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm"
import {BaseEntityInterface} from "./BaseEntityInterface";
import {FSBaseEntity} from "./FSBaseEntity";


@Entity({name: "user"})
export class UserEntity extends  FSBaseEntity {

    @PrimaryGeneratedColumn()
    id: number

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
