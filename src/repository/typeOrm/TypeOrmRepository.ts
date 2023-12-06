import {BaseRepositoryInterface} from "../BaseRepositoryInterface";
import {Repository} from "typeorm";
import {AppDataSource} from "../../data-source";
import {BaseInputDTO} from "../../dto/BaseInputDTO";
import {BaseOutputDTO} from "../../dto/BaseOutputDTO";


export abstract class TypeOrmRepository<TypeOrmEntity, InputDTO extends BaseInputDTO, OutputDTO extends BaseOutputDTO> implements BaseRepositoryInterface {
    readonly repository: Repository<TypeOrmEntity>;

    protected constructor(entity: TypeOrmEntity) {
        this.repository = AppDataSource.getRepository(entity);
    }

    abstract getById(id: number | string): Promise<OutputDTO>

    abstract getAll(): Promise<OutputDTO[]>

    abstract save(baseDTO: InputDTO): Promise<OutputDTO>
}