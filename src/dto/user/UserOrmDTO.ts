import {BaseDataClass} from "../BaseDataClass";
import {BaseDTO} from "../BaseDTO";
import {BaseOrmDTO} from "../BaseOrmDTO";
import bcrypt from "bcrypt";


export class UserOrmDTO<DataClass extends BaseDataClass, Entity> extends BaseOrmDTO<DataClass, Entity>{
    entityFields = ['id', 'firstName', 'lastName', 'age', 'userName', 'password'];
    public readonly entity;

    constructor(dataClass: DataClass, dataclassType: {new():DataClass}, entityType: {new():Entity}, allowedFieldNames?: string[]) {
        super(dataClass, dataclassType, entityType, allowedFieldNames?allowedFieldNames:['id', 'firstName', 'lastName', 'age', 'userName']);
        this.entity = this.generateEntity(entityType);

        if (this._allowedFieldNames.includes('password')){
            this.validatedData['password'] = this.hashPassword(this.validatedData['password']);
        }
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 15);
    }
}