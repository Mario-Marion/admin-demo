<template>
  <div class="ve_menu_logo">
    <div class="ve_logo_img">
      <el-image :src="url" fit="contain"></el-image>
    </div>
    <h3 v-show="!opened" class="ve_logo_title">
      {{ title }}
    </h3>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBaseStore } from "@/stores/base";
import url from '@/assets/logo.svg'
const baseStore = useBaseStore();
const opened = computed(() => baseStore.slider.opened);
const title = "admin";
</script>

<style lang="less" scoped>
.ve_menu_logo {
  width: 100%;
  height: @nav_height;
  white-space: nowrap;
  overflow: hidden;

  .ve_logo_img {
    height: 100%;
    text-align: center;
    // 和side收缩后的宽度一致
    width: @side_close_width;
    // padding: 10px;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;

    .el-image {
      height: 100%;
    }
  }

  .ve_logo_title {
    width: @side_open_width;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    margin: 0;
    vertical-align: middle;
    color: var(--el-text-color-regular);
  }

  &:hover {
    .ve_logo_title {
      color: @base_color;
    }
  }
}
</style>
