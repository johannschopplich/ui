export type MapboxImage =
  | HTMLImageElement
  | ArrayBufferView
  | { width: number; height: number; data: Uint8Array | Uint8ClampedArray }
  | ImageData
  | ImageBitmap;

export interface MapboxImageProps {
  id: string;
  src: MapboxImage;
  options?: {
    pixelRatio?: number;
    sdf?: boolean;
  };
}

let clusterIndex = 0;

export function getClusterIndex() {
  const currentIndex = clusterIndex;
  clusterIndex++;
  return currentIndex;
}
