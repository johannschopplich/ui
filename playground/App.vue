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
  ScrollReactor,
  ScrollReactorGroup,
  ScrollReveal,
  ScrollTrigger,
  ScrollTriggerGroup,
  SliderGroup,
  SliderItem,
  SliderPagination,
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
      once
    >
      <h1
        :class="[!isActive && 'translate-y-8 opacity-0']"
        class="mb-6 from-lime-300 to-green-400 bg-gradient-to-r bg-clip-text text-center text-xl font-medium transition-transform,opacity duration-[--duration] md:text-3xl"
      >
        Playground
      </h1>
      <p
        class="text-center transition-transform,opacity duration-[--duration]"
        :class="[!isActive && 'translate-y-8 opacity-0']"
      >
        <button
          class="group mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-100 px-5 py-2.5 text-xs font-medium tracking-wide transition md:mt-8 hover:bg-gray-200"
          @click="openModal()"
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
            :class="[isActive ? 'delay-[--delay]' : 'translate-y-8 opacity-0']"
            class="relative aspect-1/1 w-full bg-gray-100 transition-transform,opacity duration-[--duration]"
          >
            <DotPattern
              :size="32"
              :radius="1.5"
              :offset-x="0"
              :offset-y="0"
              class="[mask-image:radial-gradient(white,transparent_85%)] absolute inset-0 h-full w-full fill-gray-400"
            />
            <div
              class="absolute inset-0 flex items-center justify-center text-size-[10rem] font-medium leading-tight text-rose-300"
            >
              {{ index + 1 }}
            </div>
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
              :class="[!isActive && 'opacity-10']"
              class="transition"
              v-text="token"
            />
          </TextRevealToken>
        </div>
      </div>
    </TextReveal>

    <ScrollObserver class="relative grid grid-cols-2 gap-8">
      <ScrollTriggerGroup class="py-[50vh]">
        <ScrollTrigger
          v-for="(item, index) in text.split('.').slice(0, 3)"
          :key="index"
          v-slot="{ isActive }"
          class="py-8"
        >
          <div :class="[!isActive && 'text-gray-300']" class="transition">
            <div class="text-2xl font-medium leading-snug">
              Feature Number {{ index + 1 }}
            </div>

            <div class="mt-4 text-base opacity-75">
              {{ item }}
            </div>
          </div>
        </ScrollTrigger>
      </ScrollTriggerGroup>

      <ScrollReactorGroup
        class="sticky top-0 h-[100svh] flex items-center justify-center"
      >
        <ScrollReactor
          v-for="(item, index) in text.split('.').slice(0, 3)"
          :key="index"
          v-slot="{ show, faded }"
          class="absolute inset-0 flex items-center justify-center"
        >
          <div
            class="relative h-64 w-64 overflow-hidden rounded-2xl bg-gray-100 p-12 transition"
            :class="[!show && 'opacity-0']"
          >
            <div
              class="absolute inset-0 bg-gradient-to-b transition"
              :class="[
                index === 0 && 'from-purple-100 to-indigo-300',
                index === 1 && 'from-yellow-100 to-amber-300',
                index === 2 && 'from-lime-100 to-green-300',
                faded && 'opacity-0',
              ]"
            />
          </div>
        </ScrollReactor>
      </ScrollReactorGroup>
    </ScrollObserver>

    <ScrollReveal
      v-slot="{ isActive }"
      mode="middle"
      class="h-[100svh] flex items-center"
      once
    >
      <MotionText
        v-slot="{ tokens }"
        :body="text.split('.', 1)[0] + '.'"
        mode="symbol"
      >
        <h2 class="text-4xl font-bold">
          <span
            v-for="(token, index) in tokens"
            :key="index"
            :style="{
              '--delay': `${index * 20}ms`,
            }"
            class="inline-block whitespace-pre-wrap transition-transform,opacity"
            :class="[isActive ? 'delay-[--delay]' : 'translate-y-8 opacity-0']"
          >
            {{ token }}
          </span>
        </h2>
      </MotionText>
    </ScrollReveal>

    <div class="relative ml-[calc(50%-50vw)] w-[100vw]">
      <SliderGroup class="scroll-pl-6 gap-6 px-6">
        <SliderItem
          v-for="i in 10"
          :key="i"
          v-slot="{ isActive }"
          class="w-[calc(100%-4.5rem)]"
        >
          <div
            class="aspect-[4/1] rounded-2xl"
            :class="[
              isActive
                ? 'from-red-300 to-rose-400 bg-gradient-to-r'
                : 'bg-gray-200',
            ]"
          />
        </SliderItem>

        <template #pagination>
          <SliderPagination />
        </template>
      </SliderGroup>
    </div>

    <ScrollObserver class="relative h-[100svh] flex items-center">
      <ScrollTriggerGroup class="text-3xl space-y-3">
        <ScrollTrigger v-slot="{ isActive }" class="relative">
          <span
            class="absolute inset-0 transition"
            :class="[!isActive && 'opacity-0']"
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
            class="relative text-gray-300 transition"
            :class="[isActive && 'opacity-0']"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </ScrollTrigger>

        <ScrollTrigger v-slot="{ isActive }" class="relative">
          <span
            class="absolute inset-0 transition"
            :class="[!isActive && 'opacity-0']"
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
            class="relative text-gray-300 transition"
            :class="[isActive && 'opacity-0']"
          >
            Optio veritatis iure laborum alias necessitatibus, animi ad, placeat
            adipisci voluptatibus ipsam provident nisi.
          </span>
        </ScrollTrigger>

        <ScrollTrigger v-slot="{ isActive }" class="relative">
          <span
            class="absolute inset-0 transition"
            :class="[!isActive && 'opacity-0']"
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
            class="relative text-gray-300 transition"
            :class="[isActive && 'opacity-0']"
          >
            Minus culpa saepe reiciendis, porro tempore ab reprehenderit!
          </span>
        </ScrollTrigger>
      </ScrollTriggerGroup>
    </ScrollObserver>

    <div class="relative ml-[calc(50%-50vw)] w-[100vw]">
      <Marquee>
        <div v-for="(item, index) in 10" :key="index" class="h-full px-2.5">
          <div
            class="relative h-full w-[28rem] border border-gray-200 rounded-2xl bg-gray-100 px-8 py-6"
          >
            <div class="pb-4 font-light text-gray-800">
              {{ text }}
            </div>
          </div>
        </div>
      </Marquee>
    </div>

    <DetailsGroup class="space-y-5">
      <DetailsItem
        v-for="(item, index) in 5"
        :key="index"
        v-slot="{ isActive, toggle }"
        class="group border border-gray-200 rounded-2xl bg-gray-100 transition duration-500 hover:bg-gray-50"
      >
        <div class="flex cursor-pointer items-center p-4" @click="toggle">
          <div class="text-gray-600 transition group-hover:text-gray-800">
            Detail Item {{ index + 1 }}
          </div>

          <div class="relative ml-auto">
            <div
              :class="[isActive ? 'rotate-180' : 'rotate-45']"
              class="i-ph:x-circle h-6 w-6 text-gray-600 transition-transform duration-500"
            />
          </div>
        </div>

        <DetailsContent
          class="overflow-hidden px-4 transition-all duration-500 will-change-height"
        >
          <p
            class="pb-4 font-light leading-relaxed tracking-wide text-gray-800"
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
