<script setup lang="ts">
import { onMounted, ref } from "vue";

defineOptions({ inheritAttrs: false });

defineProps<{
  /**
   * Identical styling is required for both elements to allow for auto-grow
   * @example "sm:text-sm sm:leading-6"
   */
  sharedClassNames?: string;
}>();

const emit = defineEmits<{
  (event: "mounted:textarea", value: HTMLTextAreaElement): void;
}>();

const model = defineModel<string>({ required: true });
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
      v-model="model"
      class="grid-area-[1/1/2/2] resize-none overflow-hidden"
      :class="sharedClassNames"
      v-bind="$attrs"
    />
    <!-- The weird space is needed to prevent jumpy behavior -->
    <div
      class="invisible grid-area-[1/1/2/2] whitespace-pre-wrap"
      :class="sharedClassNames"
      v-text="`${model} `"
    />
  </div>
</template>
