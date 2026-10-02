import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  publicDir: 'public',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    port: 4173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }
          if (id.includes('assets/js/content.js') || id.includes('assets/js/translations.js')) {
            return 'i18n-dictionary';
          }
          if (id.includes('assets/js/views/adminView.js') || id.includes('assets/js/pages/admin/')) {
            return 'view-admin';
          }
          if (id.includes('assets/js/tools/examEngine.js') || id.includes('assets/js/tools/diagnosticTool.js') || id.includes('assets/js/tools/standardsExplorer.js')) {
            return 'tools-interactive';
          }
        }
      }
    }
  }
});
