<template>
  <div class="lll-select">
    <el-select v-model="text" :placeholder="placeholder" @change="update">
      <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { useInitVal, usePlaceholder } from '@/utils/dataformat'

const props = defineProps<{
  bindValue?: string | number,
  label: string,
  type: string,
  value?: string | number, // 默认值
  placeholder?: string,
  list: { value: string | number, label: string }[],
}>();
const emit = defineEmits<{
  (e: 'update:bindValue', value: number): void
}>()

const { bindValue, list } = toRefs(props);

const { placeholder } = usePlaceholder(props);
const { update, text } = useInitVal(emit, bindValue);

</script>

<style lang="less" scoped>
</style>