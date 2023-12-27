import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {User} from "../../entity/User";
import {BaseUseCase} from "../BaseUseCase";
import {v4 as uuidV4} from "uuid";


export class UpdateUserUseCase extends BaseUseCase implements BaseUseCaseInterface{
    constructor(repository: UserTypeOrmRepository, messageDispatcher?) {
        super(repository, messageDispatcher)
    }

    async execute(id: number| string, userDTO: UserOrmDTO<UserDataClass, User>): Promise<UserOrmDTO<UserDataClass, User>> {
        const updatedUser = await this.repository.update(id, userDTO)

        const rabbitMQMessage = {
            id: uuidV4().toString(),
            action: 'authUpdateUser',
            producer: 'auth',
            data: updatedUser.validatedData
        }
        this.dispatchMessage(rabbitMQMessage);

        return updatedUser;
    }
}