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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prisma = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let Prisma = class Prisma {
};
exports.Prisma = Prisma;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Prisma.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, unique: true, nullable: true }),
    __metadata("design:type", String)
], Prisma.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], Prisma.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Prisma.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    (0, typeorm_1.Index)(),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], Prisma.prototype, "pasword", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Prisma.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Prisma.prototype, "hashedRT", void 0);
exports.Prisma = Prisma = __decorate([
    (0, typeorm_1.Entity)('convertitintoprisma')
], Prisma);
//# sourceMappingURL=prisma.entity.js.map