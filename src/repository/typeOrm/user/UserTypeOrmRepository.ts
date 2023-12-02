import {User} from "../../../entity/User";
import {UserInputDTO} from "../../../dto/user/UserInputDTO";
import {UserOutputDTO} from "../../../dto/user/UserOutputDTO";
import {TypeOrmRepository} from "../TypeOrmRepository";


export class UserTypeOrmRepository extends TypeOrmRepository<User, UserInputDTO, UserOutputDTO> {

    constructor(entity) {
        super(entity)
    }

    async save(baseDTO: UserInputDTO): Promise<UserOutputDTO> {
        const userToBePersisted: User = this.repository.create(baseDTO.validatedData)
        const createdObject: User = await this.repository.save(userToBePersisted);
        return <UserOutputDTO>{
            id: createdObject.id,
            firstName: createdObject.firstName,
            lastName: createdObject.lastName,
            age: createdObject.age
        };
    }
}