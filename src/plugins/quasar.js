import { Notify, LocalStorage } from 'quasar'
import 'quasar/dist/quasar.prod.css'
import iconSet from 'quasar/icon-set/svg-material-icons'
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
  iconSet: iconSet,
  plugins: {
    Notify,
    LocalStorage
  }
}
