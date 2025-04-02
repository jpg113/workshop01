import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/workshop01/',  // Replace with your repository name
  build: {
    outDir: 'dist',  // Default output directory for built files
  },
})
