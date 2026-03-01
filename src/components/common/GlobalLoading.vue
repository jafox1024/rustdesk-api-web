<template>
  <div class="global-loading fixed inset-0 bg-white/70 flex items-center justify-center z-[9999]" v-if="loading">
    <div class="loading-content text-center p-7 bg-card-bg rounded-lg shadow-lg border border-border-color">
      <el-icon class="loading-spinner text-4xl mb-4 text-primary">
        <Loading />
      </el-icon>
      <p class="loading-text m-0 text-text-secondary">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Loading } from '@element-plus/icons'

// Props
const props = defineProps({
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 加载文本
  text: {
    type: String,
    default: 'Loading...'
  }
})
</script>

<style scoped>
</style>