<script lang="ts">
import { onMounted, provide, ref } from "vue";
import type { InjectionKey, Ref } from "vue";

export const peersInjectionKey = Symbol() as InjectionKey<Ref<Element[]>>;
</script>

<script setup lang="ts">
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

provide(peersInjectionKey, children);
</script>

<template>
  <component :is="as" ref="container">
    <slot />
  </component>
</template>
