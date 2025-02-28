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
      props: (route) => {
        const reportId = route.query.report_id
        return isValidParam(reportId) ? { reportId } : {} // Pass as prop only if valid
      },
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route
      redirect: '/',
    },
  ],
})

export default router
