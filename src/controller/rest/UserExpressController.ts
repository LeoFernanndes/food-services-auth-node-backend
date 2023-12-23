import express from "express";
import {CreateUserUseCase} from "../../useCase/user/CreateUserUseCase";
import {UserInputDTO} from "../../dto/user/UserInputDTO"
import {UserOutputDTO} from "../../dto/user/UserOutputDTO";
import {ListUsersUseCase} from "../../useCase/user/ListUsersUseCase";
import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {GetUserByIdUseCase} from "../../useCase/user/GetUserByIdUseCase";
import {UserDataClass} from "../../dto/user/UserDataClass";
import {DeleteUserByIdUseCase} from "../../useCase/user/DeleteUserByIdUseCase";
import {NotFoundException} from "../../common/exceptions/NotFoundException";
import {validatePayloadMiddleware} from "./middlewares/validatePayloadMiddleware";
import {UpdateUserUseCase} from "../../useCase/user/UpdateUserUseCase";
import {AppDataSource} from "../../DataSource";
import {BadRequestException} from "../../common/exceptions/BadRequestException";
import {LoginUserUseCase} from "../../useCase/user/LoginUserUseCase";
import {LoginInputDTO} from "../../dto/user/LoginInputDTO";
import {LoginDataClass} from "../../dto/user/LoginDataClass";
import {LoginOutputDTO} from "../../dto/user/LoginOutputDTO";
import {decodeTokenMiddleware} from "./middlewares/decodeTokenMiddleware";
import {TokenDataClass} from "../../dto/user/TokenDataClass";
import {ValidateTokenUseCase} from "../../useCase/user/ValidateTokenUseCase";
import {TokenInputDTO} from "../../dto/user/TokenInputDTO";
import {TokenOutputDTO} from "../../dto/user/TokenOutputDTO";
import {rabbitMQProducer} from "../../index";
import { v4 as uuidV4 } from "uuid"


// TODO: decide where and how to validate data by instantiating new DTO inside routes
// TODO: create a plain to dto conversion tool

export const router = express.Router();
router.use(decodeTokenMiddleware)

router.post('/', validatePayloadMiddleware(new UserDataClass()), async (req, res) => {
    const payloadUser = req.body
    const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(AppDataSource);
    const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(usersRepository);
    const userDTO: UserInputDTO = new UserInputDTO(payloadUser);
    try {
        const createdUserDTO: UserOutputDTO = await createUserUseCase.execute(userDTO);
        const plainObjectResponse = createdUserDTO.validatedData

        const rabbitMQMessage = {
            id: uuidV4().toString(),
            action: 'authCreateUser',
            producer: 'auth',
            data: createdUserDTO.validatedData
        }
        rabbitMQProducer(JSON.stringify(rabbitMQMessage))

        res.status(201).json(plainObjectResponse);
    } catch (error) {
        if (error instanceof BadRequestException){
            res.status(400).json({'detail': error.message})
        } else {
            res.status(500).json({'detail': 'Internal server error'})
        }
    }
});

// TODO: make login error messages the same to avoid data leakage
router.post('/login', validatePayloadMiddleware(new LoginDataClass()), async (req, res) => {
    const payloadLogin = req.body
    const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(AppDataSource);
    const loginUserUseCase: LoginUserUseCase = new LoginUserUseCase(usersRepository);
    const loginInputDTO: LoginInputDTO = new LoginInputDTO(payloadLogin);
    try {
        const loginOutputDTO: LoginOutputDTO = await loginUserUseCase.execute(loginInputDTO);
        const plainObjectResponse = loginOutputDTO.validatedData

        const rabbitMQMessage = {
            id: uuidV4().toString(),
            action: 'authLogin',
            producer: 'auth',
            data: loginOutputDTO.validatedData
        }
        rabbitMQProducer(JSON.stringify(rabbitMQMessage))

        res.status(200).json(plainObjectResponse);
    } catch (error) {
        if (error instanceof BadRequestException){
            res.status(400).json({'detail': error.message})
        } else if (error instanceof NotFoundException) {
            res.status(400).json({'detail': error.message})
        } else {
            res.status(500).json({'detail': 'Internal server error'})
        }
    }
});

router.post('/validate-token', validatePayloadMiddleware(new TokenDataClass()), async (req, res) => {
    const payloadToken = req.body
    const tokenInputDTO: TokenInputDTO = new TokenInputDTO(payloadToken);
    const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(AppDataSource);
    const validateTokenUseCase: ValidateTokenUseCase = new ValidateTokenUseCase(usersRepository);
    try {
        const tokenOutputDTO: TokenOutputDTO = await validateTokenUseCase.execute(tokenInputDTO);
        const plainObjectResponse = tokenOutputDTO.validatedData

        const rabbitMQMessage = {
            id: uuidV4().toString(),
            action: 'authValidateToken',
            producer: 'auth',
            data: tokenOutputDTO.validatedData
        }
        rabbitMQProducer(JSON.stringify(rabbitMQMessage))

        res.status(200).json(plainObjectResponse);
    } catch (error) {
        if (error instanceof BadRequestException){
            res.status(400).json({'detail': error.message})
        } else {
            res.status(500).json({'detail': 'Internal server error'})
        }
    }
});

router.get('/', async (req, res) => {
    const usersRepository = new UserTypeOrmRepository(AppDataSource);
    const listUsersUseCase: ListUsersUseCase = new ListUsersUseCase(usersRepository);
    const users: UserOutputDTO[] = await listUsersUseCase.execute();
    const plainObjectsResponse: UserDataClass[] = []
    users.forEach(user => {
        plainObjectsResponse.push(user.validatedData)
    })
    res.status(200).json(plainObjectsResponse);
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id
    const usersRepository = new UserTypeOrmRepository(AppDataSource);
    const getUserByIdUseCase: GetUserByIdUseCase = new GetUserByIdUseCase(usersRepository);
    try {
        const user: UserOutputDTO = await getUserByIdUseCase.execute(userId);
        const plainObjectResponse: UserDataClass = user.validatedData
        res.status(200).json(plainObjectResponse);
    } catch (error) {
        if (error instanceof NotFoundException){
            res.status(404).json({'detail': error.message})
        } else {
            res.status(500).json({'detail': 'Internal server error'})
        }
    }
});

router.put('/:id', validatePayloadMiddleware(new UserDataClass()), async (req, res) => {
    const userId = req.params.id
    const payloadUser = req.body
    const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(AppDataSource);
    const createUserUseCase: UpdateUserUseCase = new UpdateUserUseCase(usersRepository);
    const userDTO: UserInputDTO = new UserInputDTO(payloadUser);
    try {
        const createdUserDTO: UserOutputDTO = await createUserUseCase.execute(userId, userDTO);
        const plainObjectResponse = createdUserDTO.validatedData
        res.status(201).json(plainObjectResponse);
    } catch (error) {
        if (error instanceof NotFoundException) {
            res.status(404).json({'detail': error.message})
        } else {
            res.status(500).json({'detail': 'Internal server error'})
        }
    }
});

router.delete('/:id', async (req, res) => {
    const userId = req.params.id
    const usersRepository = new UserTypeOrmRepository(AppDataSource);
    const deleteUserByIdUseCase: DeleteUserByIdUseCase = new DeleteUserByIdUseCase(usersRepository);
    try {
        const user: UserOutputDTO = await deleteUserByIdUseCase.execute(userId);
        res.status(204).json({'detail': 'No content'});
    } catch (error) {
        if (error instanceof NotFoundException) {
            res.status(404).json({'detail': error.message})
        } else {
            res.status(500).json({'detail': 'Internal server error'})
        }
    }
});
