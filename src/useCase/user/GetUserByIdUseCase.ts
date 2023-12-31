import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {UserEntity} from "../../entity/UserEntity";
import {BaseUseCase} from "../BaseUseCase";


export class GetUserByIdUseCase extends BaseUseCase implements BaseUseCaseInterface {
    protected repository: UserTypeOrmRepository;

    constructor(repository: UserTypeOrmRepository, messageDispatcher?) {
        super(repository, messageDispatcher)
    }

    async execute(id: number | string ): Promise<UserOrmDTO<UserDataClass, UserEntity>> {
        return await this.repository.getById(id)
    }
}