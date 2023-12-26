import {TokenDataClass} from "./dataClass/TokenDataClass";
import {BaseDTO} from "../BaseDTO";


export class TokenDTO extends BaseDTO {
    readonly _allowedFieldNames = ['token'];
    readonly initialData: TokenDataClass;
    readonly validatedData: TokenDataClass;

    constructor(dataClass: TokenDataClass, allowedFieldNames?: string[]) {
        super()
        if (allowedFieldNames) {
            this._allowedFieldNames = allowedFieldNames;
        }
        const newObject = this.deepCopyDataClass(dataClass, this._allowedFieldNames, TokenDataClass);
        this.initialData = newObject;
        this.validatedData = this.parseValidatedDataClass(newObject, TokenDataClass);
    }
}
