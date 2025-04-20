"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSlackMessage = sendSlackMessage;
const axios_1 = require("axios");
const environment_config_1 = require("../config/environment.config");
async function sendSlackMessage(message) {
    if (!environment_config_1.config.slackWebhook)
        return;
    await axios_1.default.post(environment_config_1.config.slackWebhook, {
        text: message,
    });
}
//# sourceMappingURL=slack.util.js.map