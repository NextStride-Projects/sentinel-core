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
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const environment_config_1 = require("../config/environment.config");
const slack_util_1 = require("../utils/slack.util");
const discord_util_1 = require("../utils/discord.util");
const gmail_util_1 = require("../utils/gmail.util");
const alert_message_util_1 = require("../utils/alert-message.util");
let AlertsService = class AlertsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkAndTriggerAlerts(serverId, metricData) {
        const [thresholds, server] = await Promise.all([
            this.prisma.threshold.findMany({
                where: { serverId, enabled: true },
            }),
            this.prisma.server.findUnique({
                where: { id: serverId },
                select: { name: true },
            }),
        ]);
        if (!server)
            return;
        const triggeredAlerts = thresholds.filter((t) => {
            const key = t.metricType.toLowerCase();
            const value = metricData[key];
            return value !== undefined && value > t.value;
        });
        for (const threshold of triggeredAlerts) {
            const currentValue = metricData[threshold.metricType.toLowerCase()];
            const message = (0, alert_message_util_1.formatAlertMessage)(threshold.metricType, threshold.level, currentValue, threshold.value, server.name);
            await this.prisma.alert.create({
                data: {
                    serverId,
                    type: threshold.metricType,
                    level: threshold.level,
                    message,
                },
            });
            await this.sendAlert(message);
        }
    }
    async sendAlert(message) {
        if (environment_config_1.config.slackWebhook)
            await (0, slack_util_1.sendSlackMessage)(message);
        if (environment_config_1.config.discordWebhook)
            await (0, discord_util_1.sendDiscordAlert)(message);
        if (environment_config_1.config.gmailUser && environment_config_1.config.gmailPass)
            await (0, gmail_util_1.sendGmailAlert)(message);
    }
};
exports.AlertsService = AlertsService;
exports.AlertsService = AlertsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlertsService);
//# sourceMappingURL=alerts.service.js.map