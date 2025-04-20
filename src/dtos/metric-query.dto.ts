export type MetricQueryParams = {
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
  orderBy?: 'timestamp' | 'cpuUsage' | 'memoryUsage' | 'diskUsage'; // extend as needed
  order?: 'asc' | 'desc';
};
