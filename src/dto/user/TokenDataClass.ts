import {DataClass} from "../DataClass";
import {IsInt, Max, MaxLength, Min, validate, validateSync, ValidationError} from "class-validator";



export class TokenDataClass extends DataClass {

    token: string;
}