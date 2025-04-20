"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDiscordAlert = sendDiscordAlert;
const axios_1 = require("axios");
const environment_config_1 = require("../config/environment.config");
async function sendDiscordAlert(message) {
    if (!environment_config_1.config.discordWebhook)
        return;
    await axios_1.default.post(environment_config_1.config.discordWebhook, {
        content: message,
    });
}
//# sourceMappingURL=discord.util.js.map