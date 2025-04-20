import axios from 'axios';
import { config } from 'src/config/environment.config';

export async function sendSlackMessage(message: string): Promise<void> {
  if (!config.slackWebhook) return;

  await axios.post(config.slackWebhook, {
    text: message,
  });
}
