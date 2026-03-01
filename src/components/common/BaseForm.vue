<template>
  <div class="base-form w-full">
    <el-form
      :model="formData"
      :rules="rules"
      :label-width="labelWidth"
      :inline="inline"
      ref="formRef"
      class="rounded-lg p-5 bg-card-bg shadow-sm border border-border-color"
      v-bind="formProps"
    >
      <!-- 自定义表单字段 -->
      <slot name="fields"></slot>
      
      <!-- 动态表单字段 -->
      <el-form-item
        v-for="field in fields"
        :key="field.prop"
        :label="field.label"
        :prop="field.prop"
        :rules="field.rules"
        :required="field.required"
        :width="field.width"
        class="mb-4"
      >
        <!-- 输入框 -->
        <el-input
          v-if="field.type === 'input'"
          v-model="formData[field.prop]"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          :maxlength="field.maxlength"
          :show-word-limit="field.showWordLimit"
          class="rounded-md"
        />
        
        <!-- 密码输入框 -->
        <el-input
          v-else-if="field.type === 'password'"
          v-model="formData[field.prop]"
          type="password"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          class="rounded-md"
        />
        
        <!-- 文本域 -->
        <el-input
          v-else-if="field.type === 'textarea'"
          v-model="formData[field.prop]"
          type="textarea"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          :rows="field.rows || 2"
          class="rounded-md"
        />
        
        <!-- 下拉选择 -->
        <el-select
          v-else-if="field.type === 'select'"
          v-model="formData[field.prop]"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          :multiple="field.multiple"
          class="rounded-md"
        >
          <el-option
            v-for="option in field.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        
        <!-- 开关 -->
        <el-switch
          v-else-if="field.type === 'switch'"
          v-model="formData[field.prop]"
          :disabled="field.disabled"
          :active-value="field.activeValue || true"
          :inactive-value="field.inactiveValue || false"
        />
        
        <!-- 日期选择器 -->
        <el-date-picker
          v-else-if="field.type === 'date'"
          v-model="formData[field.prop]"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          :type="field.dateType || 'date'"
          class="rounded-md"
        />
        
        <!-- 自定义组件 -->
        <component
          v-else-if="field.type === 'component'"
          :is="field.component"
          v-model="formData[field.prop]"
          v-bind="field.props || {}"
        />
      </el-form-item>
      
      <!-- 表单操作按钮 -->
      <el-form-item v-if="showActions" class="mt-6 flex justify-end space-x-3">
        <slot name="actions">
          <el-button @click="resetForm" class="rounded-md transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">{{ resetText }}</el-button>
          <el-button type="primary" @click="submitForm" :loading="submitting" class="rounded-md transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">{{ submitText }}</el-button>
        </slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

// Props
const props = defineProps({
  // 表单数据
  modelValue: {
    type: Object,
    default: () => ({})
  },
  // 表单规则
  rules: {
    type: Object,
    default: () => ({})
  },
  // 表单属性
  formProps: {
    type: Object,
    default: () => ({})
  },
  // 字段配置
  fields: {
    type: Array,
    default: () => []
  },
  // 标签宽度
  labelWidth: {
    type: String,
    default: '120px'
  },
  // 是否内联
  inline: {
    type: Boolean,
    default: false
  },
  // 是否显示操作按钮
  showActions: {
    type: Boolean,
    default: true
  },
  // 提交按钮文本
  submitText: {
    type: String,
    default: 'Submit'
  },
  // 重置按钮文本
  resetText: {
    type: String,
    default: 'Reset'
  }
})

// 表单引用
const formRef = ref(null)
// 提交状态
const submitting = ref(false)
// 表单数据（双向绑定）
const formData = reactive({ ...props.modelValue })

// Emits
const emit = defineEmits(['update:modelValue', 'submit', 'reset'])

// 监听 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  Object.assign(formData, newValue)
}, { deep: true })

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    submitting.value = true
    await formRef.value.validate()
    emit('submit', { ...formData })
  } catch (error) {
    console.error('Form validation failed:', error)
  } finally {
    submitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  emit('reset')
}

// 暴露方法
defineExpose({
  submitForm,
  resetForm,
  formRef
})
</script>

<style scoped>
</style>