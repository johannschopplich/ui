import type { Component, PropType } from "vue";
import { defineComponent, h } from "vue";

const SELF_CLOSING_TAGS = ["area", "img", "input"];

export interface PrimitiveProps {
  /**
   * The element or component this component should render as.
   * @defaultValue "div"
   */
  as?: string | Component;
}

export const Primitive = defineComponent({
  name: "Primitive",
  inheritAttrs: false,
  props: {
    as: {
      type: [String, Object] as PropType<string | Component>,
      default: "div",
    },
  },
  setup(props, { attrs, slots }) {
    const asTag = props.as;

    // For self closing tags, don't provide default slots because of hydration issue
    if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag))
      return () => h(asTag, attrs);

    return () => h(asTag, attrs, { default: slots.default });
  },
});
