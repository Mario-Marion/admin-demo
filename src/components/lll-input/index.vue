<template>
  <div class="lll-input">
    <el-input v-model="text" :placeholder="placeholder" @change="update" />
  </div>
</template>

<script setup lang="ts">
import { useInitVal, usePlaceholder } from '@/utils/dataformat'

const props = defineProps<{
  bindValue?: string | number,
  label: string,
  type?: string,
  value?: string | number, // 默认值
  placeholder?: string,
}>();
const emit = defineEmits<{
  (e: 'update:bindValue', value: number): void
}>()
const { bindValue } = toRefs(props);

const { placeholder } = usePlaceholder(props);
const { update, text } = useInitVal(emit, bindValue);



</script>

<style lang="less" scoped>
</style>