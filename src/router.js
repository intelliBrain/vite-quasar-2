import { createRouter, createWebHistory } from 'vue-router'

import generatedRoutes from 'virtual:generated-pages'

console.log(generatedRoutes)
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [...generatedRoutes]
  },
  {
    path: '/',
    component: () => import('src/layouts/BlankLayout.vue'),
    children: [
      {
        name: 'all',
        path: ':all(.*)*',
        component: () => import('src/pages/[...all].vue')
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('src/pages/login.vue')
      },
      {
        name: 'register',
        path: 'register',
        component: () => import('src/pages/register.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
