<script lang="ts">
import type * as CSS from "csstype";
import type { PrimitiveProps } from "./Primitive";
import { Primitive } from "./Primitive";

export interface SkeletonZoneProps extends PrimitiveProps {
  loading?: boolean;
  position?: CSS.Property.Position;
  width?: CSS.Property.Width;
  height?: CSS.Property.Height;
  loaderClass?: string;
}
</script>

<script setup lang="ts">
withDefaults(defineProps<SkeletonZoneProps>(), {
  as: "div",
  loading: true,
  position: "relative",
  width: "100%",
  height: "100%",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :style="{
      position,
      width,
      height,
    }"
  >
    <slot />
    <div
      v-if="loading"
      class="absolute inset-0 animate-pulse"
      :class="[loaderClass]"
    />
  </Primitive>
</template>
