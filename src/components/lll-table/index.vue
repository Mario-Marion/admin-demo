<template>

  <div class="ve_table">
    <el-row v-delete class="ve_p_10">
      <slot name="tool_bar"></slot>
    </el-row>
    <div class="ve_table_page">
      <!-- 列表 -->
      <div class="ve_table_content" ref="tableBox">
        <el-table ref="elTable" stripe border highlight-current-row :data="table">
          <slot></slot>
          <template #empty>
            <el-empty description="暂无数据"></el-empty>
          </template>
        </el-table>
      </div>
      <!-- 分页 -->
      <slot name="pagination">
        <template v-if="pagination">
          <el-pagination background :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper"
            :hide-on-single-page="true" v-model:currentPage="pagination.page" v-model:page-size="pagination.limit"
            :total="pagination.total" @size-change="pagination.onSizeChange"
            @current-change="pagination.onCurrentChange" />
        </template>
      </slot>
    </div>
  </div>
</template>


<script lang="ts">
export default {
  directives: {
    delete: (el: HTMLElement) => {
      const length = el.children.length;
      if (length <= 0) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    },
  }
}
</script>
<script lang="ts" setup>

interface Pagination { page: number, limit: number, total: number, onSizeChange: any, onCurrentChange: any };
const props = defineProps<{
  table: Mock.RoleObj[] | Mock.UserObj[],
  pagination?: Pagination
}>();
const { table, pagination } = toRefs(props);

</script>
<style lang="less" scoped>
.ve_table {
  flex: 1;
  display: flex;
  flex-direction: column;

  .ve_table_page {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;

    .ve_table_content {
      flex: 1;
    }
  }

  .el-pagination {
    margin-top: 20px;
  }
}
</style>
