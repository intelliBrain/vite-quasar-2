## `Vite 2.x + Vue 3.x + quasar 2.x starter ⚡`

This starter template also includes:

- [Vue Router 4.x](https://github.com/vuejs/vue-router-next)
- [quasar 2.x](https://github.com/quasarframework/quasar)
- [vite 2.x](https://github.com/vitejs/vite)
- [axios 0.21.x](https://github.com/axios/axios)

## api modules based on axios and vue-router

## Broken install binary on macOS #462

% cat node_modules/esbuild/bin/esbuild
#!/usr/bin/env node
throw new Error(`esbuild: Failed to install correctly`);


```shell
npm i
node node_modules/esbuild/install.js

npm run dev
```


1. Quasar 
2. Components auto importing
3. File based routing
4. Use icons from any icon sets, with no compromise
  {prefix}-{collection}-{icon}
  The collection field follows [Iconify's collection IDs.](https://iconify.design/icon-sets/


## Customizable draggable tree component for Vue.js

基于 vue.draggable  和 quasar 构造可拖动的tree

https://github.com/holiber/sl-vue-tree
https://codepen.io/Evertvdw/details/Bajqedj [参考]
https://github.com/mayank091193/quasar-draggable-tree [参考]

https://github.com/SortableJS/vue.draggable.next
https://github.com/bevacqua/dragula
https://github.com/kutlugsahin/vue-smooth-dnd


## 指定layout


## 使用 svg icon 

There are many advantages of using only svg icons in your website/app:

1. Better app footprint – only used icons will be included in the final build (treeshaking in action)
2. Better quality icons
3. No need for including equivalent webfonts from @quasar/extras or CDN.
4. The current disadvantage is that it is more tedious to use these icons than their webfont counterpart.

简单来讲，积极更小(按需加载)，不需要CDN，为统一，我们使用 svg-material-icons， 当然可以方便的导入其他icon


### 配置
1. 更新 quasar config ,以便系统的组件可以正常使用icon

```js
{
  import iconSet from 'quasar/icon-set/svg-material-icons'
  export const quasarConfig = {
    config: {},
    iconSet: iconSet,
    plugins: {}
  }
}
```

这样配置之后 可以正常使用 notify等 quasar 组件

2. vue 页面使用，按需导入

```vue
<template>
  <div>
    <q-icon :name="matMenu" />
    <q-icon :name="fasFont" />
    <q-btn :icon="mdiAbTesting" />
  </div>
</template>

<script>
import { matMenu } from '@quasar/extras/material-icons'
import { mdiAbTesting } from '@quasar/extras/mdi-v5'
import { fasFont } from '@quasar/extras/fontawesome-v5'

export default {
  // ...
  created () {
    this.matMenu = matMenu
    this.mdiAbTesting = mdiAbTesting
    this.fasFont = fasFont
  }
}
```

## remove experimental status of <script setup>
https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md
https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md



##  jwt refresh token
//https://metamind.readme.io/docs/generate-an-oauth-token-using-a-refresh-token
//https://thedutchlab.com/blog/using-axios-interceptors-for-refreshing-your-api-token