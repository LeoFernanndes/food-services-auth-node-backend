"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmRepository = void 0;
var data_source_1 = require("../../data-source");
var TypeOrmRepository = /** @class */ (function () {
    function TypeOrmRepository(entity) {
        this.repository = data_source_1.AppDataSource.getRepository(entity);
    }
    return TypeOrmRepository;
}());
exports.TypeOrmRepository = TypeOrmRepository;
//# sourceMappingURL=TypeOrmRepository.js.map