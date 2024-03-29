import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "url"
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/styles/_vars.scss';`,
      },
    }
  }
})