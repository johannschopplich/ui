<script lang="ts" setup>
withDefaults(
  defineProps<{
    reverse?: boolean;
    pauseOnHover?: boolean;
  }>(),
  {
    pauseOnHover: true,
  },
);
</script>

<template>
  <div class="group flex overflow-hidden">
    <div
      class="animate-marquee [gap:var(--gap,1rem)] flex shrink-0 flex-row justify-around"
      :class="[
        pauseOnHover &&
          '[@media(hover:hover)]:group-hover:[animation-play-state:paused]',
      ]"
      :style="{
        animationDirection: reverse ? 'reverse' : 'normal',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: marquee var(--duration, 40s) linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap, 1rem)));
  }
}
</style>
