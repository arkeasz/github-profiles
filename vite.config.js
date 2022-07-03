import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require('path');

export default defineConfig({
  base: '/',
  root: '.',
  resolve:  {
    alias:  {
      '@': path.resolve(__dirname, "./src")
    },
  },
  plugins: [vue()]
})
