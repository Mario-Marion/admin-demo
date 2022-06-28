
<template>
  <div class="ve_nav_bar">
    <hamburger></hamburger>
    <breadcrumb></breadcrumb>
    <personal></personal>


  </div>
</template>
<script setup lang="ts">
import Hamburger from "./components/Hamburger.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import Personal from "./components/Personal.vue";


</script>
<style lang="less" scoped>
.ve_nav_bar {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
