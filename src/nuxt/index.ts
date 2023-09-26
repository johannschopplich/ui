import {
  addImportsSources,
  defineNuxtModule,
  extendViteConfig,
  tryResolveModule,
} from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@byjohann/ui",
    configKey: "ui",
  },
  defaults: {},
  async setup(options, nuxt) {
    // Transpile the Vue.js components
    nuxt.options.build.transpile.push("@byjohann/ui");

    // Add auto-imported composables
    addImportsSources({
      from: "@byjohann/ui",
      imports: ["useModals"],
    });

    const hasMapboxGL = await tryResolveModule("mapbox-gl", [
      nuxt.options.rootDir,
    ]);
    if (hasMapboxGL) {
      extendViteConfig((config) => {
        config.optimizeDeps ||= {};
        config.optimizeDeps.include ||= [];

        // Transform CJS packages to ESM
        config.optimizeDeps.include.push("mapbox-gl");
      });
    }
  },
});
