import { createApp } from 'vue'
import App from './App.vue'

import { Quasar } from 'quasar'
import { quasarConfig } from 'src/plugins/quasar.js'

import 'virtual:windi.css'

import 'src/assets/styles/index.scss'
import router from './router'
import store from './store'

createApp(App).use(Quasar, quasarConfig).use(router).use(store).mount('#app')
