<template>
  <div v-addClass class="ve_table">
    <!-- table工具条 -->
    <el-row v-delete class="ve_header_row_class_name ve_p_10">
      <slot name="tool_bar"></slot>
    </el-row>
    <div class="ve_table_page">
      <!-- 列表 -->
      <div class="ve_table_content" ref="tableBox">
        <el-table ref="elTable" height="100%" stripe border highlight-current-row
          header-row-class-name="ve_header_row_class_name" header-cell-class-name="ve_header_cell_class_name"
          :data="table">
          <slot></slot>
          <template #append>
            <slot name="append"></slot>
          </template>
          <template #empty>
            <el-empty description="暂无数据"></el-empty>
          </template>
        </el-table>
      </div>
      <!-- 分页 -->
      <slot name="pagination">
        <el-pagination background :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper"
          :hide-on-single-page="true" v-model:currentPage="currentPage" v-model:page-size="pageSize" :total="total"
          @size-change="onSizeChange" @current-change="onCurrentChange" />
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
    addClass: (el: HTMLElement) => {
      el.parentNode && (el.parentNode as HTMLElement).classList.add("ve_flex_col");
    },
  },
}
</script>
<script lang="ts" setup>
const props = defineProps<{
  table: Mock.RoleObj[] | Mock.UserObj[]
}>();
const { table } = toRefs(props);

interface Pagination { currentPage: string, pageSize: string, total: string, onSizeChange: any, onCurrentChange: any };
const attrs = useAttrs();
const { pagination } = attrs
const { currentPage, pageSize, total, onSizeChange, onCurrentChange } = pagination as Pagination

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

    .ve_table_content {
      flex: 1;
    }
  }
}
</style>
