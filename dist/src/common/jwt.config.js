"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('jwt', () => {
    return {
        secret: 'nosfsdbfhj',
        accessTokenTtl: 3600,
    };
});
//# sourceMappingURL=jwt.config.js.map