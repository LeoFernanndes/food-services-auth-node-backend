import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm"


@Entity()
export class User {

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
