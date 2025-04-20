import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MetricsService } from 'src/services/metrics.service';
interface SubscribePayload {
    serverId: string;
}
export declare class MetricsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly metricsService;
    server: Server;
    constructor(metricsService: MetricsService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSubscribe(client: Socket, payload: SubscribePayload): Promise<void>;
    broadcastNewMetric(serverId: string, metric: any): void;
}
export {};
