import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'assets/404-app',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: path.resolve(process.cwd(), 'src/404/main.jsx'),
      output: {
        entryFileNames: '404.js',
        assetFileNames: '404.[ext]',
      },
    },
  },
})
