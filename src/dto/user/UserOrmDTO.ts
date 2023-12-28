import {BaseDataClass} from "../BaseDataClass";
import {BaseDTO} from "../BaseDTO";
import {BaseOrmDTO} from "../BaseOrmDTO";
import bcrypt from "bcrypt";
import {User} from "../../entity/User";


export class UserOrmDTO<DataClass extends BaseDataClass, Entity> extends BaseOrmDTO<DataClass, Entity>{
    entityFields = ['id', 'firstName', 'lastName', 'age', 'userName', 'password'];
    public readonly entity;

    constructor(dataClass: DataClass, dataclassType: {new():DataClass}, entityType: {new():Entity}, allowedFieldNames?: string[]) {
        super(dataClass, dataclassType, entityType, allowedFieldNames?allowedFieldNames:['id', 'firstName', 'lastName', 'age', 'userName']);

        if (this._allowedFieldNames.includes('password')){
            this.validatedData['password'] = this.hashPassword(this.validatedData['password']);
        }
        this.entity = this.generateEntity(User);
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 15);
    }
}