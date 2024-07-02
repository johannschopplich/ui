<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDebounceFn, useResizeObserver } from "@vueuse/core";

const container = ref<HTMLElement | undefined>();
let properties:
  | {
      items: HTMLElement[];
      gap: number;
      columns: number;
      count: number;
    }
  | undefined;

const debouncedUpdateGridItems = useDebounceFn(updateGridItems, 100);
useResizeObserver(container, debouncedUpdateGridItems);

onMounted(() => {
  if (!container.value) return;

  // Bail if masonry layouts are already supported by the browser
  // if (getComputedStyle(container.value).gridTemplateRows === "masonry") return;

  const { rowGap } = getComputedStyle(container.value);

  properties = {
    items: [...container.value.children] as HTMLElement[],
    gap: rowGap !== "normal" ? Number.parseFloat(rowGap) : 0,
    columns: 0,
    count: 0,
  };

  updateGridItems();
});

function updateGridItems() {
  if (!container.value || !properties) return;

  const columns = getComputedStyle(container.value).gridTemplateColumns.split(
    " ",
  ).length;

  for (const column of properties.items) {
    const { height } = column.getBoundingClientRect();
    const h = height.toString();

    if (h !== column.dataset?.h) {
      column.dataset.h = h;
      properties.count++;
    }
  }

  // Bail if the number of columns hasn't changed
  if (properties.columns === columns && !properties.count) return;

  // Update the number of columns
  properties.columns = columns;

  // Revert to initial positioning, no margin
  for (const { style } of properties.items) style.removeProperty("margin-top");

  // If we have more than one column
  if (properties.columns > 1) {
    for (const [index, column] of properties.items.slice(columns).entries()) {
      // Bottom edge of item above
      const { bottom: prevBottom } =
        properties.items[index]!.getBoundingClientRect();
      // Top edge of current item
      const { top } = column.getBoundingClientRect();

      column.style.marginTop = `${prevBottom + properties.gap - top}px`;
    }
  }

  properties.count = 0;
}
</script>

<template>
  <!-- grid-rows-[masonry] -->
  <div
    ref="container"
    class="grid grid-cols-[repeat(auto-fit,minmax(min(var(--col-max-w,25rem),100%),1fr))] justify-center children:self-start"
  >
    <slot />
  </div>
</template>
