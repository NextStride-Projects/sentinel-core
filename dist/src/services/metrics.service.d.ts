import { PrismaService } from './prisma.service';
import { CreateMetricDto } from 'src/dtos/create-metric.dto';
import { MetricQueryParams } from 'src/dtos/metric-query.dto';
import { MetricsGateway } from 'src/gateways/metrics.gateway';
import { AlertsService } from './alerts.service';
export declare class MetricsService {
    private readonly prisma;
    private readonly gateway;
    private alerts;
    constructor(prisma: PrismaService, gateway: MetricsGateway, alerts: AlertsService);
    create(data: CreateMetricDto): Promise<{
        id: string;
        serverId: string;
        timestamp: Date;
        cpuUsage: number;
        memoryUsage: number;
        diskUsage: number;
        netIn: number;
        netOut: number;
        loadAvg: number | null;
    }>;
    findAll(serverId: string, query: MetricQueryParams): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        serverId: string;
        timestamp: Date;
        cpuUsage: number;
        memoryUsage: number;
        diskUsage: number;
        netIn: number;
        netOut: number;
        loadAvg: number | null;
    }[]>;
    findLatestByServer(serverId: string): import(".prisma/client").Prisma.Prisma__MetricClient<{
        id: string;
        serverId: string;
        timestamp: Date;
        cpuUsage: number;
        memoryUsage: number;
        diskUsage: number;
        netIn: number;
        netOut: number;
        loadAvg: number | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
