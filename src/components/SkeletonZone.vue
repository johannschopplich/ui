<script lang="ts">
import type { PrimitiveProps } from "./Primitive";
import { Primitive } from "./Primitive";

export interface SkeletonZoneProps extends PrimitiveProps {
  loading?: boolean;
  width?: string;
  height?: string;
  loaderClass?: string;
}
</script>

<script setup lang="ts">
withDefaults(defineProps<SkeletonZoneProps>(), {
  as: "div",
  loading: true,
  width: "100%",
  height: "100%",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    class="relative"
    :style="{ width, height }"
  >
    <slot />
    <div
      v-if="loading"
      class="absolute inset-0 animate-pulse"
      :class="[loaderClass]"
    />
  </Primitive>
</template>
