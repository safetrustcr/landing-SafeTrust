import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import icon from "astro-icon";

export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [],
      },
    },
  },
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
          "users",
          "wallet",
          "shield-check",
          "coins",
          "eye",
          "sun",
          "moon",
          "monitor",
        ],
      },
    }),
  ],
});
