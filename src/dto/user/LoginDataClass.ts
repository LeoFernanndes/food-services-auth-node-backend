import {DataClass} from "../DataClass";
import {IsInt, Max, MaxLength, Min, validate, validateSync, ValidationError} from "class-validator";



export class LoginDataClass extends DataClass {

    @MaxLength(50)
    userName: string;

    @MaxLength(100)
    password: string
}