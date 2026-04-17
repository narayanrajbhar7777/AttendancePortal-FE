import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    port: 5173,
    open: true, 
    proxy: {
      '/api': {
        target: 'http://172.16.37.219:5000',
        changeOrigin: true,
      },
    },
  },
})