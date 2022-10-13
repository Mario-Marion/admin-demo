<template>
  <div>
    <lll-form ref="Form" :options="options"></lll-form>
    <el-button @click="submit">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </div>
</template>

<script setup lang="ts">
/**@labelwidth el-form表单属性                     【可选】
 * @justify formItem 布局，el-row属性              【可选】
 * @gutter formItem间距，类型为number              【可选】
 * @defaultVal 集中设置formItem默认值，权重最高     【可选】
 * @rules 集中设定formItem验证规则                  【可选】
 * @showButton 表单按钮默认为空                     【可选】
 * @callback 表单事件回调                           【可选】
 *   -submitHandle 提交回调                         【可选】
 *   -resetHandle 重置回调                          【可选】
 *   -updateHandle 更新回调                         【可选】
 * @columns 设置formItem                           
 *   -value是默认值,权重较低                        【可选】
 *   -rules是验证规则                               【可选】
 *   -type是formItem内容标签类型,默认input           【可选】
 *   -list 如果type为select ，那就为必选
 *   -span el-clo 属性                              【可选】
 * ####组件暴露出的属性方法
 *  formRef,    // 表单元素
 *  submitForm, // 暴露提交方法,可外部调用
 *  resetForm   // 暴露重置方法,可外部调用
 */


const Form = ref();
const options = reactive({
  defaultVal: {
    password: 'Aa123456',
  },
  rules: {},
  // showButton: ['submit', 'reset'],
  // callback: {
  // submitHandle: (valid: boolean, fields: any) => {
  //   console.log('提交回调',valid, fields);
  // },
  // resetHandle: () => {
  //   console.log('重置回调');
  // },
  // updateHandle: () => {
  //   console.log('更新回调');
  // },
  // },
  columns: [{
    label: '用户名',
    prop: 'name',
    value: '阿斯顿撒旦',
    rules: { required: true, message: '不是吧', trigger: 'blur' }
  },
  {
    label: '身份',
    prop: 'role',
    type: 'select',
    value: 0,
    list: [
      {
        label: '张仲景',
        value: 0
      },
      {
        label: '店小二',
        value: 1
      }
    ]
  },
  {
    label: '账号',
    prop: 'username',
  },
  {
    label: '密码',
    prop: 'password',
  },
  {
    label: '确认密码',
    prop: 'checkPass',
  },
  {
    label: '账号状态',
    prop: 'status',
    type: 'select',
    value: 1,
    list: [
      {
        label: '禁用',
        value: 0
      },
      {
        label: '开启',
        value: 1
      }
    ]
  }
  ]
})
// 调用表单暴露的方法|属性
const submit = async () => { // 提交
  const result = await Form.value.submitForm()
  console.log(result);
}
const reset = async () => { // 提交
  Form.value.resetForm()
}

</script>
