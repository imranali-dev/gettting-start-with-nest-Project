"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePrismaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_prisma_dto_1 = require("./create-prisma.dto");
class UpdatePrismaDto extends (0, swagger_1.PartialType)(create_prisma_dto_1.CreatePrismaDto) {
}
exports.UpdatePrismaDto = UpdatePrismaDto;
//# sourceMappingURL=update-prisma.dto.js.map