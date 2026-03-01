<template>
  <el-scrollbar class="scroll-sidebar h-screen overflow-y-auto bg-card-bg">
    <menus></menus>
  </el-scrollbar>
</template>
<script>
  import Menus from '@/layout/components/menu/index.vue'
  import { defineComponent, ref, onMounted } from 'vue'

  export default defineComponent({
    name: 'GAside',
    components: { Menus },
  })
</script>

<style scoped lang="scss">
</style>
