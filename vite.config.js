// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Todo-App/', // 👈 MUST match your GitHub repo name
  plugins: [react()],
})
