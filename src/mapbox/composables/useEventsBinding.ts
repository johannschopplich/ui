import { computed, useAttrs, watch } from "vue";
import type { Ref } from "vue";
import type { MapEvent, Marker, Map as _Map } from "mapbox-gl";

const cache = new Map<string, MapEvent>();
const EVENT_PREFIX = /onMb([A-Z])(.+)/;

/**
 * Map a Mapbox element's events to a Vue component
 */
export function useEventsBinding<T extends _Map | Marker>(
  /** The element bound to the component */
  element: Ref<T | undefined>,
  {
    emit,
    events = [],
    layerId,
  }: {
    /** The emit function for the current component */
    emit: (event: string, ...args: any[]) => void;
    /** The events to map */
    events?: string[];
    /** The layer on which the events are delegated */
    layerId?: string;
  }
) {
  const attrs = useAttrs();
  const vueEventNames = computed(() =>
    Object.entries(attrs)
      .filter(
        ([name, value]) => name.startsWith("on") && typeof value === "function"
      )
      .map(([name]) => name)
  );

  const cleanupFns = new Map<string, () => void>();

  /**
   * Unbind events from the given Mapbox element
   */
  function unbindEvents(eventNames: string[]) {
    for (const eventName of eventNames) {
      cleanupFns.get(eventName)?.();
    }
  }

  /**
   * Bind Vue events to the given Mapbox element
   */
  function bindEvents(eventNames: string[]) {
    const el = element.value;
    if (!el) return;

    for (const eventName of eventNames) {
      const originalEvent = getOriginalEvent(eventName);

      if (!originalEvent || !events.includes(originalEvent)) continue;

      const handler = (...payload: any[]) => {
        emit(`mb-${originalEvent}`, ...payload);
      };

      if (layerId) {
        (el as unknown as _Map).on(originalEvent, layerId, handler);

        cleanupFns.set(eventName, () => {
          (el as unknown as _Map).off(originalEvent, layerId, handler);
        });
      } else {
        el.on(originalEvent, handler);

        cleanupFns.set(eventName, () => {
          el.off(originalEvent, handler);
        });
      }
    }
  }

  watch(
    vueEventNames,
    (newVueEventNames = [], oldVueEventNames = []) => {
      // Get old event names not in the new event names
      const eventNamesToDelete = oldVueEventNames.filter(
        (name) => !newVueEventNames.includes(name)
      );

      // Get new event names not in the old event names
      const eventNamesToAdd = (newVueEventNames ?? []).filter(
        (name) => !oldVueEventNames.includes(name)
      );

      if (element.value) {
        unbindEvents(eventNamesToDelete);
        bindEvents(eventNamesToAdd);
      } else {
        // We need to watch the mapbox element once as it can
        // be null when reaching this part of the code
        const unwatch = watch(element, (newValue) => {
          if (newValue) {
            unbindEvents(eventNamesToDelete);
            bindEvents(eventNamesToAdd);
            unwatch();
          }
        });
      }
    },
    { immediate: true }
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
        (_match, $1, $2) => $1.toLowerCase() + $2
      ) as MapEvent
    );
  }

  return cache.get(vueEventName);
}
