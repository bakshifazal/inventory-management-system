import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default Vite port
    host: true, // Listen on all addresses
    strictPort: true, // Ensure we use this specific port
    open: true, // Automatically open browser
    watch: {
      usePolling: true, // Enable polling for file changes
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
