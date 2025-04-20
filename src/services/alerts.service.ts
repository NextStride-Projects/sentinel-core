import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { config } from 'src/config/environment.config';
import { sendSlackMessage } from 'src/utils/slack.util';
import { sendDiscordAlert } from 'src/utils/discord.util';
import { sendGmailAlert } from 'src/utils/gmail.util';
import { formatAlertMessage } from 'src/utils/alert-message.util';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}

  async checkAndTriggerAlerts(
    serverId: string,
    metricData: Record<string, number>,
  ) {
    const [thresholds, server] = await Promise.all([
      this.prisma.threshold.findMany({
        where: { serverId, enabled: true },
      }),
      this.prisma.server.findUnique({
        where: { id: serverId },
        select: { name: true },
      }),
    ]);

    if (!server) return;

    const triggeredAlerts = thresholds.filter((t) => {
      const key = t.metricType.toLowerCase();
      const value = metricData[key];
      return value !== undefined && value > t.value;
    });

    for (const threshold of triggeredAlerts) {
      const currentValue = metricData[threshold.metricType.toLowerCase()];

      const message = formatAlertMessage(
        threshold.metricType,
        threshold.level,
        currentValue,
        threshold.value,
        server.name,
      );

      await this.prisma.alert.create({
        data: {
          serverId,
          type: threshold.metricType,
          level: threshold.level,
          message,
        },
      });

      await this.sendAlert(message);
    }
  }

  private async sendAlert(message: string) {
    if (config.slackWebhook) await sendSlackMessage(message);
    if (config.discordWebhook) await sendDiscordAlert(message);
    if (config.gmailUser && config.gmailPass) await sendGmailAlert(message);
  }
}
