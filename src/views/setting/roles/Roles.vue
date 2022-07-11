<template>
  <div class="ve_container">
    <!-- 搜索 -->
    <el-form ref="queryForm" :inline="true" :model="searchForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="name" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="status" placeholder="状态" class="status">
          <el-option label="全部" :value="-1" />
          <el-option label="开启" :value="1" />
          <el-option label="关闭" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDataList({ sVal: name, sStu: status, limit, page })">
          搜索
        </el-button>
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
      </template>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="{ row }">
          <el-tag :type="row.status == 0 ? 'danger' : ''">
            {{ row.status == 0 ? "停用" : "启用" }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column fixed="right" label="操作">
        <template v-slot:default="{ row }">
          <el-button @click.prevent="handleEdit(menus.edit.name, row)" type="primary" size="small">
            {{ menus.edit.name }}
          </el-button>
          <el-button v-permission="['del']" @click.prevent="handleDel(row.id)" type="danger" size="small">
            {{ menus.del.name }}
          </el-button>
          <el-button v-permission="['member']" @click.prevent="allMember(row.id)" type="info" size="small">
            {{ menus.member.name }}
          </el-button>
        </template>
      </el-table-column> -->
    </veTable>
  </div>
</template>

<script setup lang="ts">
import { getRoleList } from "@/axios/role"
import veTable from '@/components/veTable/VeTable.vue'
import type { FormInstance } from 'element-plus'

const queryForm = ref<FormInstance>();
const tableData = ref<Mock.RoleObj[] | Mock.UserObj[]>([]);

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
  const { status, data } = await getRoleList(params);
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
onMounted(() => {
  getDataList({ limit: searchForm.limit, page: searchForm.page });
});
</script>

<style lang="less" scoped>
.el-input {
  max-width: 190px;
}

.status {
  max-width: 80px;
}
</style>