import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

function generateHexKey(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('hex');
}

function addToEnvFile(key: string, value: string, envPath: string) {
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');

    if (!content.includes(`${key}=`)) {
      fs.appendFileSync(envPath, `\n${key}=${value}`);
      console.log(`✅ Added ${key} to .env`);
    } else {
      console.log(`⚠️  ${key} already exists in .env. Skipping.`);
    }
  } else {
    console.log(`📎 Add the following to your .env manually:`);
    console.log(`${key}=${value}`);
  }
}

const ENCRYPTION_KEY = generateHexKey(32); // 64 hex chars = 32 bytes
const API_KEY = generateHexKey(24); // 48 hex chars = 24 bytes (192-bit)

console.log('\n🔐 Generated secure keys:\n');
console.log(`ENCRYPTION_KEY=${ENCRYPTION_KEY}`);
console.log(`API_KEY=${API_KEY}\n`);

const envPath = path.resolve(__dirname, '../.env');

addToEnvFile('ENCRYPTION_KEY', ENCRYPTION_KEY, envPath);
addToEnvFile('API_KEY', API_KEY, envPath);
