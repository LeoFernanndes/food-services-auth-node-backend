import {BaseDataClass} from "../BaseDataClass";
import {BaseOrmDTO, BaseOrmDtoOptionalParametersInterface} from "../BaseOrmDTO";
import bcrypt from "bcrypt";
import {UserEntity} from "../../entity/UserEntity";
import {FSBaseEntity} from "../../entity/FSBaseEntity";


export class UserOrmDTO<DataClass extends BaseDataClass, Entity extends FSBaseEntity> extends BaseOrmDTO<DataClass, Entity>{

    protected readonly sensitiveDataFields = ['password'];
    public readonly entity: UserEntity;

    constructor(dataClass: DataClass, dataclassType: {new():DataClass}, entityType: {new():Entity}, options?: BaseOrmDtoOptionalParametersInterface) {
        super(dataClass, dataclassType, entityType,
            options?.dtoEntityFieldNames?options.dtoEntityFieldNames:['id', 'firstName', 'lastName', 'age', 'username', 'created', 'updated'],
            options
            );

        if (this.dtoDataClassFieldNames.includes('password') && this.validatedDataClassFieldNames.includes('password')){
            this.validatedData['password'] = this.hashPassword(this.validatedData['password']);
        }
        this.entity = this.generateEntity(UserEntity, {idFieldName: 'id', idValuePrefix: 'user'});
    }

    protected hashPassword(password: string): string {
        return bcrypt.hashSync(password, 15);
    }

    public getCorrectlyHashedPassword(): string {
        return this.entity.password
    }
}