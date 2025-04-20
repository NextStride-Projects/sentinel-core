import { Module } from '@nestjs/common';
import { MetricsService } from 'src/services/metrics.service';
import { MetricsController } from 'src/controllers/metrics.controller';
import { MetricsGateway } from 'src/gateways/metrics.gateway';
import { PrismaService } from 'src/services/prisma.service';
import { AlertsService } from 'src/services/alerts.service';

@Module({
  controllers: [MetricsController],
  providers: [MetricsService, MetricsGateway, PrismaService, AlertsService],
  exports: [MetricsService],
})
export class MetricsModule {}
