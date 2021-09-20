## `Vite 2.x + Vue 3.x + quasar 2.x starter ⚡`

This starter template also includes:

- [Vue Router 4.x](https://github.com/vuejs/vue-router-next)
- [quasar 2.x](https://github.com/quasarframework/quasar)
- [vite 2.x](https://github.com/vitejs/vite)
- [Windi CSS](https://github.com/windicss/windicss)
- Use the [new `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)
- [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly
- [Use icons from any icon sets, with no compromise](https://github.com/antfu/unplugin-icons)


- [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing
- [`vite-plugin-windicss`](https://github.com/antfu/vite-plugin-windicss) - Windi CSS Integration


## Broken install binary on macOS #462
> #!/usr/bin/env node throw new Error(esbuild: Failed to install correctly);

```shell
npm i
node node_modules/esbuild/install.js

npm run dev
```