import {BaseInputDTO} from "../BaseInputDTO";


export class UserInputDTO extends BaseInputDTO {
    _allowedFieldNames = ['firstName', 'lastName', 'age'];
    initialData: UserInputDTO;
    readonly validatedData: UserInputDTO;

    firstName: string;
    lastName: string;
    age: number;

    constructor(object: UserInputDTO) {
        super(object);
    }
    validateObject(object: UserInputDTO): UserInputDTO {
        this.lastName = object.firstName;
        this.lastName = object.lastName;
        this.age = object.age;

        return <UserInputDTO>{
            firstName: object.firstName,
            lastName: object.lastName,
            age: object.age
        }
    }
}
