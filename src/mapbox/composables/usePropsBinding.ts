import { watch } from "vue";
import type { Ref } from "vue";
import type { Evented } from "../components/context";

/**
 * Map a Mapbox element's events to the given Vue element
 */
export function usePropsBinding<T extends Evented>(
  props: Record<string, unknown>,
  element: Ref<T | undefined>,
) {
  /**
   * Bind props to the given element in order to update them when they change
   */
  function bindProps(element: T) {
    Object.keys(props)
      .filter((prop) => props[prop] != null)
      .forEach((prop) => {
        const setMethodName =
          prop === "mapStyle" ? "setStyle" : `set${upperFirst(prop)}`;

        const method = element[setMethodName as keyof T];

        // Do nothing if `setMethodName` is not a function
        if (typeof method !== "function") return;

        watch(
          () => props[prop],
          (value) => {
            // @ts-expect-error: Function is callable
            element[setMethodName as keyof T](value);
          },
          {
            deep: Array.isArray(props[prop]) || isObject(props[prop]),
          },
        );
      });
  }

  if (element.value) {
    bindProps(element.value);
  } else {
    const unwatch = watch(element, (newValue) => {
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

function isObject(val: unknown): val is Record<any, any> {
  return Object.prototype.toString.call(val) === "[object Object]";
}
