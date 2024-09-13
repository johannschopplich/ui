import type { Map as _Map, MapEventType, Marker } from "mapbox-gl";
import type { Ref } from "vue";
import { computed, useAttrs, watch } from "vue";

type MarkerEventType = "dragstart" | "drag" | "dragend";

const cache = new Map<string, MapEventType>();
const EVENT_PREFIX = /onMb([A-Z])(.+)/;

/**
 * Map a Mapbox element's events to a Vue component
 */
export function useEventsBinding<
  T extends _Map | Marker,
  Events extends string[],
>(
  /** The element bound to the component */
  element: Ref<T | undefined>,
  {
    emit,
    events,
    layerId,
  }: {
    /** The emit function for the current component */
    emit: (event: string, ...args: any[]) => void;
    /** The events to map */
    events?: Events;
    /** The layer on which the events are delegated */
    layerId?: string;
  },
) {
  const attrs = useAttrs();
  const vueEventNames = computed(() =>
    Object.entries(attrs)
      .filter(
        ([name, value]) => name.startsWith("on") && typeof value === "function",
      )
      .map(([name]) => name),
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

      if (!originalEvent || !events?.includes(originalEvent)) continue;

      const handler = (...args: any[]) => {
        emit(`mb-${originalEvent}`, ...args);
      };

      if (layerId) {
        (el as _Map).on(originalEvent, layerId, handler);

        cleanupFns.set(eventName, () => {
          (el as _Map).off(originalEvent, layerId, handler);
        });
      } else {
        (el as Marker).on(originalEvent as MarkerEventType, handler);

        cleanupFns.set(eventName, () => {
          (el as Marker).off(originalEvent as MarkerEventType, handler);
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
        (match, $1, $2) => $1.toLowerCase() + $2,
      ) as MapEventType,
    );
  }

  return cache.get(vueEventName);
}
