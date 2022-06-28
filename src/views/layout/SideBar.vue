
<template>
  <router-link to="/">
    <logo />
  </router-link>
  <div class="ve_el_menu">
    <el-scrollbar>
      <el-menu :default-active="defaultActive" :collapse="opened" :collapseTransition="true" :unique-opened="false">
        <slide-menu v-for="item in menus" :key="item.id" :menu="item"></slide-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import type { RouteLocationNormalized } from 'vue-router'
import Logo from "./components/Logo.vue";
import SlideMenu from "./components/SlideMenu.vue";
import { useBaseStore } from "@/stores/base";
const baseStore = useBaseStore();

const route: RouteLocationNormalized = useRoute();
const opened = computed(() => baseStore.slider.opened);
const menus = computed(() => baseStore.menuList);

const defaultActive = computed(() => {
  return route.name
});

</script>

<style lang="less" scoped>
a:active {
  color: @base_color;
}
</style>
