import { ref, reactive, watch } from 'vue'

/**
 * 表单处理 composable
 * @param {Object} initialData - 初始表单数据
 * @param {Function} submitAction - 提交表单的函数
 */
export function useForm(initialData = {}, submitAction) {
  // 表单数据
  const formData = reactive({ ...initialData })
  // 表单规则
  const rules = ref({})
  // 提交状态
  const submitting = ref(false)
  // 表单引用
  const formRef = ref(null)
  
  // 提交表单
  const submitForm = async () => {
    if (!formRef.value) return false
    
    try {
      submitting.value = true
      await formRef.value.validate()
      const result = await submitAction({ ...formData })
      return result
    } catch (error) {
      console.error('Form submission failed:', error)
      return false
    } finally {
      submitting.value = false
    }
  }
  
  // 重置表单
  const resetForm = () => {
    if (!formRef.value) return
    formRef.value.resetFields()
  }
  
  // 设置表单数据
  const setFormData = (data) => {
    Object.assign(formData, data)
  }
  
  // 监听初始数据变化
  watch(
    () => initialData,
    (newValue) => {
      setFormData(newValue)
    },
    { deep: true }
  )
  
  return {
    formData,
    rules,
    submitting,
    formRef,
    submitForm,
    resetForm,
    setFormData
  }
}