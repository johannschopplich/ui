<script setup lang="ts">
import { provide, ref, watchEffect } from "vue";
import { scrollTriggerCtxKey } from "./context";

withDefaults(
  defineProps<{
    as?: string;
  }>(),
  {
    as: "div",
  },
);

const container = ref<HTMLElement | undefined>();
const children = ref<Element[]>([]);

// Provide peers
provide(scrollTriggerCtxKey, children);

watchEffect(() => {
  children.value = Array.from(container.value?.children ?? []);
});
</script>

<template>
  <component :is="as" ref="container">
    <slot />
  </component>
</template>
