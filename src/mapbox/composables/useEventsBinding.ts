import { computed, useAttrs, watch } from "vue";
import type { Ref } from "vue";
import type { Evented, MapLayerEventType } from "mapbox-gl";

const cache = new Map<string, keyof MapLayerEventType>();
const EVENT_PREFIX = /onMb([A-Z])(.+)/;

/**
 * Map a mapbox element's events to a Vue component
 */
export function useEventsBinding<T extends Evented>(
  /** The emit function for the current component */
  emitFn: (event: string, ...args: any[]) => void,
  /** The Mapbox element bound to the component */
  mapboxElement: Ref<T | undefined>,
  /** The events to map */
  events: string[] = [],
  /** The layer on which the events are delegated */
  layerId?: string,
) {
  const attrs = useAttrs();
  const vueEventNames = computed(() =>
    Object.entries(attrs)
      .filter(
        ([name, value]) => name.startsWith("on") && typeof value === "function",
      )
      .map(([name]) => name),
  );

  const unbindFunctions = new Map<string, () => void>();

  /**
   * Unbind events from the given Mapbox element
   */
  function unbindEvents(eventNames: string[]) {
    for (const eventName of eventNames) {
      unbindFunctions.get(eventName)?.();
    }
  }

  /**
   * Bind Vue events to the given Mapbox element
   */
  function bindEvents(eventNames: string[]) {
    const map = mapboxElement.value;
    if (!map) return;

    for (const eventName of eventNames) {
      const originalEvent = getOriginalEvent(eventName);

      if (!originalEvent || !events.includes(originalEvent)) continue;

      const handler = (...payload: any[]) => {
        emitFn(`mb-${originalEvent}`, ...payload);
      };

      // If `layerId` is not undefined, all events must be
      // delegated from the map to the given `layerId`
      if (layerId) {
        // @ts-expect-error: `on` type definition is missing the `layerId` parameter
        map.on(originalEvent, layerId, handler);

        unbindFunctions.set(eventName, () => {
          // @ts-expect-error: `on` type definition is missing the `layerId` parameter
          map.off(originalEvent, layerId, handler);
        });
      } else {
        map.on(originalEvent, handler);

        unbindFunctions.set(eventName, () => {
          map.off(originalEvent, handler);
        });
      }
    }
  }

  watch(
    vueEventNames,
    (newVueEventNames = [], oldVueEventNames = []) => {
      // Get old event names not in the new event names
      const eventNamesToDelete = oldVueEventNames.filter(
        (name) => !newVueEventNames.includes(name),
      );

      // Get new event names not in the old event names
      const eventNamesToAdd = (newVueEventNames ?? []).filter(
        (name) => !oldVueEventNames.includes(name),
      );

      if (mapboxElement.value) {
        unbindEvents(eventNamesToDelete);
        bindEvents(eventNamesToAdd);
      } else {
        // We need to watch the mapbox element once as it can
        // be null when reaching this part of the code
        const unwatch = watch(mapboxElement, (newValue) => {
          if (newValue) {
            unbindEvents(eventNamesToDelete);
            bindEvents(eventNamesToAdd);
            unwatch();
          }
        });
      }
    },
    { immediate: true },
  );
}

/**
 * Get a Mapbox event name from a Vue event name
 */
function getOriginalEvent(vueEventName: string) {
  if (!cache.has(vueEventName)) {
    cache.set(
      vueEventName,
      vueEventName.replace(
        EVENT_PREFIX,
        (_match, $1, $2) => $1.toLowerCase() + $2,
      ) as keyof MapLayerEventType,
    );
  }

  return cache.get(vueEventName);
}
