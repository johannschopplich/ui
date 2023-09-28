<script setup lang="ts">
import { watch } from "vue";
import mediumZoom from "medium-zoom";
import type { ComponentPublicInstance } from "vue";
import type { Zoom, ZoomOptions } from "medium-zoom";

const props = withDefaults(
  defineProps<{
    /** @default "img" */
    as?: string;
    options?: ZoomOptions;
  }>(),
  {
    as: "img",
    options: undefined,
  },
);

let zoom: Zoom | undefined = undefined;

watch(
  () => props.options,
  (options) => {
    const zoom = getZoom();
    zoom.update(options || {});
  },
);

function attachZoom(ref: Element | ComponentPublicInstance | null) {
  // Check if ref is component instance
  const image = ((ref as ComponentPublicInstance)?.$el ??
    ref) as HTMLImageElement | null;
  const zoom = getZoom();

  if (image) {
    zoom.attach(image);
  } else {
    zoom.detach();
  }
}

function getZoom() {
  return (zoom ??= mediumZoom(props.options));
}
</script>

<template>
  <component :is="as" :ref="attachZoom" />
</template>
