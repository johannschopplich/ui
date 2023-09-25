import { inject } from "vue";
import { mapCtxKey } from "../components/context";

/**
 * Inject the provided map instance
 */
export function useMap() {
  return inject(mapCtxKey)!;
}
