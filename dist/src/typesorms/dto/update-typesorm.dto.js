"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTypesormDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_typesorm_dto_1 = require("./create-typesorm.dto");
class UpdateTypesormDto extends (0, swagger_1.PartialType)(create_typesorm_dto_1.CreateTypesormDto) {
}
exports.UpdateTypesormDto = UpdateTypesormDto;
//# sourceMappingURL=update-typesorm.dto.js.map