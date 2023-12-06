"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConverter = void 0;
var TypeOrmConverter = /** @class */ (function () {
    function TypeOrmConverter() {
    }
    TypeOrmConverter.entityToDTO = function (entity) {
        var dtoToBeReturned = {};
        for (var k in entity) {
            dtoToBeReturned[k] = entity[k];
        }
        return dtoToBeReturned;
    };
    TypeOrmConverter.dtoToEntity = function (dto) {
        var entityToBeReturned = {};
        for (var k in dto._allowedFieldNames) {
            entityToBeReturned[k] = dto[k];
        }
        return entityToBeReturned;
    };
    return TypeOrmConverter;
}());
exports.TypeOrmConverter = TypeOrmConverter;
//# sourceMappingURL=TypeOrmConverter.js.map