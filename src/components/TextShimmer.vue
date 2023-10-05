<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string;
    from?: string;
    to?: string;
    duration?: string;
  }>(),
  {
    as: "div",
    from: "#000",
    to: "rgba(0, 0, 0, 0)",
    duration: "2.5s",
  },
);
</script>

<template>
  <component
    :is="as"
    class="text-shimmer bg-[length:250%_100%] bg-clip-text text-transparent"
    :style="{
      '--shimmer-from': from,
      '--shimmer-to': to,
      '--shimmer-duration': duration,
    }"
  >
    <slot />
  </component>
</template>

<style scoped>
@keyframes text-shimmer {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -200% 0;
  }
}

.text-shimmer {
  animation: text-shimmer var(--shimmer-duration) ease-out infinite alternate;
  background-image: linear-gradient(
    110deg,
    var(--shimmer-from,),
    45%,
    var(--shimmer-to,),
    55%,
    var(--shimmer-from)
  );
}
</style>
