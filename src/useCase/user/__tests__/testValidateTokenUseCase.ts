import {initDbStoreForTests} from "../../../testDataSource";
import {UserTypeOrmRepository} from "../../../repository/typeOrm/user/UserTypeOrmRepository";
import {CreateUserUseCase} from "../CreateUserUseCase";
import {UserDataClass} from "../../../dto/user/dataClass/UserDataClass";
import {DataSource} from "typeorm";
import {LoginUserUseCase} from "../LoginUserUseCase";
import {ValidateTokenUseCase} from "../ValidateTokenUseCase";
import {BadRequestException} from "../../../common/exceptions/BadRequestException";
import {UserDTO} from "../../../dto/user/UserDTO";
import {LoginDTO} from "../../../dto/user/LoginDTO";
import {TokenDTO} from "../../../dto/user/TokenDTO";


let dataSource: DataSource;

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
            userName: 'username',
            password: 'password'
        }

        const userDTO: UserDTO = new UserDTO(userDataInterface, ['id', 'firstName', 'lastName', 'age', 'userName', 'password']);
        const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(dataSource);

        const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(usersRepository);
        const createdUserDTO: UserDTO = await createUserUseCase.execute(userDTO);

        const loginUserUseCase = new LoginUserUseCase(usersRepository);
        const loginInputDTO = new LoginDTO({userName: 'username', password: 'password'})
        const loginOutputDTO = await loginUserUseCase.execute(loginInputDTO)
        expect(loginOutputDTO.validatedData.token).toBeDefined();

        const validateTokenUseCase = new ValidateTokenUseCase(usersRepository);
        const tokenOutputDTO = validateTokenUseCase.execute(loginOutputDTO)
        expect((await tokenOutputDTO).validatedData.id).toEqual(1)

    });
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
        const tokenInputDTO = new TokenDTO({token: expiredToken});
        const validateTokenUseCase = new ValidateTokenUseCase(usersRepository);
        await validateTokenUseCase.execute(tokenInputDTO).catch(error => {
            expect(error).toBeInstanceOf(BadRequestException)
            expect(error.message).toEqual('Expired token')
        })
    });

    it("should return invalid token", async () => {

        const expiredToken = 'invalidtoken'

        const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(dataSource);
        const tokenInputDTO = new TokenDTO({token: expiredToken});
        const validateTokenUseCase = new ValidateTokenUseCase(usersRepository);
        await validateTokenUseCase.execute(tokenInputDTO).catch(error => {
            expect(error).toBeInstanceOf(BadRequestException)
            expect(error.message).toEqual('Invalid token')
        })
    });

});
