<template>
  <el-menu
          class="menus"
          :collapse="isCollapse"
          :default-active="activeIndex"
          :background-color="bgColor"
          :text-color="textColor"
          active-text-color="var(--primaryColor)"
          router
  >
    <menu-item v-for="(route,index) in routes" :key="route.name" :route="route"></menu-item>
  </el-menu>
</template>

<script>
  import { defineComponent, ref, onMounted, watch, computed } from 'vue'
  import { useRouteStore } from '@/store/router'
  import MenuItem from '@/layout/components/menu/item.vue'
  import { useRoute } from 'vue-router'
  import { useAppStore } from '@/store/app'

  export default defineComponent({
    name: 'Menu',
    created () {
    },
    components: { MenuItem },
    setup () {
      const routes = ref([])
      const route = useRoute()
      const app = useAppStore()
      const isCollapse = computed(() => app.setting.sideIsCollapse)
      const activeIndex = computed(() => route.name)
      const bgColor = computed(() => {
        return document.documentElement.classList.contains('dark') ? '#24252b' : 'var(--cardBg)'
      })
      const textColor = computed(() => {
        return document.documentElement.classList.contains('dark') ? '#e0e0e0' : 'var(--textPrimary)'
      })

      routes.value = useRouteStore().routes
      return {
        routes,
        activeIndex,
        isCollapse,
        bgColor,
        textColor
      }
    },

  })
</script>

<style lang="scss" scoped>
  .menus {
    min-height: 100vh;
    border-right: none;
    &:not(.el-menu--collapse) {
      width: var(--sideBarWidth);
    }
  }
</style>
<style lang="scss">
  /* 菜单选中项样式 */
  .el-menu-item.is-active {
    background-color: #4a5568 !important;
    color: #ffffff !important;
  }
  
  /* 子菜单选中项样式 */
  .el-sub-menu__title.is-active {
    background-color: #4a5568 !important;
    color: #ffffff !important;
  }
  
  /* 菜单鼠标悬停样式 */
  .el-menu-item:hover {
    background-color: #b7b8bb !important;
    color: #000000 !important;
  }
  
  /* 子菜单鼠标悬停样式 */
  .el-sub-menu__title:hover {
    background-color: #b7b8bb !important;
    color: #000000 !important;
  }
  
  /* 深色模式下的选中项样式 */
  html.dark .el-menu-item.is-active {
    background-color: #2d3748 !important;
    color: #e2e8f0 !important;
  }
  
  html.dark .el-sub-menu__title.is-active {
    background-color: #2d3748 !important;
    color: #e2e8f0 !important;
  }
  
  /* 深色模式下的鼠标悬停样式 */
  html.dark .el-menu-item:hover {
    background-color: #4a5568 !important;
    color: #ffffff !important;
  }
  
  html.dark .el-sub-menu__title:hover {
    background-color: #4a5568 !important;
    color: #ffffff !important;
  }
</style>
