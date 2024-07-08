<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import type { GeoJSONSource, GeoJSONSourceSpecification } from "mapbox-gl";
import { useMap } from "../composables";

const props = defineProps<{
  id: string;
  options: GeoJSONSourceSpecification;
}>();

const map = useMap();

watch(
  () => props.options?.data,
  (newValue) => {
    if (newValue) {
      const source = map.value?.getSource(props.id) as GeoJSONSource;
      source?.setData(newValue);
    }
  }
);

onMounted(() => {
  map.value?.addSource(props.id, props.options);
});

onUnmounted(() => {
  // Remove all layers tied to the source
  const layers = map.value?.getStyle()?.layers ?? [];

  for (const layer of Object.values(layers)) {
    if (layer.source === props.id) {
      map.value?.removeLayer(layer.id);
    }
  }

  // And remove the source
  map.value?.removeSource(props.id);
});
</script>

<template>
  <div :id="id" />
</template>
