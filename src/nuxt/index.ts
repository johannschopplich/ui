import {
  addImportsSources,
  defineNuxtModule,
  extendViteConfig,
  useLogger,
} from "@nuxt/kit";
import { createJiti } from "jiti";

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

    const jiti = createJiti(nuxt.options.rootDir, {
      alias: nuxt.options.alias,
    });
    const mapboxGlSrc = jiti.esmResolve("mapbox-gl", { try: true });

    if (mapboxGlSrc) {
      extendViteConfig((config) => {
        config.optimizeDeps ||= {};
        config.optimizeDeps.include ||= [];

        // Transform CJS packages to ESM
        config.optimizeDeps.include.push("mapbox-gl");
      });
    }
  },
});
