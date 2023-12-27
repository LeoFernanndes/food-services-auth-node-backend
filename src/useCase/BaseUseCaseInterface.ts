import {BaseDTO} from "../dto/BaseDTO";
import {BaseDTO} from "../dto/BaseDTO";
import {BaseDataClass} from "../dto/BaseDataClass";


export interface BaseUseCaseInterface {
    execute(id?: any, data?: any): Promise<BaseDTO<BaseDataClass>> | Promise<BaseDTO<BaseDataClass>[]>
}