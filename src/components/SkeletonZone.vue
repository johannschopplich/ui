<script lang="ts">
import type * as CSS from "csstype";
import type { PrimitiveProps } from "./Primitive";
import { ref, watch } from "vue";
import { Primitive } from "./Primitive";

export interface SkeletonZoneProps extends PrimitiveProps {
  /** @default true */
  loading?: boolean;
  /** @default "relative" */
  position?: CSS.Property.Position;
  /** @default "100%" */
  width?: CSS.Property.Width;
  /** @default "100%" */
  height?: CSS.Property.Height;
  loaderClass?: string;
  animate?: boolean;
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
    enableLoading: () => void;
    disableLoading: () => void;
  }) => any;
}>();

const isLoading = ref(props.loading);

watch(
  () => props.loading,
  (value) => {
    isLoading.value = value;
  },
);

function enableLoading() {
  isLoading.value = true;
}

function disableLoading() {
  isLoading.value = false;
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
    <slot
      :is-loading="isLoading"
      :enable-loading="enableLoading"
      :disable-loading="disableLoading"
    />
    <div
      v-if="isLoading"
      class="pointer-events-none absolute inset-0"
      :class="[animate && 'animate-pulse', loaderClass]"
    />
  </Primitive>
</template>
