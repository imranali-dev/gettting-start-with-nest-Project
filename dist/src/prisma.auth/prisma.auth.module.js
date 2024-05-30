"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAuthModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_auth_service_1 = require("./prisma.auth.service");
const prisma_auth_controller_1 = require("./prisma.auth.controller");
const jwt_1 = require("@nestjs/jwt");
const jwt_constants_1 = require("../utils/jwt.constants");
const prisma_module_1 = require("../prisma/prisma.module");
const passport_1 = require("@nestjs/passport");
const Jwt_stratgies_1 = require("./dto/statragies/Jwt.stratgies");
let PrismaAuthModule = class PrismaAuthModule {
};
exports.PrismaAuthModule = PrismaAuthModule;
exports.PrismaAuthModule = PrismaAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: jwt_constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '30m' },
            }),
        ],
        controllers: [prisma_auth_controller_1.PrismaAuthController],
        providers: [prisma_auth_service_1.PrismaAuthService, Jwt_stratgies_1.JwtStrategy],
    })
], PrismaAuthModule);
//# sourceMappingURL=prisma.auth.module.js.map