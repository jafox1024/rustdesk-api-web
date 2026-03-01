# RustDesk API Web
# 基于 Vue3 + Element Plus + Tailwind CSS 的后台, 适用于 [RustDesk API](https://github.com/lejianwen/rustdesk-api)

<a href="https://github.com/vuejs/vue-next">
    <img src="https://img.shields.io/badge/vue-^3.2.16-brightgreen.svg" alt="vue3">
  </a>
  <a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/element--plus-^2.8.2-brightgreen.svg" alt="element-plus">
  </a>
  <a href="https://github.com/tailwindlabs/tailwindcss">
    <img src="https://img.shields.io/badge/tailwindcss-^3.0.0-brightgreen.svg" alt="tailwindcss">
  </a>
  <a href="https://github.com/lejianwen/Gwen-admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>

## 项目特点

- **现代化技术栈**：使用 Vue 3、Element Plus 和 Tailwind CSS 构建
- **响应式设计**：适配不同屏幕尺寸的设备
- **组件化开发**：封装了通用表格、表单等组件
- **优化的用户体验**：添加了全局加载状态、错误处理和提示
- **多语言支持**：支持中英文等多种语言
- **深色模式**：支持浅色和深色两种主题
- **标签页管理**：支持多标签页切换和一键关闭功能

## 安装步骤

```shell
git clone https://github.com/lejianwen/rustdesk-api-web
cd rustdesk-api-web   
npm install

// 本地开发
npm run dev

// 打包
npm run build

```

## 配置说明

### 本地调试配置

修改 `.env.development` 文件中的 `VITE_SERVER_PATH` 配置，设置为远程 API 地址：

```
VITE_SERVER_PATH = https://rustdesk.nobibi.cn
```

### 生产环境配置

修改 `.env.production` 文件中的 `VITE_SERVER_PATH` 配置，设置为生产环境的 API 地址。

## 项目结构

```
src/
├── api/            # API 接口定义
├── assets/         # 静态资源
├── components/     # 通用组件
├── composables/    # 可复用的组合式函数
├── layout/         # 布局组件
├── router/         # 路由配置
├── store/          # 状态管理
├── styles/         # 样式文件
├── utils/          # 工具函数
├── views/          # 页面组件
├── App.vue         # 根组件
├── main.js         # 入口文件
└── permission.js   # 权限控制
```

## 功能模块

- **用户管理**：用户列表、添加、编辑、删除、重置密码
- **设备管理**：设备列表、设备详情
- **地址簿管理**：地址簿列表、地址簿集合、地址簿规则
- **标签管理**：标签列表、标签编辑
- **共享记录**：共享记录列表、共享记录详情
- **审计日志**：连接日志、文件操作日志
- **系统配置**：服务器控制、黑名单、中继服务器配置

## 技术栈

- **前端框架**: Vue 3
- **状态管理**: Pinia 2.2.8
- **路由**: Vue Router 4.0.12
- **UI 库**: Element Plus 2.8.2
- **CSS 框架**: Tailwind CSS 3.0+
- **构建工具**: Vite 6.3.4
- **样式预处理器**: Sass 1.43.4
- **HTTP 客户端**: Axios 1.8.2
