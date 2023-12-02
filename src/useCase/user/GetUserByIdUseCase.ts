import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {UserOutputDTO} from "../../dto/user/UserOutputDTO";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";


export class GetUserByIdUseCase implements BaseUseCaseInterface{
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(id);
    async execute(id: number | string ): Promise<UserOutputDTO> {
        return await this.repository.getById(id)
    }
}