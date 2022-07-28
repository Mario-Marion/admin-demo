<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-if="route.name !== 'HOME'" :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item of paths" :key="item" :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useBaseStore } from "@/stores/base";

const baseStore = useBaseStore();
const route = useRoute();

interface Paths { path: string, name: string }
function findPath(list: Mock.MenuObj[], url: string, paths: Paths[] = []): Paths[] {
  for (let item of list) {
    const path: string = item.url ? item.url.replace(/\//, '-') : '';
    paths.push({ path, name: item.name })
    if (item.url === url) return paths
    if (item.children) {
      const findChildren = findPath(item.children, url, paths);
      if (findChildren.length > 0) return findChildren
    }
    paths.pop()
  }
  return []
}
const paths = computed(() => {
  const name = route.name as string;
  const url = name.replace(/-/, '/').toLowerCase();
  return findPath([...baseStore.staticRoutes, ...baseStore.menuList], url)
})

</script>

<style lang="less" scoped>
</style>
