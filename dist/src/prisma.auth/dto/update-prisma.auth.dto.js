"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePrismaAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_prisma_auth_dto_1 = require("./create-prisma.auth.dto");
class UpdatePrismaAuthDto extends (0, swagger_1.PartialType)(create_prisma_auth_dto_1.CreatePrismaAuthDto) {
}
exports.UpdatePrismaAuthDto = UpdatePrismaAuthDto;
//# sourceMappingURL=update-prisma.auth.dto.js.map