<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  provide,
  ref,
  shallowRef,
} from "vue";
import mapboxgl from "mapbox-gl";
import type {
  FitBoundsOptions,
  LngLatBoundsLike,
  LngLatLike,
  Map,
  MapboxOptions,
  Style,
  TransformRequestFunction,
} from "mapbox-gl";
import { useEventsBinding, usePropsBinding } from "../composables";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    accessToken?: string;
    antialias?: boolean;
    attributionControl?: boolean;
    bearing?: number;
    bearingSnap?: number;
    bounds?: LngLatBoundsLike;
    boxZoom?: boolean;
    center?: LngLatLike;
    clickTolerance?: number;
    collectResourceTiming?: boolean;
    cooperativeGestures?: boolean;
    crossSourceCollisions?: boolean;
    customAttribution?: string | string[];
    doubleClickZoom?: boolean;
    dragPan?: boolean | Record<string, any>;
    dragRotate?: boolean;
    fadeDuration?: number;
    failIfMajorPerformanceCaveat?: boolean;
    fitBoundsOptions?: FitBoundsOptions;
    hash?: boolean;
    interactive?: boolean;
    keyboard?: boolean;
    language?: string[] | (string & Record<never, never>) | "auto";
    locale?: Record<string, any>;
    localFontFamily?: string | boolean;
    localIdeographFontFamily?: string;
    logoPosition?: string;
    maxBounds?: LngLatBoundsLike;
    maxPitch?: number;
    maxTileCacheSize?: number;
    maxZoom?: number;
    minPitch?: number;
    minZoom?: number;
    pitch?: number;
    pitchWithRotate?: boolean;
    preserveDrawingBuffer?: boolean;
    refreshExpiredTiles?: boolean;
    renderWorldCopies?: boolean;
    scrollZoom?: boolean | { around?: "center" };
    mapStyle?: string | Style;
    touchPitch?: boolean | { around?: "center" };
    touchZoomRotate?: boolean | { around?: "center" };
    trackResize?: boolean;
    transformRequest?: TransformRequestFunction;
    useWebGL2?: boolean;
    zoom?: number;
  }>(),
  {
    accessToken: undefined,
    antialias: false,
    attributionControl: true,
    bearing: 0,
    bearingSnap: 7,
    bounds: undefined,
    boxZoom: true,
    // @ts-expect-error: Type mismatch
    center: [0, 0],
    clickTolerance: 3,
    collectResourceTiming: false,
    cooperativeGestures: false,
    crossSourceCollisions: true,
    customAttribution: undefined,
    doubleClickZoom: true,
    dragPan: true,
    dragRotate: true,
    fadeDuration: 300,
    failIfMajorPerformanceCaveat: false,
    fitBoundsOptions: undefined,
    hash: false,
    interactive: true,
    keyboard: true,
    language: undefined,
    locale: undefined,
    localFontFamily: false,
    localIdeographFontFamily: "sans-serif",
    logoPosition: "bottom-left",
    maxBounds: undefined,
    maxPitch: 85,
    maxTileCacheSize: undefined,
    maxZoom: 22,
    minPitch: 0,
    minZoom: 0,
    pitch: 0,
    pitchWithRotate: true,
    preserveDrawingBuffer: false,
    refreshExpiredTiles: true,
    renderWorldCopies: true,
    scrollZoom: true,
    mapStyle: undefined,
    touchPitch: true,
    touchZoomRotate: true,
    trackResize: true,
    transformRequest: undefined,
    useWebGL2: false,
    zoom: 0,
  },
);

const emit = defineEmits<{
  (event: string, ...args: any[]): void;
}>();

/** @see https://docs.mapbox.com/mapbox-gl-js/api/map/#map-events */
const events = [
  "boxzoomcancel",
  "boxzoomend",
  "boxzoomstart",
  "click",
  "contextmenu",
  "data",
  "dataloading",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "error",
  "idle",
  "load",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "move",
  "moveend",
  "movestart",
  "pitch",
  "pitchend",
  "pitchstart",
  "remove",
  "render",
  "resize",
  "rotate",
  "rotateend",
  "rotatestart",
  "sourcedata",
  "sourcedataloading",
  "styledata",
  "styledataloading",
  "styleimagemissing",
  "touchcancel",
  "touchend",
  "touchmove",
  "touchstart",
  "webglcontextlost",
  "webglcontextrestored",
  "wheel",
  "zoom",
  "zoomend",
  "zoomstart",
];

const map = shallowRef<Map | undefined>();
provide("mapbox-map", map);

const root = ref<HTMLElement | undefined>();
const isLoaded = ref(false);
const options = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { accessToken, mapStyle: style, ...rest } = props;
  return { style, container: root.value, ...rest } as MapboxOptions;
});

useEventsBinding(emit, map, events);
usePropsBinding(props, map);

onMounted(() => {
  mapboxgl.accessToken = props.accessToken;

  map.value = new mapboxgl.Map(options.value);
  map.value.on("load", () => {
    isLoaded.value = true;
  });

  // eslint-disable-next-line vue/require-explicit-emits
  emit("mbCreated", map.value);

  // Mapbox has some resize issues
  // Create an observer on this object
  // Call resize on the map when we change size
  const resizeObserver = new ResizeObserver(() => {
    map.value!.resize();
  });
  resizeObserver.observe(root.value!);

  onUnmounted(() => {
    resizeObserver.disconnect();
    map.value!.remove();
  });
});

defineExpose({ map });
</script>

<template>
  <div ref="root" v-bind="$attrs" />
  <div v-if="isLoaded">
    <slot />
  </div>
  <div v-else>
    <slot name="loader" />
  </div>
</template>
