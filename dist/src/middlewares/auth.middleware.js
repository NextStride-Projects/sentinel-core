"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyMiddleware = void 0;
const common_1 = require("@nestjs/common");
const environment_config_1 = require("../config/environment.config");
let ApiKeyMiddleware = class ApiKeyMiddleware {
    use(req, res, next) {
        if (req.method === 'POST' && req.path === '/auth/login') {
            return next();
        }
        const incomingKey = req.headers['x-api-key'];
        if (!incomingKey) {
            console.error('Missing API key');
            throw new common_1.UnauthorizedException('Missing API key');
        }
        if (incomingKey !== environment_config_1.config.apiKey) {
            console.error('Invalid API key');
            throw new common_1.UnauthorizedException('Invalid API key');
        }
        next();
    }
};
exports.ApiKeyMiddleware = ApiKeyMiddleware;
exports.ApiKeyMiddleware = ApiKeyMiddleware = __decorate([
    (0, common_1.Injectable)()
], ApiKeyMiddleware);
//# sourceMappingURL=auth.middleware.js.map