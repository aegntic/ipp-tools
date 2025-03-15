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
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        pure_funcs: ['console.log', 'console.debug', 'console.info'],
        passes: 2,
      }
    },
    cssMinify: true,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    modulePreload: {
      polyfill: true
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: (id) => {
          // Core vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            if (id.includes('framer-motion') || id.includes('@headlessui')) {
              return 'vendor-ui';
            }
            if (id.includes('@ipp-tools/core')) {
              return 'core-framework';
            }
            if (id.includes('@ipp-tools/ui')) {
              return 'ui-components';
            }
            return 'vendor';
          }
          
          // Application-specific code splits for optimal loading
          if (id.includes('/components/')) {
            if (id.includes('/layout/')) {
              return 'layout-components';
            }
            return 'app-components';
          }
          
          if (id.includes('/pages/')) {
            const page = id.split('/pages/')[1].split('.')[0].toLowerCase();
            if (page.includes('home')) {
              return 'page-home';
            }
            if (page.includes('framework')) {
              return 'page-frameworks';
            }
            if (page.includes('waitlist')) {
              return 'page-waitlist';
            }
            return 'page-other';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      },
    },
    reportCompressedSize: true,
    sourcemap: false,
    target: 'es2020'
  },
  define: {
    'process.env.SITE': JSON.stringify('ipp'),
    'process.env.VITE_SITE_URL': JSON.stringify('https://ipp.tools'),
  },
  // Enable on-demand pre-loading of critical assets
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js' && filename.includes('vendor-react')) {
        return { runtime: `preloadAsset(${JSON.stringify(filename)})` }
      }
      return filename;
    }
  },
  server: {
    open: false,
    port: 3000,
    strictPort: true,
    host: true,
    cors: true
  },
  preview: {
    port: 3001,
    strictPort: true,
    host: true,
    cors: true
  }
})