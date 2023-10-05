import {
  addImportsSources,
  defineNuxtModule,
  extendViteConfig,
  tryResolveModule,
  useLogger,
} from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@byjohann/ui",
    configKey: "ui",
  },
  defaults: {},
  async setup(options, nuxt) {
    const logger = useLogger("@byjohann/ui");

    // Transpile the Vue.js components
    nuxt.options.build.transpile.push("@byjohann/ui");

    // Add auto-imported composables
    addImportsSources({
      from: "@byjohann/ui",
      imports: ["useModals"],
    });

    // Make sure the UnoCSS Nuxt module is installed
    if (!nuxt.options.modules?.includes("@unocss/nuxt")) {
      logger.error(
        "`@byjohann/ui` requires the `@unocss/nuxt` module to be installed.",
      );
    }

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
