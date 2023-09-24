<script lang="ts">
import { provide } from "vue";
import type { InjectionKey } from "vue";

export interface GridPatternProps {
  size?: number;
  offsetX?: number;
  offsetY?: number;
}

export const contextInjectionKey = Symbol() as InjectionKey<
  Required<GridPatternProps>
>;
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number;
    offsetX?: number;
    offsetY?: number;
  }>(),
  {
    size: 64,
    offsetX: -1,
    offsetY: -1,
  },
);

const id = Math.round(Math.random() * 999);

provide(contextInjectionKey, props);
</script>

<template>
  <svg>
    <defs>
      <pattern
        :id="`grid-pattern-${id}`"
        viewBox="0 0 64 64"
        :width="size"
        :height="size"
        patternUnits="userSpaceOnUse"
        :x="offsetX"
        :y="offsetY"
      >
        <path d="M64 0H0V64" fill="none" />
      </pattern>
    </defs>

    <rect
      width="100%"
      height="100%"
      stroke-width="0"
      :fill="`url(#grid-pattern-${id})`"
    />

    <slot />
  </svg>
</template>
