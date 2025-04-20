import { AlertLevel, MetricType } from '@prisma/client';

export function formatAlertMessage(
  metric: MetricType,
  level: AlertLevel,
  value: number,
  threshold: number,
  serverName: string,
): string {
  const emoji = level === 'CRITICAL' ? '🚨' : level === 'WARNING' ? '⚠️' : 'ℹ️';

  return `${emoji} *${level}* Alert for *${metric}*
> Current value: *${value}*
> Threshold: *${threshold}*
> Server: \`${serverName}\`
`;
}
