<script setup lang="ts">
import { provide, ref, watchEffect } from "vue";
import { detailsCtxKey } from "./context";

const container = ref<HTMLElement | undefined>();
const activeItem = ref(-1);
const children = ref<Element[]>([]);

watchEffect(() => {
  children.value = Array.from(container.value?.children ?? []);
});

provide(detailsCtxKey, {
  peers: children,
  activeItem,
  setActive,
});

function setActive(index: number) {
  if (activeItem.value === index) {
    activeItem.value = -1;
  } else {
    activeItem.value = index;
  }
}
</script>

<template>
  <div ref="container">
    <slot />
  </div>
</template>
