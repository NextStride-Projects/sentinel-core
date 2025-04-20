"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const env_loader_1 = require("../utils/env.loader");
const requiredVars = [
    'DATABASE_URL',
    'API_KEY',
    'NODE_ENV',
    'ENCRYPTION_KEY',
    'JWT_SECRET',
];
(0, env_loader_1.validateEnvironmentVariables)(requiredVars);
exports.config = {
    dbUrl: (0, env_loader_1.getEnvVariable)('DATABASE_URL'),
    apiKey: (0, env_loader_1.getEnvVariable)('API_KEY'),
    env: (0, env_loader_1.getEnvVariable)('NODE_ENV'),
    encryptionKey: (0, env_loader_1.getEnvVariable)('ENCRYPTION_KEY'),
    jwtSecret: (0, env_loader_1.getEnvVariable)('JWT_SECRET'),
    gmailUser: (0, env_loader_1.getEnvVariable)('GMAIL_USER', false),
    gmailPass: (0, env_loader_1.getEnvVariable)('GMAIL_PASS', false),
    discordWebhook: (0, env_loader_1.getEnvVariable)('DISCORD_WEBHOOK_URL', false),
    slackWebhook: (0, env_loader_1.getEnvVariable)('SLACK_WEBHOOK_URL', false),
};
//# sourceMappingURL=environment.config.js.map