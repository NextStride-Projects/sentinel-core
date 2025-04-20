import 'dotenv/config';

export function validateEnvironmentVariables(requiredVars: string[]): void {
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
  }
}

export function getEnvVariable(
  name: string,
  isRequired: boolean = true,
): string {
  const value = process.env[name];
  if (!value && isRequired) {
    throw new Error(
      `Environment variable ${name} is required but was not provided.`,
    );
  }
  return value || '';
}
