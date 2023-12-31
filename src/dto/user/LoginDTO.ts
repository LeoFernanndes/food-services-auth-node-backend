import {BaseDataClass} from "../BaseDataClass";
import {BaseDTO} from "../BaseDTO";


export class LoginDTO<DataClass extends BaseDataClass> extends BaseDTO<DataClass> {

    constructor(dataClass: DataClass, type: {new():DataClass}, allowedFieldNames?: string[]) {
        if(!allowedFieldNames){
            allowedFieldNames = ['username', 'password'];
        }
        super(dataClass, type, allowedFieldNames);
    }
}