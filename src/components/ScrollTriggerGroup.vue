<script setup lang="ts">
import type { Component } from "vue";
import { provide, ref, watch } from "vue";
import { scrollTriggerCtxKey } from "./context";

withDefaults(
  defineProps<{
    as?: string | Component;
  }>(),
  {
    as: "div",
  },
);

const container = ref<HTMLElement | undefined>();
const children = ref<Element[]>([]);

// Provide peers
provide(scrollTriggerCtxKey, children);

watch(container, (value) => {
  children.value = Array.from(value?.children ?? []);
});
</script>

<template>
  <component :is="as" ref="container">
    <slot />
  </component>
</template>
