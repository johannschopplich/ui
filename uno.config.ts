import { presetForms } from "@julr/unocss-preset-forms";
import { defineConfig, presetIcons, presetWind } from "unocss";

export default defineConfig({
  presets: [presetWind(), presetForms(), presetIcons()],
});
