import {BaseRepositoryInterface} from "../BaseRepositoryInterface";
import {Repository} from "typeorm";
import {AppDataSource} from "../../data-source";
import {BaseInputDTO} from "../../dto/BaseInputDTO";
import {BaseOutputDTO} from "../../dto/BaseOutputDTO";
import {TypeOrmConverter} from "./TypeOrmConverter";


export abstract class TypeOrmRepository<TypeOrmEntity, InputDTO extends BaseInputDTO, OutputDTO extends BaseOutputDTO> implements BaseRepositoryInterface {
    readonly repository: Repository<TypeOrmEntity>;

    protected constructor(entity: TypeOrmEntity) {
        this.repository = AppDataSource.getRepository(entity);
    }

    async getById(id: number | string): Promise<OutputDTO> {
        const returnedObject: TypeOrmEntity = await this.repository.findOneBy({id: id});
        return Promise.resolve(returnedObject);
    }

    async getAll(): Promise<OutputDTO[]> {
        const returnedEntities: TypeOrmEntity[] = await this.repository.find();
        const returnedDTOs: OutputDTO[] = [];
        returnedEntities.forEach(entity =>{
            const dto = new TypeOrmConverter().entityToDTO(entity);
            returnedDTOs.push(dto)
        })
        return Promise.resolve(returnedDTOs);
    }

    abstract save(baseDTO: InputDTO): Promise<OutputDTO>
}