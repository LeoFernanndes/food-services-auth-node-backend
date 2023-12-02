import {BaseOutputDTO} from "../dto/BaseOutputDTO";
import {BaseInputDTO} from "../dto/BaseInputDTO";
import {ObjectLiteral} from "typeorm";


export interface BaseObjectConverterInterface {
    entityToDTO(entity): BaseInputDTO;

    dtoToEntity(dto: BaseInputDTO);
}