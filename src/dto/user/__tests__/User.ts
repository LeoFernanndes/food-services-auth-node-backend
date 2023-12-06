import {UserInputDTO} from "../UserInputDTO";
import {UserOutputDTO} from "../UserOutputDTO";
import {UserDataClass} from "../UserDataClass";
import {validate, validateSync, ValidationError} from "class-validator";


describe('iutputDTO wrong instantiation - invalid properties', () => {
    const userDataInterface: UserDataClass = {
        id: 1,
        firstName: 'name'.repeat(50),
        lastName: 'surname'.repeat(50),
        age: 201
    }

    const userDataClass = new UserDataClass()
    userDataClass.id = userDataInterface.id
    userDataClass.firstName = userDataInterface.firstName
    userDataClass.lastName = userDataInterface.lastName
    userDataClass.age = userDataInterface.age


    let thrownErrors: ValidationError[]
    try {
        const userInputDTO = new UserInputDTO(userDataClass)
    } catch (error) {
        thrownErrors = error
    }

    it('should return the validation error', () => {
        expect(thrownErrors).toHaveLength(3)
    })

    it('should return the list of validation errors',() => {
        const expectedErrors = [{
            "children": [],
            "constraints": {"maxLength": "firstName must be shorter than or equal to 100 characters"},
            "property": "firstName",
            "target": {
                "age": 201,
                "firstName": "namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename",
                "id": 1,
                "lastName": "surnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurname"
            },
            "value": "namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename"
        }, {
            "children": [],
            "constraints": {"maxLength": "lastName must be shorter than or equal to 100 characters"},
            "property": "lastName",
            "target": {
                "age": 201,
                "firstName": "namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename",
                "id": 1,
                "lastName": "surnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurname"
            },
            "value": "surnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurname"
        }, {
            "children": [],
            "constraints": {"max": "age must not be greater than 200"},
            "property": "age",
            "target": {
                "age": 201,
                "firstName": "namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename",
                "id": 1,
                "lastName": "surnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurnamesurname"
            },
            "value": 201
        }]
        expect(thrownErrors).toEqual(expectedErrors)
    })
})

// describe('iutputDTO wrong instantiation - missing properties',() => {
//     const userDataClass = new UserDataClass()
//     const userInputDTO = new UserInputDTO(userDataClass)
//
//     it('should return number of validation errors', () => {
//         expect(userInputDTO.validationErrors).toHaveLength(3)
//     })
//
//     it('should return the validation errors', () => {
//
//         const expectedErrors = [{
//             "children": [],
//             "constraints": {"maxLength": "firstName must be shorter than or equal to 100 characters"},
//             "property": "firstName",
//             "target": {"age": undefined, "firstName": undefined, "id": undefined, "lastName": undefined},
//             "value": undefined
//         }, {
//             "children": [],
//             "constraints": {"maxLength": "lastName must be shorter than or equal to 100 characters"},
//             "property": "lastName",
//             "target": {"age": undefined, "firstName": undefined, "id": undefined, "lastName": undefined},
//             "value": undefined
//         }, {
//             "children": [],
//             "constraints": {
//                 "isInt": "age must be an integer number",
//                 "max": "age must not be greater than 200",
//                 "min": "age must not be less than 0"
//             },
//             "property": "age",
//             "target": {"age": undefined, "firstName": undefined, "id": undefined, "lastName": undefined},
//             "value": undefined
//         }]
//
//         expect(userInputDTO.validationErrors).toEqual(expectedErrors)
//     })
// })

// describe('iutputDTO wrong instantiation 2', () => {
//     const userDataInterface: UserDataClass = {
//         id: 1,
//         firstName: 'name'.repeat(50),
//         lastName: 'surname'.repeat(50),
//         age: 201
//     }
//
//     const userDataClass = new UserDataClass()
//     userDataClass.id = userDataInterface.id
//     userDataClass.firstName = userDataInterface.firstName
//     userDataClass.lastName = userDataInterface.lastName
//     userDataClass.age = userDataInterface.age
//     const userInputDTO = new UserInputDTO(userDataClass)
//     const errors = userInputDTO.validationErrors
//     const errors = UserInputDTO.validateDataClass2(userDataClass)
//
//     try {
//         const userInputDto = new UserInputDTO(userDataInterface)
//     } catch (error) {
//         console.log(error)
//     }
//
//
//     it('should return the validation error', () => {
//         expect(errors).toHaveLength(3)
//     })
// })