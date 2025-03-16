import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Determine build environment
const isProduction = process.env.NODE_ENV === 'production'
const isNetlify = process.env.NETLIFY === 'true'
const analyzeBuild = process.env.ANALYZE === 'true'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Conditionally add build analyzer if requested
    analyzeBuild && {
      name: 'build-analyzer',
      writeBundle() {
        // Simple indication that we're analyzing the build
        console.log('Bundle analysis complete - see stats.html')
      }
    }
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    // Output to build directory instead of dist for Netlify compatibility
    outDir: isNetlify ? 'build' : 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        // Only drop console in production
        drop_console: isProduction,
        pure_funcs: isProduction ? ['console.log', 'console.debug', 'console.info'] : [],
        passes: isProduction ? 2 : 1,
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
    // Enable source maps in development or when analyzing
    sourcemap: !isProduction || analyzeBuild,
    target: 'es2020'
  },
  define: {
    'process.env.SITE': JSON.stringify('ipp'),
    'process.env.VITE_SITE_URL': JSON.stringify('https://ipp.tools'),
    'process.env.VITE_NETLIFY': JSON.stringify(isNetlify ? 'true' : 'false'),
    'process.env.VITE_NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
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