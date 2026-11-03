/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Phục vụ triển khai GitHub Pages hoặc bất kỳ static hosting nào
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
  },
});
