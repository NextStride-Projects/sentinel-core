"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
function generateHexKey(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
}
function addToEnvFile(key, value, envPath) {
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8');
        if (!content.includes(`${key}=`)) {
            fs.appendFileSync(envPath, `\n${key}=${value}`);
            console.log(`✅ Added ${key} to .env`);
        }
        else {
            console.log(`⚠️  ${key} already exists in .env. Skipping.`);
        }
    }
    else {
        console.log(`📎 Add the following to your .env manually:`);
        console.log(`${key}=${value}`);
    }
}
const ENCRYPTION_KEY = generateHexKey(32);
const API_KEY = generateHexKey(24);
console.log('\n🔐 Generated secure keys:\n');
console.log(`ENCRYPTION_KEY=${ENCRYPTION_KEY}`);
console.log(`API_KEY=${API_KEY}\n`);
const envPath = path.resolve(__dirname, '../.env');
addToEnvFile('ENCRYPTION_KEY', ENCRYPTION_KEY, envPath);
addToEnvFile('API_KEY', API_KEY, envPath);
//# sourceMappingURL=generate-keys.js.map