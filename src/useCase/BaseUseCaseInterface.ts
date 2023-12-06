import {BaseOutputDTO} from "../dto/BaseOutputDTO";
import {BaseInputDTO} from "../dto/BaseInputDTO";


export interface BaseUseCaseInterface {
    execute(id?: any, data?: any): Promise<BaseOutputDTO> | Promise<BaseOutputDTO[]>
}