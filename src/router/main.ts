export type StaticRoute = Mock.MenuObj & { component?: () => Promise<any> }
export const staticRoutes: StaticRoute[] = [
  {
    name: "首页",
    url: 'home',
    component: () => import("@/views/Home.vue"),
    type: 1,
    icon: "HomeFilled",
    sort: 0,
  },
  {
    name: "拖拽组件",
    url: 'drag',
    component: () => import("@/views/drag/index.vue"),
    type: 1,
    icon: "BrushFilled",
    sort: 0,
  },
];
export default {
  path: "/",
  name: "Layout",
  component: () => import("@/views/layout/index.vue"),
  redirect: { name: "HOME" },
  children: [],
};
