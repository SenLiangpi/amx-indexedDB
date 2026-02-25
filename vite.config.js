import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'AmxIndexedDB',
      fileName: (format) => {
        if (format === 'umd') {
          return 'axm.umd.min.js'
        }
        return `amx-indexeddb.${format}.js`
      },
      formats: ['es', 'umd']
    },
    outDir: 'lib',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false
      }
    }
  }
})
