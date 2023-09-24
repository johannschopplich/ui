<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { contextInjectionKey } from "./ScrollObserver.vue";
import { peersInjectionKey } from "./ScrollReactorGroup.vue";

withDefaults(
  defineProps<{
    as?: string;
  }>(),
  {
    as: "div",
  },
);

const container = ref<HTMLElement | undefined>();
const context = inject(contextInjectionKey)!;

const peers = inject(peersInjectionKey);

const index = computed(() =>
  peers?.value ? peers.value.indexOf(container.value!) : undefined,
);

// Active element
const isActive = computed(() => context.active?.value === index.value);
const isPrevious = computed(() => context.previous?.value === index.value);

// Indicators
const show = computed(
  () =>
    isActive.value || (context.active?.value === undefined && isPrevious.value),
);
const faded = computed(() => context.active?.value === undefined);
</script>

<template>
  <component :is="as" ref="container">
    <slot :is-active="isActive" :show="show" :faded="faded" />
  </component>
</template>
