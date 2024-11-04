<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string;
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
    loaderClass: "bg-black/10 dark:bg-white/10",
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
