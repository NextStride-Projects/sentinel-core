import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { ServersService } from './services/servers.service';
import { ServersController } from './controllers/servers.controller';
import { MorganMiddleware } from './middlewares/morgan.middleware';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { MetricsModule } from './modules/metrics.module';
import { PrismaService } from './services/prisma.service';
import { ApiKeyMiddleware } from './middlewares/auth.middleware';
import { AlertsService } from './services/alerts.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TerminusModule,
    MetricsModule,
  ],
  controllers: [ServersController, AuthController],
  providers: [AlertsService, PrismaService, ServersService, AuthService],
  exports: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MorganMiddleware, ApiKeyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
