import {BaseDataClass} from "../../BaseDataClass";
import {MaxLength} from "class-validator";


export class LoginDataClass extends BaseDataClass {

    @MaxLength(50)
    username: string;

    @MaxLength(100)
    password: string
}