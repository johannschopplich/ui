<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useSlots } from "vue";
import mapboxgl from "mapbox-gl";
import type { LngLatLike, Marker, MarkerOptions, PointLike } from "mapbox-gl";
import { useEventsBinding, useMap, usePropsBinding } from "../composables";

const props = withDefaults(
  defineProps<{
    anchor?: string;
    clickTolerance?: number;
    color?: string;
    draggable?: boolean;
    element?: HTMLElement;
    lngLat: LngLatLike;
    offset?: PointLike;
    pitchAlignment?: string;
    rotation?: number;
    rotationAlignment?: string;
    scale?: number;
  }>(),
  {
    anchor: "center",
    clickTolerance: 0,
    color: undefined,
    draggable: false,
    element: undefined,
    offset: undefined,
    pitchAlignment: "auto",
    rotation: 0,
    rotationAlignment: "auto",
    scale: 1,
  },
);

const emit = defineEmits<{
  (event: string, ...args: any[]): void;
}>();

/** @see https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker-events */
const events = ["dragstart", "drag", "dragend"];

const slots = useSlots();

const map = useMap();
const marker = ref<Marker | undefined>();
const content = ref<HTMLElement | undefined>();

const options = computed(() => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { lngLat, ...rest } = props;

  // Use current component's element if container is not set
  if (slots.default) {
    rest.element = content.value!;
  }

  return rest as MarkerOptions;
});

usePropsBinding(props, marker);
useEventsBinding(emit, marker, events);

onMounted(() => {
  marker.value = new mapboxgl.Marker(options.value)
    .setLngLat(props.lngLat as LngLatLike)
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
