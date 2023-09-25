import type { ComputedRef, InjectionKey, Ref } from "vue";

interface DetailsGroupContext {
  peers: Ref<Element[]>;
  activeItem: Ref<number>;
  setActive: (index: number) => void;
}

export interface GridPatternContext {
  size: number;
  offsetX: number;
  offsetY: number;
}

export interface ScrollObserverContext {
  active: Ref<number | undefined>;
  previous: Ref<number | undefined>;
  setActive: (index?: number) => void;
}

export interface TextRevealContext {
  tokens: ComputedRef<string[]>;
  progress: ComputedRef<number>;
}

export const detailsCtxKey = Symbol() as InjectionKey<DetailsGroupContext>;
export const detailsItemCtxKey = Symbol() as InjectionKey<ComputedRef<boolean>>;
export const gridPatternCtxKey = Symbol() as InjectionKey<GridPatternContext>;
// prettier-ignore
export const scrollObserverCtxKey = Symbol() as InjectionKey<ScrollObserverContext>;
export const scrollTriggerCtxKey = Symbol() as InjectionKey<Ref<Element[]>>;
export const scrollReactorCtxKey = Symbol() as InjectionKey<Ref<Element[]>>;
export const textRevealCtxKey = Symbol() as InjectionKey<TextRevealContext>;
