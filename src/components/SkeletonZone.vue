<script lang="ts">
import type * as CSS from "csstype";
import type { PrimitiveProps } from "./Primitive";
import { ref, watch } from "vue";
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
const props = withDefaults(defineProps<SkeletonZoneProps>(), {
  as: "div",
  loading: true,
  position: "relative",
  width: "100%",
  height: "100%",
});

defineSlots<{
  default: (props: {
    isLoading: boolean;
    setLoading: (value: boolean) => void;
  }) => any;
}>();

const isLoading = ref(props.loading);

watch(
  () => props.loading,
  (value) => {
    isLoading.value = value;
  },
);

function setLoading(value: boolean) {
  isLoading.value = value;
}
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
    <slot :is-loading="isLoading" :set-loading="setLoading" />
    <div
      v-if="isLoading"
      class="pointer-events-none absolute inset-0 animate-pulse"
      :class="[loaderClass]"
    />
  </Primitive>
</template>
