<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import { scrollTriggerInjectionKey } from "./context";

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

onMounted(() => {
  children.value = Array.from(container.value!.children);
});

// Provide peers
provide(scrollTriggerInjectionKey, children);
</script>

<template>
  <component :is="as" ref="container">
    <slot />
  </component>
</template>
