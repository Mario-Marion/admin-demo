<template>
  <div>
    <el-form ref="formRef" :model="formData" :rules="options.rules" label-width="120px" class="demo-ruleForm"
      status-icon>
      <el-form-item v-for="column of options.columns" :label="column.label" :prop="column.prop" :rules="column.rules">
        <component :is="getComponent(column.type)" v-model:bindValue="formData[column.prop]" v-bind="column">
        </component>
      </el-form-item>
      <el-form-item v-if="showButton?.length">
        <el-button v-if="showButton.includes('submit')" @click="submitForm">提交</el-button>
        <el-button v-if="showButton.includes('reset')" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script lang="ts">
import LllInput from '@/components/lll-input/index.vue'
import LllSelect from '@/components/lll-select/index.vue'
export default {
  components: {
    LllSelect,
    LllInput
  }
}
</script>
<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { getComponent } from '@/utils/dataformat'
import { validatenull } from '@/utils/validate'
import XE from 'xe-utils'

type Props = {
  options: LLLForm.Options
}
const props = defineProps<Props>();
const { options } = toRefs(props);
const { defaultVal, showButton, callback = {} } = options.value


// 监听cloumns属性变化,初始化表单数据

const formData = ref<LLLForm.FormData>({});

const stopWcol = watch(() => options.value.columns, (cur) => {
  const form: LLLForm.FormData = {};
  cur.forEach(({ type, prop, value }) => {
    if (!validatenull(value)) {
      form[prop] = value
    } else if (type) {
      if (['select'].includes(type)) {
        form[prop] = undefined
      }
    } else {
      form[prop] = ''
    }

  })
  let value = XE.clone(defaultVal, true) || {};

  Object.entries(value).forEach(([key, value]) => {
    form[key] = value
  })
  formData.value = form
  console.log('初始化数据', formData.value);
}, {
  deep: true
})
onBeforeUnmount(() => {
  stopWcol()
})


// 监听表单数据更新
watch(() => formData.value, (cur, pre) => {
  if (validatenull(pre)) return
  console.log('数据更新', cur);

  if (!callback.updateHandle) return
  callback.updateHandle(cur)
}, {
  deep: true
})



const formRef = ref<FormInstance>();
/**
 * @descrption 提交
 */
function submitForm() {
  if (!formRef.value) return
  // 验证方法，返回一个成功的promise，Promise<true|false>
  return formRef.value.validate(async (valid, fields) => {
    if (!callback.submitHandle) return
    callback.submitHandle(valid, fields) // 调用提交回调
  }).then(res => {
    return res ? formData.value : res
  })
}
/**
 * @description 重置
 */
const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields() // 重置表格
  if (!callback.resetHandle) return
  callback.resetHandle() // 调用重置回调
}
defineExpose({
  formRef,
  formData,
  submitForm, // 暴露提交方法,可外部调用
  resetForm   // 暴露重置方法,可外部调用
})
</script>

<style lang="less" scoped>
</style>