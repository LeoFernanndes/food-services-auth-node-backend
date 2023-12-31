import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {UserEntity} from "../../entity/UserEntity";
import {BaseUseCase} from "../BaseUseCase";
import {v4 as uuidV4} from "uuid";


export class DeleteUserByIdUseCase extends BaseUseCase implements BaseUseCaseInterface{
    protected repository: UserTypeOrmRepository;

    constructor(repository: UserTypeOrmRepository, messageDispatcher?) {
        super(repository, messageDispatcher)
    }

    async execute(id: number | string ): Promise<UserOrmDTO<UserDataClass, UserEntity>> {
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