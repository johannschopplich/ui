<script setup lang="ts">
import { provide, ref, watchEffect } from "vue";
import { scrollReactorCtxKey } from "./context";

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
provide(scrollReactorCtxKey, children);

watchEffect(() => {
  children.value = Array.from(container.value?.children ?? []);
});
</script>

<template>
  <component :is="as" ref="container">
    <slot />
  </component>
</template>
