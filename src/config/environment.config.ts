import {
  getEnvVariable,
  validateEnvironmentVariables,
} from '../utils/env.loader';

const requiredVars = [
  'DATABASE_URL',
  'API_KEY',
  'NODE_ENV',
  'ENCRYPTION_KEY',
  'JWT_SECRET',
];

validateEnvironmentVariables(requiredVars);

export const config = {
  dbUrl: getEnvVariable('DATABASE_URL'),
  apiKey: getEnvVariable('API_KEY'),
  env: getEnvVariable('NODE_ENV'),
  encryptionKey: getEnvVariable('ENCRYPTION_KEY'),
  jwtSecret: getEnvVariable('JWT_SECRET'),

  // ✅ Optional alert channels
  gmailUser: getEnvVariable('GMAIL_USER', false),
  gmailPass: getEnvVariable('GMAIL_PASS', false),
  discordWebhook: getEnvVariable('DISCORD_WEBHOOK_URL', false),
  slackWebhook: getEnvVariable('SLACK_WEBHOOK_URL', false),
};
