<script setup lang="ts">
import type { LayerSpecification } from "mapbox-gl";
import { computed, onMounted, onUnmounted } from "vue";
import { useEventsBinding, useMap } from "../composables";

const props = defineProps<{
  id: string;
  options: LayerSpecification;
  beforeId?: string;
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

// eslint-disable-next-line vue/define-macros-order
const emit = defineEmits([
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
]);

const map = useMap();
const options = computed<LayerSpecification>(() => {
  const _options = { ...props.options, id: props.id };

  if (_options.paint == null) delete _options.paint;
  if (_options.layout == null) delete _options.layout;

  return _options;
});

useEventsBinding(map, {
  emit: emit as (event: string, ...args: any[]) => void,
  events,
  layerId: props.id,
});

onMounted(() => {
  removeLayer();
  removeSource();
  map.value?.addLayer(options.value, props.beforeId);
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
