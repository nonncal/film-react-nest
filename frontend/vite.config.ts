import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['src/scss']
      },
      sass: {
        api: 'modern-compiler',   // <-- эта строка убирает legacy‑предупреждения
      },
    }
  },
})
