import {BaseDataClass} from "../../BaseDataClass";
import {Allow} from "class-validator";


export class TokenDataClass extends BaseDataClass {
    @Allow()
    token: string;
}