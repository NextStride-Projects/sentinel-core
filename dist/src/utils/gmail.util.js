"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendGmailAlert = sendGmailAlert;
const nodemailer_1 = require("nodemailer");
const environment_config_1 = require("../config/environment.config");
async function sendGmailAlert(message) {
    if (!environment_config_1.config.gmailUser || !environment_config_1.config.gmailPass)
        return;
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: environment_config_1.config.gmailUser,
            pass: environment_config_1.config.gmailPass,
        },
    });
    await transporter.sendMail({
        from: `"Alert Bot" <${environment_config_1.config.gmailUser}>`,
        to: environment_config_1.config.gmailUser,
        subject: '🚨 Server Monitoring Alert',
        text: message,
        html: `<pre style="font-family: monospace">${message}</pre>`,
    });
}
//# sourceMappingURL=gmail.util.js.map