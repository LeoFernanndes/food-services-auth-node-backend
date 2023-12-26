import {BaseDTO} from "../BaseDTO";
import {LoginDataClass} from "./LoginDataClass";


export class LoginDTO extends BaseDTO {
    readonly _allowedFieldNames = ['userName', 'password'];
    readonly initialData: LoginDataClass;
    readonly validatedData: LoginDataClass;

    constructor(dataClass: LoginDataClass, allowedFieldNames?: string[]) {
        super()
        if (allowedFieldNames) {
            this._allowedFieldNames = allowedFieldNames;
        }
        const newObject = this.deepCopyDataClass(dataClass, this._allowedFieldNames, LoginDataClass);
        this.initialData = newObject;
        this.validatedData = this.parseValidatedDataClass(newObject, LoginDataClass);
    }
}
