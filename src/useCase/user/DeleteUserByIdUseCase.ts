import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {User} from "../../entity/User";
import {BaseUseCase} from "../BaseUseCase";
import {v4 as uuidV4} from "uuid";


export class DeleteUserByIdUseCase extends BaseUseCase implements BaseUseCaseInterface{
    constructor(repository: UserTypeOrmRepository, messageDispatcher?) {
        super(repository, messageDispatcher)
    }

    async execute(id: number | string ): Promise<UserOrmDTO<UserDataClass, User>> {
        const deletedUserDTO = await this.repository.deleteById(id)

        const rabbitMQMessage = {
            id: uuidV4().toString(),
            action: 'authDeleteUser',
            producer: 'auth',
            data: deletedUserDTO.validatedData
        }
        this.dispatchMessage(rabbitMQMessage);

        return deletedUserDTO;
    }
}