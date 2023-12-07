import {UserInputDTO} from "../UserInputDTO";
import {UserOutputDTO} from "../UserOutputDTO";
import {UserDataClass} from "../UserDataClass";


describe('iutputDTO wrong instantiation - invalid properties', () => {

    it("should fail to create an user", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'a'.repeat(51),
            lastName: 'a'.repeat(51),
            age: 151,
            userName: 'a'.repeat(51),
            password: 'a'.repeat(51)
        }

        expect.assertions(1)

        try {
            new UserInputDTO(userDataInterface)
        } catch (error) {
            expect(error).toHaveLength(5)
        }

    });

})