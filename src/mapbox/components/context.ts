import type { InjectionKey, ShallowRef } from "vue";
import type { Event, Map, MapEvent } from "mapbox-gl";

type Listener = (arg1: any) => void;

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

// TODO: Replace with native `Evented` type when exported from `mapbox-gl`
export declare class Evented {
  on(type: MapEvent, listener: Listener): this;
  off(type: MapEvent, listener: Listener): this;
  once(type: MapEvent): Promise<Event>;
  once(type: MapEvent, listener: Listener): this;
  fire(event: Event | string, properties?: object): this;
  listens(type: string): boolean;
  setEventedParent(parent?: Evented, data?: unknown | (() => unknown)): this;
}

let clusterIndex = 0;

// eslint-disable-next-line symbol-description
export const mapCtxKey = Symbol() as InjectionKey<ShallowRef<Map | undefined>>;

export function getClusterIndex() {
  const currentIndex = clusterIndex;
  clusterIndex++;
  return currentIndex;
}
