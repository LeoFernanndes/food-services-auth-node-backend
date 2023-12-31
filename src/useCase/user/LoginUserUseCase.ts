import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import bcrypt from "bcrypt";
import {BadRequestException} from "../../common/exceptions/BadRequestException";
import {config} from "dotenv"
import {TokenEnconder} from "../../common/token/TokenEnconder";
import {TokenDTO} from "../../dto/user/TokenDTO";
import {TokenDataClass} from "../../dto/user/dataClass/TokenDataClass";
import {LoginDTO} from "../../dto/user/LoginDTO";
import {LoginDataClass} from "../../dto/user/dataClass/LoginDataClass";
import {BaseUseCase} from "../BaseUseCase";
import {v4 as uuidV4} from "uuid";
import {rabbitMQProducer} from "../../index";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {UserEntity} from "../../entity/UserEntity";


config();


export class LoginUserUseCase extends BaseUseCase implements BaseUseCaseInterface{
    protected repository: UserTypeOrmRepository;

    constructor(repository: UserTypeOrmRepository, messageDispatcher?) {
        super(repository, messageDispatcher)
    }

    async execute(loginDTO: LoginDTO<LoginDataClass>): Promise<TokenDTO<TokenDataClass>> {
        const userDTO = await this.repository.getByUsername(loginDTO.validatedData.username)
        if (!bcrypt.compareSync(loginDTO.validatedData.password, userDTO.initialData.password)){
            throw new BadRequestException('Invalid username and/or password');
        }
        const dtoToBeEncoded = new UserOrmDTO(userDTO.validatedData, UserDataClass, UserEntity,
            {dtoEntityFieldNames: ['id', 'firstName', 'lastName', 'age', 'username'], safe: true})
        const tokenDataClass = TokenEnconder.encode(dtoToBeEncoded, 3600).validatedData;
        const tokenDTO =  new TokenDTO<TokenDataClass>(tokenDataClass, TokenDataClass);

        const rabbitMQMessage = {
            id: uuidV4().toString(),
            action: 'authLogin',
            producer: 'auth',
            data: tokenDTO.validatedData
        }
        this.dispatchMessage(rabbitMQMessage);

        return  tokenDTO;
    }
}