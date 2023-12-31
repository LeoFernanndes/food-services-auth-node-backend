import {UserEntity} from "../../../entity/UserEntity";
import {TypeOrmRepository} from "../TypeOrmRepository";
import {NotFoundException} from "../../../common/exceptions/NotFoundException";
import {DataSource} from "typeorm";
import {BadRequestException} from "../../../common/exceptions/BadRequestException";
import {UserOrmDTO} from "../../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../../dto/user/dataClass/UserDataClass";


export class UserTypeOrmRepository extends TypeOrmRepository<UserEntity, UserOrmDTO<UserDataClass, UserEntity>> {

    constructor(dataSource: DataSource) {
        const repository = dataSource.getRepository(UserEntity)
        super(repository);

    }

    // TODO: investigate error generated when id is not any
    async getById(id: any): Promise<UserOrmDTO<UserDataClass, UserEntity>> {
        const retrievedEntity: UserEntity = await this.repository.findOneBy({id:id})
        if (!retrievedEntity){
            throw new NotFoundException(`User with id ${id} was not found`);
        }
        return new UserOrmDTO<UserDataClass, UserEntity>(retrievedEntity, UserDataClass, UserEntity, {safe:true});
    }

    async getByUsername(username: any): Promise<UserOrmDTO<UserDataClass, UserEntity>> {
        const retrievedEntity: UserEntity = await this.repository.findOneBy({username:username})
        if (!retrievedEntity){
            throw new NotFoundException(`User with username ${username} was not found`);
        }
        return new UserOrmDTO<UserDataClass, UserEntity>(retrievedEntity, UserDataClass, UserEntity,
            {dtoEntityFieldNames: ['id', 'firstName', 'lastName', 'age', 'username', 'password', 'created', 'updated'], safe:true})

    }

    async getAll(): Promise<UserOrmDTO<UserDataClass, UserEntity>[]> {
        const retrievedEntities: UserEntity[] = await this.repository.find();
        const returnedDTOs: UserOrmDTO<UserDataClass, UserEntity>[] = [];
        retrievedEntities.forEach(retrievedEntity => {
            let returnedDTO = new UserOrmDTO<UserDataClass, UserEntity>(retrievedEntity, UserDataClass, UserEntity, {safe: true})
            returnedDTOs.push(returnedDTO)
        })
        return returnedDTOs;
    }

    async create(userDTO: UserOrmDTO<UserDataClass, UserEntity>): Promise<UserOrmDTO<UserDataClass, UserEntity>> {
        const entityToBePersisted: UserEntity = userDTO.entity
        try {
            const createdEntity = await this.repository.save(entityToBePersisted);
            return new UserOrmDTO<UserDataClass, UserEntity>(createdEntity, UserDataClass, UserEntity, {safe: true});
        } catch (error) {
            if (error.message.includes('duplicate key value')){
                throw new BadRequestException(`${error.detail}`)
            }
            if (error.message.includes('not-null constraint')){
                throw new BadRequestException(error.message)
            }
            throw new Error(`${error.message}`)
        }
    }

    async update(id: any, userInputDto: UserOrmDTO<UserDataClass, UserEntity>): Promise<UserOrmDTO<UserDataClass, UserEntity>> {
        const currentUserEntity: UserEntity = await this.repository.findOneBy({id: id})
                if (!currentUserEntity){
            throw new NotFoundException(`User with id ${id} was not found`)
        }
        const userToBeUpdatedEntity = userInputDto.getPlainObjectEntity();
        try {
            await this.repository.createQueryBuilder().update(UserEntity).set(userToBeUpdatedEntity).where("id = :id", { id: id }).execute();
            const updatedUserResult = await this.repository.findOneBy({id: id})
            return new UserOrmDTO<UserDataClass, UserEntity>(updatedUserResult, UserDataClass, UserEntity, {safe: true});
        } catch (error) {
            throw new Error('Unprocessable entity')
        }
    }

    async deleteById(id: any): Promise<UserOrmDTO<UserDataClass, UserEntity>> {
        const userToBeDeleted = await this.repository.findOneBy({id: id})
        if(!userToBeDeleted){
            throw new NotFoundException(`User with id ${id} was not found`)
        }
        await this.repository.delete({id: id})
        return new UserOrmDTO<UserDataClass, UserEntity>(userToBeDeleted, UserDataClass, UserEntity, {safe: true});
    }
}

