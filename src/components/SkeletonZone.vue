<script setup lang="ts">
import type { Component } from "vue";

withDefaults(
  defineProps<{
    as?: string | Component;
    loading?: boolean;
    width?: string;
    height?: string;
    loaderClass?: string;
  }>(),
  {
    as: "div",
    loading: true,
    width: "100%",
    height: "100%",
  },
);
</script>

<template>
  <component :is="as" class="relative" :style="{ width, height }">
    <slot />
    <div
      v-if="loading"
      class="absolute inset-0 animate-pulse"
      :class="[loaderClass]"
    />
  </component>
</template>
