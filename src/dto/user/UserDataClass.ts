import {DataClass} from "../DataClass";
import {IsInt, Max, MaxLength, Min, validate, validateSync, ValidationError} from "class-validator";


export class UserDataClass extends DataClass {
    id?: number;

    @MaxLength(100)
    firstName: string;

    @MaxLength(100)
    lastName: string;

    @IsInt()
    @Min(0)
    @Max(200)
    age: number;
}