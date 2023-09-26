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
    trigger?: "visible" | "middle";
  }>(),
  {
    trigger: "middle",
  },
);

const emit = defineEmits<{
  (event: "update:activeIndex", value: number): void;
}>();

const isActive = ref(false);
const slide = ref<HTMLElement | undefined>();
const context = inject(sliderCtxKey)!;

const { left, width } = useElementBounding(slide);
const { left: parentLeft } = useElementBounding(context.container);
const { width: parentWidth } = useElementSize(context.container, undefined, {
  box: "border-box",
});
const isVisible = useElementVisibility(slide, {
  scrollTarget: context.container,
});

const isIntersecting = computed(() => {
  // Account for slider margin if centered on the page
  const relativeLeft = left.value - parentLeft.value;

  if (props.trigger === "middle") {
    return (
      relativeLeft + width.value / 2 >
        parentWidth.value / 2 - width.value / 2 &&
      relativeLeft + width.value / 2 < parentWidth.value / 2 + width.value / 2
    );
  }

  return (
    isVisible.value &&
    relativeLeft >= 0 &&
    relativeLeft + width.value <= parentWidth.value
  );
});

watch(isIntersecting, (value) => {
  isActive.value = value;

  if (value) {
    const index = context.peers.value.indexOf(slide.value!);
    context.currentIndex.value = index;
    emit("update:activeIndex", index);
  }
});
</script>

<template>
  <div ref="slide" class="shrink-0 snap-start snap-always">
    <slot :is-active="isActive" />
  </div>
</template>
