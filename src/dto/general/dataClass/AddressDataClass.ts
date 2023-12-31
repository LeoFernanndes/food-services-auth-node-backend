import {BaseDataClass} from "../../BaseDataClass";
import {IsEnum, IsInt, IsOptional} from "class-validator";
import {AddressType, HousingType} from "../../../entity/AddressEntity";


export class AddressDataClass extends BaseDataClass {
    @IsOptional()
    id?: string;

    @IsOptional()
    @IsEnum(AddressType)
    addressType?: string;

    @IsOptional()
    address?: string;

    @IsOptional()
    @IsInt()
    number?: number

    @IsOptional()
    numberComplement?: string;

    @IsOptional()
    addressComplement?: string;

    @IsOptional()
    @IsEnum(HousingType)
    housingType?: string

    @IsOptional()
    zipCode?: string;

    @IsOptional()
    city?: string

    @IsOptional()
    state?: string;

    @IsOptional()
    country?: string;
}