import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useBaseStore } from '@/stores/base';
import { ADD_MENULIST } from "@/stores/constant";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { MenuObj } from '@/stores/base'
import Layout from '@/views/layout/index.vue'

const childRoutes: RouteRecordRaw[] = [];
const modules = import.meta.glob("@/components/*/*.vue");
for (const filePath in modules) {
  const field = filePath.split('/');
  const path = `${field[1]}-${field[2].toLowerCase()}`;
  const name = `${field[2].slice(0, 1).toUpperCase()}${field[2].slice(1).toLowerCase()}`;
  childRoutes.push({
    path,
    name,
    component: modules[filePath]
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      // component: () => import("@/components/home/index.vue"),
      redirect: 'components-home',
      children: childRoutes
    }
  ]
});

// console.log(childRoutes)
// console.log(router)


const icons = Object.keys(ElementPlusIconsVue);
function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const baseStore = useBaseStore();
  if (baseStore.menuList.length <= 0) {
    const menuList: MenuObj[] = childRoutes.map(route => ({ id: Date.now(), name: route.name!, icon: icons[random(0, icons.length)] }))
    baseStore[ADD_MENULIST](menuList)
  }
  next();
})
export default router
