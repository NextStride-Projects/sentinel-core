import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity, ApiQuery } from '@nestjs/swagger';
import { MetricsService } from 'src/services/metrics.service';
import { CreateMetricDto } from 'src/dtos/create-metric.dto';
import { MetricQueryParams } from 'src/dtos/metric-query.dto';

@ApiTags('Metrics')
@ApiSecurity('api-key')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new metric record' })
  create(@Body() body: CreateMetricDto) {
    return this.metricsService.create(body);
  }

  @Get(':serverId')
  @ApiOperation({ summary: 'Fetch metrics for a server with optional filters' })
  @ApiQuery({ name: 'from', required: false, type: String })
  @ApiQuery({ name: 'to', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'orderBy', required: false, type: String })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  findAll(
    @Param('serverId') serverId: string,
    @Query() query: MetricQueryParams,
  ) {
    return this.metricsService.findAll(serverId, query);
  }

  @Get(':serverId/latest')
  @ApiOperation({ summary: 'Get the latest metric for a server' })
  findLatest(@Param('serverId') serverId: string) {
    return this.metricsService.findLatestByServer(serverId);
  }
}
