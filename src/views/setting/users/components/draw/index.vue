<template>
  <div>
    <el-drawer v-model="selfShow" :direction="direction" :title="`${info.type === 'add' ? `添加` : `编辑`}`"
      :before-close="handleClose">
      <template #default>
        <lll-form ref="Form" :options="options"></lll-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { registerUser, updateUser } from '@/axios/user'
import { toMD5 } from '@/plugin/crypto'
import useValidator from './hooks/validator'
import { useColumns } from './hooks/formData'
import XE from 'xe-utils'

type DrawForm = { checkPass?: string } & Omit<Mock.UserObj, 'id'>
type Info = { type: string, id: number, reload: () => void }
interface Props {
  show: boolean,
  info: Info,
  drawForm: DrawForm,
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:show', show: boolean): void
}>();

const Form = ref();
const selfShow = ref(true);
const { info, drawForm } = toRefs(props);

const newFormData = ref<DrawForm>(XE.clone(drawForm.value)); // 最新表单数据
const options = reactive<LLLForm.Options>({  // 定义表单
  labelwidth: '80PX',
  justify: "center",
  callback: {
    updateHandle: (data: DrawForm) => { newFormData.value = data }
  },
  rules: {},
  columns: [],
})


// 格式化 options.columns
useColumns(drawForm.value, options);
nextTick(() => {
  // 获取验证规则
  options.rules = useValidator(Form.value.formRef, newFormData)
})



const direction = ref('rtl');
/**
 * @descrption 关闭
 */
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('是否取消提交?')
    .then(() => {
      // done()
      emit('update:show', false)
    })
    .catch(() => {
      // catch error
    })
}
/**
 * @descrption 取消
 */
function cancelClick() {
  emit('update:show', false)
}

/**
 * @descrption 提交
 */
async function submitForm() {
  const result = await Form.value.submitForm()
  if (result) {
    if (!newFormData.value) return
    let resCode;
    const { name, roleId, username, password, status } = newFormData.value;

    // 添加
    if (info.value.type === "add") {
      const { status: code } = await registerUser({ name, role_id: roleId, username, password: toMD5(password), status });
      resCode = code
    } else {
      // 编辑
      type DrawDataAttrs = keyof DrawForm
      const params: any = { id: info.value.id };
      for (let [attr, val] of Object.entries(newFormData.value) as [DrawDataAttrs, string | number][]) {
        if (drawForm.value[attr] !== val) {
          params[attr] = val
        }
      }

      if (Object.keys(params).length > 1) {
        const { status: code } = await updateUser(params);
        resCode = code
      }

    }

    // 交互提示，关闭draw，刷新路由
    const load = (type: "success" | "error") => {
      emit('update:show', false)
      ElMessage({
        type,
        duration: 2000,
        message: `${type === 'success' ? `提交成功` : `提交失败`}`
      })
      info.value.reload()
    }
    if (resCode === 200) {
      load('success')
    } else {
      load('error')
    }

  }
}
</script>

<style scoped>
</style>