import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Resolve packages in monorepo
  resolve: {
    alias: {
      '@ipp-tools/core': path.resolve(__dirname, '../../packages/core/src'),
      '@ipp-tools/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['@ipp-tools/ui'],
          'tracking': ['@ipp-tools/core/tracking'],
        },
      },
    },
  },
  
  // Development server
  server: {
    port: 3001,
    open: true,
  },
  
  // Public assets directory
  publicDir: 'public',
  
  // Environment variables
  define: {
    'process.env.SITE_DOMAIN': JSON.stringify(process.env.SITE_DOMAIN || 'cascadevibe.com'),
    'process.env.PRIMARY_COLOR': JSON.stringify(process.env.PRIMARY_COLOR || '#5468ff'),
  },
});
