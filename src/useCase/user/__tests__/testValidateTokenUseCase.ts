import {initDbStoreForTests} from "../../../testDataSource";
import {UserTypeOrmRepository} from "../../../repository/typeOrm/user/UserTypeOrmRepository";
import {CreateUserUseCase} from "../CreateUserUseCase";
import {UserDataClass} from "../../../dto/user/dataClass/UserDataClass";
import {DataSource} from "typeorm";
import {LoginUserUseCase} from "../LoginUserUseCase";
import {ValidateTokenUseCase} from "../ValidateTokenUseCase";
import {BadRequestException} from "../../../common/exceptions/BadRequestException";
import {LoginDTO} from "../../../dto/user/LoginDTO";
import {TokenDTO} from "../../../dto/user/TokenDTO";
import {UserOrmDTO} from "../../../dto/user/UserOrmDTO";
import {TokenDataClass} from "../../../dto/user/dataClass/TokenDataClass";
import {LoginDataClass} from "../../../dto/user/dataClass/LoginDataClass";
import {UserEntity} from "../../../entity/UserEntity";


let dataSource: DataSource;

const testTimeOut = Number(process.env.TEST_TIMEOUT) || 150000

describe("test validate token usecase", () => {
    beforeEach(async () => {
        dataSource = await initDbStoreForTests()
    })

    afterEach(async () => {
        await dataSource.destroy()
    })

    it("should successfully return user from decoded token", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            username: 'username',
            password: 'password'
        }

        const userDTO = new UserOrmDTO<UserDataClass, UserEntity>(userDataInterface, UserDataClass, UserEntity,
            {dtoEntityFieldNames: ['id', 'firstName', 'lastName', 'age', 'username', 'password']});
        const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(dataSource);

        const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(usersRepository);
        const createdUserDTO = await createUserUseCase.execute(userDTO);

        const loginUserUseCase = new LoginUserUseCase(usersRepository);
        const loginInputDTO = new LoginDTO({username: 'username', password: 'password'}, LoginDataClass);
        const loginOutputDTO = await loginUserUseCase.execute(loginInputDTO)
        expect(loginOutputDTO.validatedData.token).toBeDefined();

        const validateTokenUseCase = new ValidateTokenUseCase(usersRepository);
        const tokenOutputDTO = validateTokenUseCase.execute(loginOutputDTO)
        expect((await tokenOutputDTO).validatedData.id).toContain('user')

    }, testTimeOut);
});

describe("test validate token usecase", () => {
    beforeEach(async () => {
        dataSource = await initDbStoreForTests()
    })

    afterEach(async () => {
        await dataSource.destroy()
    })

    it("should return expired token", async () => {

        const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJhZ2UiOjIwLCJ1c2VyTmFtZSI6InVzZXJuYW1lMSJ9LCJpYXQiOjE3MDI0MjkzODksImV4cCI6MTcwMjQyOTQ0OX0.2dTXOjwnR4R0AZRQc8HcIqAbtvX45dvJGqR_diwFp2Q'

        const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(dataSource);
        const tokenInputDTO = new TokenDTO({token: expiredToken}, TokenDataClass);
        const validateTokenUseCase = new ValidateTokenUseCase(usersRepository);
        await validateTokenUseCase.execute(tokenInputDTO).catch(error => {
            expect(error).toBeInstanceOf(BadRequestException)
            expect(error.message).toEqual('Expired token')
        })
    });

    it("should return invalid token", async () => {

        const expiredToken = 'invalidtoken'

        const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(dataSource);
        const tokenInputDTO = new TokenDTO({token: expiredToken}, TokenDataClass);
        const validateTokenUseCase = new ValidateTokenUseCase(usersRepository);
        await validateTokenUseCase.execute(tokenInputDTO).catch(error => {
            expect(error).toBeInstanceOf(BadRequestException)
            expect(error.message).toEqual('Invalid token')
        })
    });

});
