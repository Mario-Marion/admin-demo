<template>
  <div>home</div>
</template>

<script setup lang="ts">
const message = () => {
  ElMessage.success({
    duration: 2000,
    message: h('p', null, [
      h('span', null, '登陆成功'),
      h('i', { style: 'color: teal;padding-left:20px;' }, 123)
    ])
  })
  // ElMessageBox.confirm(
  //   'It will permanently delete the file. Continue?',
  //   'Warning',
  //   {
  //     type: 'warning',
  //   }
  // )
  ElNotification.success({
    title: 'Info',
    message: 'This is a message without close button',
    showClose: false,
  })
}

</script>

<style lang="less" scoped>
</style>