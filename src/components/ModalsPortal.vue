<script setup lang="ts">
// Explicit import from the package itself, because otherwise the modals context
// gets lost when used in Nuxt due to build transpilation.
// import { useModals } from "../composables/modals";
import { useModals } from "@byjohann/ui";

const props = defineProps<{
  scope?: string;
}>();

const { modals } = useModals(props.scope);
</script>

<template>
  <div
    :style="{
      '--duration-background': '200ms',
      '--duration-content': '100ms',
    }"
  >
    <Transition name="background-fade">
      <slot v-if="modals.length">
        <div class="fixed inset-0 bg-gray-500/50 backdrop-blur-sm" />
      </slot>
    </Transition>

    <TransitionGroup name="content-fade">
      <component
        :is="modal.component"
        v-for="(modal, i) in modals"
        :key="`${modal.component}${i}`"
        v-bind="modal.bindings"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.background-fade-enter-active {
  transition: opacity var(--duration-background) ease-out;
}

.background-fade-leave-active {
  transition: opacity var(--duration-content) ease-in;
}

.background-fade-enter-from,
.background-fade-leave-to {
  opacity: 0;
}

.background-fade-enter-to,
.background-fade-leave-from {
  opacity: 1;
}

.content-fade-enter-active {
  transition:
    opacity var(--duration-background) ease-out,
    transform var(--duration-background) ease-out;
}

.content-fade-leave-active {
  transition:
    opacity var(--duration-content) ease-in,
    transform var(--duration-content) ease-in;
}

.content-fade-enter-from {
  opacity: 0;
  transform: translateY(4px) scale(0.95);
}

.content-fade-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.95);
}

.content-fade-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.content-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media screen and (min-width: 640px) {
  .content-fade-enter-from {
    transform: translateY(0) scale(0.95);
  }

  .content-fade-leave-to {
    transform: translateY(0) scale(0.95);
  }
}
</style>
