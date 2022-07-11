<template>
  <div class="ve_slider_menu" @click="fn_slider_menu">
    <el-icon>
      <component :is="opened ? 'pand' : 'fold'" />
    </el-icon>
  </div>
</template>


<script lang="ts">
import pand from '~icons/ep/expand'
import Fold from '~icons/ep/fold'
export default {
  components: {
    pand,
    Fold
  }
}
</script>
<script setup lang="ts">
import { TOGGLE_SLIDER } from "@/stores/constant";
import { computed } from "vue";
import { useBaseStore } from "@/stores/base";
const baseStore = useBaseStore();
const opened = computed(() => baseStore.slider.opened);

const fn_slider_menu = () => {
  baseStore[TOGGLE_SLIDER]()
};
</script>

<style lang="less" scoped>
.ve_slider_menu {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 6px;

  i {
    font-size: 22px;
  }

  &:hover i {
    color: @base_color;
  }
}
</style>
