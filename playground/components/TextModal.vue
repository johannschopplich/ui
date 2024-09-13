<script setup lang="ts">
import { useFocus } from "@vueuse/core";
import { ref } from "vue";
import ModalsContainer from "./ModalsContainer.vue";

const props = defineProps<{
  email: string;
}>();

const emit = defineEmits<{
  (event: "close", value?: string): void;
}>();

const email = ref(props.email);
const focusTarget = ref<HTMLElement | undefined>();
useFocus(focusTarget, { initialValue: true });

function close(value?: string | MouseEvent) {
  emit("close", typeof value === "string" ? value : undefined);
}
</script>

<template>
  <ModalsContainer @close="close">
    <div class="space-y-4">
      <div class="text-center">
        <h3
          id="modal-title"
          class="text-base text-gray-900 font-semibold leading-6"
        >
          Edit Email
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          amet labore.
        </p>
      </div>

      <input
        id="email"
        ref="focusTarget"
        v-model="email"
        type="email"
        name="email"
        class="block w-full border-0 rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-rose-600 focus:ring-inset"
        placeholder="you@example.com"
      />
    </div>

    <div class="mt-5 sm:mt-6">
      <button
        type="button"
        class="w-full inline-flex justify-center rounded-md bg-rose-600 px-3 py-2 text-sm text-white font-semibold shadow-sm hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-rose-600 focus-visible:outline-offset-2 focus-visible:outline"
        @click="close(email)"
      >
        OK
      </button>
    </div>
  </ModalsContainer>
</template>
