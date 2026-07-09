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
    // API/unit tests run in node; component tests opt into jsdom via
    // the `// @vitest-environment jsdom` pragma at the top of the file.
    environment: 'node',
    clearMocks: true,
    include: ['src/tests/**/*.test.ts', 'src/tests/**/*.test.tsx'],
    css: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
      '@payload-config': path.resolve(rootDir, 'src/payload.config.ts'),
    },
  },
})
