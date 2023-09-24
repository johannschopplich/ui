<script setup lang="ts">
import { computed, inject } from "vue";
import { textRevealInjectionKey } from "./context";

const props = defineProps<{
  index: number;
}>();

const context = inject(textRevealInjectionKey)!;

const isActive = computed(
  () => props.index / context.tokens.value.length < context.progress.value,
);
</script>

<template>
  <slot :is-active="isActive" />
</template>
