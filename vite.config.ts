import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from GitHub Pages at https://<user>.github.io/meridian/
export default defineConfig({
  plugins: [react()],
  base: '/meridian/',
  build: {
    target: 'es2020',
    cssMinify: true,
  },
})
