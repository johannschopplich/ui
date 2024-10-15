<script setup lang="ts">
import type { Map, MapOptions, StyleSpecification } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import {
  computed,
  onMounted,
  onUnmounted,
  provide,
  ref,
  shallowRef,
} from "vue";
import { useEventsBinding, usePropsBinding } from "../composables";
import { mapCtxKey } from "./context";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<
    Omit<MapOptions, "style" | "container"> & {
      mapStyle: string | StyleSpecification;
    }
  >(),
  {
    mapStyle: undefined,
    config: undefined,
    hash: false,
    interactive: true,
    bearingSnap: 7,
    clickTolerance: 3,
    pitchWithRotate: true,
    attributionControl: true,
    customAttribution: undefined,
    logoPosition: "bottom-left",
    failIfMajorPerformanceCaveat: false,
    preserveDrawingBuffer: false,
    antialias: false,
    refreshExpiredTiles: true,
    bounds: undefined,
    maxBounds: undefined,
    fitBoundsOptions: undefined,
    scrollZoom: true,
    minZoom: 0,
    maxZoom: 22,
    minPitch: 0,
    maxPitch: 85,
    boxZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    touchZoomRotate: true,
    touchPitch: true,
    cooperativeGestures: undefined,
    trackResize: true,
    center: () => [0, 0],
    zoom: 0,
    bearing: 0,
    pitch: 0,
    projection: undefined,
    renderWorldCopies: true,
    minTileCacheSize: undefined,
    maxTileCacheSize: undefined,
    transformRequest: undefined,
    accessToken: undefined,
    testMode: false,
    locale: undefined,
    language: undefined,
    worldview: undefined,
    crossSourceCollisions: true,
    collectResourceTiming: false,
    respectPrefersReducedMotion: true,
    contextCreateOptions: undefined,
    devtools: undefined,
    repaint: undefined,
    fadeDuration: 300,
    localFontFamily: undefined,
    localIdeographFontFamily: "sans-serif",
    performanceMetricsCollection: false,
    tessellationStep: 3,
  },
);

const emit = defineEmits([
  "mbBoxzoomcancel",
  "mbBoxzoomend",
  "mbBoxzoomstart",
  "mbClick",
  "mbContextmenu",
  "mbData",
  "mbDataloading",
  "mbDblclick",
  "mbDrag",
  "mbDragend",
  "mbDragstart",
  "mb-error",
  "mbIdle",
  "mbLoad",
  "mbMousedown",
  "mbMouseenter",
  "mbMouseleave",
  "mbMousemove",
  "mbMouseout",
  "mbMouseover",
  "mbMouseup",
  "mbMove",
  "mbMoveend",
  "mbMovestart",
  "mbPitch",
  "mbPitchend",
  "mbPitchstart",
  "mbRemove",
  "mbRender",
  "mbResize",
  "mbRotate",
  "mbRotateend",
  "mbRotatestart",
  "mbSourcedata",
  "mbSourcedataloading",
  "mbStyledata",
  "mbStyledataloading",
  "mbStyleimagemissing",
  "mbTouchcancel",
  "mbTouchend",
  "mbTouchmove",
  "mbTouchstart",
  "mbWebglcontextlost",
  "mbWebglcontextrestored",
  "mbWheel",
  "mbZoom",
  "mbZoomend",
  "mbZoomstart",
  // Custom events
  "mbCreated",
]);

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
provide(mapCtxKey, map);

const root = ref<HTMLElement | undefined>();
const isLoaded = ref(false);
const options = computed<MapOptions>(() => {
  const { accessToken, mapStyle: style, ...rest } = props;
  return { ...rest, style, container: root.value! };
});

useEventsBinding(map, {
  emit: emit as (event: string, ...args: any[]) => void,
  events,
});
usePropsBinding(props, map);

onMounted(() => {
  if (props.accessToken) mapboxgl.accessToken = props.accessToken;

  map.value = new mapboxgl.Map(options.value);
  map.value.on("load", () => {
    isLoaded.value = true;
  });

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
