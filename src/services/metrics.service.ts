import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  getDateRangeFilter,
  getPagination,
  getOrder,
} from '../utils/query-helpers';
import { CreateMetricDto } from 'src/dtos/create-metric.dto';
import { MetricQueryParams } from 'src/dtos/metric-query.dto';
import { MetricsGateway } from 'src/gateways/metrics.gateway';
import { AlertsService } from './alerts.service';

@Injectable()
export class MetricsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: MetricsGateway,
    private alerts: AlertsService,
  ) {}

  async create(data: CreateMetricDto) {
    const metric = await this.prisma.metric.create({ data });
    this.gateway.broadcastNewMetric(data.serverId, metric);

    await this.alerts.checkAndTriggerAlerts(data.serverId, {
      cpu: data.cpuUsage,
      memory: data.memoryUsage,
      disk: data.diskUsage,
      net_in: data.netIn,
      net_out: data.netOut,
      load_avg: data.loadAvg ?? 0,
    });

    return metric;
  }

  findAll(serverId: string, query: MetricQueryParams) {
    const {
      from,
      to,
      page,
      limit = 50,
      order = 'desc',
      orderBy = 'timestamp',
    } = query;

    return this.prisma.metric.findMany({
      where: {
        serverId,
        ...getDateRangeFilter('timestamp', { from, to }),
      },
      ...getPagination({ page, limit }),
      ...getOrder({ orderBy, order }),
    });
  }

  findLatestByServer(serverId: string) {
    return this.prisma.metric.findFirst({
      where: { serverId },
      orderBy: { timestamp: 'desc' },
    });
  }
}
