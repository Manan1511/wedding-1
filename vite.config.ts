import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react', 'canvas-confetti'],
    entries: ['./src/main.tsx'],
  },
  server: {
    host: true,
  },
})
