import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Advanced Code-Splitting for Web Performance Optimization
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Separate React vendor packages
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            // Separate ThreeJS vendor packages as they are heavy
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            // Separate animation libraries
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            // Separate icons
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor';
          }
        }
      }
    },
    // Minification performance configuration using Esbuild
    chunkSizeWarningLimit: 1000,
  },
  esbuild: {
    // Drop consoles and debuggers in production for performance
    drop: ['console', 'debugger'],
  }
})
