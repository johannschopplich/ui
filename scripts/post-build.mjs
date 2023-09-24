// The `mkdist` builder compiles `<script lang="ts">` to `<script>`, which is
// problematic if the component also has a `<script lang="ts" setup>` block.
// This leads to a Vite error:
// `[@vue/compiler-sfc] <script> and <script setup> must have the same language type.`
// So we manually add the `lang="ts"` attribute to the `<script>` block.

import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";
import fg from "fast-glob";

const distDir = fileURLToPath(new URL("../dist", import.meta.url));
const files = await fg(["components/*.vue"], {
  cwd: distDir,
});

for (const file of files) {
  ensureScriptLang(file);
}

function ensureScriptLang(file) {
  const filePath = join(distDir, file);
  const content = readFileSync(filePath, "utf-8");
  const newContent = content.replace("<script>", '<script lang="ts">');
  writeFileSync(filePath, newContent);
}
