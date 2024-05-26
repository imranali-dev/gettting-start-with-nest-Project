"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationExpiry = exports.generateVerificationCode = void 0;
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000);
}
exports.generateVerificationCode = generateVerificationCode;
function generateVerificationExpiry() {
    return new Date(Date.now() + 60 * 60 * 1000);
}
exports.generateVerificationExpiry = generateVerificationExpiry;
//# sourceMappingURL=code.util.js.map