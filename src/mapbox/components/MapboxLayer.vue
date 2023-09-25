<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import type { AnyLayer, Layer } from "mapbox-gl";
import { useEventsBinding, useMap } from "../composables";

const props = defineProps<{
  id: string;
  options: Layer;
  beforeId?: string;
}>();

const emit = defineEmits<{
  (event: string, ...args: any[]): void;
}>();

/**
 * All Map events which will be mapped/bounded to the component
 * @see https://docs.mapbox.com/mapbox-gl-js/api/map/#instance-members-working-with-events
 */
const events = [
  "mousedown",
  "mouseup",
  "click",
  "dblclick",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "mouseover",
  "mouseout",
  "contextmenu",
  "touchstart",
  "touchend",
  "touchcancel",
];

const map = useMap();
const options = computed(() => {
  const _options: Layer = { ...props.options, id: props.id };

  if (_options.paint == null) delete _options.paint;
  if (_options.layout == null) delete _options.layout;

  return _options;
});

useEventsBinding(emit, map, events, props.id);

onMounted(() => {
  removeLayer();
  removeSource();
  map.value?.addLayer(options.value as AnyLayer, props.beforeId);
});

onUnmounted(() => {
  removeLayer();
  removeSource();
});

function removeLayer() {
  if (!props.id) return;
  if (!map.value?.getLayer(props.id)) return;

  map.value?.removeLayer(props.id);
}

function removeSource() {
  if (!props.id) return;
  if (!map.value?.getLayer(props.id)) return;

  map.value?.removeSource(props.id);
}
</script>

<template>
  <div :id="id" />
</template>
