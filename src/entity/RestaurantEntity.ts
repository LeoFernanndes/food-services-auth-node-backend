import {ChildEntity, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {FSBaseEntity} from "./FSBaseEntity";

// @Entity()
export class RestaurantEntity extends FSBaseEntity {
    @PrimaryColumn()
    id: string;
}