<script setup lang="ts">
import { onMounted, ref } from "vue";

defineOptions({ inheritAttrs: false });

defineProps<{
  /**
   * Identical styling is required for both elements to allow for auto-growing.
   * @example "text-sm leading-6"
   */
  sharedClass?: string;
}>();

const emit = defineEmits<{
  (event: "mounted:textarea", value: HTMLTextAreaElement): void;
}>();

const text = defineModel<string>({ required: true });
const textarea = ref<HTMLTextAreaElement | undefined>();

onMounted(() => {
  if (textarea.value) {
    // eslint-disable-next-line vue/custom-event-name-casing
    emit("mounted:textarea", textarea.value);
  }
});
</script>

<template>
  <div class="grid">
    <textarea
      ref="textarea"
      v-model="text"
      class="grid-area-[1/1/2/2] resize-none overflow-hidden"
      :class="sharedClass"
      v-bind="$attrs"
    />
    <!-- The weird space is needed to prevent jumpy behavior -->
    <div
      class="invisible grid-area-[1/1/2/2] whitespace-pre-wrap"
      :class="sharedClass"
      v-text="`${text} `"
    />
  </div>
</template>
