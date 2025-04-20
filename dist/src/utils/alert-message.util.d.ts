import { AlertLevel, MetricType } from '@prisma/client';
export declare function formatAlertMessage(metric: MetricType, level: AlertLevel, value: number, threshold: number, serverName: string): string;
