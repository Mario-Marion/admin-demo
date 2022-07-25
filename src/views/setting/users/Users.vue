<template>
  <div class="ve_container">
    <!-- 搜索 -->
    <el-form ref="queryForm" :inline="true" :model="searchData">
      <el-form-item label="名称" prop="name">
        <el-input v-model="name" placeholder="请输入"
          @keyup.enter="getDataList({ sVal: name, sStu: status, limit, page })" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="status" placeholder="状态" class="status"
          @change="getDataList({ sVal: name, sStu: status, limit, page })">
          <el-option label="全部" :value="-1" />
          <el-option label="开启" :value="1" />
          <el-option label="关闭" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(queryForm)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <lll-table :table="tableData" :pagination="{ onSizeChange, onCurrentChange, page, limit, total }">
      <template #tool_bar>
        <el-button style="width: 100%" @click="handleAdd">Add Item</el-button>
      </template>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="rolename" label="身份">
        <template #default="{ row }">
          <el-tag color="info" size="large" effect="plain">
            {{ row.rolename }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="账户"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status == 0 ? 'danger' : ''">
            {{ row.status == 0 ? "停用" : "启用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="edit" label="操作" fixed="right">
        <template #default="{ row }">
          <template v-if="row.id !== 2">
            <el-button type="primary" link :icon="IEPEdit" @click="handleEdit(row)">编辑</el-button>
            <el-button type="primary" link :icon="IEPDelete" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </lll-table>
    <Draw v-if="drawShow" v-model:show="drawShow" :info="info" :drawForm="drawForm" />

  </div>
</template>
<script setup lang="ts">
import { getUserList, deleteUser } from "@/axios/user"
import type { FormInstance } from 'element-plus'
import IEPEdit from '~icons/ep/edit'
import IEPDelete from '~icons/ep/delete'
import Draw from './components/draw'

// ==============搜索
const queryForm = ref<FormInstance>();
const searchData = reactive({
  name: "",
  status: -1,
});
const { name, status } = toRefs(searchData);

// ==============分页
const pageData = reactive({
  limit: 10,
  page: 1,
  total: 0,
})

const { limit, page, total } = toRefs(pageData);
const onSizeChange = (limit: number) => { getDataList({ limit, page: 1 }) }
const onCurrentChange = (page: number) => { getDataList({ limit: limit.value, page }) }

// ==============表单
const tableData = ref<Mock.UserObj[]>([]);
/**
 * @description: 获取列表数据
 * @param {*}
 * @return {*}
 */
const getDataList = async (params: Axios.SearchParams) => {
  const { status, data } = await getUserList(params);
  if (status == 200) {
    const { limit, page, total, list } = data;
    pageData.limit = limit;
    pageData.page = page;
    pageData.total = total;
    tableData.value = list;
  }
};
const getUsers = () => { getDataList({ limit: pageData.limit, page: pageData.page }) };
onBeforeMount(() => {
  getUsers()
});

/**
 * @description 重置
 */
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  getUsers()
}

// ============== 抽屉
const drawShow = ref(false);
const info = reactive({ type: '', id: -1, reload: getUsers })
const drawForm = ref({});

/**
 * @description 添加用户
 */
const handleAdd = () => {
  drawShow.value = true
  info.type = 'add'
  info.id = -1
  drawForm.value = {
    name: '',
    roleId: 2,
    username: '',
    password: '',
    checkPass: '',
    status: 1,
  }

}
/**
 * @description 编辑用户
 */

const handleEdit = (row: Mock.UserObj) => {
  drawShow.value = true
  info.type = 'edit'
  info.id = row.id
  const data = tableData.value.find(item => item.id === row.id)!;
  const { name, roleId, username, status } = data
  drawForm.value = { name, roleId, username, status }
}
/**
 * @description 删除用户
 */
const handleDelete = async (id: number) => {
  const result = await ElMessageBox.confirm('是否确定删除?', 'Warning', { type: 'warning', });
  if (result) {
    const { status } = await deleteUser({ id });
    if (status === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getUsers()
    }
  }
}

</script>

<style lang="less" scoped>
.el-input {
  max-width: 190px;
}

.status {
  max-width: 80px;
}
</style>