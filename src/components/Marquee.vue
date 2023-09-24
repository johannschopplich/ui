<template>
  <div class="relative max-w-[100vw] flex overflow-hidden">
    <div
      class="w-max flex animate-[marquee_var(--duration,30s)_linear_infinite] hover:[animation-play-state:paused]"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
</style>
