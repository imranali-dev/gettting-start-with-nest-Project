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
exports.JwtServices = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typesorm_entity_1 = require("../typesorms/entities/typesorm.entity");
const typeorm_2 = require("typeorm");
const bycrpt_service_1 = require("./bycrpt.service");
const crypto_1 = require("crypto");
const jwt_config_1 = require("../common/jwt.config");
const jwt_1 = require("@nestjs/jwt");
let JwtServices = class JwtServices {
    constructor(jwtConfiguration, bcryptService, jwtService, userRepository) {
        this.jwtConfiguration = jwtConfiguration;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async handleErrors(error) {
        if (error.code === 11000) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        if (error.errors) {
            const messages = Object.values(error.errors).map((err) => err.message);
            throw new common_1.BadRequestException(messages);
        }
        throw new common_1.InternalServerErrorException('An error occurred while processing the request');
    }
    async generateAccessToken(user) {
        const tokenId = (0, crypto_1.randomUUID)();
        const accessToken = await this.jwtService.signAsync({
            id: user.id,
            email: user.email,
            tokenId,
        }, {
            secret: this.jwtConfiguration.secret,
            expiresIn: this.jwtConfiguration.accessTokenTtl,
        });
        return { accessToken };
    }
    async create(payload) {
        try {
            const user = new typesorm_entity_1.Typesorm();
            user.email = payload.email;
            user.password = payload.password;
            return await this.userRepository.save(user);
        }
        catch (error) {
            await this.handleErrors(error);
        }
    }
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid email');
        }
        const isPasswordMatch = await this.bcryptService.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new common_1.BadRequestException('Invalid password');
        }
        return await this.generateAccessToken(user);
    }
    findAll() {
        return `This action returns all jwt`;
    }
    findOne(id) {
        return `This action returns a #${id} jwt`;
    }
    update(id) {
        return `This action updates a #${id} jwt`;
    }
    remove(id) {
        return `This action removes a #${id} jwt`;
    }
};
exports.JwtServices = JwtServices;
exports.JwtServices = JwtServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __param(3, (0, typeorm_1.InjectRepository)(typesorm_entity_1.Typesorm)),
    __metadata("design:paramtypes", [void 0, bycrpt_service_1.BcryptService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], JwtServices);
//# sourceMappingURL=jwt.service.js.map