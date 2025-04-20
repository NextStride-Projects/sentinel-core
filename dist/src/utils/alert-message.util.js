"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAlertMessage = formatAlertMessage;
function formatAlertMessage(metric, level, value, threshold, serverName) {
    const emoji = level === 'CRITICAL' ? '🚨' : level === 'WARNING' ? '⚠️' : 'ℹ️';
    return `${emoji} *${level}* Alert for *${metric}*
> Current value: *${value}*
> Threshold: *${threshold}*
> Server: \`${serverName}\`
`;
}
//# sourceMappingURL=alert-message.util.js.map