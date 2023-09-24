<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number;
    radius?: number;
    offsetX?: number;
    offsetY?: number;
  }>(),
  {
    size: 16,
    radius: 1,
    offsetX: 0,
    offsetY: 0,
  },
);
</script>

<template>
  <svg>
    <defs>
      <pattern
        id="dot-pattern"
        :width="size"
        :height="size"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
        :x="offsetX"
        :y="offsetY"
      >
        <circle :cx="size / 2" :cy="size / 2" :r="radius" />
      </pattern>
    </defs>

    <rect
      width="100%"
      height="100%"
      stroke-width="0"
      fill="url(#dot-pattern)"
    />
  </svg>
</template>
