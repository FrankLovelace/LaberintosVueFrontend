import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Cualquier petición que empiece con '/api' será redirigida
      '/api': {
        target: 'https://app.laberintospraderas.com', // backend
        changeOrigin: true, // para evitar problemas de CORS
      },
    },
  },
})
