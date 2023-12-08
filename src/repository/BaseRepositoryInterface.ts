import {BaseInputDTO} from "../dto/BaseInputDTO";
import {BaseOutputDTO} from "../dto/BaseOutputDTO";


export interface BaseRepositoryInterface {
    getById(id: any): Promise<BaseOutputDTO>;
    getAll(): Promise<BaseOutputDTO[]>;
    create(baseDTO: BaseInputDTO): Promise<BaseOutputDTO>
    update(id: any, baseDTO: BaseInputDTO): Promise<BaseOutputDTO>
    deleteById(id: any): Promise<BaseOutputDTO>
}