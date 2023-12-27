import express from "express";
import {CreateUserUseCase} from "../../useCase/user/CreateUserUseCase";
import {ListUsersUseCase} from "../../useCase/user/ListUsersUseCase";
import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {GetUserByIdUseCase} from "../../useCase/user/GetUserByIdUseCase";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {DeleteUserByIdUseCase} from "../../useCase/user/DeleteUserByIdUseCase";
import {NotFoundException} from "../../common/exceptions/NotFoundException";
import {validatePayloadMiddleware} from "./middlewares/validatePayloadMiddleware";
import {UpdateUserUseCase} from "../../useCase/user/UpdateUserUseCase";
import {AppDataSource} from "../../DataSource";
import {BadRequestException} from "../../common/exceptions/BadRequestException";
import {LoginUserUseCase} from "../../useCase/user/LoginUserUseCase";
import {LoginDataClass} from "../../dto/user/dataClass/LoginDataClass";
import {decodeTokenMiddleware} from "./middlewares/decodeTokenMiddleware";
import {TokenDataClass} from "../../dto/user/dataClass/TokenDataClass";
import {ValidateTokenUseCase} from "../../useCase/user/ValidateTokenUseCase";
import {rabbitMQProducer} from "../../index";
import { v4 as uuidV4 } from "uuid"
import {UserDTO} from "../../dto/user/UserDTO";
import {LoginDTO} from "../../dto/user/LoginDTO";
import {TokenDTO} from "../../dto/user/TokenDTO";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {User} from "../../entity/User";
import {LoginDTO} from "../../dto/user/LoginDTO";
import {TokenDTO} from "../../dto/user/TokenDTO";


// TODO: decide where and how to validate data by instantiating new DTO inside routes
// TODO: create a plain to dto conversion tool

export const router = express.Router();
router.use(decodeTokenMiddleware)

router.post('/', validatePayloadMiddleware(new UserDataClass()), async (req, res) => {
    const payloadUser = req.body
    const usersRepository = new UserTypeOrmRepository(AppDataSource);
    const createUserUseCase = new CreateUserUseCase(usersRepository);
    const userDTO = new UserOrmDTO<UserDataClass, User>(payloadUser, UserDataClass, User, ['id', 'firstName', 'lastName', 'age', 'userName', 'password']);
    try {
        const createdUserDTO = await createUserUseCase.execute(userDTO);
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
    const usersRepository= new UserTypeOrmRepository(AppDataSource);
    const loginUserUseCase = new LoginUserUseCase(usersRepository);
    const loginInputDTO = new LoginDTO<LoginDataClass>(payloadLogin, LoginDataClass);
    try {
        const loginOutputDTO = await loginUserUseCase.execute(loginInputDTO);
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
    const tokenInputDTO = new TokenDTO<TokenDataClass>(payloadToken, TokenDataClass);
    const usersRepository = new UserTypeOrmRepository(AppDataSource);
    const validateTokenUseCase = new ValidateTokenUseCase(usersRepository);
    try {
        const tokenOutputDTO = await validateTokenUseCase.execute(tokenInputDTO);
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
    const listUsersUseCase = new ListUsersUseCase(usersRepository);
    const users = await listUsersUseCase.execute();
    const plainObjectsResponse: UserDataClass[] = [];
    users.forEach(user => {
        plainObjectsResponse.push(user.validatedData)
    })
    res.status(200).json(plainObjectsResponse);
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id
    const usersRepository = new UserTypeOrmRepository(AppDataSource);
    const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository);
    try {
        const user = await getUserByIdUseCase.execute(userId);
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

router.put('/:id', async (req, res) => {
    const userId = req.params.id
    const payloadUser = req.body
    const usersRepository = new UserTypeOrmRepository(AppDataSource);
    const updateUserUseCase = new UpdateUserUseCase(usersRepository);
    const userDTO = new UserOrmDTO(payloadUser, UserDataClass, User, ['firstName', 'lastName', 'age']);
    try {
        const createdUserDTO = await updateUserUseCase.execute(userId, userDTO);
        const plainObjectResponse = createdUserDTO.validatedData
        res.status(200).json(plainObjectResponse);
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
    const deleteUserByIdUseCase = new DeleteUserByIdUseCase(usersRepository);
    try {
        const user = await deleteUserByIdUseCase.execute(userId);
        res.status(204).json({'detail': 'No content'});
    } catch (error) {
        if (error instanceof NotFoundException) {
            res.status(404).json({'detail': error.message})
        } else {
            res.status(500).json({'detail': 'Internal server error'})
        }
    }
});
