import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist/vibecascade',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'vibecascade.html'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
          ui: ['@headlessui/react'],
        },
      },
    },
  },
  define: {
    'process.env.SITE': JSON.stringify('vibecascade'),
    'process.env.VITE_SITE_URL': JSON.stringify('https://vibecascade.ipp.tools'),
  },
})