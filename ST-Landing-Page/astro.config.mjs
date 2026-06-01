import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import icon from "astro-icon";

export default defineConfig({
  integrations: [
    react(),
    icon({
      include: {
        lucide: [
          "lock",
          "zap",
          "globe",
          "clock",
          "scale",
          "wallet",
          "shield-check",
          "coins",
        ],
      },
    }),
  ],
});
