<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useMap } from "../composables";
import type { MapboxImage, MapboxImageProps } from "./context";

const props = defineProps<{
  id: string;
  /** @see https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addimage */
  src: string | MapboxImage;
  /** @see https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addimage */
  options?: { pixelRatio?: number; sdf?: boolean };
}>();

const emit = defineEmits<{
  (event: "mbAdd", value: MapboxImageProps): void;
}>();

const map = useMap();
const isReady = ref(false);

// Update image when the source changes
watch(
  () => props.src,
  async (newValue) => {
    const image =
      typeof newValue !== "string" ? newValue : await loadImage(newValue);
    if (!image) return;
    map.value?.updateImage(props.id, image);
  },
  { deep: true },
);

onMounted(async () => {
  const { id, src, options } = props;
  const image = typeof src !== "string" ? src : await loadImage(src);
  if (!image) return;

  map.value?.addImage(id, image, options);
  emit("mbAdd", { id, src: image, options });

  isReady.value = true;
});

onUnmounted(() => {
  if (map.value?.hasImage(props.id)) {
    map.value.removeImage(props.id);
  }
});

/**
 * Load the given image with the Mapbox `loadImage` method
 */
function loadImage(src: string) {
  return new Promise<HTMLImageElement | ImageBitmap | undefined>(
    (resolve, reject) => {
      map.value?.loadImage(src, (error, data) => {
        if (error) {
          console.error(error);
          reject();
          return;
        }

        resolve(data);
      });
    },
  );
}
</script>

<template>
  <div :id="id">
    <slot v-if="isReady" />
  </div>
</template>
