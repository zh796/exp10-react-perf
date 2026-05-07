import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = '/'

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    rollupOptions: {
      output: {
        // 代码分割：函数形式（Vite 8 / rolldown 要求）
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor'
          }
          if (id.includes('node_modules/react-router')) {
            return 'router'
          }
          if (id.includes('node_modules/react-window')) {
            return 'window'
          }
        },
      },
    },
  },
})
