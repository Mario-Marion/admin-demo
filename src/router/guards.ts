import {
  SET_MENU_LIST,
  // SET_PERMISSION_LIST
} from "@/stores/constant";
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext, } from "vue-router";
import { getMenuList } from "@/axios/role"
import { useBaseStore } from "@/stores/base";
import globalRoutes from "@/router/global";
import mainRoutes from "@/router/main";
import router from '@/router'
import XE from 'xe-utils'
import NProgress from "nprogress";
import type { StaticRoute } from '@/router/main';
import { staticRoutes } from '@/router/main';


/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */

const viwesDir = import.meta.glob("@/views/**/*.vue");
const fnAddDynamicMenuRoutes = async (menuList: StaticRoute[] = [], routes: RouteRecordRaw[] = []) => {
  let temp: Mock.MenuObj[] = [];
  for (let i = 0; i < menuList.length; i++) {
    if (
      menuList[i].type == 0 &&
      menuList[i].children &&
      menuList[i].children!.length >= 1
    ) {
      temp = temp.concat(menuList[i].children!);
    } else if (menuList[i].type == 1) {
      let route = {
        path: menuList[i].url.replace(/\//g, "-"),
        component: menuList[i].component || viwesDir[`../views/${menuList[i].url}/index.vue`],
        name: menuList[i].url.replace(/\//g, "-").toUpperCase(),
        // meta: {}
      };
      routes.push(route);
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes);
  } else {
    Array.prototype.push.apply(mainRoutes.children, routes)
    router.addRoute(mainRoutes);

  }
};

fnAddDynamicMenuRoutes(staticRoutes)




/**
* @description 判断当前路由类型, global: 全局路由, main: 主入口路由
* @param {*} route 当前路由
*/
function fnCurrentRouteType(route: RouteLocationNormalized, globalRoutes: RouteRecordRaw[] = []) {
  for (let i = 0; i < globalRoutes.length; i++) {
    if (route.name === globalRoutes[i].name) {
      return "global";
    } else if (
      globalRoutes[i].children &&
      (globalRoutes[i].children as RouteRecordRaw[]).length >= 1
    ) {
      fnCurrentRouteType(route, globalRoutes[i].children)
    }
  }
  return "main"
}

// 路由拦截
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const baseStore = useBaseStore();
  let token = baseStore.token;

  NProgress.start();

  if ( // 已经添加了动态路由 或 访问的是全局路由，放行
    fnCurrentRouteType(to, globalRoutes) === "global" ||
    baseStore.menuList.length > 0
  ) {
    if (to.meta.title) {
      document.title = (to.meta.title as string);
    }
    next();
  } else {
    if (!token || !/\S/.test(token)) {
      next({ name: "Login" }); // 
    } else {
      let { status, data } = await getMenuList();
      if (status === 200) {
        // XE.clone 克隆数据 
        // XE.mapTree 循环树状结构数据,类数组 map 方法
        // XE.toArrayTree 把数据变为树状结构
        // https://x-extends.github.io/xe-utils/#/
        let _list: Mock.MenuObj[] = XE.clone(data, true);
        data.forEach((item: Mock.MenuObj, index: number) => {
          if (item.parentId === undefined) {
            const { id, name, url, type, icon, sort } = item;
            _list[index] = { id, name, url, type, icon, sort };
          }
        });

        data = XE.mapTree(
          XE.toArrayTree(_list, {
            sortKey: "sort",
          }),
          (item) => {
            if (
              item.children &&
              item.children.length <= 0
            ) {
              delete item.children;
            }
            return item;
          }
        );
        await fnAddDynamicMenuRoutes(data);
        // 不在路由初始化的时候配置，是因为,动态路由路径下,刷新页面,找不到路由，被此路由匹配
        router.addRoute({
          path: "/:w+",
          redirect: { name: "404" },
        });
        baseStore[SET_MENU_LIST](data)

        next({ ...to, replace: true });
      } else {

        next({ name: "Login" });
      }
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});