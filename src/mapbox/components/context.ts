import type { InjectionKey, ShallowRef } from "vue";
import type { Map } from "mapbox-gl";

export type MapboxImage =
  | HTMLImageElement
  | ImageBitmap
  | ImageData
  | {
      width: number;
      height: number;
      data: Uint8Array | Uint8ClampedArray;
    };

export interface MapboxImageProps {
  id: string;
  src: MapboxImage;
  options?: {
    pixelRatio?: number;
    sdf?: boolean;
  };
}

let clusterIndex = 0;

// eslint-disable-next-line symbol-description
export const mapCtxKey = Symbol() as InjectionKey<ShallowRef<Map | undefined>>;

export function getClusterIndex() {
  const currentIndex = clusterIndex;
  clusterIndex++;
  return currentIndex;
}
