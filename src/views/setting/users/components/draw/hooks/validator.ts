import type { FormInstance, FormRules } from 'element-plus'
import type { InternalRuleItem, Value } from 'async-validator'
import type { Ref } from 'vue'

/**
 * 
 * @param Form 表单实例
 * @param FormData 表单数据
 * @returns 表单验证规则
 */
type DrawForm = { checkPass?: string } & Omit<Mock.UserObj, 'id'>
const useValidator = (Form: FormInstance, FormData: Ref<DrawForm>) => {

  type Callback = (error?: string | Error) => void
  const validateName = (rule: InternalRuleItem, value: Value, callback: Callback) => {
    if (value === '') {
      callback(new Error('请输入用户名'))
    } else if (value?.length < 3 || value?.length > 8) {
      callback(new Error('用户名为3到8个字符'))
    } else if (new RegExp(/(^\s+)|(\s+$)|\s+/g).test(value)) {
      callback(new Error('不许包含空格'))
    }
    callback()
  }
  const validateUsername = (rule: InternalRuleItem, value: Value, callback: Callback) => {
    if (value === '') {
      callback(new Error('请输入账户'))
    } else if (new RegExp(/(^\s+)|(\s+$)|\s+/g).test(value)) {
      callback(new Error('不许包含空格'))
    } else if (new RegExp(/[^\w]/ig).test(value)) {
      callback(new Error('只能输入字母数字'))
    } else if (value.length < 3 || value.length > 20) {
      callback(new Error('账户为3到20个字符'))
    }
    callback()
  }
  const validatePass = (rule: InternalRuleItem, value: Value, callback: Callback) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else if (new RegExp(/(^\s+)|(\s+$)|\s+/g).test(value)) {
      callback(new Error('不许包含空格'))
    } else if (new RegExp(/[\u4e00-\u9fa5]/g).test(value)) {
      callback(new Error('不许包含中文'))
    } else if (!new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/).test(value)) {
      callback(new Error('密码要包含大小写字母和数字,长度不小于6大于16'))
    } else {
      if (FormData.value.checkPass !== '') {
        if (!Form) return
        Form.validateField('checkPass', () => null) // 调用确认密码规则
      }
      callback()
    }
  }
  const validatePass2 = (rule: InternalRuleItem, value: Value, callback: Callback) => {

    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== FormData.value.password) {
      callback(new Error("两次不密码不匹配"))
    } else {
      callback()
    }
  }

  const validatorRole = (rule: InternalRuleItem, value: Value, callback: Callback) => {
    if (value === undefined) {
      callback(new Error('请选择身份'))
    }
    callback()
  }
  return reactive<FormRules>({
    name: [{ required: true, validator: validateName, trigger: 'blur' }],
    roleId: [{ required: true, validator: validatorRole, trigger: 'change' }],
    username: [{ required: true, validator: validateUsername, trigger: 'blur' },],
    password: [{ required: true, validator: validatePass, trigger: 'blur' },],
    checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' },],
    status: [{ required: true, message: '请选择账户状态', trigger: 'change' }]
  });

}

export default useValidator