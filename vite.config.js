import { defineConfig } from 'vite'
import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    WindiCSS(),
    Icons(),
    AutoImport({
      // just auto import vue
      imports: ['vue', 'vue-router']
    }),
    Components({
      // generate `components.d.ts` for ts support with Volar
      dts: true,
      // auto import icons
      resolvers: [
        IconsResolver({
          componentPrefix: 'icon'
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      '@': resolve(__dirname, './src'),
      src: resolve(__dirname, './src')
    }
  },
  server: {
    https: false,
    port: 3000,
    compress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    brotliSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/')) {
            const modules = ['quasar']
            const chunk = modules.find((module) => id.includes(`/node_modules/${module}`))
            return chunk ? `vendor-${chunk}` : 'vendor'
          }
        }
      }
    }
  }
})
