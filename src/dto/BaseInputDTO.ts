import { BaseDTO } from "./BaseDTO";
import {DataClass} from "./DataClass";


export abstract class BaseInputDTO extends BaseDTO implements DataClass{
    _dtoType: 'input' | 'output' = 'input'
    abstract _allowedFieldNames: string[];
    initialData: DataClass;
    readonly validatedData: DataClass;

    protected constructor(object: DataClass) {
        super();
        this.initialData = object
        this.validatedData = this.parseValidatedDataClass(object)
    }
}