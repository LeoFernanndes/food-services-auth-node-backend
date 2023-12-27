import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm"
import {BaseEntityInterface} from "./BaseEntityInterface";


@Entity()
export class User implements BaseEntityInterface{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column({unique: true})
    userName: string

    @Column()
    password: string

}
