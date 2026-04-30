import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  css: {
    postcss: {
      plugins: [],
    },
  },
  test: {
    environment: 'node',
    clearMocks: true,
    include: ['src/tests/**/*.test.ts'],
    css: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
      '@payload-config': path.resolve(rootDir, 'src/payload.config.ts'),
    },
  },
})
