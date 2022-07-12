<template>
  <div class="ve_container">
    <!-- 搜索 -->
    <el-form ref="queryForm" :inline="true" :model="searchForm">
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
    <veTable :table="tableData" :pagination="{
      // onSizeChange: (val) => handleSizeChange(val, params, getDataList),
      // onCurrentChange: (val) => handleCurrentChange(val, params, getDataList),
      onSizeChange: () => { },
      onCurrentChange: () => { },
      currentPage: page,
      pageSize: limit,
      total: total,
    }">
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
    </veTable>
    <Draw v-if="drawShow" v-model:show="drawShow" :drawData="drawData" />
  </div>
</template>
<script setup lang="ts">
import { getUserList, deleteUser } from "@/axios/user"
import type { FormInstance } from 'element-plus'
import IEPEdit from '~icons/ep/edit'
import IEPDelete from '~icons/ep/delete'
import Draw from './components/draw'

const queryForm = ref<FormInstance>();
const tableData = ref<Mock.UserObj[]>([]);

interface SearchForm {
  name: string;
  limit: number;
  page: number;
  total: number;
  status: number;
}
const searchForm: SearchForm = reactive({
  name: "",
  limit: 10,
  page: 1,
  total: 0,
  status: -1,
});
const { name, limit, page, total, status } = toRefs(searchForm);

/**
 * @description: 获取列表数据
 * @param {*}
 * @return {*}
 */
const getDataList = async (params: Axios.SearchParams) => {
  const { status, data } = await getUserList(params);
  if (status == 200) {
    const { limit, page, total, list } = data;
    searchForm.limit = limit;
    searchForm.page = page;
    searchForm.total = total;
    tableData.value = list;
  }
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  getDataList({ limit: searchForm.limit, page: searchForm.page });
}
onBeforeMount(() => {
  getDataList({ limit: searchForm.limit, page: searchForm.page });
});


const drawShow = ref(false);
const drawData = ref();
/**
 * @description 添加用户
 */
const handleAdd = () => {
  drawShow.value = true
  drawData.value = {
    type: 'add',
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

  const data = tableData.value.find(item => item.id === row.id);

  drawData.value = {
    type: 'edit',
    ...data
  }
}
/**
 * @description 删除用户
 */
const reload: any = inject("reload");
const handleDelete = async (id: number) => {
  const result = await ElMessageBox.confirm('是否确定删除?', 'Warning', { type: 'warning', });
  if (result) {
    const { status } = await deleteUser({ id });
    if (status === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      reload()
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