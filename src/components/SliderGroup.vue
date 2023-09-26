<script setup lang="ts">
import { onMounted, provide, ref, watch } from "vue";
import { useLocalStorage, useScroll, watchDebounced } from "@vueuse/core";
import { sliderCtxKey } from "./context";

const props = defineProps<{
  persistPosition?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:activeIndex", value: number): void;
}>();

const container = ref<HTMLElement | undefined>();
const children = ref<Element[]>([]);
const currentIndex = ref(0);

const { x } = useScroll(container);
const scrollStorage = useLocalStorage<Record<"x" | "y", number>>(
  "app.components.slider.scroll",
  { x: 0, y: 0 },
);

// Provide peers
provide(sliderCtxKey, {
  container,
  peers: children,
  currentIndex,
});

watch(container, (value) => {
  children.value = Array.from(value?.children ?? []);
});

watch(currentIndex, (value) => {
  emit("update:activeIndex", value);
});

if (props.persistPosition) {
  watchDebounced(
    x,
    (value) => {
      scrollStorage.value.x = value;
    },
    { debounce: 500 },
  );

  onMounted(() => {
    x.value = scrollStorage.value.x;
  });
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
