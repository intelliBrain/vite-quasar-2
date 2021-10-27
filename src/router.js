import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import MainLayout from 'src/layouts/mainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: generatedRoutes,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
