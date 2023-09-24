<script lang="ts">
import { provide, ref } from "vue";
import { usePrevious } from "@vueuse/core";
import type { InjectionKey, Ref } from "vue";

export interface ScrollObserverContext {
  active: Ref<number | undefined>;
  previous: Ref<number | undefined>;
  setActive: (index?: number) => void;
}

export const contextInjectionKey =
  Symbol() as InjectionKey<ScrollObserverContext>;
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string;
  }>(),
  {
    as: "div",
  }
);

const active = ref<number | undefined>();

const previous = usePrevious(active, 0);

provide(contextInjectionKey, {
  active,
  previous,
  setActive,
});

function setActive(index?: number) {
  active.value = index;
}
</script>

<template>
  <component :is="as">
    <slot :active="active" :previous="previous" />
  </component>
</template>
