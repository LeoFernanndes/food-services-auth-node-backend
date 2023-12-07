import {DataClass} from "../DataClass";
import {IsInt, Max, MaxLength, Min, validate, validateSync, ValidationError} from "class-validator";



export class UserDataClass extends DataClass {
    id?: number;

    @MaxLength(50)
    firstName: string;

    @MaxLength(50)
    lastName: string;

    @IsInt()
    @Min(0)
    @Max(150)
    age: number;

    @MaxLength(50)
    userName: string;

    @MaxLength(50)
    password: string
}