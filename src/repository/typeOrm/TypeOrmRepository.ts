import {BaseRepositoryInterface} from "../BaseRepositoryInterface";
import { Repository} from "typeorm";
import {BaseDTO} from "../../dto/BaseDTO";
import {BaseOrmDTO} from "../../dto/BaseOrmDTO";
import {BaseDataClass} from "../../dto/BaseDataClass";


export abstract class TypeOrmRepository<TypeOrmEntity, DTO extends BaseOrmDTO<BaseDataClass, any>> implements BaseRepositoryInterface {
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