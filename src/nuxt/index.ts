import {
  addImportsSources,
  defineNuxtModule,
  extendViteConfig,
} from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@byjohann/ui",
    configKey: "ui",
  },
  defaults: {},
  setup(options, nuxt) {
    // Transpile the Vue.js components
    nuxt.options.build.transpile.push("@byjohann/ui");

    // Add auto-imported composables
    addImportsSources({
      from: "@byjohann/ui",
      imports: ["useModals"],
    });

    extendViteConfig((config) => {
      config.optimizeDeps ||= {};
      config.optimizeDeps.include ||= [];

      // Transform CJS packages to ESM
      config.optimizeDeps.include.push("mapbox-gl");
    });
  },
});
