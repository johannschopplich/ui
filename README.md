# @byjohann/components

[![NPM version](https://img.shields.io/npm/v/@byjohann/components?color=a1b858&label=)](https://www.npmjs.com/package/@byjohann/components)

> A collection of Vue.js components for my projects.

## Setup

```bash
# pnpm
pnpm add @byjohann/components

# npm
npm i @byjohann/components

# yarn
yarn add @byjohann/components
```

### Nuxt Support

Nuxt is supported out of the box, but the Vue components provided by this library need to be transpiled for the server-side rendering to work. Add the following to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  build: {
    transpile: ["@byjohann/components"],
  },
});
```

## License

[MIT](./LICENSE) License © 2023-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
