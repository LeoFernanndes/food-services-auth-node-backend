import {BaseOutputDTO} from "../dto/BaseOutputDTO";
import {BaseInputDTO} from "../dto/BaseInputDTO";


export interface BaseUseCaseInterface {
    execute(input?: any): Promise<BaseOutputDTO> | Promise<BaseOutputDTO[]>
}