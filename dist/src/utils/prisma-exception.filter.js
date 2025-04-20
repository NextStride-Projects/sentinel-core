"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const logger_starter_1 = require("./logger.starter");
let PrismaExceptionFilter = class PrismaExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let details;
        switch (exception.code) {
            case 'P2000':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Input too long for one of the fields.';
                break;
            case 'P2002': {
                status = common_1.HttpStatus.CONFLICT;
                const target = exception.meta?.target;
                message =
                    typeof target === 'string'
                        ? `Unique constraint failed on field: ${target}`
                        : Array.isArray(target)
                            ? `Unique constraint failed on fields: ${target.join(', ')}`
                            : 'Unique constraint failed on unknown field';
                break;
            }
            case 'P2003':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Invalid reference (foreign key constraint).';
                break;
            case 'P2004':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Constraint violation.';
                break;
            case 'P2005':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Invalid value for one of the fields.';
                break;
            case 'P2006':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Missing required value for a field.';
                break;
            case 'P2025':
                status = common_1.HttpStatus.NOT_FOUND;
                message = 'Record not found.';
                break;
            case 'P2010':
                status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                message = 'Raw query failed. Check query syntax or parameters.';
                break;
            case 'P2011':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Non-nullable field was left null.';
                break;
            case 'P2014':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Relation constraint violation.';
                break;
            case 'P2015':
                status = common_1.HttpStatus.NOT_FOUND;
                message = 'Cannot delete record — it does not exist.';
                break;
            default:
                message = `Unhandled Prisma error: ${exception.code}`;
                details = exception.message;
        }
        logger_starter_1.logger.error(`[PRISMA ERROR] ${message}`, {
            code: exception.code,
            path: exception.meta?.target,
            requestUrl: request?.url,
            method: request?.method,
            status,
            details,
        });
        response.status(status).json({
            statusCode: status,
            message,
            error: exception.name,
        });
    }
};
exports.PrismaExceptionFilter = PrismaExceptionFilter;
exports.PrismaExceptionFilter = PrismaExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaExceptionFilter);
//# sourceMappingURL=prisma-exception.filter.js.map