<script setup lang="ts">
import type { Component } from "vue";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    as?: string | Component;
    body: string;
    mode?: "symbol" | "word";
  }>(),
  {
    as: "div",
    mode: "symbol",
  },
);

defineSlots<{
  default: (props: { tokens: string[] }) => any;
}>();

const tokens = computed(() => {
  const body = props.body.trim();
  return props.mode === "symbol"
    ? body.split("")
    : body.match(/\S+|\s+/g) || [];
});
</script>

<template>
  <component :is="as">
    <slot :tokens="tokens" />
  </component>
</template>
