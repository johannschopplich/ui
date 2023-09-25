<template>
  <div class="relative max-w-[100vw] flex overflow-hidden">
    <div class="marquee w-max flex hover:[animation-play-state:paused]">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.marquee {
  animation: marquee var(--duration, 30s) linear infinite;
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
</style>
