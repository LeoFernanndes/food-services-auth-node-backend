import {BaseDTO} from "../dto/BaseDTO";
import {BaseOrmDTO} from "../dto/BaseOrmDTO";
import {BaseDataClass} from "../dto/BaseDataClass";


export interface BaseRepositoryInterface {
    getById(id: any): Promise<BaseOrmDTO<BaseDataClass, any>>;
    getAll(): Promise<BaseOrmDTO<BaseDataClass, any>[]>;
    create(baseDTO: BaseOrmDTO<BaseDataClass, any>): Promise<BaseOrmDTO<BaseDataClass, any>>;
    update(id: any, baseDTO: BaseOrmDTO<BaseDataClass, any>): Promise<BaseOrmDTO<BaseDataClass, any>>;
    deleteById(id: any): Promise<BaseOrmDTO<BaseDataClass, any>>;
}