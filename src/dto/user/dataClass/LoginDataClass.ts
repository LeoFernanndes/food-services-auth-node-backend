import {BaseDataClass} from "../../BaseDataClass";
import {MaxLength} from "class-validator";


export class LoginDataClass extends BaseDataClass {

    @MaxLength(50)
    userName: string;

    @MaxLength(100)
    password: string
}