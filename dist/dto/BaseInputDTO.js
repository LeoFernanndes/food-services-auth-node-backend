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
exports.BaseInputDTO = void 0;
var BaseDTO_1 = require("./BaseDTO");
var BaseInputDTO = /** @class */ (function (_super) {
    __extends(BaseInputDTO, _super);
    function BaseInputDTO(object) {
        var _this = _super.call(this) || this;
        _this._dtoType = 'input';
        _this.initialData = object;
        _this.validatedData = _this.validateObject(object);
        return _this;
    }
    return BaseInputDTO;
}(BaseDTO_1.BaseDTO));
exports.BaseInputDTO = BaseInputDTO;
// export abstract class BaseInputDTO extends BaseDTO {
//     private _dtoType: 'input' | 'output' = 'input'
//     abstract _allowedFieldNames: string[];
//     abstract initialData: BaseInputDTO;
//     readonly abstract validatedData: BaseInputDTO;
//
//     constructor(object: BaseInputDTO) {
//         super();
//         this.initialData = object
//         this.validatedData = this.validateObject(object)
//     }
//     abstract validateObject(object: BaseInputDTO): BaseInputDTO;
// }
//# sourceMappingURL=BaseInputDTO.js.map