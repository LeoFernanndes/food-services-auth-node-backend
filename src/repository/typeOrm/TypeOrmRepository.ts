import {BaseRepositoryInterface} from "../BaseRepositoryInterface";
import { Repository} from "typeorm";
import {BaseDTO} from "../../dto/BaseDTO";


// export abstract class TypeOrmRepository<TypeOrmEntity, InputDTO extends BaseInputDTO, OutputDTO extends BaseOutputDTO> implements BaseRepositoryInterface {
//     readonly repository: Repository<TypeOrmEntity>;
//
//     protected constructor(repository: Repository<TypeOrmEntity>) {
//         this.repository = repository
//     }
//
//     abstract getById(id: number | string): Promise<OutputDTO>
//
//     abstract getAll(): Promise<OutputDTO[]>
//
//     abstract create(baseDTO: InputDTO): Promise<OutputDTO>
//
//     abstract deleteById(id: any): Promise<OutputDTO>
//
//     abstract update(id: any, baseDTO: InputDTO): Promise<OutputDTO>
// }


export abstract class TypeOrmRepository<TypeOrmEntity, DTO extends BaseDTO> implements BaseRepositoryInterface {
    readonly repository: Repository<TypeOrmEntity>;

    protected constructor(repository: Repository<TypeOrmEntity>) {
        this.repository = repository
    }

    abstract getById(id: number | string): Promise<DTO>

    abstract getAll(): Promise<DTO[]>

    abstract create(baseDTO: DTO): Promise<DTO>

    abstract deleteById(id: any): Promise<DTO>

    abstract update(id: any, baseDTO: DTO): Promise<DTO>
}