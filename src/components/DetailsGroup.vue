<script setup lang="ts">
import { provide, ref, watch } from "vue";
import { detailsCtxKey } from "./context";

const container = ref<HTMLElement | undefined>();
const activeItem = ref(-1);
const children = ref<Element[]>([]);

provide(detailsCtxKey, {
  peers: children,
  activeItem,
  setActive,
});

watch(container, (value) => {
  children.value = Array.from(value?.children ?? []);
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
