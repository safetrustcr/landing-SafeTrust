import type { AppConfig } from "@/types/config";

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

const nodeEnv =
  (process.env.NODE_ENV as "development" | "staging" | "production") ||
  "development";

export const config: AppConfig = {
  app: {
    name: getEnvVar("NEXT_PUBLIC_APP_NAME", "SafeTrust"),
    version: getEnvVar("NEXT_PUBLIC_VERSION", "1.0.0"),
    env: nodeEnv,
  },
  api: {
    baseUrl: getEnvVar("NEXT_PUBLIC_API_URL", "http://localhost:3000"),
  },
};

if (nodeEnv === "development") {
  console.log("Loaded configuration:", config);
}
