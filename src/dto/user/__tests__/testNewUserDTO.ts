import {UserDataClass} from "../dataClass/UserDataClass";
import {User} from "../../../entity/User";
import {UserOrmDTO} from "../UserOrmDTO";
import {TokenDataClass} from "../dataClass/TokenDataClass";


describe('UserDTO right instantiation', () => {

    it("should successfully create an userDTO", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'a'.repeat(49),
            lastName: 'a'.repeat(49),
            age: 149,
            userName: 'a'.repeat(49),
            password: 'a'.repeat(99)
        }
        const userDTO = new UserOrmDTO<UserDataClass, User>(userDataInterface, UserDataClass, User, ['id', 'firstName', 'lastName', 'age', 'userName', 'password'])

        expect(userDTO.validatedData.id).toBeUndefined();
        expect(userDTO.validatedData.firstName).toEqual(userDataInterface.firstName);
        expect(userDTO.validatedData.lastName).toEqual(userDataInterface.lastName);
        expect(userDTO.validatedData.age).toEqual(userDataInterface.age);
        expect(userDTO.validatedData.userName).toEqual(userDataInterface.userName);
        expect(userDTO.validatedData.password).toBeDefined();
        expect(userDTO.entity).toBeInstanceOf(User);
        expect(userDTO.validatedData).toBeInstanceOf(UserDataClass)
        expect(userDTO.initialData).toEqual(userDataInterface);
    });

})