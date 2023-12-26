import jsonwebtoken, {JwtPayload} from "jsonwebtoken";
import {UserDataClass} from "../../dto/user/UserDataClass";
import {UserDTO} from "../../dto/user/UserDTO";
import {TokenDTO} from "../../dto/user/TokenDTO";

// TODO: Center configuration variables in one file
const JWT_SECRET = process.env.JWT_SECRET || "AXFZqb2QzfK1x4by7SIhhkrs9ucYmtd5"

export class TokenEnconder {
    static encode(userDTO: UserDTO, expirationTimeSeconds: number): TokenDTO {
        const token = jsonwebtoken.sign({
            data: userDTO.validatedData
        }, JWT_SECRET, { expiresIn: Math.trunc(expirationTimeSeconds) });
        return new TokenDTO({token: token})
    }

    static decode(loginOutputDTO: TokenDTO): UserDTO {
        const authData = jsonwebtoken.verify(loginOutputDTO.validatedData.token, JWT_SECRET)
        let returnedUserData: UserDataClass = {
            id: 0,
            firstName: '',
            lastName: '',
            age: 0,
            userName: '',
            password: ''
        }
        for (let property in returnedUserData){
            returnedUserData[property] = authData['data'][property]
        }
        returnedUserData['password'] = 'paswodPlacerolder'
        return new UserDTO(returnedUserData, ['id', 'firstName', 'lastName', 'age', 'userName'])
    }
}