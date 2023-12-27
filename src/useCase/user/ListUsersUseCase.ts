import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {User} from "../../entity/User";
import {BaseUseCase} from "../BaseUseCase";


export class ListUsersUseCase extends  BaseUseCase implements BaseUseCaseInterface {
    constructor(repository: UserTypeOrmRepository, messageDispatcher?) {
        super(repository, messageDispatcher)
    }

    async execute(): Promise<UserOrmDTO<UserDataClass, User>[]> {
        return await this.repository.getAll()
    }
}