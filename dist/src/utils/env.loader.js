"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnvironmentVariables = validateEnvironmentVariables;
exports.getEnvVariable = getEnvVariable;
require("dotenv/config");
function validateEnvironmentVariables(requiredVars) {
    const missingVars = requiredVars.filter((varName) => !process.env[varName]);
    if (missingVars.length > 0) {
        throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
    }
}
function getEnvVariable(name, isRequired = true) {
    const value = process.env[name];
    if (!value && isRequired) {
        throw new Error(`Environment variable ${name} is required but was not provided.`);
    }
    return value || '';
}
//# sourceMappingURL=env.loader.js.map