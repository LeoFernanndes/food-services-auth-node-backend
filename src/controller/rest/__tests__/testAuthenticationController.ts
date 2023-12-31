import {DataSource} from "typeorm";
import {initDbStoreForTests} from "../../../testDataSource";
import {UserDataClass} from "../../../dto/user/dataClass/UserDataClass";
import {FSControllerRequest} from "../FSControllerRequest";
import {UserController} from "../user/UserController";
import {LoginDataClass} from "../../../dto/user/dataClass/LoginDataClass";
import {AuthenticationController} from "../user/AuthenticationController";
import {TokenDataClass} from "../../../dto/user/dataClass/TokenDataClass";


let dataSource: DataSource;

const testTimeOut = Number(process.env.TEST_TIMEOUT) || 150000

describe("Test UserController Create", () => {
    beforeEach(async () => {
        dataSource = await initDbStoreForTests()
    })

    afterEach(async () => {
        await dataSource.destroy()
    })

    it("should successfully login an user", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            username: 'username',
            password: 'password'
        }

        const request = new FSControllerRequest(userDataInterface, {}, {}, {});
        const userController = new UserController(request, {appDataSource:dataSource});
        const response = await userController.createUser();

        const loginDataInterface: LoginDataClass = {
            username: "username",
            password: "password"
        }

        const requestAuthentication = new FSControllerRequest(loginDataInterface, {}, {}, {});
        const authenticationController = new AuthenticationController(requestAuthentication, {appDataSource: dataSource});
        const responseAuthentication = await authenticationController.login();

        expect(responseAuthentication.status).toEqual(200);
        expect(responseAuthentication.data).toBeInstanceOf(TokenDataClass)

    }, testTimeOut);

    it("should fail to login an user with nonexistent login", async () => {

        const loginDataInterface: LoginDataClass = {
            username: "nonexistent",
            password: "password"
        }

        const requestAuthentication = new FSControllerRequest(loginDataInterface, {}, {}, {});
        const authenticationController = new AuthenticationController(requestAuthentication, {appDataSource: dataSource});
        const responseAuthentication = await authenticationController.login();

        const errorResponseData = {
            "detail": "Invalid username and/or password"
        }

        expect(responseAuthentication.status).toEqual(400);
        expect(responseAuthentication.data).toEqual(errorResponseData)

    }, testTimeOut);

    it("should fail login an user with wrong password", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            username: 'username',
            password: 'password'
        }

        const request = new FSControllerRequest(userDataInterface, {}, {}, {});
        const userController = new UserController(request, {appDataSource:dataSource});
        const response = await userController.createUser();

        const loginDataInterface: LoginDataClass = {
            username: "username",
            password: "wrong"
        }

        const requestAuthentication = new FSControllerRequest(loginDataInterface, {}, {}, {});
        const authenticationController = new AuthenticationController(requestAuthentication, {appDataSource: dataSource});
        const responseAuthentication = await authenticationController.login();

        const errorResponseData = {
            "detail": "Invalid username and/or password"
        }

        expect(responseAuthentication.status).toEqual(400);
        expect(responseAuthentication.data).toEqual(errorResponseData)

    }, testTimeOut);

});