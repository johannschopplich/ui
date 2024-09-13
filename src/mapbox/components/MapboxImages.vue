<script setup lang="ts">
import type { MapboxImageProps } from "./context";
import { ref } from "vue";
import MapboxImage from "./MapboxImage.vue";

const props = defineProps<{
  /** @see https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addimage */
  sources: MapboxImageProps[];
}>();

const emit = defineEmits<{
  (
    event: "mbAdd",
    value: MapboxImageProps,
    index: number,
    length: number,
  ): void;
  (event: "mbReady", value: MapboxImageProps[]): void;
}>();

const isReady = ref(false);
const addedImages = new Map<string, MapboxImageProps>();

function addHandler(image: MapboxImageProps, index: number) {
  if (!addedImages.has(image.id)) {
    addedImages.set(image.id, image);
    emit("mbAdd", image, index, props.sources.length);
  }

  if (addedImages.size === props.sources.length) {
    isReady.value = true;
    emit("mbReady", [...addedImages.values()]);
  }
}
</script>

<template>
  <div>
    <MapboxImage
      v-for="(source, index) in sources"
      :key="`mapbox-images-${source.id}`"
      v-bind="source"
      @mb-add="addHandler($event, index + 1)"
    />
    <slot v-if="isReady" />
  </div>
</template>
