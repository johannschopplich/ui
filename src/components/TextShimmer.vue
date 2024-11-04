<script setup lang="ts">
import type { Component } from "vue";

withDefaults(
  defineProps<{
    as?: string | Component;
    from?: string;
    to?: string;
    duration?: string;
  }>(),
  {
    as: "div",
    from: "#000",
    to: "rgba(0, 0, 0, 0)",
    duration: "2.5s",
  },
);
</script>

<template>
  <component
    :is="as"
    class="text-shimmer"
    :style="{
      '--shimmer-from': from,
      '--shimmer-to': to,
      '--shimmer-duration': duration,
    }"
  >
    <slot />
  </component>
</template>

<style scoped>
.text-shimmer {
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(
    110deg,
    var(--shimmer-from),
    45%,
    var(--shimmer-to),
    55%,
    var(--shimmer-from)
  );
  background-size: 250% 100%;
  animation: text-shimmer var(--shimmer-duration) ease-out infinite alternate;
}

@keyframes text-shimmer {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -200% 0;
  }
}
</style>
