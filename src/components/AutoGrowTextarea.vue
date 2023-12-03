<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useVModel } from "@vueuse/core";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  modelValue: string;
  /**
   * Identical styling is required for both elements to allow for auto-grow
   * @example "sm:text-sm sm:leading-6"
   */
  sharedClassNames?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "mounted:textarea", value?: HTMLTextAreaElement): void;
}>();

const data = useVModel(props, "modelValue", emit);
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
      v-model="data"
      class="grid-area-[1/1/2/2] resize-none overflow-hidden"
      :class="sharedClassNames"
      v-bind="$attrs"
    />
    <!-- The weird space is needed to prevent jumpy behavior -->
    <div
      class="invisible grid-area-[1/1/2/2] whitespace-pre-wrap"
      :class="sharedClassNames"
      v-text="`${data} `"
    />
  </div>
</template>
