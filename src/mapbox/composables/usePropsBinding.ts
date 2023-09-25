import { watch } from "vue";
import type { Ref } from "vue";
import type { Evented } from "mapbox-gl";

/**
 * Map a Mapbox element's events to the given Vue element
 */
export function usePropsBinding<T extends Evented>(
  /** The component props */
  props: Record<string, unknown>,
  /** The Mapbox element bound to the component */
  mapboxElement: Ref<T | undefined>,
) {
  /**
   * Bind props to the given mapboxElement in order to update them when they change
   */
  function bindProps(element: T) {
    Object.keys(props)
      .filter((prop) => props[prop] != null)
      .forEach((prop) => {
        const setMethodName =
          prop === "mapStyle" ? "setStyle" : `set${upperFirst(prop)}`;

        const method = element[setMethodName as keyof T];

        // Do nothing if `setMethodName` is not a function of `mapBoxElement`
        if (!isFunction(method)) return;

        watch(() => props[prop], method, {
          deep: Array.isArray(props[prop]) || isObject(props[prop]),
        });
      });
  }

  if (mapboxElement.value) {
    bindProps(mapboxElement.value);
  } else {
    const unwatch = watch(mapboxElement, (newValue) => {
      if (newValue) {
        bindProps(newValue);
        unwatch();
      }
    });
  }
}

function upperFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === "function";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
