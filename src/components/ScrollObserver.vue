<script setup lang="ts">
import { provide, ref } from "vue";
import { usePrevious } from "@vueuse/core";
import { scrollObserverCtxKey } from "./context";

withDefaults(
  defineProps<{
    as?: string;
  }>(),
  {
    as: "div",
  },
);

const active = ref<number | undefined>();
const previous = usePrevious(active, 0);

provide(scrollObserverCtxKey, {
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
