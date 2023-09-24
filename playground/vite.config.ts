import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";

const currentDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${resolve(currentDir, "src")}/`,
      "@byjohann/components": resolve(currentDir, "../src/index.ts"),
    },
  },

  plugins: [Vue(), UnoCSS()],

  optimizeDeps: {
    exclude: ["@byjohann/components"],
  },
});
