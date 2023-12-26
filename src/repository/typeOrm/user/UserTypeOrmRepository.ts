import {User} from "../../../entity/User";
import {TypeOrmRepository} from "../TypeOrmRepository";
import {NotFoundException} from "../../../common/exceptions/NotFoundException";
import {DataSource} from "typeorm";
import {BadRequestException} from "../../../common/exceptions/BadRequestException";
import {UserDTO} from "../../../dto/user/UserDTO";
import {QueryFailedError} from "typeorm/browser";


export class UserTypeOrmRepository extends TypeOrmRepository<User, UserDTO> {

    constructor(dataSource: DataSource) {
        const repository = dataSource.getRepository(User)
        super(repository);

    }

    // TODO: investigate error generated when id is not any
    async getById(id: any): Promise<UserDTO> {
        const retrievedEntity: User = await this.repository.findOneBy({id:id})
        if (!retrievedEntity){
            throw new NotFoundException(`User with id ${id} was not found`);
        }
        return new UserDTO(retrievedEntity, ['id', 'firstName', 'lastName', 'age', 'userName']);
    }

    async getByUsername(username: any): Promise<UserDTO> {
        const retrievedEntity: User = await this.repository.findOneBy({userName:username})
        if (!retrievedEntity){
            throw new NotFoundException(`User with username ${username} was not found`);
        }
        return new UserDTO(retrievedEntity, ['id', 'firstName', 'lastName', 'age', 'userName', 'password']);
    }

    async getAll(): Promise<UserDTO[]> {
        const retrievedEntities: User[] = await this.repository.find();
        const returnedDTOs: UserDTO[] = [];
        retrievedEntities.forEach(retrievedEntity => {
            let returnedDTO = new UserDTO(retrievedEntity, ['id', 'firstName', 'lastName', 'age', 'userName'])
            returnedDTOs.push(returnedDTO)
        })
        return returnedDTOs;
    }

    async create(userDTO: UserDTO): Promise<UserDTO> {
        const entityToBePersisted: User = userDTO.entity
        try {
            const createdEntity = await this.repository.save(entityToBePersisted);
            return new UserDTO(createdEntity, ['id', 'firstName', 'lastName', 'age', 'userName', 'password'])
        } catch (error) {
            // console.log(error)
            // console.log(error.message)
            if (error.message.includes('duplicate key value')){
                throw new BadRequestException(`${error.detail}`)
            }
            if (error.message.includes('not-null constraint')){
                throw new BadRequestException(error.message)
            }
            throw new Error(`${error.message}`)
        }
    }

    async update(id: any, userInputDto: UserDTO): Promise<UserDTO> {
        const currentUserEntity = await this.repository.findOneBy({id: id})
                if (!currentUserEntity){
            throw new NotFoundException(`User with id ${id} was not found`)
        }
        const userToBeUpdatedEntity = userInputDto.entity;
        try {
            await this.repository.createQueryBuilder().update(User).set(userToBeUpdatedEntity).where("id = :id", { id: id }).execute();
            const updatedUserResult = await this.repository.findOneBy({id: id})
            return new UserDTO(updatedUserResult, ['id', 'firstName', 'lastName', 'age', 'userName'])
        } catch (error) {
            throw new Error('Unprocessable entity')
        }
    }

    async deleteById(id: any): Promise<UserDTO> {
        const userToBeDeleted = await this.repository.findOneBy({id: id})
        if(!userToBeDeleted){
            throw new NotFoundException(`User with id ${id} was not found`)
        }
        await this.repository.delete({id: id})
        return new UserDTO(userToBeDeleted, ['id', 'firstName', 'lastName', 'age', 'userName'])
    }
}

