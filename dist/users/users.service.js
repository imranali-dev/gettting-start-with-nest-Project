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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Model_Users_1 = require("./secama/Model.Users");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        try {
            const hasingpassword = await bcrypt.hashSync(createUserDto.password);
            const model = new this.userModel();
            model.name = createUserDto.name;
            model.verifyCodeExpiry = createUserDto.verifyCodeExpiry;
            model.username = createUserDto.username;
            model.email = createUserDto.email;
            model.password = hasingpassword;
            model.isVerified = createUserDto.isVerified;
            model.verifyCode = createUserDto.verifyCode;
            return await model.save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.BadRequestException('User with this email already exists');
            }
            else if (error.errors) {
                const messages = Object.values(error.errors).map((err) => err.message);
                throw new common_1.BadRequestException(messages);
            }
            else {
                throw new common_1.InternalServerErrorException('An error occurred while creating the user');
            }
        }
    }
    async findAll() {
        try {
            return await this.userModel.find().exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('An error occurred while fetching users');
        }
    }
    async findOne(id) {
        try {
            const user = await this.userModel.findById(id).exec();
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            return user;
        }
        catch (error) {
            if (error.kind === 'ObjectId') {
                throw new common_1.BadRequestException('Invalid user ID');
            }
            throw new common_1.InternalServerErrorException('An error occurred while fetching the user');
        }
    }
    async update(id, updateUserDto) {
        try {
            const updatedUser = await this.userModel
                .findOne({ _id: id }, {
                name: updateUserDto.name,
                verifyCodeExpiry: updateUserDto.verifyCodeExpiry,
                username: updateUserDto.username,
                email: updateUserDto.email,
                password: updateUserDto.password,
                isVerified: updateUserDto.isVerified,
                verifyCode: updateUserDto.verifyCode,
            }, { new: true })
                .exec();
            console.log(id);
            if (!updatedUser) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            return updatedUser;
        }
        catch (error) {
            if (error.kind === 'ObjectId') {
                throw new common_1.BadRequestException('Invalid user ID');
            }
            throw new common_1.InternalServerErrorException('An error occurred while updating the user');
        }
    }
    async remove(id) {
        try {
            const result = await this.userModel.deleteOne({ _id: id }).exec();
            if (result.deletedCount === 0) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            return { deleted: true };
        }
        catch (error) {
            if (error.kind === 'ObjectId') {
                throw new common_1.BadRequestException('Invalid user ID');
            }
            throw new common_1.InternalServerErrorException('An error occurred while deleting the user');
        }
    }
    async SigIn(payload) {
        try {
            const user = await this.userModel
                .findOne({ email: payload.email })
                .exec();
            if (!user.email) {
                throw new common_1.BadRequestException('User with this email not found');
            }
            if (!user.isVerified) {
                throw new common_1.BadRequestException('Please verify your account before logging in');
            }
            const isPasswordValid = await bcrypt.compare(payload.password, user.password);
            if (!isPasswordValid) {
                throw new common_1.BadRequestException('Invalid password');
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('An error occurred while signing in');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Model_Users_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map