import { createApp } from 'vue'
import router from 'src/router'
import App from 'src/App.vue'

import 'uno.css'

import { Quasar } from 'quasar'
import QuasarConfig from 'src/plugins/quasar'
createApp(App).use(router).use(Quasar, QuasarConfig).mount('#app')
