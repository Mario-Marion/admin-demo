<template>
  <div>
    <el-drawer v-model="selfShow" :direction="direction" :title="`${drawData.type === 'add' ? `添加` : `编辑`}`"
      :before-close="handleClose">

      <template #default>
        <el-form ref="ruleFormRef" :model="drawData" :rules="rules" label-width="120px" class="demo-ruleForm"
          status-icon>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="drawData.name" placeholder="name" />
          </el-form-item>
          <el-form-item label="身份" prop="role">
            <el-select v-model="drawData.roleId" placeholder="请选择">
              <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="账号" prop="username">
            <el-input v-model="drawData.username" placeholder="username" />
          </el-form-item>

          <template v-if="drawData.type === 'add'">
            <el-form-item label="密码" prop="password">
              <el-input v-model="drawData.password" placeholder="password" />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input v-model="drawData.checkPass" placeholder="checkPass" />
            </el-form-item>
          </template>

          <el-form-item label="账号状态" prop="status">
            <el-select v-model="drawData.status" placeholder="请选择">
              <el-option label="开启" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import useValidator from './hooks/validator'
import { getRoleList } from '@/axios/role'
import { registerUser, updateUser } from '@/axios/user'
import { toMD5 } from '@/plugin/crypto'
import XE from 'xe-utils'
const ruleFormRef = ref<FormInstance>();
const selfShow = ref(true);
type DrawData = { type: string, checkPass: string } & Mock.UserObj
interface Props {
  show: boolean,
  drawData: DrawData
}
const props = withDefaults(defineProps<Props>(), {
  drawData: () => ({
    type: 'add',
    id: -1,
    name: '',
    roleId: 2,
    username: '',
    password: '',
    checkPass: '',
    status: 1,
  })
})
const { show, drawData } = toRefs(props);
const emit = defineEmits<{
  (e: 'update:show', show: boolean): void
}>();

const { rules } = useValidator(ruleFormRef, drawData)


const roles = ref<{ value: number, label: string }[]>([]);
const rolesParams = { limit: 999, page: 1 };

onBeforeMount(() => {
  getDataList(rolesParams)
})
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


// 克隆一份数据,发送数据时对比修改哪些属性
const cloneDrawData = ref<DrawData>();
const count = ref(0);
const closeWatch = watch(() => XE.clone(drawData.value, true), (cur, pre) => {
  if (count.value === 0) {
    cloneDrawData.value = XE.clone(pre, true)
  }
  count.value++

}, {
  deep: true
})
onBeforeUnmount(() => {
  closeWatch()
})
const reload: any = inject("reload");// 刷新路由
type DrawDataAttrs = keyof DrawData
const updataAttrs: DrawDataAttrs[] = reactive([]);//存放改变的属性
/**
 * @descrption 提交
 */
function confirmClick() {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      let resCode;
      const { name, roleId, username, password, status } = drawData.value;
      if (drawData.value.type === "add") {
        const { status: code } = await registerUser({ name, role_id: roleId, username, password: toMD5(password), status });
        resCode = code
      } else {
        if (!cloneDrawData.value) return
        const params: any = {};
        for (let [attr, val] of Object.entries(drawData.value) as [DrawDataAttrs, string | number][]) {
          if (cloneDrawData.value[attr as DrawDataAttrs] !== val || attr === 'id') {
            params[attr] = drawData.value[attr]
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
        reload()
      }
      if (resCode === 200) {
        load('success')
      } else {
        load('error')
      }

    }
  })
}
</script>

<style scoped>
</style>