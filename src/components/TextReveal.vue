<script setup lang="ts">
import type { Component } from "vue";
import { useElementBounding } from "@vueuse/core";
import { computed, provide, ref } from "vue";
import { textRevealCtxKey } from "./context";

const props = withDefaults(
  defineProps<{
    as?: string | Component;
    body: string;
  }>(),
  {
    as: "div",
  },
);

defineSlots<{
  default: (props: { tokens: string[]; progress: number }) => any;
}>();

const container = ref<HTMLElement | undefined>();
const { height, top } = useElementBounding(container);
const progress = computed(() => (-top.value / height.value) * 2);

const tokens = computed<string[]>(() => props.body.match(/\S+|\s+/g) || []);

provide(textRevealCtxKey, {
  tokens,
  progress,
});
</script>

<template>
  <component :is="as" ref="container">
    <slot :tokens="tokens" :progress="progress" />
  </component>
</template>
