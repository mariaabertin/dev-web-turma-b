import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    server: {
      proxy: {
        
        '/api-football': {
          target: 'https://v3.football.api-sports.io',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-football/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // Injeta a API Key no servidor (não fica exposta no navegador)
              proxyReq.setHeader('x-apisports-key', env.VITE_API_KEY || '')
            })
          }
        }
      }
    }
  }
})