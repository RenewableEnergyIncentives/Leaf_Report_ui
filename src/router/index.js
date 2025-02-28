import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'

const isValidParam = (param) => {
  const regex = /^\d+\.\d+\.[A-Za-z]+(?:\.\d+)?$/
  return regex.test(param)
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/:report_id',
      name: 'allowedParam',
      component: HomePage,
      props: true, // Pass param as a prop
      beforeEnter: (to, from, next) => {
        if (isValidParam(to.params.report_id)) {
          next() // Allow navigation
        } else {
          next('/') // Redirect invalid params to home
        }
      },
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route
      redirect: '/',
    },
  ],
})

export default router
