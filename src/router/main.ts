export default {
  path: "/",
  name: "Layout",
  component: () => import("@/views/layout/index.vue"),
  redirect: { name: "Home" },
  children: [
    {
      path: "home",
      name: "Home",
      component: () => import("@/views/Home.vue"),
    },
  ],
};
