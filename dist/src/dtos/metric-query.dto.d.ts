export type MetricQueryParams = {
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
    orderBy?: 'timestamp' | 'cpuUsage' | 'memoryUsage' | 'diskUsage';
    order?: 'asc' | 'desc';
};
