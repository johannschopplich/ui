<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import { scrollReactorGroupInjectionKey } from "./context";

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
  console.log(container.value);
  children.value = Array.from(container.value!.children);
});

// Provide peers
provide(scrollReactorGroupInjectionKey, children);
</script>

<template>
  <component :is="as" ref="container">
    <slot />
  </component>
</template>
