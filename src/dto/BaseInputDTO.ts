import { BaseDTO } from "./BaseDTO";


export abstract class BaseInputDTO extends BaseDTO {
    private _dtoType: 'input' | 'output' = 'input'
    abstract _allowedFieldNames: string[];
    abstract initialData: BaseInputDTO;
    readonly abstract validatedData: BaseInputDTO;

    constructor(object: BaseInputDTO) {
        super();
        this.initialData = object
        this.validatedData = this.validateObject(object)
    }
    abstract validateObject(object: BaseInputDTO): BaseInputDTO;
}


// export abstract class BaseInputDTO extends BaseDTO {
//     private _dtoType: 'input' | 'output' = 'input'
//     abstract _allowedFieldNames: string[];
//     abstract initialData: BaseInputDTO;
//     readonly abstract validatedData: BaseInputDTO;
//
//     constructor(object: BaseInputDTO) {
//         super();
//         this.initialData = object
//         this.validatedData = this.validateObject(object)
//     }
//     abstract validateObject(object: BaseInputDTO): BaseInputDTO;
// }