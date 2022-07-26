
import type { FormRules, FormItemRule, ValidateFieldsError } from 'element-plus'
declare global {
  namespace LLLForm {
    interface Column {
      label: string,
      span?: number,
      prop: string,
      type?: string,
      value?: string | number | [], // 默认值
      rules?: FormItemRule | FormItemRule[],
      list?: { value: string | number, label: string }[],
      placeholder?: string,
    }
    interface FormData {
      [k: string]: string | number | undefined | []
    };
    interface Options {
      defaultVal?: FormData, // 默认值 格式:{ [prop]:any }
      showButton?: string[],
      rules?: FormRules,
      callback?: {
        submitHandle?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void,
        resetHandle?: () => void,
        updateHandle?: (fromData: T) => void,
      },
      columns: Column[],
      labelwidth?: string,
      justify?: string,
      align?: string,
      gutter?: number,
    }
  }

}
export { }