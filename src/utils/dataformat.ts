import { KEY_COMPONENT_NAME } from '@/global/constants'
import { validatenull } from '@/utils/validate'
import type { ComputedRef, Ref } from 'vue'
/**
 * @description 动态获取组件
 */
export const getComponent = (type: string = "input", component?: any) => {
  if (!validatenull(component)) {
    return component;
  } else if (['password', 'textarea', 'search'].includes(type)) {
    type = 'input';
  }
  return KEY_COMPONENT_NAME + type;
};




/**
 * @description 设置占位符
 */
type Props = Readonly<{
  label: string;
  type?: string | undefined;
  placeholder?: string | undefined;
}>

export const usePlaceholder = (props: Props) => {
  const { placeholder: ph, label, type } = toRefs(props);
  let prefix = '请输入';
  if (type?.value === 'select') {
    prefix = "请选择"
  }
  const placeholder: ComputedRef<string> = computed(() => {
    return ph?.value ? ph.value : `${prefix} ${label?.value}`
  })
  return { placeholder }
}
/**
 * @description 声明组件自己的状态,和数据更新提交
 */
export const useInitVal = (emit: any, bindValue: Ref<string | number | undefined> | undefined) => {
  // props属性 为readonly,组件自己维护状态,初始状态由父组件传递
  const text = ref<string | number>();
  watchEffect(() => {
    text.value = bindValue?.value
  })
  /**
   * @description 更新数据
   */
  const update = (value: string | number) => {

    emit('update:bindValue', value)
  }

  return {
    text,
    update
  }
}