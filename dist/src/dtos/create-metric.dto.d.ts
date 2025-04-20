export declare class CreateMetricDto {
    serverId: string;
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    netIn: number;
    netOut: number;
    loadAvg?: number;
}
