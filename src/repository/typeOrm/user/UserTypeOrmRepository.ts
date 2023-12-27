import {User} from "../../../entity/User";
import {TypeOrmRepository} from "../TypeOrmRepository";
import {NotFoundException} from "../../../common/exceptions/NotFoundException";
import {DataSource} from "typeorm";
import {BadRequestException} from "../../../common/exceptions/BadRequestException";
import {UserOrmDTO} from "../../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../../dto/user/dataClass/UserDataClass";


export class UserTypeOrmRepository extends TypeOrmRepository<User, UserOrmDTO<UserDataClass, User>> {

    constructor(dataSource: DataSource) {
        const repository = dataSource.getRepository(User)
        super(repository);

    }

    // TODO: investigate error generated when id is not any
    async getById(id: any): Promise<UserOrmDTO<UserDataClass, User>> {
        const retrievedEntity: User = await this.repository.findOneBy({id:id})
        if (!retrievedEntity){
            throw new NotFoundException(`User with id ${id} was not found`);
        }
        return new UserOrmDTO<UserDataClass>(retrievedEntity, UserDataClass, User, ['id', 'firstName', 'lastName', 'age', 'userName']);
    }

    async getByUsername(username: any): Promise<UserOrmDTO<UserDataClass, User>> {
        const retrievedEntity: User = await this.repository.findOneBy({userName:username})
        if (!retrievedEntity){
            throw new NotFoundException(`User with username ${username} was not found`);
        }
        return new UserOrmDTO<UserDataClass>(retrievedEntity, UserDataClass, User, ['id', 'firstName', 'lastName', 'age', 'userName', 'password'])

    }

    async getAll(): Promise<UserOrmDTO<UserDataClass, User>[]> {
        const retrievedEntities: User[] = await this.repository.find();
        const returnedDTOs: UserOrmDTO<UserDataClass, User>[] = [];
        retrievedEntities.forEach(retrievedEntity => {
            let returnedDTO = new UserOrmDTO<UserDataClass, User>(retrievedEntity, UserDataClass, User, ['id', 'firstName', 'lastName', 'age', 'userName'])
            returnedDTOs.push(returnedDTO)
        })
        return returnedDTOs;
    }

    async create(userDTO: UserOrmDTO<UserDataClass, User>): Promise<UserOrmDTO<UserDataClass, User>> {
        const entityToBePersisted: User = userDTO.entity
        try {
            const createdEntity = await this.repository.save(entityToBePersisted);
            return new UserOrmDTO<UserDataClass>(createdEntity, UserDataClass, User, ['id', 'firstName', 'lastName', 'age', 'userName']);
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

    async update(id: any, userInputDto: UserOrmDTO<UserDataClass, User>): Promise<UserOrmDTO<UserDataClass, User>> {
        const currentUserEntity = await this.repository.findOneBy({id: id})
                if (!currentUserEntity){
            throw new NotFoundException(`User with id ${id} was not found`)
        }
        const userToBeUpdatedEntity = userInputDto.entity;
        try {
            await this.repository.createQueryBuilder().update(User).set(userToBeUpdatedEntity).where("id = :id", { id: id }).execute();
            const updatedUserResult = await this.repository.findOneBy({id: id})
            return new UserOrmDTO<UserDataClass>(updatedUserResult, UserDataClass, User, ['id', 'firstName', 'lastName', 'age', 'userName']);
            // return new UserDTO(updatedUserResult, ['id', 'firstName', 'lastName', 'age', 'userName'])
        } catch (error) {
            throw new Error('Unprocessable entity')
        }
    }

    async deleteById(id: any): Promise<UserOrmDTO<UserDataClass, User>> {
        const userToBeDeleted = await this.repository.findOneBy({id: id})
        if(!userToBeDeleted){
            throw new NotFoundException(`User with id ${id} was not found`)
        }
        await this.repository.delete({id: id})
        return new UserOrmDTO<UserDataClass>(userToBeDeleted, UserDataClass, User, ['id', 'firstName', 'lastName', 'age', 'userName']);
    }
}

