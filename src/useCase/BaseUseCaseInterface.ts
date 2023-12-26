import {BaseDTO} from "../dto/BaseDTO";


export interface BaseUseCaseInterface {
    execute(id?: any, data?: any): Promise<BaseDTO> | Promise<BaseDTO[]>
}