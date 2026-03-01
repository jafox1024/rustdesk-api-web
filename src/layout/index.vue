<template>
  <el-config-provider :locale="appStore.setting.locale.value">
    <el-container :style="{'--sideBarWidth': sideBarWidth}">
      <el-aside :width="leftWidth" class="app-left bg-card-bg shadow-sm border-r border-border-color fixed left-0 top-0 h-screen z-50 transition-all duration-500">
        <g-aside></g-aside>
      </el-aside>
      <el-container class="app-container">
        <el-header class="bg-card-bg text-text-primary shadow-sm border-b border-border-color h-16 flex items-center z-40">
          <g-header></g-header>
        </el-header>
        <div class="header-tags bg-card-bg shadow-sm border-b border-border-color h-10 flex items-center px-2.5">
          <tags></tags>
        </div>

        <el-main class="app-main p-5 bg-light">
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="el-fade-in-linear">
              <keep-alive :include="cachedTags">
                <component :is="Component"/>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup>
  import { useAppStore } from '@/store/app'
  import { useTagsStore } from '@/store/tags'
  import { ref, computed } from 'vue'
  import Tags from '@/layout/components/tags/index.vue'
  import GAside from '@/layout/components/aside.vue'
  import GHeader from '@/layout/components/header.vue'

  const appStore = useAppStore()
  const tagStore = useTagsStore()
  const sideBarWidth = computed(() => appStore.setting.locale.sideBarWidth)
  const leftWidth = computed(() => appStore.setting.sideIsCollapse ? '64px' : 'var(--sideBarWidth)')

  const cachedTags = ref([])

  cachedTags.value = tagStore.cached
</script>

<style lang="scss" scoped>
.app-container {
  min-height: 100vh;
  margin-left: v-bind(leftWidth);
  transition: margin-left 0.5s;
}

.app-main {
  min-height: calc(100vh - 100px);
}
</style>


