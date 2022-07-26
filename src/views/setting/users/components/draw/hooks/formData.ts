
import { getRoleList } from '@/axios/role'



/**
 * @description 格式化成表单配置数据,columns属性的数据
 * @param drawForm 未格式化初始数据
 * @param options 表单配置
 */
export const useColumns = (drawForm: { [p: string]: string | number }, options: LLLForm.Options) => {

  const roles = ref<{ value: number, label: string }[]>([]);
  /**
   * @descrption 获取身份列表
   */
  const getDataList = async (params: Axios.SearchParams) => {
    const { status, data }: { status: number, data: Axios.RolesData } = await getRoleList(params);
    if (status == 200) {
      roles.value = data.list.map(item => {
        return { value: item.id, label: item.name }
      })
    }
  };
  const rolesParams = { limit: 999, page: 1 };
  getDataList(rolesParams)

  //  status 列表
  const statusList = reactive<{ value: number, label: string }[]>([{
    label: '禁用',
    value: 0
  },
  {
    label: '启用',
    value: 1
  }]);

  // columns 映射表
  const mirror: { [p: string]: { label: string, type?: string } } = {
    name: { label: '用户名' },
    roleId: { label: '身份', type: 'select' },
    username: { label: '账户' },
    password: { label: '密码' },
    checkPass: { label: '确认密码' },
    status: { label: '状态', type: 'select' },
  }



  // role 列表,数据是后端数据,监听更新表单数据
  const stopWRo = watch(roles, (cur) => {
    // 格式化数据 columns
    const columns = ref<LLLForm.Column[]>([]);
    Object.entries(drawForm).forEach(([prop, value]) => {
      const formItem = mirror[prop];
      let item: LLLForm.Column = { ...formItem, prop, value, span: 20 };
      if (prop === 'roleId') {
        item = { ...formItem, prop, value, list: cur, span: 20 }
      }
      if (prop === 'status') {
        item = { ...formItem, prop, value, list: statusList, span: 20 }
      }
      columns.value.push(item)
    });
    options.columns = columns.value

  })
  onBeforeUnmount(() => {
    stopWRo()
  })
}
