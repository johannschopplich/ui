<script lang="ts">
import { computed, provide, ref } from "vue";
import { useElementBounding } from "@vueuse/core";
import type { ComputedRef, InjectionKey } from "vue";

export interface TextRevealContext {
  tokens: ComputedRef<string[]>;
  progress: ComputedRef<number>;
}

export const contextInjectionKey = Symbol() as InjectionKey<TextRevealContext>;
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    as?: string;
    body: string;
  }>(),
  {
    as: "div",
  },
);

const container = ref<HTMLElement | undefined>();
const { height, top } = useElementBounding(container);
const progress = computed(() => (-top.value / height.value) * 2);

const tokens = computed<string[]>(() => props.body.match(/\S+|\s+/g) || []);

provide(contextInjectionKey, {
  tokens,
  progress,
});
</script>

<template>
  <component :is="as" ref="container">
    <slot :tokens="tokens" :progress="progress" />
  </component>
</template>
