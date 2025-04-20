"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const environment_config_1 = require("../config/environment.config");
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize, errors } = winston_1.format;
const logFormat = printf(({ level, message, timestamp, stack, }) => {
    return `${timestamp ?? ''} [${level}]: ${stack || message}`;
});
exports.logger = (0, winston_1.createLogger)({
    level: environment_config_1.config.env === 'beta' ? 'debug' : 'info',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), colorize({ all: environment_config_1.config.env === 'beta' }), logFormat),
    transports: [
        new winston_1.transports.Console(),
        ...(environment_config_1.config.env === 'production'
            ? [
                new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }),
                new winston_1.transports.File({ filename: 'logs/combined.log' }),
            ]
            : []),
    ],
    exitOnError: false,
});
exports.logger.add(new winston_1.transports.Console({
    level: 'http',
    format: combine(colorize({ all: environment_config_1.config.env === 'development' }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
}));
//# sourceMappingURL=logger.starter.js.map