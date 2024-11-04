<script setup lang="ts">
import type { Component } from "vue";
import {
  useElementBounding,
  useElementVisibility,
  useWindowSize,
} from "@vueuse/core";
import { computed, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    as?: string | Component;
    trigger?: "visible" | "top" | "middle";
    once?: boolean;
    offset?: number;
  }>(),
  {
    as: "div",
    trigger: "visible",
    once: false,
    offset: 0,
  },
);

const container = ref<HTMLElement | undefined>();
const isActive = ref(false);

const { y, height } = useElementBounding(container);
const { height: windowHeight } = useWindowSize();
const isVisible = useElementVisibility(container);

const progress = computed(() => (-y.value / height.value) * 2);

const scrollRate = computed(
  () =>
    (y.value + height.value / 2 - windowHeight.value / 2) /
    (windowHeight.value / 2),
);

const isIntersecting = computed(() => {
  if (props.trigger === "top") {
    return isVisible.value && y.value <= 0;
  } else if (props.trigger === "middle") {
    return (
      y.value > windowHeight.value / 2 - height.value &&
      y.value <= windowHeight.value / 2
    );
  }

  return isVisible.value && y.value <= windowHeight.value - props.offset;
});

watch(isIntersecting, (value) => {
  if (props.once && value) {
    isActive.value = true;
  } else if (!props.once) {
    isActive.value = value;
  }
});
</script>

<template>
  <component :is="as" ref="container">
    <slot
      :is-active="isActive"
      :scroll="y"
      :scroll-rate="scrollRate"
      :progress="progress"
    />
  </component>
</template>
