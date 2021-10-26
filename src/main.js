import { createApp } from 'vue'
import App from './App.vue'

import { Quasar } from 'quasar'
import QuasarConfig from 'src/plugins/quasar'
createApp(App).use(Quasar, QuasarConfig).mount('#app')
