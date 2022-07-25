<template>
  <bg>
    <div class="ve_container">
      <el-card>
        <h1>admin</h1>
        <transition name="el-fade-in-linear">
          <el-form :model="form" :rules="rules" v-show="!success" class="ve_form" ref="ref_form" :inline="false"
            @keyup.enter="onSubmit">
            <el-form-item prop="username">
              <el-input v-model.trim="username" placeholder="用户名">
                <template #prepend>
                  <el-icon :size="20">
                    <i-ep-avatar />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model.trim="password" show-password placeholder="密码">
                <template #prepend>
                  <el-icon :size="20">
                    <IEpKey />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="ve_submit" type="primary" @click="onSubmit">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </transition>
      </el-card>
    </div>
  </bg>
</template>

<script setup lang="ts">
import bg from './components/bg.vue'
import { lStorage } from '@/plugin/ls'
import setTheme from "@/utils/theme/theme";
import type { FormInstance } from 'element-plus'
import { login } from '@/axios/user'
import { useBaseStore } from "@/stores/base";
import { SET_TOKEN, SET_UNAME, CLEAR_TOKEN_CNAME_MENU } from "@/stores/constant"
import { toMD5 } from '@/plugin/crypto';

const ref_form = ref<FormInstance>();
const form = reactive({
  username: "Administrator",
  password: "Aa123546",
});
const { username, password } = toRefs(form);
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}
const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
};



const baseStore = useBaseStore();
const router = useRouter();
const success = ref<boolean>(false);
// 清除浏览器存储
baseStore[CLEAR_TOKEN_CNAME_MENU]()

onBeforeMount(() => {
  const theme = localStorage.getItem('vueuse-color-scheme');
  theme ? document.documentElement.classList.add(theme) : ''
  const color = lStorage.getItem('theme')
  color ? setTheme(color) : ''
})

const onSubmit = () => {
  if (!ref_form.value) return
  ref_form.value.validate(async (valid: boolean): Promise<void> => {
    if (valid) {
      const { status, data } = await login({ username: form.username, password: toMD5(form.password) });
      if (status === 200) {
        const { token, name } = data;
        ElMessage.success({
          duration: 2000,
          message: h('p', null, [
            h('span', null, '登陆成功'),
            h('i', { style: 'color: teal;padding-left:20px;' }, name)
          ])
        })
        baseStore[SET_TOKEN](token)
        baseStore[SET_UNAME](name)
        success.value = true;
        router.replace({ name: "Layout" });
      }
    } else {
      return
    }
  });
};
</script>

<style lang="less" scoped>
.ve_container {
  position: absolute;
  z-index: 1;
  width: 400px;
  top: 50%;
  right: 200px;
  transform: translateY(-50%);
  transition: all 1s;
  min-height: 273px;
  text-align: center;

  @media (max-width: 900px) {
    top: 35%;
    right: 50%;
    transform: translate(50%, -50%);
  }

  h1 {
    font-size: 24px;
    transition: all 1s;
    font-weight: bold;
    margin-bottom: 36px;
  }

  .ve_form {
    .ve_submit {
      width: 100%;
    }

    :dee(.el-input-group__prepend) {
      padding: 0 10px;
    }
  }
}
</style>
