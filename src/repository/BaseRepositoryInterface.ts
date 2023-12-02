import {BaseInputDTO} from "../dto/BaseInputDTO";
import {BaseOutputDTO} from "../dto/BaseOutputDTO";

export interface BaseRepositoryInterface {
    getById(id: any): Promise<BaseOutputDTO>;
    getAll(): Promise<BaseOutputDTO[]>;
    save(baseDTO: BaseInputDTO): Promise<BaseOutputDTO>
}