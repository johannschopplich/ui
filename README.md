# @byjohann/ui

A collection of Vue.js components for my projects.

## Setup

```bash
# pnpm
pnpm add @byjohann/ui

# npm
npm i @byjohann/ui

# yarn
yarn add @byjohann/ui
```

### Nuxt Usage

Nuxt is supported out of the box. The Vue components provided by this library need to be transpiled for the server-side rendering to work. All you need to do is to add the `@byjohann/ui/nuxt` module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["@byjohann/ui/nuxt"],
});
```

## Components

This library provides a collection of Vue.js components. Here is a list of all available components:

- [AutoGrowTextarea](./src/components/AutoGrowTextarea.vue)
- [DetailsContent](./src/components/DetailsContent.vue)
- [DetailsGroup](./src/components/DetailsGroup.vue)
- [DetailsItem](./src/components/DetailsItem.vue)
- [DotPattern](./src/components/DotPattern.vue)
- [GridBlock](./src/components/GridBlock.vue)
- [GridPattern](./src/components/GridPattern.vue)
- [Marquee](./src/components/Marquee.vue)
- [MasonryGrid](./src/components/MasonryGrid.vue)
- [MediumZoom](./src/components/MediumZoom.vue)
- [ModalsPortal](./src/components/ModalsPortal.vue)
- [MotionText](./src/components/MotionText.vue)
- [Primitive](./src/components/Primitive)
- [ScreenreaderOnly](./src/components/ScreenreaderOnly.vue)
- [ScrollObserver](./src/components/ScrollObserver.vue)
- [ScrollReactor](./src/components/ScrollReactor.vue)
- [ScrollReactorGroup](./src/components/ScrollReactorGroup.vue)
- [ScrollReveal](./src/components/ScrollReveal.vue)
- [ScrollTrigger](./src/components/ScrollTrigger.vue)
- [ScrollTriggerGroup](./src/components/ScrollTriggerGroup.vue)
- [SkeletonZone](./src/components/SkeletonZone.vue)
- [SliderGroup](./src/components/SliderGroup.vue)
- [SliderItem](./src/components/SliderItem.vue)
- [SliderPagination](./src/components/SliderPagination.vue)
- [SpotlightCard](./src/components/SpotlightCard.vue)
- [TextReveal](./src/components/TextReveal.vue)
- [TextRevealToken](./src/components/TextRevealToken.vue)
- [TextShimmer](./src/components/TextShimmer.vue)

## Composables

When working with specific features, you can use the provided composables. Here is a list of all available composables:

- [Modals](./src/composables/modals.ts)

## Mapbox Tools

This library supports Mapbox. Here is a list of all available Mapbox components and composables:

- [useMap](./src/mapbox/composables.ts)
- [MapboxCluster](./src/mapbox/components/MapboxCluster.vue)
- [MapboxImage](./src/mapbox/components/MapboxImage.vue)
- [MapboxImages](./src/mapbox/components/MapboxImages.vue)
- [MapboxLayer](./src/mapbox/components/MapboxLayer.vue)
- [MapboxMap](./src/mapbox/components/MapboxMap.vue)
- [MapboxMarker](./src/mapbox/components/MapboxMarker.vue)
- [MapboxSource](./src/mapbox/components/MapboxSource.vue)

## Utilities

UI development is a lot about colors and typography. Here is a list of all available utilities:

- [Theme Colors](./src/utils/theme-colors.ts)

## License

[MIT](./LICENSE) License © 2023-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
