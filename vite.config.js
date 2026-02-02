import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.jpg', 'apple-touch-icon.jpg'],
      manifest: {
        name: 'Protocolo Anti-Dopamina',
        short_name: 'Protocolo',
        description: 'App de foco e rotina minimalista',
        theme_color: '#020617',
        background_color: '#020617',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'logo.jpg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/jpg'
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/jpg',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})