import {BaseRepositoryInterface} from "../BaseRepositoryInterface";
import {DataSource, Repository} from "typeorm";
import {AppDataSource} from "../../DataSource";
import {BaseInputDTO} from "../../dto/BaseInputDTO";
import {BaseOutputDTO} from "../../dto/BaseOutputDTO";


export abstract class TypeOrmRepository<TypeOrmEntity, InputDTO extends BaseInputDTO, OutputDTO extends BaseOutputDTO> implements BaseRepositoryInterface {
    readonly repository: Repository<TypeOrmEntity>;

    protected constructor(repository: Repository<TypeOrmEntity>) {
        this.repository = repository
    }

    abstract getById(id: number | string): Promise<OutputDTO>

    abstract getAll(): Promise<OutputDTO[]>

    abstract save(baseDTO: InputDTO): Promise<OutputDTO>
}