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
exports.UserOutputDTO = void 0;
var BaseOutputDTO_1 = require("../BaseOutputDTO");
var UserOutputDTO = /** @class */ (function (_super) {
    __extends(UserOutputDTO, _super);
    function UserOutputDTO(object) {
        var _this = _super.call(this, object) || this;
        _this._allowedFieldNames = ['id', 'firstName', 'lastName', 'age'];
        return _this;
    }
    UserOutputDTO.prototype.validateObject = function (object) {
        return {
            id: object.id,
            firstName: object.firstName,
            lastName: object.lastName,
            age: object.age
        };
    };
    UserOutputDTO.prototype.parseValidatedDataClass = function (object) {
        return undefined;
    };
    UserOutputDTO.prototype.validateData = function (data) {
        return [];
    };
    return UserOutputDTO;
}(BaseOutputDTO_1.BaseOutputDTO));
exports.UserOutputDTO = UserOutputDTO;
//# sourceMappingURL=UserOutputDTO.js.map