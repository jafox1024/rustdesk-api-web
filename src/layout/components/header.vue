<template>
  <el-icon class="ex-icon h-full flex items-center mr-4 ml-4 text-2xl cursor-pointer text-text-primary transition-all duration-300 hover:text-primary hover:scale-110" @click="expandOrFoldSlider">
    <el-icon-expand v-if="setting.sideIsCollapse"></el-icon-expand>
    <el-icon-fold v-else></el-icon-fold>
  </el-icon>
  <div class="header-logo flex h-full items-center mr-auto">
    <div class="title block text-lg font-semibold text-text-primary">{{setting.title}}</div>
  </div>
  <Setting></Setting>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import HeaderMenu from '@/layout/components/menu/index.vue'
  import Setting from '@/layout/components/setting/index.vue'
  import { useAppStore } from '@/store/app'
  import GTags from '@/layout/components/tags/index.vue'

  export default defineComponent({
    name: 'LayerHeader',
    created () {
    },
    components: { HeaderMenu, Setting, GTags },
    watch: {},
    setup (props) {
      const appStore = useAppStore()
      const setting = computed(() => appStore.setting)
      const expandOrFoldSlider = () => {
        appStore.sideCollapse()
      }
      return {
        setting,
        expandOrFoldSlider,
      }
    },

  })
</script>

<style scoped lang="scss">
</style>
