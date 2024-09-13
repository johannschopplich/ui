import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

const currentDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${resolve(currentDir, "src")}/`,
      "@byjohann/ui": resolve(currentDir, "../src/index.ts"),
    },
  },

  plugins: [Vue(), UnoCSS()],

  optimizeDeps: {
    exclude: ["@byjohann/ui"],
  },
});
