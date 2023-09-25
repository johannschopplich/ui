import { inject } from "vue";
import type { ShallowRef } from "vue";
import type { Map } from "mapbox-gl";

/**
 * Inject the provided map instance
 */
export function useMap() {
  return inject<ShallowRef<Map | undefined>>("mapbox-map")!;
}
