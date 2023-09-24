import type { ComputedRef, InjectionKey, Ref } from "vue";

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

export const gridPatternInjectionKey =
  Symbol() as InjectionKey<GridPatternContext>;

export const scrollObserverInjectionKey =
  Symbol() as InjectionKey<ScrollObserverContext>;

export const scrollReactorGroupInjectionKey = Symbol() as InjectionKey<
  Ref<Element[]>
>;

export const textRevealInjectionKey =
  Symbol() as InjectionKey<TextRevealContext>;

export const scrollTriggerInjectionKey = Symbol() as InjectionKey<
  Ref<Element[]>
>;
