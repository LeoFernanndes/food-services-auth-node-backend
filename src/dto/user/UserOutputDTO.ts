import {BaseOutputDTO} from "../BaseOutputDTO";


export class UserOutputDTO extends BaseOutputDTO {
    _allowedFieldNames = ['id', 'firstName', 'lastName', 'age'];
    initialData: UserOutputDTO;
    readonly validatedData: UserOutputDTO;

    id: number;
    firstName: string;
    lastName: string;
    age: number;

    constructor(object: UserOutputDTO) {
        super(object);
    }

    validateObject(object: UserOutputDTO): UserOutputDTO {
        this.id = object.id
        this.lastName = object.firstName;
        this.lastName = object.lastName;
        this.age = object.age;

        return <UserOutputDTO>{
            id: object.id,
            firstName: object.firstName,
            lastName: object.lastName,
            age: object.age
        }
    }
}