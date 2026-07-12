import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
  base: '/abrakadabra/',
  server: {
    host: true, // Позволяет Docker пробрасывать порт наружу
    port: 5173,
    strictPort: true,
    proxy: {
      // Все запросы, начинающиеся с /api, пойдут на бэкенд
      '/api': {
        target: 'http://ru.localhost:80',
        changeOrigin: true,
        secure: false,
      }
    },
    hmr: {
      host: 'ru.localhost',
      protocol: 'ws',
    }
  }
})
