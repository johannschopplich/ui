<script setup lang="ts">
import type { Anchor, LngLatLike, Marker, PointLike } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import { computed, onMounted, onUnmounted, ref, useSlots } from "vue";
import { useEventsBinding, useMap, usePropsBinding } from "../composables";

interface MarkerOptions {
  element?: HTMLElement;
  offset?: PointLike;
  anchor?: Anchor;
  color?: string;
  scale?: number;
  draggable?: boolean;
  clickTolerance?: number;
  rotation?: number;
  rotationAlignment?: string;
  pitchAlignment?: string;
  occludedOpacity?: number;
  className?: string;
}

const props = withDefaults(
  defineProps<MarkerOptions & { lngLat: LngLatLike }>(),
  {
    element: undefined,
    anchor: "center",
    offset: undefined,
    color: undefined,
    scale: 1,
    draggable: false,
    clickTolerance: 0,
    rotation: 0,
    pitchAlignment: "auto",
    rotationAlignment: "auto",
    occludedOpacity: 0.2,
    className: undefined,
  },
);

const emit = defineEmits(["mbDragstart", "mbDrag", "mbDragend"]);

/** @see https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker-events */
const events = ["dragstart", "drag", "dragend"];

const slots = useSlots();

const map = useMap();
const marker = ref<Marker | undefined>();
const content = ref<HTMLElement | undefined>();

const options = computed<MarkerOptions>(() => {
  const { lngLat, ...rest } = props;

  // Use current component's element if container is not set
  if (slots.default) {
    rest.element = content.value!;
  }

  return rest;
});

usePropsBinding(props, marker);
useEventsBinding(marker, {
  emit: emit as (event: string, ...args: any[]) => void,
  events,
});

onMounted(() => {
  marker.value = new mapboxgl.Marker(options.value)
    .setLngLat(props.lngLat)
    .addTo(map.value!);
});

onUnmounted(() => {
  marker.value!.remove();
});
</script>

<template>
  <div>
    <div ref="content">
      <slot />
    </div>
  </div>
</template>
