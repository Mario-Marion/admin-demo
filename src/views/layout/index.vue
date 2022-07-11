<template>
  <el-container>
    <el-aside width="auto">
      <side-bar></side-bar>
    </el-aside>
    <el-container>
      <el-header class="header">
        <navigate-bar></navigate-bar>
      </el-header>

      <el-main>
        <el-scrollbar style="padding: 20px;box-sizing: border-box;">
          <router-view #default="{ Component }">
            <transition name="el-zoom-in-top" mode="out-in">
              <component :key="routerAlive" :is="Component" />
            </transition>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import NavigateBar from "./NavigateBar.vue";
import SideBar from "./SideBar.vue";

const route = useRoute();
const routerAlive = ref<string>('');
watchEffect(() => {
  routerAlive.value = (route.name as string);
});
provide("reload", () => {
  routerAlive.value = Math.random() + "_" + Math.random();
});

</script>
<style lang="less" scoped>
.header {
  height: @nav_height
}

.el-main {
  height: calc(100vh - @nav_height);
  background: @main_bg_color;

  :deep(.el-scrollbar__bar.is-horizontal) {
    visibility: hidden;
  }

  .el-scrollbar {
    background: @theme_bg
  }
}
</style>
