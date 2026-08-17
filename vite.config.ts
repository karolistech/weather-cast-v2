import { defineConfig } from "vite";

export default defineConfig({
  base: "/weather-cast-v2/",

  build: {
    assetsInlineLimit: 0
  },

  resolve: {
    tsconfigPaths: true
  }
});
