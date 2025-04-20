import { forwardRef, Inject } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MetricsService } from 'src/services/metrics.service';
import { logger } from 'src/utils/logger.starter';

interface SubscribePayload {
  serverId: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MetricsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  constructor(
    @Inject(forwardRef(() => MetricsService))
    private readonly metricsService: MetricsService,
  ) {}

  handleConnection(client: Socket): void {
    const apiKey = client.handshake.query.apiKey as string;

    if (!apiKey || apiKey !== process.env.API_KEY) {
      logger.warn(`❌ Unauthorized client attempted connection: ${client.id}`);
      client.emit('error', 'Unauthorized');
      client.disconnect(true);
      return;
    }

    logger.info(`✅ Client authenticated: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    logger.info(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribeToMetrics')
  async handleSubscribe(
    client: Socket,
    payload: SubscribePayload,
  ): Promise<void> {
    const metrics = await this.metricsService.findAll(payload.serverId, {
      limit: 50,
      order: 'desc',
    });

    client.emit(`metrics:${payload.serverId}`, metrics.reverse());
  }

  broadcastNewMetric(serverId: string, metric: any): void {
    this.server.emit(`metrics:${serverId}`, [metric]);
  }
}
