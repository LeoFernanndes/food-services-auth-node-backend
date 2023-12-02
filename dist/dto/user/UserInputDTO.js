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
var UserInputDTO = /** @class */ (function (_super) {
    __extends(UserInputDTO, _super);
    function UserInputDTO(object) {
        var _this = _super.call(this, object) || this;
        _this._allowedFieldNames = ['firstName', 'lastName', 'age'];
        return _this;
    }
    UserInputDTO.prototype.validateObject = function (object) {
        this.lastName = object.firstName;
        this.lastName = object.lastName;
        this.age = object.age;
        return {
            firstName: object.firstName,
            lastName: object.lastName,
            age: object.age
        };
    };
    return UserInputDTO;
}(BaseInputDTO_1.BaseInputDTO));
exports.UserInputDTO = UserInputDTO;
//# sourceMappingURL=UserInputDTO.js.map