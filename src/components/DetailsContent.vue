<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import { useElementSize } from "@vueuse/core";
import { detailsItemCtxKey } from "./context";

withDefaults(
  defineProps<{
    as?: string;
  }>(),
  {
    as: "div",
  },
);

const container = ref<HTMLElement | undefined>();
const content = ref<HTMLElement | undefined>();

onMounted(() => {
  if (container.value) {
    content.value = container.value.children[0] as HTMLElement;
  }
});

const { height: targetHeight } = useElementSize(content, undefined, {
  box: "border-box",
});

const isActive = inject(detailsItemCtxKey)!;
const height = computed(() => (isActive.value ? targetHeight.value : 0));
</script>

<template>
  <component :is="as" ref="container" :style="{ height: `${height}px` }">
    <slot />
  </component>
</template>
