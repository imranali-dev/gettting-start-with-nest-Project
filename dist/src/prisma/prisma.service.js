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
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prisma_entity_1 = require("./entities/prisma.entity");
const hash_util_1 = require("../utils/hash.util");
let PrismaService = class PrismaService {
    constructor(usersRepositry) {
        this.usersRepositry = usersRepositry;
    }
    async handleErrors(error) {
        if (error.code === 23505) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        if (error.errors) {
            const messages = Object.values(error.errors).map((err) => err.message);
            throw new common_1.BadRequestException(messages);
        }
        throw new common_1.InternalServerErrorException('An error occurred while processing the request');
    }
    async create(payload) {
        try {
            const existingUser = await this.usersRepositry.findOne({
                where: { email: payload.email },
            });
            if (existingUser) {
                throw new common_1.BadRequestException('email is already taken and verified');
            }
            const hashedPassword = await (0, hash_util_1.hashPassword)(payload.hash);
            const newUser = this.usersRepositry.create({
                email: payload.email,
                hash: hashedPassword,
            });
            return await this.usersRepositry.save(newUser);
        }
        catch (error) {
            await this.handleErrors(error);
        }
    }
    async findOneByEmail(email) {
        return this.usersRepositry.findOne({ where: { email } });
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prisma_entity_1.Prisma)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map