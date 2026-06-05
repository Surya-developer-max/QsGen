import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/test/qportal/dict/',
  build: {
    chunkSizeWarningLimit: 2000,
    rolldownOptions: {
      output: {
        codeSplitting: true,
      },
    },
  },
})
