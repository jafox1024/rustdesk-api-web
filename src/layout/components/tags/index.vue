<template>
  <div class="tags-container">
    <el-tag v-for="(t, i) in tags"
            :key="t.name"
            class="tag"
            :closable="t.closeable"
            @close="close(t)"
            @click="toTag(t)"
            :type="t.active?'primary':'info'"
            :effect="t.active?'dark':'plain'">
      {{ T(t.title) }}
    </el-tag>
    <el-dropdown v-if="tags.length > 1" class="tags-actions">
      <el-button size="small" type="text" class="tags-action-btn">
        <el-icon class="el-icon-more"></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="closeAllTags">{{ T('CloseAll') }}</el-dropdown-item>
          <el-dropdown-item @click="closeOtherTags">{{ T('CloseOther') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
  import { defineComponent, ref, onMounted, watch } from 'vue'
  import { useTagsStore } from '@/store/tags'
  import { useRoute, useRouter } from 'vue-router'
  import { T } from '@/utils/i18n'

  export default defineComponent({
    name: 'Index',
    setup () {
      const tags = ref([])
      const tagsStore = useTagsStore()
      const route = useRoute()
      const router = useRouter()
      tags.value = tagsStore.tags

      const addTag = (route) => {
        if (!route.meta?.hide && route.name) {
          tagsStore.addTag(route)
        }
      }
      const close = (tag) => {
        tagsStore.removeTag(tag)
        if (tag.active) {
          toLastTag()
        }
      }
      const toLastTag = () => {
        if (tags.value.length) {
          router.push({ name: tags.value[tags.value.length - 1].name })
        }
      }
      const init = () => {
        if (!tagsStore.tags.length) {
          tagsStore.initTags()
        }
        addTag(route)
      }

      const toTag = (tag) => {
        if (tag.name !== route.name) {
          router.push({ name: tag.name })
        }
      }

      const closeAllTags = () => {
        // 保留当前激活的标签
        const activeTag = tags.value.find(t => t.active)
        tagsStore.tags = []
        if (activeTag) {
          tagsStore.addTag({ name: activeTag.name, fullPath: activeTag.path, meta: { title: activeTag.title }, active: true })
        }
      }

      const closeOtherTags = () => {
        // 只保留当前激活的标签
        const activeTag = tags.value.find(t => t.active)
        tagsStore.tags = []
        if (activeTag) {
          tagsStore.addTag({ name: activeTag.name, fullPath: activeTag.path, meta: { title: activeTag.title }, active: true })
        }
      }

      onMounted(init)
      watch(route, (val) => {
        addTag(val)
      })
      return {
        tags,
        addTag,
        close,
        toLastTag,
        toTag,
        closeAllTags,
        closeOtherTags,
        T,
      }
    },
  })
</script>

<style lang="scss" scoped>
.tags-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  padding: 4px 0;
}

.tag {
  border-radius: 4px;
  cursor: pointer;
  margin: 0;
  transition: all 0.3s ease;
  font-size: 14px;
  padding: 2px 8px;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .el-tag__close {
    margin-left: 6px;
    font-size: 12px;
  }
}

.tags-actions {
  margin-left: auto;
  white-space: nowrap;
}

.tags-action-btn {
  color: var(--textPrimary);
  font-size: 16px;
  padding: 0 8px;
  
  &:hover {
    color: var(--primaryColor);
  }
}

// 深色模式
html.dark {
  .tags-action-btn {
    color: var(--textPrimary);
    
    &:hover {
      color: var(--primaryColor);
    }
  }
}
</style>
