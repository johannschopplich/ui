<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import {
  useElementBounding,
  useElementSize,
  useElementVisibility,
} from "@vueuse/core";
import { sliderCtxKey } from "./context";

const props = withDefaults(
  defineProps<{
    trigger?: "visible" | "start" | "middle";
  }>(),
  {
    trigger: "middle",
  },
);

const emit = defineEmits<{
  (event: "update:activeIndex", value: number): void;
}>();

const isActive = ref(false);
const container = ref<HTMLElement | undefined>();
const context = inject(sliderCtxKey)!;

const { x, width } = useElementBounding(container);
const { width: parentWidth } = useElementSize(context.container, undefined, {
  box: "border-box",
});
const isVisible = useElementVisibility(container, {
  scrollTarget: context.container,
});

const isIntersecting = computed(() => {
  if (props.trigger === "start") {
    return isVisible.value && x.value <= parentWidth.value;
  } else if (props.trigger === "middle") {
    return (
      x.value + width.value / 2 > parentWidth.value / 2 - width.value / 2 &&
      x.value + width.value / 2 < parentWidth.value / 2 + width.value / 2
    );
  }

  return (
    isVisible.value &&
    x.value >= 0 &&
    x.value + width.value <= parentWidth.value
  );
});

watch(isIntersecting, (value) => {
  isActive.value = value;

  if (value) {
    const index = context.peers.value.indexOf(container.value!);
    context.currentIndex.value = index;
    emit("update:activeIndex", index);
  }
});
</script>

<template>
  <div ref="container" class="shrink-0 snap-start snap-always">
    <slot :is-active="isActive" />
  </div>
</template>
