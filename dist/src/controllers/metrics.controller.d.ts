import { MetricsService } from 'src/services/metrics.service';
import { CreateMetricDto } from 'src/dtos/create-metric.dto';
import { MetricQueryParams } from 'src/dtos/metric-query.dto';
export declare class MetricsController {
    private readonly metricsService;
    constructor(metricsService: MetricsService);
    create(body: CreateMetricDto): Promise<{
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
    findLatest(serverId: string): import(".prisma/client").Prisma.Prisma__MetricClient<{
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
