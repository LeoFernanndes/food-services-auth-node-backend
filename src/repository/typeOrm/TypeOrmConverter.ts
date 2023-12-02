import {BaseObjectConverterInterface} from "../BaseObjectConverterInterface";
import {ObjectLiteral} from "typeorm";
import {BaseDTO} from "../../dto/BaseDTO";
import {BaseOutputDTO} from "../../dto/BaseOutputDTO";
import {BaseInputDTO} from "../../dto/BaseInputDTO";


export class TypeOrmConverter {
    public entityToDTO(entity: ObjectLiteral): {} {
        let dtoToBeReturned: {} = {};
        for (let k in entity) {
            dtoToBeReturned[k]=entity[k]
        }
        return dtoToBeReturned
    }

    public dtoToEntity(dto: BaseInputDTO): ObjectLiteral {
        let entityToBeReturned: ObjectLiteral = {};
        for (let k in dto._allowedFieldNames) {
            entityToBeReturned[k]=dto[k]
        }
        return entityToBeReturned
    }
}