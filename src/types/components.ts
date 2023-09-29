import type { ComponentPublicInstance } from "vue";

export type ComponentConstructor<
  T extends ComponentPublicInstance<Props> = ComponentPublicInstance<any>,
  Props = any,
> = new (...args: any[]) => T;
