import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli.ts', 'src/index.ts'],
  format: 'esm',
  target: 'node20',
  clean: true,
  shims: true,
  esbuildOptions(options, context) {
    options.charset = 'utf8'
  },
})
