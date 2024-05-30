"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJwtDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_jwt_dto_1 = require("./create-jwt.dto");
class UpdateJwtDto extends (0, swagger_1.PartialType)(create_jwt_dto_1.CreateJwtDto) {
}
exports.UpdateJwtDto = UpdateJwtDto;
//# sourceMappingURL=update-jwt.dto.js.map