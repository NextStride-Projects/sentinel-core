import * as crypto from 'crypto';
import { config } from 'src/config/environment.config';

const ENCRYPTION_KEY = config.encryptionKey;
const IV_LENGTH = 16;

const keyBuffer = Buffer.from(ENCRYPTION_KEY, 'hex');
if (keyBuffer.length !== 32) {
  throw new Error(
    'ENCRYPTION_KEY must be a 64-character hex string (32 bytes)',
  );
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return iv.toString('base64') + ':' + encrypted;
}

export function decrypt(text: string): string {
  const [ivStr, encrypted] = text.split(':');
  const iv = Buffer.from(ivStr, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
