"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MorganMiddleware = void 0;
const common_1 = require("@nestjs/common");
const morgan = require("morgan");
const logger_starter_1 = require("../utils/logger.starter");
morgan.token('id', (req) => {
    const id = req.id;
    return typeof id === 'string' ? id : '-';
});
const format = process.env.NODE_ENV === 'production'
    ? ':id :remote-addr - :method :url :status :res[content-length] - :response-time ms'
    : 'dev';
let MorganMiddleware = class MorganMiddleware {
    morganMiddleware = morgan(format, {
        stream: {
            write: (message) => {
                logger_starter_1.logger.info(message.trim());
            },
        },
    });
    use(req, res, next) {
        this.morganMiddleware(req, res, next);
    }
};
exports.MorganMiddleware = MorganMiddleware;
exports.MorganMiddleware = MorganMiddleware = __decorate([
    (0, common_1.Injectable)()
], MorganMiddleware);
//# sourceMappingURL=morgan.middleware.js.map