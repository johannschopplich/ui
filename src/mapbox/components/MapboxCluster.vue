<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  GeoJSONSource,
  GeoJSONSourceRaw,
  Layer,
  MapLayerMouseEvent,
  SymbolLayout,
} from "mapbox-gl";
import { useMap } from "../composables";
import MapboxLayer from "./MapboxLayer.vue";
import MapboxSource from "./MapboxSource.vue";
import { getClusterIndex } from "./context";

const props = withDefaults(
  defineProps<{
    /** The source of the data for the clustered points */
    data: NonNullable<GeoJSONSourceRaw["data"]>;
    /** The max zoom to cluster points on */
    clusterMaxZoom?: number;
    /** Minimum number of points necessary to form a cluster. */
    clusterMinPoints?: number;
    /** An object defining custom properties on the generated clusters. */
    clusterProperties?: Record<string, any>;
    /** Radius of each cluster when clustering point */
    clusterRadius?: number;
    /**
     * The layout configuration for the clusters circles
     * @see https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     */
    clustersLayout?: Layer["layout"];
    /**
     * The paint configuration for the clusters circles
     * @see https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     */
    clustersPaint?: Layer["paint"];
    /**
     * The layout configuration for the clusters count
     * @see https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     */
    clusterCountLayout?: SymbolLayout;
    /**
     * The paint configuration for the clusters count
     * @see https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     */
    clusterCountPaint?: Layer["paint"];
    /**
     * The type of the unclustered points layer
     * @see https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     */
    unclusteredPointLayerType?: string;
    /**
     * The layout configuration for the unclustered points
     * @see https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     */
    unclusteredPointLayout?: Layer["layout"];
    /**
     * The paint configuration for the unclustered points
     * @see https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     */
    unclusteredPointPaint?: Layer["paint"];
  }>(),
  {
    clusterMaxZoom: 14,
    clusterRadius: 50,
    clusterMinPoints: 2,
    clusterProperties: () => ({}),
    clustersLayout: () => ({}),
    clustersPaint: () => ({
      "circle-color": "#000",
      "circle-radius": 40,
    }),
    clusterCountLayout: () => ({
      "text-field": ["get", "point_count_abbreviated"],
    }),
    clusterCountPaint: () => ({
      "text-color": "white",
    }),
    unclusteredPointLayerType: "circle",
    unclusteredPointLayout: () => ({}),
    unclusteredPointPaint: () => ({
      "circle-color": "#000",
      "circle-radius": 4,
    }),
  },
);

const emit = defineEmits<{
  (event: string, ...args: any[]): void;
}>();

const map = useMap();
const index = getClusterIndex();
const id = ref(`mb-cluster-${index}`);
const getId = (suffix: string) => `${id.value}-${suffix}`;

const sourceId = computed(() => getId("source"));
const source = computed<GeoJSONSourceRaw>(() => {
  const {
    data,
    clusterMaxZoom,
    clusterRadius,
    clusterMinPoints,
    clusterProperties,
  } = props;
  return {
    type: "geojson",
    cluster: true,
    data,
    clusterMaxZoom,
    clusterRadius,
    clusterMinPoints,
    clusterProperties,
  };
});

const clustersLayer = computed<Layer>(() => ({
  id: getId("clusters"),
  type: "circle",
  source: sourceId.value,
  filter: ["has", "point_count"],
  layout: props.clustersLayout,
  paint: props.clustersPaint,
}));

const clusterCountLayer = computed<Layer>(() => ({
  id: getId("cluster-count"),
  type: "symbol",
  source: sourceId.value,
  filter: ["has", "point_count"],
  layout: props.clusterCountLayout,
  paint: props.clusterCountPaint,
}));

const unclusteredPointLayer = computed<Layer>(() => ({
  id: getId("unclustered-point"),
  type: props.unclusteredPointLayerType!,
  source: sourceId.value,
  filter: ["!", ["has", "point_count"]],
  layout: props.unclusteredPointLayout,
  paint: props.unclusteredPointPaint,
}));

/**
 * Click handler for the clusters layer to zoom on the clicked cluster
 */
function clustersClickHandler(event: MapLayerMouseEvent) {
  const feature = map.value!.queryRenderedFeatures(event.point, {
    layers: [clustersLayer.value.id],
  })[0];
  const clusterId = feature.properties?.cluster_id as number;

  // Emit a cluster click event
  // eslint-disable-next-line vue/require-explicit-emits
  emit("mbClusterClick", clusterId, event);

  const source = map.value!.getSource(sourceId.value) as GeoJSONSource;

  source.getClusterExpansionZoom(clusterId, (error, zoom) => {
    if (error) return;
    map.value!.easeTo({
      center: (feature.geometry as GeoJSON.Point).coordinates as [
        number,
        number,
      ],
      zoom,
    });
  });
}

/**
 * Mouseenter handler for the clusters layer to set a pointer cursor
 */
function clustersMouseenterHandler() {
  map.value!.getCanvas().style.cursor = "pointer";
}

/**
 * Mouseleave handler for the clusters layer to unset the pointer cursor
 */
function clustersMouseleaveHandler() {
  map.value!.getCanvas().style.cursor = "";
}

/**
 * Handler for the click event on a single feature, emits an event with
 * the feature object and the original event object
 */
function unclusteredPointClickHandler(event: MapLayerMouseEvent) {
  // eslint-disable-next-line vue/require-explicit-emits
  emit("mbFeatureClick", event.features?.[0], event);
}

/**
 * Handler for the mouseenter event on a single feature.
 * Emits an event with the feature object and the original event as
 * parameters, and sets the cursor style to pointer
 */
function unclusteredPointMouseenterHandler(event: MapLayerMouseEvent) {
  // eslint-disable-next-line vue/require-explicit-emits
  emit("mbFeatureMouseenter", event.features?.[0], event);
  map.value!.getCanvas().style.cursor = "pointer";
}

/**
 * Handler for the mouseleave event on a single feature.
 * Emits an event with the original event object as parameter, and resets
 * the cursor style to its default value
 */
function unclusteredPointMouseleaveHandler(event: MapLayerMouseEvent) {
  // eslint-disable-next-line vue/require-explicit-emits
  emit("mbFeatureMouseleave", event);
  map.value!.getCanvas().style.cursor = "";
}
</script>

<template>
  <div :id="id">
    <MapboxSource :id="sourceId" :options="source" />
    <MapboxLayer
      :id="clustersLayer.id"
      :options="clustersLayer"
      @mb-click="clustersClickHandler"
      @mb-mouseenter="clustersMouseenterHandler"
      @mb-mouseleave="clustersMouseleaveHandler"
    />
    <MapboxLayer :id="clusterCountLayer.id" :options="clusterCountLayer" />
    <MapboxLayer
      :id="unclusteredPointLayer.id"
      :options="unclusteredPointLayer"
      @mb-click="unclusteredPointClickHandler"
      @mb-mouseenter="unclusteredPointMouseenterHandler"
      @mb-mouseleave="unclusteredPointMouseleaveHandler"
    />
  </div>
</template>
