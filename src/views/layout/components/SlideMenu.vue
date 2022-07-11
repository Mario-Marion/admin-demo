<template>
  <el-sub-menu :index="`/${menu.name}`" v-if="menu.type == 0 && filerMenus(menu.children)">
    <template #title>
      <el-icon :size="16" style="margin-right: 6px">
        <component :is="menu.icon" />
      </el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <slide-menu v-for="child in menu.children" :key="child.id" :menu="child"></slide-menu>
  </el-sub-menu>
  <el-menu-item v-else-if="menu.type == 1" :index="setIndex(menu)" @click="clickMenu(menu)">
    <template #title>
      <el-icon :size="16" style="margin-right: 6px">
        <component :is="menu.icon" />
      </el-icon>
      <span>{{ menu.name }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import Setting from '~icons/ep/setting'
import UserFilled from '~icons/ep/userFilled'
import HelpFilled from '~icons/ep/helpFilled'
import CollectionTag from '~icons/ep/collectionTag'
export default {
  components: {
    Setting,
    UserFilled,
    HelpFilled,
    CollectionTag
  }
}
</script>
<script setup lang="ts">
import XE from 'xe-utils'

type props = {
  menu: any
}
const props = defineProps<props>();
const { menu } = toRefs(props);

const router = useRouter();
const clickMenu = (menu: any) => {
  let name = menu.url.replace(/\//g, "-");
  router.push({
    name,
  });
};

const setIndex = (menu: any) => {
  let index = `${menu.url.replace(/\//g, "-")}`;
  return index;
};
/**
 * @description:过滤空目录
 * @param {*}
 * @return {*}
 */
const filerMenus = (menus: any) => {
  if (menus && menus.length > 0) {
    let _menus = XE.toTreeArray(menus);
    return _menus.some((item) => item.type == 1);
  } else {
    return false;
  }
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
