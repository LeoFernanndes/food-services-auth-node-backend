import {UserDataClass} from "./UserDataClass";
import bcrypt from "bcrypt";
import {User} from "../../entity/User";
import {BaseOrmDTO} from "../BaseOrmDTO";

export class UserDTO extends BaseOrmDTO {
    readonly _allowedFieldNames: string[] = ['id', 'firstName', 'lastName', 'age', 'userName', 'password'];
    public readonly initialData: UserDataClass;
    public readonly validatedData: UserDataClass;
    public readonly entity: User;

    constructor(dataClass: UserDataClass, allowedFieldNames?: string[]) {
        super();
        if (allowedFieldNames) {
            this._allowedFieldNames = allowedFieldNames;
        } else {
            this._allowedFieldNames = ['id', 'firstName', 'lastName', 'age', 'userName'];
        }
        const newObject = this.deepCopyDataClass(dataClass, this._allowedFieldNames, UserDataClass);
        this.initialData = newObject;
        const validatedObject = this.parseValidatedDataClass(newObject, UserDataClass);
        if (this._allowedFieldNames.includes('password')){
            validatedObject.password = this.hashPassword(validatedObject.password);
        }
        this.validatedData = this.parseValidatedDataClass(validatedObject, UserDataClass);
        this.entity = this.generateEntity(User);
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 15);
    }
}