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

## License

[MIT](./LICENSE) License © 2023-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
