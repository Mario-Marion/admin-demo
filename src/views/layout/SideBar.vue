
<template>
  <router-link to="/">
    <logo />
  </router-link>
  <div class="ve_el_menu">
    <el-scrollbar>
      <el-menu :default-active="defaultActive" :collapse="opened" :collapseTransition="true" :unique-opened="false">
        <slide-menu v-for="item in menus" :key="item.name" :menu="item"></slide-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import Logo from "./components/Logo.vue";
import SlideMenu from "./components/SlideMenu.vue";
import { useBaseStore } from "@/stores/base";
// 侧边栏是否展开
const baseStore = useBaseStore();
const opened = computed(() => baseStore.slider.opened);
// 菜单列表
const menus = computed(() => [...baseStore.staticRoutes, ...baseStore.menuList]);
// 当前选中菜单
const route = useRoute();
const defaultActive = computed(() => { return route.name });

</script>

<style lang="less" scoped>
a:active {
  color: @base_color;
}
</style>
