export type AppConfig = {
  app: {
    name: string;
    version: string;
    env: "development" | "staging" | "production";
  };
  api: {
    baseUrl: string;
  };
};
