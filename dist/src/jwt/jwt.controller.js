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
exports.JwtController = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("./jwt.service");
const signup_dto_1 = require("./dto/signup.dto");
let JwtController = class JwtController {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    create(createJwtDto) {
        return this.jwtService.create(createJwtDto);
    }
    findAll() {
        return this.jwtService.findAll();
    }
    findOne(id) {
        return this.jwtService.findOne(+id);
    }
    remove(id) {
        return this.jwtService.remove(+id);
    }
};
exports.JwtController = JwtController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpDto]),
    __metadata("design:returntype", void 0)
], JwtController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JwtController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JwtController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JwtController.prototype, "remove", null);
exports.JwtController = JwtController = __decorate([
    (0, common_1.Controller)('jwt'),
    __metadata("design:paramtypes", [jwt_service_1.JwtServices])
], JwtController);
//# sourceMappingURL=jwt.controller.js.map