<script setup lang="ts">
import { computed, inject, provide, ref } from "vue";
import { detailsCtxKey, detailsItemCtxKey } from "./context";

withDefaults(
  defineProps<{
    as?: string;
  }>(),
  {
    as: "div",
  },
);

const container = ref<HTMLElement | undefined>();
const context = inject(detailsCtxKey)!;

const index = computed(() =>
  container.value ? context.peers.value.indexOf(container.value) : -1,
);

const isActive = computed(() => index.value === context.activeItem.value);

provide(detailsItemCtxKey, isActive);

function toggle() {
  context.setActive(index.value);
}
</script>

<template>
  <component :is="as" ref="container">
    <slot :toggle="toggle" :is-active="isActive" />
  </component>
</template>
