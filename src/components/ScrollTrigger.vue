<script setup lang="ts">
import { useElementBounding, useWindowSize } from "@vueuse/core";
import { computed, inject, ref, watchEffect } from "vue";
import { scrollObserverCtxKey, scrollTriggerCtxKey } from "./context";

withDefaults(
  defineProps<{
    as?: string;
  }>(),
  {
    as: "div",
  },
);

const container = ref<HTMLElement | undefined>();
const context = inject(scrollObserverCtxKey)!;

// Current element index
const peers = inject(scrollTriggerCtxKey)!;

const index = computed(() =>
  container.value ? peers.value.indexOf(container.value) : undefined,
);

const isFirst = computed(() => index.value === 0);
const isLast = computed(() => index.value === (peers?.value?.length ?? 0) - 1);

// Active element
const isActive = computed(() => context.active?.value === index.value);

const isPrevious = computed(() => context.previous?.value === index.value);

// Indicators
const show = computed(
  () =>
    isActive.value || (context.active?.value === undefined && isPrevious.value),
);
const faded = computed(() => context.active?.value === undefined);

// Component logic
const { y, height } = useElementBounding(container);
const { height: windowHeight } = useWindowSize();

const isVisible = computed(
  () =>
    y.value > windowHeight.value / 2 - height.value &&
    y.value <= windowHeight.value / 2,
);

watchEffect(() => {
  if (isVisible.value) {
    context.setActive(index.value);
  } else if (isFirst.value && y.value > windowHeight.value / 2 - height.value) {
    context.setActive(undefined);
  } else if (isLast.value && y.value <= windowHeight.value / 2) {
    context.setActive(undefined);
  }
});
</script>

<template>
  <component :is="as" ref="container">
    <slot :is-active="isActive" :show="show" :faded="faded" />
  </component>
</template>
