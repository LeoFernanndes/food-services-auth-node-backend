import { BaseDTO } from "./BaseDTO";


export abstract class BaseOutputDTO extends BaseDTO {
    _dtoType: 'input' | 'output' = 'input'
    abstract _allowedFieldNames: string[];
    abstract initialData: BaseOutputDTO;
    abstract validatedData: BaseOutputDTO;

    constructor(object: BaseOutputDTO) {
        super();
        this.initialData = object;
        this.validatedData = this.validateObject(object)
    }

    abstract validateObject(object: BaseOutputDTO): BaseOutputDTO
}