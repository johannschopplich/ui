<script setup lang="ts">
import { inject } from "vue";
import { contextInjectionKey } from "./GridPattern.vue";

defineProps<{
  row: number;
  column: number;
}>();

const grid = inject(contextInjectionKey)!;
</script>

<template>
  <rect
    stroke-width="0"
    :width="grid.size - 1"
    :height="grid.size - 1"
    :x="column * grid.size + grid.offsetX + 1"
    :y="row * grid.size + grid.offsetY + 1"
  />
</template>
