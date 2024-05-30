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
exports.TypesormsController = void 0;
const common_1 = require("@nestjs/common");
const typesorms_service_1 = require("./typesorms.service");
const create_typesorm_dto_1 = require("./dto/create-typesorm.dto");
const update_typesorm_dto_1 = require("./dto/update-typesorm.dto");
const swagger_1 = require("@nestjs/swagger");
const some_1 = require("../common/decoreter/some");
const signin_dto_1 = require("../jwt/dto/signin.dto");
let TypesormsController = class TypesormsController {
    constructor(typesormsService) {
        this.typesormsService = typesormsService;
    }
    create(createTypesormDto) {
        return this.typesormsService.create(createTypesormDto);
    }
    signIn(signInDto) {
        return this.typesormsService.signIn(signInDto);
    }
    findAll() {
        return this.typesormsService.findAll();
    }
    findOne(id) {
        return this.typesormsService.findOne(id);
    }
    update(id, updateTypesormDto) {
        return this.typesormsService.update(id, updateTypesormDto);
    }
    remove(id) {
        return this.typesormsService.remove(id);
    }
};
exports.TypesormsController = TypesormsController;
__decorate([
    (0, swagger_1.ApiConflictResponse)({
        description: 'User already exists',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Return errors for invalid sign up fields',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User has been successfully signed up',
    }),
    (0, some_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_typesorm_dto_1.CreateTypesormDto]),
    __metadata("design:returntype", void 0)
], TypesormsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Return errors for invalid sign in fields',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'User has been successfully signed in' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, some_1.Public)(),
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], TypesormsController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TypesormsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypesormsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_typesorm_dto_1.UpdateTypesormDto]),
    __metadata("design:returntype", void 0)
], TypesormsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypesormsController.prototype, "remove", null);
exports.TypesormsController = TypesormsController = __decorate([
    (0, common_1.Controller)('typesorms'),
    __metadata("design:paramtypes", [typesorms_service_1.TypesormsService])
], TypesormsController);
//# sourceMappingURL=typesorms.controller.js.map