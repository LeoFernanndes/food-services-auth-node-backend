import {UserInputDTO} from "../UserInputDTO";
import {UserDataClass} from "../UserDataClass";
import {UserOutputDTO} from "../UserOutputDTO";


describe('UserOutputDTO wrong instantiation - invalid properties', () => {

    it("should fail to create an userOutputDTO", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'a'.repeat(51),
            lastName: 'a'.repeat(51),
            age: 151,
            userName: 'a'.repeat(51),
            password: 'a'.repeat(101)
        }

        expect.assertions(1)

        try {
            new UserOutputDTO(userDataInterface)
        } catch (error) {
            expect(error).toHaveLength(5)
        }
    });
})

describe('UserOutputDTO right instantiation', () => {

    it("should successfully create an userOutputDTO", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'a'.repeat(49),
            lastName: 'a'.repeat(49),
            age: 149,
            userName: 'a'.repeat(49),
            password: 'a'.repeat(99)
        }
        const userOutputDTO = new UserOutputDTO(userDataInterface)
        expect(userOutputDTO.validationErrors).toHaveLength(0);
        expect(userOutputDTO.validatedData.password).toBeUndefined();
    });
})