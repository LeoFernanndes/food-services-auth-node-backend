import {User} from "../../../entity/User";
import {UserInputDTO} from "../../../dto/user/UserInputDTO";
import {UserOutputDTO} from "../../../dto/user/UserOutputDTO";
import {TypeOrmRepository} from "../TypeOrmRepository";
import {UserDataClass} from "../../../dto/user/UserDataClass";
import {NotFoundException} from "../../../common/exceptions/NotFound";


export class UserTypeOrmRepository extends TypeOrmRepository<User, UserInputDTO, UserOutputDTO> {

    constructor(entity: User) {
        super(entity);
    }

    // TODO: investigate error generated when id is not any
    async getById(id: any): Promise<UserOutputDTO> {
        const retrievedEntity: User = await this.repository.findOneBy({id:id})
        if (!retrievedEntity){
            throw new NotFoundException(`User with id ${id} was not found`);
        }
        const userData: UserDataClass = {
            id: retrievedEntity.id,
            firstName: retrievedEntity.firstName,
            lastName: retrievedEntity.lastName,
            age:retrievedEntity.age
        }
        return new UserOutputDTO(userData);
    }

    async getAll(): Promise<UserOutputDTO[]> {
        const retrievedEntities: User[] = await this.repository.find();
        const returnedDTOs: UserOutputDTO[] = [];
        retrievedEntities.forEach(retrievedEntity => {
            let userData: UserDataClass = {
                id: retrievedEntity.id,
                firstName: retrievedEntity.firstName,
                lastName: retrievedEntity.lastName,
                age:retrievedEntity.age
            }
            let returnedDTO = new UserOutputDTO(userData)
            returnedDTOs.push(returnedDTO)
        })
        return returnedDTOs;
    }

    async save(baseDTO: UserInputDTO): Promise<UserOutputDTO> {
        const validatedDate = baseDTO.validatedData
        const entityToBePersisted: User = this.repository.create()
        entityToBePersisted.id = validatedDate.id
        entityToBePersisted.firstName = validatedDate.firstName
        entityToBePersisted.lastName = validatedDate.lastName
        entityToBePersisted.age = validatedDate.age

        const createdEntity: User = await this.repository.save(entityToBePersisted);
        const userData: UserDataClass = {
            id: createdEntity.id,
            firstName: createdEntity.firstName,
            lastName: createdEntity.lastName,
            age:createdEntity.age
        }
        return new UserOutputDTO(userData)
    }

    async deleteById(id: any): Promise<UserOutputDTO> {
        const userToBeDeleted = await this.repository.findOneBy({id: id})
        if(!userToBeDeleted){
            throw new NotFoundException(`User with id ${id} was not found`)
        }
        await this.repository.delete({id: id})
        const deletedUser = new UserDataClass()
        for (let property in userToBeDeleted){
            deletedUser[property] = userToBeDeleted[property]
        }
        return new UserOutputDTO(deletedUser)
    }
}