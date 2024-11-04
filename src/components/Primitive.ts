import type { Component, PropType } from "vue";
import { defineComponent, h } from "vue";
import { Slot } from "./Slot";

const SELF_CLOSING_TAGS = ["area", "img", "input"];

export interface PrimitiveProps {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   *
   * @default false
   */
  asChild?: boolean;
  /**
   * The element or component this component should render as. Can be overwritten by `asChild`.
   *
   * @default "div"
   */
  as?: string | Component;
}

export const Primitive = defineComponent({
  name: "Primitive",
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: false,
    },
    as: {
      type: [String, Object] as PropType<string | Component>,
      default: "div",
    },
  },
  setup(props, { attrs, slots }) {
    const asTag = props.asChild ? "template" : props.as;

    // For self closing tags, don't provide default slots because of hydration issue
    if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag))
      return () => h(asTag, attrs);

    if (asTag !== "template")
      return () => h(props.as, attrs, { default: slots.default });

    return () => h(Slot, attrs, { default: slots.default });
  },
});
