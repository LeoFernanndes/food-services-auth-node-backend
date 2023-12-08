import { BaseDTO } from "./BaseDTO";
import {DataClass} from "./DataClass";


export abstract class BaseOutputDTO extends BaseDTO implements DataClass{
    _dtoType: 'input' | 'output' = 'input'
    abstract _allowedFieldNames: string[];
    initialData: DataClass;
    readonly validatedData: DataClass;

    // protected constructor(object: DataClass) {
    //     super();
    //     this.initialData = object;
    //     this.validatedData = this.validateObject(object)
    // }
    // abstract validateObject(object: DataClass): DataClass
}