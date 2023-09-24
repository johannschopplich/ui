<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    as?: string;
    body: string;
    mode?: "symbol" | "word";
  }>(),
  {
    as: "div",
    mode: "symbol",
  }
);

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
