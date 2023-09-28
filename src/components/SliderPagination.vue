<script setup lang="ts">
import { computed, inject } from "vue";
import { sliderCtxKey } from "./context";

const props = defineProps<{
  pagination?: number;
}>();

const context = inject(sliderCtxKey)!;
const currentIndex = computed(() => context.currentIndex.value);
const items = computed(() => props.pagination || context.peers.value.length);
</script>

<template>
  <div
    class="w-full flex flex-row items-center justify-center gap-2 pt-[var(--pagination-gap,1.5rem)]"
  >
    <div
      v-for="(_, index) in items"
      :key="index"
      class="h-2 w-2 rounded-full bg-current transition-opacity duration-250"
      :class="[
        currentIndex === index
          ? 'opacity-[var(--pagination-active-opacity,1)]'
          : 'opacity-[var(--pagination-inactive-opacity,0.25)]',
      ]"
    />
  </div>
</template>
