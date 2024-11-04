<script lang="ts">
import type { PrimitiveProps } from "./Primitive";
import { Primitive } from "./Primitive";

export interface VisuallyHiddenProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
withDefaults(defineProps<VisuallyHiddenProps>(), { as: "span" });
</script>

<template>
  <Primitive :as="as" :as-child="asChild" class="sr-only">
    <slot />
  </Primitive>
</template>
