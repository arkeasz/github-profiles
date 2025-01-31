import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'


export default defineConfig({
  base: '/',
  root: '.',
  resolve:  {
    alias:  {
      '@': resolve(__dirname, "./src")
    },
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      api: 'modern-compiler'   
    }
  }
})
