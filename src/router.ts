import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import mainLayout from 'src/layouts/mainLayout.vue'
import blankLayout from 'src/layouts/blankLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: mainLayout,
    children: generatedRoutes,
  },
  {
    path: '/',
    component: blankLayout,
    children: [
      {
        name: 'all',
        path: ':all(.*)*',
        component: () => import('src/pages/blank/404.vue'),
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('src/pages/blank/login.vue'),
      },
      {
        name: 'register',
        path: 'register',
        component: () => import('src/pages/blank/register.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
