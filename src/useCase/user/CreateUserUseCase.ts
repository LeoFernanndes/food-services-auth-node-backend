import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {UserEntity} from "../../entity/UserEntity";
import {RabbitMqMessage} from "../../infra/amqp/RabbitMqMessage";
import {v4 as uuidV4} from "uuid";
import {BaseUseCase} from "../BaseUseCase";


export class CreateUserUseCase extends BaseUseCase implements BaseUseCaseInterface {
    protected repository: UserTypeOrmRepository

    constructor(repository: UserTypeOrmRepository, messageDispatcher?) {
        super(repository, messageDispatcher)
    }

    async execute(userDTO: UserOrmDTO<UserDataClass, UserEntity>): Promise<UserOrmDTO<UserDataClass, UserEntity>> {
        const createdUser = await this.repository.create(userDTO);

        const rabbitMQMessage: RabbitMqMessage = {
            id: uuidV4().toString(),
            action: 'authCreateUser',
            producer: 'auth',
            data: createdUser.validatedData
        }
        this.dispatchMessage(rabbitMQMessage)

        return createdUser;
    }
}