<script setup lang="ts">
import { provide, ref, watch } from "vue";
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

watch(container, (value) => {
  children.value = Array.from(value?.children ?? []);
});
</script>

<template>
  <component :is="as" ref="container">
    <slot />
  </component>
</template>
