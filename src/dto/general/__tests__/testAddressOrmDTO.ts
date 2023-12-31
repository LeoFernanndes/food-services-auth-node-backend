import {AddressDataClass} from "../dataClass/AddressDataClass";
import {AddressOrmDTO} from "../AddressOrmDTO";
import {AddressEntity} from "../../../entity/AddressEntity";

describe('AddressOrmDTO right instantiation', () => {

    it("should successfully create an AddressOrmDTO", async () => {

        const addressDataClass: AddressDataClass = {
            addressType: 'street',
            address: 'Saint Paul',
            number: 1,
            numberComplement: '',
            housingType: 'apartment',
            addressComplement: '',
            zipCode: '00000000',
            city: 'Toronto',
            state: 'Ontario',
            country: 'Canada'
        }

        const addressDTO = new AddressOrmDTO(addressDataClass, AddressDataClass, AddressEntity);

        expect(addressDTO.validatedData).toBeInstanceOf(AddressDataClass);
        expect(addressDTO.validatedData.id).toBeUndefined();
        expect(addressDTO.validatedData.addressType).toEqual(addressDataClass.addressType);
        expect(addressDTO.validatedData.address).toEqual(addressDataClass.address);
        expect(addressDTO.validatedData.number).toEqual(addressDataClass.number)
        expect(addressDTO.validatedData.numberComplement).toEqual(addressDataClass.numberComplement);
        expect(addressDTO.validatedData.housingType).toEqual(addressDataClass.housingType);
        expect(addressDTO.validatedData.zipCode).toEqual(addressDataClass.zipCode);
        expect(addressDTO.validatedData.city).toEqual(addressDataClass.city);
        expect(addressDTO.validatedData.state).toEqual(addressDataClass.state);
        expect(addressDTO.validatedData.country).toEqual(addressDataClass.country);

        expect(addressDTO.entity).toBeInstanceOf(AddressEntity);
        expect(addressDTO.entity.id).toBeDefined();
        expect(addressDTO.entity.addressType).toEqual(addressDTO.validatedData.addressType);
        expect(addressDTO.entity.address).toEqual(addressDTO.validatedData.address);
        expect(addressDTO.entity.number).toEqual(addressDTO.validatedData.number);
        expect(addressDTO.entity.numberComplement).toEqual(addressDTO.validatedData.numberComplement);
        expect(addressDTO.entity.housingType).toEqual(addressDTO.validatedData.housingType);
        expect(addressDTO.entity.zipCode).toEqual(addressDTO.validatedData.zipCode);
        expect(addressDTO.entity.city).toEqual(addressDTO.validatedData.city);
        expect(addressDTO.entity.state).toEqual(addressDTO.validatedData.state);
        expect(addressDTO.entity.country).toEqual(addressDTO.validatedData.country);
    });
})