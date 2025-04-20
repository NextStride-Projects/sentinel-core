import { PrismaService } from './prisma.service';
export declare class AlertsService {
    private prisma;
    constructor(prisma: PrismaService);
    checkAndTriggerAlerts(serverId: string, metricData: Record<string, number>): Promise<void>;
    private sendAlert;
}
