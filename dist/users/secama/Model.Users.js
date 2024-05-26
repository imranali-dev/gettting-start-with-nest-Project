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
exports.UsersModel = exports.Users = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Users = class Users {
};
exports.Users = Users;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, 'Password is required'] }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, 'Verify Code is required'] }),
    __metadata("design:type", Number)
], Users.prototype, "verifyCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Users.prototype, "verifyCodeExpiry", void 0);
exports.Users = Users = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Users);
exports.UsersModel = mongoose_1.SchemaFactory.createForClass(Users);
//# sourceMappingURL=Model.Users.js.map