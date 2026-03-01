import { ref, reactive, watch } from 'vue'

/**
 * 表格数据处理 composable
 * @param {Function} fetchData - 获取数据的函数
 * @param {Object} initialQuery - 初始查询参数
 */
export function useTable(fetchData, initialQuery = {}) {
  // 表格数据
  const dataList = ref([])
  // 加载状态
  const loading = ref(false)
  // 总数
  const total = ref(0)
  // 查询参数
  const query = reactive({ ...initialQuery, page: 1, page_size: 10 })
  
  // 分页配置
  const pagination = reactive({
    page: 1,
    pageSize: 10,
    total: 0
  })
  
  // 获取数据
  const getList = async (params = {}) => {
    loading.value = true
    try {
      const result = await fetchData({ ...query, ...params })
      if (result && result.list) {
        dataList.value = result.list
        total.value = result.total || 0
        pagination.total = result.total || 0
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      loading.value = false
    }
  }
  
  // 处理分页大小变化
  const handleSizeChange = (size) => {
    query.page_size = size
    pagination.pageSize = size
    getList()
  }
  
  // 处理页码变化
  const handleCurrentChange = (current) => {
    query.page = current
    pagination.page = current
    getList()
  }
  
  // 处理查询
  const handleQuery = () => {
    query.page = 1
    pagination.page = 1
    getList()
  }
  
  // 监听查询参数变化
  watch(
    () => ({ ...query }),
    () => {
      // 可以在这里添加防抖处理
      // getList()
    },
    { deep: true }
  )
  
  return {
    dataList,
    loading,
    total,
    query,
    pagination,
    getList,
    handleSizeChange,
    handleCurrentChange,
    handleQuery
  }
}