<template>
  <div class="ve_personal">
    <el-button-group>
      <el-button title="刷新" style="border: none; font-size: 20px" circle plain @click="reload()">
        <el-icon :size="20" style="vertical-align: middle">
          <IEpRefresh />
        </el-icon>
      </el-button>
      <el-button title="全屏" style="border: none; font-size: 20px" circle plain @click="toggle()">
        <el-icon :size="14" style="vertical-align: middle">
          <i-ep-full-screen />
        </el-icon>
      </el-button>
      <el-button title="主题" style="border: none; " circle plain>
        <el-color-picker v-model="theme_color" :predefine="predefineColors" @change="changTheme" />
      </el-button>
      <el-switch v-model="dark" class="mt-2" @change="toggleDark" inline-prompt active-icon="moon"
        inactive-icon="sunny" />
    </el-button-group>
    <el-divider direction="vertical"></el-divider>
    <el-dropdown @command="handleCommand">
      <span class="ve_nav_dropdown">
        {{ uname }}
        <el-icon>
          <i-ep-arrow-down-bold />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="{ name: 'Login' }">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useToggleColor from "@/utils/theme/toggleColor";
import { lStorage } from '@/plugin/ls'
import { useBaseStore } from "@/stores/base";
import useColour from "@/utils/theme/colour";
import setTheme from "@/utils/theme/theme";
import type { Item } from "@/utils/theme/colour";
const { toggle } = useFullscreen();

const reload: any = inject("reload");

const router = useRouter();
const handleCommand = (command: string) => {
  router.push(command);
};
const baseStore = useBaseStore();
const uname = computed(() => baseStore.uname);



const theme_color = ref("#409EFF");
// 获取主题上次保存
onBeforeMount(() => {
  const color = lStorage.getItem('theme');
  if (color) {
    setTheme(color)
    theme_color.value = color
  }
})

// 改变主题
const predefineColors = ref<string[]>([]);
const { themeList } = useColour();
predefineColors.value = themeList.value.map((item: Item) => item.value)
const changTheme = (color: string) => {
  lStorage.setItem('theme', color)
  setTheme(color)
}

// 暗黑模式
const dark = ref<boolean>(false);
// 获取保存模式
onBeforeMount(() => {
  const theme = localStorage.getItem('vueuse-color-scheme');
  if (theme === "dark") {
    dark.value = true
  }
  useToggleColor(dark.value ? 'dark' : 'light')
})


const isDark = useDark();
const toggleDark = () => {
  useToggle(isDark)()
  useToggleColor(dark.value ? 'dark' : 'light')
}


</script>

<style lang="less" scoped>
.ve_personal {
  flex: 1;
  align-items: center;
  text-align: right;

  :deep(.el-dropdown) {
    vertical-align: baseline !important;
  }

  .ve_nav_dropdown {
    font-weight: bold;
  }
}
</style>
