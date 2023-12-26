import {DataClass} from "../DataClass";
import {IsInt, IsOptional, Max, MaxLength, Min, validate, validateSync, ValidationError} from "class-validator";



export class UserDataClass extends DataClass {
    @IsOptional()
    id?: number;

    @IsOptional()
    @MaxLength(50)
    firstName: string;

    @IsOptional()
    @MaxLength(50)
    lastName: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(150)
    age: number;

    @IsOptional()
    @MaxLength(50)
    userName: string;

    @IsOptional()
    @MaxLength(100)
    password: string
}