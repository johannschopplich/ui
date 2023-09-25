<script setup lang="ts">
import { ref } from "vue";
import {
  DetailsContent,
  DetailsGroup,
  DetailsItem,
  DotPattern,
  Marquee,
  ModalsPortal,
  MotionText,
  ScrollObserver,
  ScrollReveal,
  ScrollTrigger,
  ScrollTriggerGroup,
  TextReveal,
  TextRevealToken,
} from "../src/components";
import { useModals } from "../src/composables/modals";
import TextModal from "./components/TextModal.vue";

const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis recusandae enim aliquam praesentium? Eos labore ea praesentium incidunt. Magni corporis quos nostrum unde doloremque magnam ducimus recusandae vitae sit temporibus.";

// Modal handling
const { open } = useModals();
const email = ref("me@example.com");

async function openModal() {
  const newValue = await open(TextModal, {
    email: email.value,
  });

  if (newValue !== undefined) email.value = newValue;
}
</script>

<template>
  <main class="mx-auto w-[min(100%-2rem,640px)] py-16 space-y-16">
    <ScrollReveal
      v-slot="{ isActive }"
      :offset="200"
      class="[--duration:500ms]"
    >
      <h1
        :class="{ 'translate-y-8 opacity-0': !isActive }"
        class="mb-6 from-lime-300 to-green-400 bg-gradient-to-r bg-clip-text text-center text-xl font-medium transition-transform,opacity duration-[--duration] md:text-3xl"
      >
        Playground
      </h1>
      <p class="text-center" @click="openModal()">
        <button
          class="group mt-4 inline-flex items-center gap-2 rounded-lg bg-black/5 px-5 py-2.5 text-xs font-medium tracking-wide transition md:mt-8 hover:bg-black/10"
        >
          Open Modal
        </button>
      </p>

      <div class="transition-transform,opacity duration-[--duration] md:mt-12">
        <div class="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 md:gap-y-8">
          <div
            v-for="(item, index) in 4"
            :key="index"
            :style="{ '--delay': `${(index + 1) * 250}ms` }"
            :class="{
              'translate-y-8 opacity-0': !isActive,
              'delay-[--delay]': isActive,
            }"
            class="relative aspect-1/1 w-full bg-gray-200 transition-transform,opacity duration-[--duration]"
          >
            <DotPattern
              :size="32"
              :radius="1.5"
              :offset-x="0"
              :offset-y="0"
              class="[mask-image:radial-gradient(white,transparent_85%)] absolute inset-0 h-full w-full fill-black/20"
            >
            </DotPattern>
          </div>
        </div>
      </div>
    </ScrollReveal>

    <TextReveal
      v-slot="{ tokens }"
      :body="text"
      class="relative h-[200svh] w-full"
    >
      <div
        class="sticky left-0 top-0 h-1/2 flex items-center text-3xl font-medium leading-tight"
      >
        <div>
          <TextRevealToken
            v-for="(token, index) in tokens"
            v-slot="{ isActive }"
            :key="index"
            :index="index"
          >
            <span
              :class="{
                'opacity-10': !isActive,
              }"
              class="transition"
              v-html="token"
            />
          </TextRevealToken>
        </div>
      </div>
    </TextReveal>

    <ScrollReveal
      v-slot="{ isActive }"
      mode="middle"
      class="h-[100svh] flex items-center"
    >
      <MotionText v-slot="{ tokens }" :body="text" mode="symbol">
        <h1 class="text-center text-4xl font-bold">
          <span
            v-for="(token, index) in tokens"
            :key="index"
            :style="{
              '--delay': `${index * 20}ms`,
            }"
            class="inline-block whitespace-pre-wrap transition-transform,opacity"
            :class="{
              'translate-y-8 opacity-0': !isActive,
              'delay-[--delay]': isActive,
            }"
          >
            {{ token }}
          </span>
        </h1>
      </MotionText>
    </ScrollReveal>

    <ScrollObserver class="relative h-[100svh]">
      <ScrollTriggerGroup class="text-3xl space-y-3">
        <ScrollTrigger v-slot="{ isActive }" class="relative">
          <span
            class="absolute inset-0 transition"
            :class="{ 'opacity-0': !isActive }"
          >
            Lorem
            <span
              class="from-red-300 to-rose-400 bg-gradient-to-r bg-clip-text text-transparent transition"
            >
              ipsum dolor
            </span>
            sit amet consectetur adipisicing elit.
          </span>

          <span
            class="relative text-black/20 transition"
            :class="{ 'opacity-0': isActive }"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </ScrollTrigger>

        <ScrollTrigger v-slot="{ isActive }" class="relative">
          <span
            class="absolute inset-0 transition"
            :class="{ 'opacity-0': !isActive }"
          >
            <span
              class="from-yellow-300 to-amber-400 bg-gradient-to-r bg-clip-text text-transparent transition"
            >
              Optio veritatis
            </span>
            iure laborum alias necessitatibus, animi ad, placeat adipisci
            voluptatibus ipsam provident nisi.
          </span>

          <span
            class="relative text-black/20 transition"
            :class="{ 'opacity-0': isActive }"
          >
            Optio veritatis iure laborum alias necessitatibus, animi ad, placeat
            adipisci voluptatibus ipsam provident nisi.
          </span>
        </ScrollTrigger>

        <ScrollTrigger v-slot="{ isActive }" class="relative">
          <span
            class="absolute inset-0 transition"
            :class="{ 'opacity-0': !isActive }"
          >
            Minus culpa saepe reiciendis
            <span
              class="from-lime-300 to-green-400 bg-gradient-to-r bg-clip-text text-transparent transition"
            >
              porro tempore
            </span>
            ab reprehenderit!
          </span>

          <span
            class="relative text-black/20 transition"
            :class="{ 'opacity-0': isActive }"
          >
            Minus culpa saepe reiciendis, porro tempore ab reprehenderit!
          </span>
        </ScrollTrigger>
      </ScrollTriggerGroup>
    </ScrollObserver>

    <aside class="relative ml-[calc(50%-50vw)] w-[100vw]">
      <Marquee>
        <div v-for="(item, index) in 10" :key="index" class="h-full px-2.5">
          <div
            class="relative h-full w-[28rem] border border-black/5 rounded-2xl bg-black/5 px-8 py-6"
          >
            <div class="pb-4 font-light text-black/75">
              {{ text }}
            </div>
          </div>
        </div>
      </Marquee>
    </aside>

    <DetailsGroup class="space-y-5">
      <DetailsItem
        v-for="(item, index) in 5"
        :key="index"
        v-slot="{ isActive, toggle }"
        class="group border border-black/10 rounded-2xl bg-black/5 transition duration-500 hover:bg-black/[0.075]"
      >
        <div class="flex cursor-pointer items-center p-4" @click="toggle">
          <div class="text-black/75 transition group-hover:text-black">
            Detail Item {{ index + 1 }}
          </div>

          <div class="relative ml-auto">
            <span
              :class="{ 'rotate-180': isActive, 'rotate-45': !isActive }"
              class="i-ph:x-circle h-6 w-6 text-black/50 transition-transform duration-500"
            />
          </div>
        </div>

        <DetailsContent
          class="overflow-hidden px-4 transition-all duration-500 will-change-height"
        >
          <p
            class="pb-4 font-light leading-relaxed tracking-wide text-black/75"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            facere deserunt earum eos perspiciatis rem, ipsam omnis tenetur
            recusandae enim quod veritatis sunt a. Dolores asperiores nobis
            eligendi ex sed!
          </p>
        </DetailsContent>
      </DetailsItem>
    </DetailsGroup>
  </main>

  <ModalsPortal />
</template>

<style>
body {
  overflow-x: hidden;
}
</style>
