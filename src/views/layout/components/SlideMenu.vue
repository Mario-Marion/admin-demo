<template>

  <el-menu-item :index="menu.name" @click="clickMenu(menu)">
    <el-icon :size="16" style="margin-right: 6px">
      <component :is="menu.icon" />
    </el-icon>
    <template #title>

      <span>{{ menu.name }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { toRefs } from "vue";

type props = {
  menu: any
}
const props = defineProps<props>();
const { menu } = toRefs(props);

const router = useRouter();
const clickMenu = (menu: any) => {
  let name = menu.name
  router.push({
    name,
  });
};



</script>

<style lang="less" scoped>
.el-menu-item .el-icon svg {
  vertical-align: unset;
}

.el-sub-menu__title .el-icon svg {
  vertical-align: unset;
}


.el-menu {
  border-right: 0;
}
</style>
