import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const PORT = parseInt(process.env.PORT || '5173', 10)

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: PORT,
    host: process.env.HOST || 'localhost',
  },
  preview: {
    port: parseInt(process.env.PREVIEW_PORT || process.env.PORT || '4173', 10),
    host: process.env.HOST || 'localhost',
  },
})
