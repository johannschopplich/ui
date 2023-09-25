import { defineConfig, presetIcons, presetWind } from "unocss";
import { presetForms } from "@julr/unocss-preset-forms";

export default defineConfig({
  presets: [presetWind(), presetForms(), presetIcons()],
});
