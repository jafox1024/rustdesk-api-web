/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#409eff',
        secondary: '#67c23a',
        danger: '#f56c6c',
        warning: '#e6a23c',
        info: '#909399',
        light: '#f5f7fa',
        dark: '#1a1a1a',
        'card-bg': '#ffffff',
        'border-color': '#ebeef5',
        'text-primary': '#303133',
        'text-secondary': '#606266',
        'text-tertiary': '#909399',
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'default': '8px',
      },
      transitionProperty: {
        'all': 'all 0.3s ease',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}