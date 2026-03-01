<template>
  <div class="base-table w-full">
    <!-- 表格内容 -->
    <el-table
      :data="dataList"
      v-loading="loading"
      border
      style="width: 100%"
      class="rounded-lg overflow-hidden"
      v-bind="tableProps"
    >
      <!-- 自定义列 -->
      <slot name="columns"></slot>
      
      <!-- 默认列 -->
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :align="column.align || 'center'"
      >
        <template v-if="column.template" #default="scope">
          <component
            :is="column.template"
            :row="scope.row"
            :index="scope.$index"
            v-bind="column.props || {}"
          ></component>
        </template>
      </el-table-column>
      
      <!-- 操作列 -->
      <el-table-column
        v-if="hasActions"
        :label="actionLabel"
        :width="actionWidth"
        align="center"
      >
        <template #default="scope">
          <slot name="actions" :row="scope.row" :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <div class="pagination mt-5 flex justify-end" v-if="showPagination">
      <el-pagination
        background
        layout="prev, pager, next, sizes, jumper"
        :page-sizes="pageSizes"
        v-model:page-size="pagination.pageSize"
        v-model:current-page="pagination.page"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  // 表格数据
  dataList: {
    type: Array,
    default: () => []
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 表格属性
  tableProps: {
    type: Object,
    default: () => {}
  },
  // 列配置
  columns: {
    type: Array,
    default: () => []
  },
  // 分页配置
  pagination: {
    type: Object,
    default: () => ({
      page: 1,
      pageSize: 10,
      total: 0
    })
  },
  // 是否显示分页
  showPagination: {
    type: Boolean,
    default: true
  },
  // 分页大小选项
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  // 操作列标签
  actionLabel: {
    type: String,
    default: 'Actions'
  },
  // 操作列宽度
  actionWidth: {
    type: String,
    default: '200px'
  }
})

// 计算属性：是否有操作列
const hasActions = computed(() => {
  return true // 默认为true，通过slot控制是否显示
})

// Emits
const emit = defineEmits(['size-change', 'current-change'])

// 处理分页大小变化
const handleSizeChange = (size) => {
  emit('size-change', size)
}

// 处理页码变化
const handleCurrentChange = (current) => {
  emit('current-change', current)
}
</script>

<style scoped>
</style>