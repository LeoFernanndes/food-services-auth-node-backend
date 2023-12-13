import jsonwebtoken, {JwtPayload} from "jsonwebtoken";
import {UserOutputDTO} from "../../dto/user/UserOutputDTO";
import {LoginOutputDTO} from "../../dto/user/LoginOutputDTO";
import {UserDataClass} from "../../dto/user/UserDataClass";

// TODO: Center configuration variables in one file
const JWT_SECRET = process.env.JWT_SECRET || "AXFZqb2QzfK1x4by7SIhhkrs9ucYmtd5"

export class TokenEnconder {
    static encode(userOutputDTO: UserOutputDTO, expirationTimeSeconds: number): LoginOutputDTO {
        const token = jsonwebtoken.sign({
            data: userOutputDTO.validatedData
        }, JWT_SECRET, { expiresIn: Math.trunc(expirationTimeSeconds) });
        return new LoginOutputDTO({token: token})
    }

    static decode(loginOutputDTO: LoginOutputDTO): UserOutputDTO {
        // const parsedToken = loginOutputDTO.validatedData.token.split('Bearer ')
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
        return new UserOutputDTO(returnedUserData)
    }
}