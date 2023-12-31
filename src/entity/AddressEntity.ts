import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {FSBaseEntity} from "./FSBaseEntity";

export enum AddressType {
    STREET ="street",
    AVENUE = "avenue"
}

export enum HousingType {
    HOUSE = "house",
    APARTMENT = "apartment"
}

@Entity("address")
export class AddressEntity extends FSBaseEntity {
    @PrimaryColumn({name: "id"})
    id: string;

    @Column({
        name: "address_type",
        type: "enum",
        enum: AddressType
    })
    addressType: AddressType;

    @Column({name: "address"})
    address: string;

    @Column({name:"number", type: "int"})
    number: number

    @Column({name: "number_complement"})
    numberComplement: string;

    @Column({name: "address_complement"})
    addressComplement: string;

    @Column({
        name: "housing_type",
        type: "enum",
        enum: HousingType
    })
    housingType: HousingType

    @Column({name: "zip_code"})
    zipCode: string;

    @Column({name: "city"})
    city: string

    @Column({name: "state"})
    state: string;

    @Column({name: "country"})
    country: string;

}