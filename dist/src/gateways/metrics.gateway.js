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
exports.MetricsGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const metrics_service_1 = require("../services/metrics.service");
const logger_starter_1 = require("../utils/logger.starter");
let MetricsGateway = class MetricsGateway {
    metricsService;
    server;
    constructor(metricsService) {
        this.metricsService = metricsService;
    }
    handleConnection(client) {
        const apiKey = client.handshake.query.apiKey;
        if (!apiKey || apiKey !== process.env.API_KEY) {
            logger_starter_1.logger.warn(`❌ Unauthorized client attempted connection: ${client.id}`);
            client.emit('error', 'Unauthorized');
            client.disconnect(true);
            return;
        }
        logger_starter_1.logger.info(`✅ Client authenticated: ${client.id}`);
    }
    handleDisconnect(client) {
        logger_starter_1.logger.info(`Client disconnected: ${client.id}`);
    }
    async handleSubscribe(client, payload) {
        const metrics = await this.metricsService.findAll(payload.serverId, {
            limit: 50,
            order: 'desc',
        });
        client.emit(`metrics:${payload.serverId}`, metrics.reverse());
    }
    broadcastNewMetric(serverId, metric) {
        this.server.emit(`metrics:${serverId}`, [metric]);
    }
};
exports.MetricsGateway = MetricsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MetricsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribeToMetrics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MetricsGateway.prototype, "handleSubscribe", null);
exports.MetricsGateway = MetricsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => metrics_service_1.MetricsService))),
    __metadata("design:paramtypes", [metrics_service_1.MetricsService])
], MetricsGateway);
//# sourceMappingURL=metrics.gateway.js.map