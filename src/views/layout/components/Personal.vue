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
    <el-divider direction="vertical"></el-divider>
    <el-icon>
      <a href="https://github.com/Mario-Marion/admin-demo" style="border: none; font-size: 20px">
        <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" data-v-6c8d2bba="">
          <path fill="currentColor"
            d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z">
          </path>
        </svg>
      </a>
    </el-icon>


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
  display: flex;
  justify-content: end;
  align-items: center;

  :deep(.el-dropdown) {
    vertical-align: baseline !important;
  }

  .ve_nav_dropdown {
    font-weight: bold;
  }
}
</style>
