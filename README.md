# @byjohann/ui

[![NPM version](https://img.shields.io/npm/v/@byjohann/ui?color=a1b858&label=)](https://www.npmjs.com/package/@byjohann/ui)

> A collection of Vue.js components for my projects.

## Setup

```bash
# pnpm
pnpm add @byjohann/ui

# npm
npm i @byjohann/ui

# yarn
yarn add @byjohann/ui
```

### Nuxt Support

Nuxt is supported out of the box, but the Vue components provided by this library need to be transpiled for the server-side rendering to work. Add the following to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  build: {
    transpile: ["@byjohann/ui"],
  },
});
```

## License

[MIT](./LICENSE) License © 2023-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
