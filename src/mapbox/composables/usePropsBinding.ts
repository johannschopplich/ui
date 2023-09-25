import { upperFirst } from "scule";
import { watch } from "vue";
import type { Ref } from "vue";
import type { Evented } from "mapbox-gl";

/**
 * Map a mapbox element's events to the given Vue element
 */
export function usePropsBinding<T extends Evented>(
  /** The component props */
  props: Record<string, any>,
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

        const methodExists =
          typeof element[setMethodName as keyof T] === "function";

        // Do nothing if `setMethodName` is not a function of `mapBoxElement`
        if (!methodExists) return;

        watch(
          () => props[prop],
          (newValue) => {
            // @ts-expect-error: Expression is not callable
            element[setMethodName as keyof T](newValue);
          },
          {
            deep:
              (typeof props[prop] === "object" && props[prop] !== null) ||
              Array.isArray(props[prop]),
          },
        );
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
