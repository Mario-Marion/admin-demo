import { createRouter, createWebHistory } from 'vue-router'
import globalRoutes from './global'
import mainRoutes from './main'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: globalRoutes.concat(mainRoutes)
})
export default router
