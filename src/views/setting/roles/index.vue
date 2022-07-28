<template>
  <div class="ve_container">
    <!-- 搜索 -->
    <lll-form ref="searchForm" :options="options"></lll-form>
    <!-- 列表 -->
    <lll-table :table="tableData">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="{ row }">
          <el-tag :type="row.status == 0 ? 'danger' : ''">
            {{ row.status == 0 ? "停用" : "启用" }}
          </el-tag>
        </template>
      </el-table-column>
    </lll-table>
  </div>
</template>

<script setup lang="ts">
import { getRoleList } from "@/axios/role"
// ==============分页
const pageData = reactive({ limit: 10, page: 1 })
const { limit, page } = toRefs(pageData);
// ==============搜索表单
const options: LLLForm.Options = reactive({
  showButton: ['reset'],
  gutter: 10,
  columns: [{
    label: '名称',
    prop: 'name',
    span: 5,
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    value: -1,
    span: 3,
    list: [
      {
        label: '全部',
        value: -1
      },
      {
        label: '开启',
        value: 1
      },
      {
        label: '禁用',
        value: 0
      }
    ]
  }],
  callback: {
    updateHandle: (newFormData) => {
      const { name: sVal, status: sStu } = newFormData;
      getDataList({ sVal, sStu, limit: limit.value, page: page.value })
    }
  }
})
const searchForm = ref();

// ==============表单
const tableData = ref<Mock.RoleObj[] | Mock.UserObj[]>([]);
/**
 * @description: 获取列表数据
 * @param {*}
 * @return {*}
 */
const getDataList = async (params: Axios.SearchParams) => {
  const { status, data } = await getRoleList(params);
  if (status == 200) {
    const { list } = data;
    tableData.value = list
  }
};
onMounted(() => {
  getDataList(pageData);
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
