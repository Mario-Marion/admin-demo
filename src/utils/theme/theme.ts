
function setTheme(value: string) {
  // 切换主题色
  const el = ref(null)
  const primary_color = useCssVar('--el-color-primary', el)
  primary_color.value = value
}

export default setTheme