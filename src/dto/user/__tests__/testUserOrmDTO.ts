import {UserDataClass} from "../dataClass/UserDataClass";
import {UserEntity} from "../../../entity/UserEntity";
import {UserOrmDTO} from "../UserOrmDTO";
import {TokenDataClass} from "../dataClass/TokenDataClass";


describe('UserDTO right instantiation', () => {
    it("should successfully create an userDTO", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'firstName',
            lastName: 'lastName',
            age: 149,
            username: 'username',
            password: 'password'
        }
        const userDTO = new UserOrmDTO<UserDataClass, UserEntity>(userDataInterface, UserDataClass, UserEntity,
            {dtoEntityFieldNames: ['firstName', 'lastName', 'age', 'username', 'password', 'created', 'updated']})

        expect(userDTO.validatedData.id).toBeUndefined();
        expect(userDTO.validatedData.firstName).toEqual(userDataInterface.firstName);
        expect(userDTO.validatedData.lastName).toEqual(userDataInterface.lastName);
        expect(userDTO.validatedData.age).toEqual(userDataInterface.age);
        expect(userDTO.validatedData.username).toEqual(userDataInterface.username);
        expect(userDTO.validatedData.password).not.toEqual(userDataInterface.password);

        expect(userDTO.entity).toBeInstanceOf(UserEntity);
        expect(userDTO.validatedData).toBeInstanceOf(UserDataClass)
        expect(userDTO.initialData).toEqual(userDataInterface);

        expect(userDTO.entity.id).toBeUndefined();
        expect(userDTO.entity.firstName).toEqual(userDTO.validatedData.firstName);
        expect(userDTO.entity.lastName).toEqual(userDTO.validatedData.lastName);
        expect(userDTO.entity.age).toEqual(userDTO.validatedData.age);
        expect(userDTO.entity.username).toEqual(userDTO.validatedData.username);
        expect(userDTO.entity.password).toEqual(userDTO.validatedData.password);
        expect(userDTO.validatedData).toBeInstanceOf(UserDataClass)
    });

    it("should successfully test limits of userDTO", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'a'.repeat(49),
            lastName: 'a'.repeat(49),
            age: 149,
            username: 'a'.repeat(49),
            password: 'a'.repeat(99)
        }
        const userDTO = new UserOrmDTO<UserDataClass, UserEntity>(userDataInterface, UserDataClass, UserEntity,
            {dtoEntityFieldNames: ['firstName', 'lastName', 'age', 'username', 'password', 'created', 'updated']})

        expect(userDTO.entity.id).toBeUndefined();
        expect(userDTO.entity.firstName).toEqual(userDTO.validatedData.firstName);
        expect(userDTO.entity.lastName).toEqual(userDTO.validatedData.lastName);
        expect(userDTO.entity.age).toEqual(userDTO.validatedData.age);
        expect(userDTO.entity.username).toEqual(userDTO.validatedData.username);
        expect(userDTO.entity.password).toEqual(userDTO.validatedData.password);
        expect(userDTO.validatedData).toBeInstanceOf(UserDataClass)
    });

    it("should fail to instantiate userDTO with missing data", async () => {

        const userDataInterface: UserDataClass = {

        }
        const userDTO = new UserOrmDTO<UserDataClass, UserEntity>(userDataInterface, UserDataClass, UserEntity)

        expect(userDTO.validationErrors).toHaveLength(5);
        expect(userDTO.validatedData).toBeUndefined();
        expect(userDTO.entity).toBeUndefined();
    });


})