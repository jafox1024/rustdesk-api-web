import { ElMessage, ElMessageBox } from 'element-plus'
import { T } from './i18n'

/**
 * 消息提示工具
 */
export const message = {
  /**
   * 成功消息
   * @param {string} msg - 消息内容
   * @param {Object} options - 配置项
   */
  success: (msg, options = {}) => {
    ElMessage({
      message: msg || T('OperationSuccess'),
      type: 'success',
      duration: options.duration || 3000,
      ...options
    })
  },
  
  /**
   * 错误消息
   * @param {string} msg - 消息内容
   * @param {Object} options - 配置项
   */
  error: (msg, options = {}) => {
    ElMessage({
      message: msg || T('OperationFailed'),
      type: 'error',
      duration: options.duration || 5000,
      ...options
    })
  },
  
  /**
   * 警告消息
   * @param {string} msg - 消息内容
   * @param {Object} options - 配置项
   */
  warning: (msg, options = {}) => {
    ElMessage({
      message: msg,
      type: 'warning',
      duration: options.duration || 3000,
      ...options
    })
  },
  
  /**
   * 信息消息
   * @param {string} msg - 消息内容
   * @param {Object} options - 配置项
   */
  info: (msg, options = {}) => {
    ElMessage({
      message: msg,
      type: 'info',
      duration: options.duration || 3000,
      ...options
    })
  },
  
  /**
   * 确认对话框
   * @param {string} msg - 消息内容
   * @param {Object} options - 配置项
   * @returns {Promise<boolean>} - 确认返回 true，取消返回 false
   */
  confirm: async (msg, options = {}) => {
    try {
      await ElMessageBox.confirm(
        msg || T('Confirm?'),
        {
          confirmButtonText: T('Confirm'),
          cancelButtonText: T('Cancel'),
          type: options.type || 'warning',
          ...options
        }
      )
      return true
    } catch (error) {
      return false
    }
  }
}

export default message