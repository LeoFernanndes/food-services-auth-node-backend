"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputDTO = void 0;
var BaseInputDTO_1 = require("../BaseInputDTO");
var UserDataClass_1 = require("./UserDataClass");
var class_validator_1 = require("class-validator");
var UserInputDTO = /** @class */ (function (_super) {
    __extends(UserInputDTO, _super);
    function UserInputDTO(object) {
        var _this = _super.call(this, object) || this;
        _this._allowedFieldNames = ['firstName', 'lastName', 'age'];
        _this.initialData = object;
        _this.validationErrors = _this.validateDataClass(object);
        _this.validatedData = _this.parseValidatedDataClass(object);
        _this.initialData = object;
        return _this;
    }
    // TODO: find a way of generating errors only once
    UserInputDTO.prototype.validateDataClass = function (userDataClass) {
        var dataClassToBeValidated = new UserDataClass_1.UserDataClass();
        dataClassToBeValidated.id = userDataClass.id;
        dataClassToBeValidated.firstName = userDataClass.firstName;
        dataClassToBeValidated.lastName = userDataClass.lastName;
        dataClassToBeValidated.age = userDataClass.age;
        return (0, class_validator_1.validateSync)(dataClassToBeValidated);
    };
    UserInputDTO.prototype.parseValidatedDataClass = function (object) {
        var validationErrors = this.validateDataClass(object);
        if (validationErrors.length > 0) {
            throw validationErrors;
        }
        else {
            var parsedData = new UserDataClass_1.UserDataClass();
            parsedData.id = object.id;
            parsedData.firstName = object.firstName;
            parsedData.lastName = object.lastName;
            parsedData.age = object.age;
            return parsedData;
        }
    };
    UserInputDTO.prototype.validateData = function (data) {
        return [];
    };
    return UserInputDTO;
}(BaseInputDTO_1.BaseInputDTO));
exports.UserInputDTO = UserInputDTO;
//# sourceMappingURL=UserInputDTO.js.map