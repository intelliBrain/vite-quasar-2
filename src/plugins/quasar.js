import { Notify, LocalStorage } from 'quasar'
import 'quasar/dist/quasar.prod.css'
import iconSet from 'quasar/icon-set/material-icons'
import '@quasar/extras/material-icons/material-icons.css'
import langCn from 'quasar/lang/zh-CN'

export const quasarConfig = {
  config: {
    brand: {
      primary: '#027BE3',
      secondary: '#26A69A',
      accent: '#9C27B0',
      dark: '#1D1D1D',
      positive: '#21BA45',
      negative: '#F56C6C',
      info: '#31CCEC',
      warning: '#F2C037'
    },
    globalProperties: {}
  },
  //buildIn components iconSet
  iconSet: iconSet,
  lang: langCn,
  plugins: {
    Notify,
    LocalStorage
  }
}
