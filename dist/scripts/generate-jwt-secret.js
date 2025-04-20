"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
function generateSecret(length = 48) {
    return crypto.randomBytes(length).toString('base64url');
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
const JWT_SECRET = generateSecret();
console.log('\n🔐 Generated JWT secret:\n');
console.log(`JWT_SECRET=${JWT_SECRET}\n`);
const envPath = path.resolve(__dirname, '../.env');
addToEnvFile('JWT_SECRET', JWT_SECRET, envPath);
//# sourceMappingURL=generate-jwt-secret.js.map