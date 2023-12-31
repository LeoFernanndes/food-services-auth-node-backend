import {TypeOrmRepository} from "../TypeOrmRepository";
import {AddressEntity} from "../../../entity/AddressEntity";
import {AddressOrmDTO} from "../../../dto/general/AddressOrmDTO";
import {AddressDataClass} from "../../../dto/general/dataClass/AddressDataClass";
import {DataSource} from "typeorm";

export class AddressTypeOrmRepository extends TypeOrmRepository<AddressEntity, AddressOrmDTO<AddressDataClass, AddressEntity>> {

    constructor(dataSource: DataSource) {
        const repository = dataSource.getRepository(AddressEntity);
        super(repository);
    }

    async create(addressOrmDTO: AddressOrmDTO<AddressDataClass, AddressEntity>): Promise<AddressOrmDTO<AddressDataClass, AddressEntity>> {
        const addressToBePersisted = addressOrmDTO.entity
        try {
            const createdAddress = await this.repository.save(addressToBePersisted);
            return new AddressOrmDTO(createdAddress, AddressDataClass, AddressEntity)
        } catch (error) {
            console.log(error)
            throw new Error('Error')
        }

    }

    deleteById(id: any): Promise<AddressOrmDTO<AddressDataClass, AddressEntity>> {
        return Promise.resolve(undefined);
    }

    getAll(): Promise<AddressOrmDTO<AddressDataClass, AddressEntity>[]> {
        return Promise.resolve([]);
    }

    getById(id: number | string): Promise<AddressOrmDTO<AddressDataClass, AddressEntity>> {
        return Promise.resolve(undefined);
    }

    update(id: any, baseDTO: AddressOrmDTO<AddressDataClass, AddressEntity>): Promise<AddressOrmDTO<AddressDataClass, AddressEntity>> {
        return Promise.resolve(undefined);
    }
}