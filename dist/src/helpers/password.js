"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.hashPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
async function hashPassword(rawPassword) {
    const salt = await bcryptjs_1.default.genSalt();
    return bcryptjs_1.default.hash(rawPassword, salt);
}
exports.hashPassword = hashPassword;
async function compareHash(rawPassword, hashedPassword) {
    return await bcryptjs_1.default.compare(rawPassword, hashedPassword);
}
exports.compareHash = compareHash;
//# sourceMappingURL=password.js.map