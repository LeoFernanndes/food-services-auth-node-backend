import {BaseDataClass} from "../BaseDataClass";
import {BaseDTO} from "../BaseDTO";


export class TokenDTO<DataClass extends BaseDataClass> extends BaseDTO<DataClass> {

    constructor(dataClass: DataClass, type: {new():DataClass}, allowedFieldNames?: string[]) {
        if(!allowedFieldNames){
            allowedFieldNames = ['token'];
        }
        super(dataClass, type, allowedFieldNames);
    }
}