import {BaseDataClass} from "../../BaseDataClass";
import {IsInt, IsOptional, Max, MaxLength, Min} from "class-validator";


export class UserDataClass extends BaseDataClass {
    id?: string;

    @MaxLength(50)
    firstName?: string;

    @MaxLength(50)
    lastName?: string;

    @IsInt()
    @Min(0)
    @Max(150)
    age?: number;

    @MaxLength(50)
    username?: string;

    @MaxLength(100)
    password?: string
}