import nodemailer from 'nodemailer';
import { config } from 'src/config/environment.config';

export async function sendGmailAlert(message: string): Promise<void> {
  if (!config.gmailUser || !config.gmailPass) return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.gmailUser,
      pass: config.gmailPass,
    },
  });

  await transporter.sendMail({
    from: `"Alert Bot" <${config.gmailUser}>`,
    to: config.gmailUser,
    subject: '🚨 Server Monitoring Alert',
    text: message,
    html: `<pre style="font-family: monospace">${message}</pre>`,
  });
}
