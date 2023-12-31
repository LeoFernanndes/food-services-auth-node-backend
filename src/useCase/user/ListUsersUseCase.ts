import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {UserEntity} from "../../entity/UserEntity";
import {BaseUseCase} from "../BaseUseCase";


export class ListUsersUseCase extends  BaseUseCase implements BaseUseCaseInterface {
    protected repository: UserTypeOrmRepository;

    constructor(repository: UserTypeOrmRepository, messageDispatcher?) {
        super(repository, messageDispatcher)
    }

    async execute(): Promise<UserOrmDTO<UserDataClass, UserEntity>[]> {
        return await this.repository.getAll()
    }
}