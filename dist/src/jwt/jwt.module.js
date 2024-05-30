"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtModules = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_service_1 = require("./jwt.service");
const jwt_controller_1 = require("./jwt.controller");
const typesorm_entity_1 = require("../typesorms/entities/typesorm.entity");
const jwt_config_1 = require("../common/jwt.config");
const bycrpt_service_1 = require("./bycrpt.service");
const typesorms_module_1 = require("../typesorms/typesorms.module");
let JwtModules = class JwtModules {
};
exports.JwtModules = JwtModules;
exports.JwtModules = JwtModules = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([typesorm_entity_1.Typesorm]),
            jwt_1.JwtModule.registerAsync(jwt_config_1.default.asProvider()),
            typesorms_module_1.TypesormsModule,
        ],
        controllers: [jwt_controller_1.JwtController],
        providers: [jwt_service_1.JwtServices, bycrpt_service_1.BcryptService],
        exports: [jwt_service_1.JwtServices, bycrpt_service_1.BcryptService, jwt_1.JwtModule],
    })
], JwtModules);
//# sourceMappingURL=jwt.module.js.map