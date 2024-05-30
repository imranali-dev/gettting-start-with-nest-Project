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
exports.PrismaAuthController = void 0;
const common_1 = require("@nestjs/common");
const prisma_auth_service_1 = require("./prisma.auth.service");
const create_prisma_dto_1 = require("../prisma/dto/create-prisma.dto");
const loginUserDto_1 = require("./dto/loginUserDto");
let PrismaAuthController = class PrismaAuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginUserDto) {
        return this.authService.login(loginUserDto);
    }
    async register(createPrismaDto) {
        return this.authService.register(createPrismaDto);
    }
};
exports.PrismaAuthController = PrismaAuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginUserDto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], PrismaAuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prisma_dto_1.CreatePrismaDto]),
    __metadata("design:returntype", Promise)
], PrismaAuthController.prototype, "register", null);
exports.PrismaAuthController = PrismaAuthController = __decorate([
    (0, common_1.Controller)('prismaauth'),
    __metadata("design:paramtypes", [prisma_auth_service_1.PrismaAuthService])
], PrismaAuthController);
//# sourceMappingURL=prisma.auth.controller.js.map