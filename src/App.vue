<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <GlobalLoading :loading="loading" />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useTagsStore } from '@/store/tags'
import { useAppStore } from '@/store/app'
import GlobalLoading from '@/components/common/GlobalLoading.vue'

const tagsStore = useTagsStore()
const appStore = useAppStore()
const cachedViews = computed(() => tagsStore.cached)
const loading = computed(() => appStore.loading)
</script>
<style>
</style>
