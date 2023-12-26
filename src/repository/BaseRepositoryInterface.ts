import {BaseDTO} from "../dto/BaseDTO";


export interface BaseRepositoryInterface {
    getById(id: any): Promise<BaseDTO>;
    getAll(): Promise<BaseDTO[]>;
    create(baseDTO: BaseDTO): Promise<BaseDTO>
    update(id: any, baseDTO: BaseDTO): Promise<BaseDTO>
    deleteById(id: any): Promise<BaseDTO>
}