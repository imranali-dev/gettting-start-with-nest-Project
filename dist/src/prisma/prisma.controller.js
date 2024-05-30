"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const create_prisma_dto_1 = require("./dto/create-prisma.dto");
let PrismaController = class PrismaController {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(createPrismaDto) {
        return this.prismaService.create(createPrismaDto);
    }
    async findOneByEmail(email) {
        return this.prismaService.findOneByEmail(email);
    }
};
exports.PrismaController = PrismaController;
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prisma_dto_1.CreatePrismaDto]),
    __metadata("design:returntype", void 0)
], PrismaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PrismaController.prototype, "findOneByEmail", null);
exports.PrismaController = PrismaController = __decorate([
    (0, common_1.Controller)('prisma'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaController);
//# sourceMappingURL=prisma.controller.js.map