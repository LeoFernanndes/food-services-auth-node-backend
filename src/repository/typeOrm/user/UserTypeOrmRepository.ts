import {User} from "../../../entity/User";
import {UserInputDTO} from "../../../dto/user/UserInputDTO";
import {UserOutputDTO} from "../../../dto/user/UserOutputDTO";
import {TypeOrmRepository} from "../TypeOrmRepository";
import {UserDataClass} from "../../../dto/user/UserDataClass";
import {NotFoundException} from "../../../common/exceptions/NotFound";
import {BaseDTO} from "../../../dto/BaseDTO";
import {DataSource} from "typeorm";


export class UserTypeOrmRepository extends TypeOrmRepository<User, UserInputDTO, UserOutputDTO> {

    constructor(dataSource: DataSource) {
        const repository = dataSource.getRepository(User)
        super(repository);

    }

    convertDtoToDataClass(dto: BaseDTO): UserDataClass{
        const validatedData = dto.validatedData
        const userDataClass = new UserDataClass()
        for (let property in validatedData){
            userDataClass[property] = validatedData[property]
        }
        return userDataClass
    }

    convertEntityToDataClass(entity: User): UserDataClass {
        const userDataClass = new UserDataClass()
        for (let property in entity){
            userDataClass[property] = entity[property]
        }
        return userDataClass
    }

    updateEntityFromDTO(entity: User, dto: UserInputDTO | UserOutputDTO): User {
        for (let property in dto.validatedData){
            if (property != 'constructor'){
                entity[property] = dto.validatedData[property]
            }
        }
        return entity
    }

    createEntityFromDto(dto: UserInputDTO | UserOutputDTO): User {
        const emptyEntityToBeReturned: User = this.repository.create()
        return this.updateEntityFromDTO(emptyEntityToBeReturned, dto)
    }

    // TODO: investigate error generated when id is not any
    async getById(id: any): Promise<UserOutputDTO> {
        const retrievedEntity: User = await this.repository.findOneBy({id:id})
        if (!retrievedEntity){
            throw new NotFoundException(`User with id ${id} was not found`);
        }
        return new UserOutputDTO(retrievedEntity);
    }

    async getAll(): Promise<UserOutputDTO[]> {
        const retrievedEntities: User[] = await this.repository.find();
        const returnedDTOs: UserOutputDTO[] = [];
        retrievedEntities.forEach(retrievedEntity => {
            let returnedDTO = new UserOutputDTO(retrievedEntity)
            returnedDTOs.push(returnedDTO)
        })
        return returnedDTOs;
    }

    async save(baseDTO: UserInputDTO): Promise<UserOutputDTO> {
        const entityToBePersisted = this.createEntityFromDto(baseDTO)
        const createdEntity: User = await this.repository.save(entityToBePersisted);
        return new UserOutputDTO(createdEntity)
    }

    async update(id: any, userInputDto: UserInputDTO): Promise<UserOutputDTO> {
        const currentUserEntity = await this.repository.findOneBy({id: id})
                if (!currentUserEntity){
            throw new NotFoundException(`User with id ${id} was not found`)
        }
        const userToBeUpdatedEntity = this.updateEntityFromDTO(currentUserEntity, userInputDto)
        try {
            await this.repository.createQueryBuilder().update(User).set(userToBeUpdatedEntity).where("id = :id", { id: id }).execute();
            const updatedUserResult = await this.repository.findOneBy({id: id})
            return new UserOutputDTO(updatedUserResult)
        } catch (error) {
            throw new Error('Unprocessable entity')
        }
    }

    async deleteById(id: any): Promise<UserOutputDTO> {
        const userToBeDeleted = await this.repository.findOneBy({id: id})
        if(!userToBeDeleted){
            throw new NotFoundException(`User with id ${id} was not found`)
        }
        await this.repository.delete({id: id})
        return new UserOutputDTO(userToBeDeleted)
    }
}

