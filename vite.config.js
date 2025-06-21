import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Todo-App/', // 👈 Very Important
  plugins: [react()],
});
