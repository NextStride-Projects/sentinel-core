import axios from 'axios';
import { config } from 'src/config/environment.config';

export async function sendDiscordAlert(message: string): Promise<void> {
  if (!config.discordWebhook) return;

  await axios.post(config.discordWebhook, {
    content: message,
  });
}
