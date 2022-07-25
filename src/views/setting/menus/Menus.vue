<template>
  <div>
    <button @click="alert">asd</button>
  </div>
</template>

<script setup lang="ts">
const alert = () => {
  ElMessageBox.confirm('Hello world!', 'Title', {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error",
  })
}
</script>

<style lang="less" scoped>
</style>