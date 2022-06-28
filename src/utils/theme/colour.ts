import type { Ref } from "vue";

export interface Item { name: string, value: string }
type attrs = "themeList" | "lightList" | "darkList";

function useColour(): Record<attrs, Ref<Item[]>> {
  // 主题颜色变量组
  const themeList = ref<Item[]>([
    { name: '拂晓蓝(默认)', value: '#409eff' },
    { name: '薄暮红', value: '#e74c3c' },
    { name: '火山橘', value: '#e67e22' },
    { name: '日暮黄', value: '#f1c40f' },
    { name: '极光绿', value: '#16a085' },
    { name: '酱紫', value: '#9b59b6' },
  ])
  // 明亮模式全局颜色
  const lightList = ref<Item[]>([
    { name: '--main-bg', value: '#FFF' },
    { name: '--theme-bg', value: '#FFF' },
    { name: '--todos-shadow-color', value: 'rgba(0, 0, 0, 0.3)' },
  ])
  // 暗黑模式全局颜色
  const darkList = ref<Item[]>([
    { name: '--main-bg', value: '#222321' },
    { name: '--theme-bg', value: '#000' },
    { name: '--todos-shadow-color', value: 'rgba(255, 255, 255, 0.3)' },
  ])
  return {
    lightList, darkList, themeList
  }
}

export default useColour