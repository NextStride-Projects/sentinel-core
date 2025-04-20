import 'dotenv/config';
export declare function validateEnvironmentVariables(requiredVars: string[]): void;
export declare function getEnvVariable(name: string, isRequired?: boolean): string;
