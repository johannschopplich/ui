<script setup lang="ts">
import { onMounted, provide, ref, watch } from "vue";
import { useLocalStorage, useScroll, watchDebounced } from "@vueuse/core";
import { sliderCtxKey } from "./context";

const props = defineProps<{
  persistPosition?: boolean;
}>();

const container = ref<HTMLElement | undefined>();
const children = ref<Element[]>([]);

const { x } = useScroll(container);
const scrollStorage = useLocalStorage<Record<"x" | "y", number>>(
  "app.components.slider.scroll",
  { x: 0, y: 0 },
);

// Provide peers
provide(sliderCtxKey, { container, peers: children });

watch(container, (value) => {
  children.value = Array.from(value?.children ?? []);
});

if (props.persistPosition) {
  onMounted(() => {
    x.value = scrollStorage.value.x;
  });

  watchDebounced(
    x,
    (value) => {
      scrollStorage.value.x = value;
    },
    { debounce: 500 },
  );
}
</script>

<template>
  <div
    ref="container"
    class="slider-track relative w-full flex snap-x snap-mandatory overflow-x-auto"
  >
    <slot />
  </div>
</template>

<style scoped>
.slider-track::-webkit-scrollbar {
  display: none;
}

.slider-track {
  scrollbar-width: none;
}
</style>
