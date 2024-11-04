<script setup lang="ts">
import { computed, inject } from "vue";
import { textRevealCtxKey } from "./context";

const props = defineProps<{
  index: number;
}>();

defineSlots<{
  default: (props: { isActive: boolean }) => any;
}>();

const context = inject(textRevealCtxKey)!;

const isActive = computed(
  () => props.index / context.tokens.value.length < context.progress.value,
);
</script>

<template>
  <slot :is-active="isActive" />
</template>
