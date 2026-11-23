import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * The whole stylesheet is under 10 kB gzipped. Inlining it removes a
 * render-blocking request from the critical path.
 */
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const cssFiles = Object.keys(bundle).filter((f) => f.endsWith('.css'))
      const html = Object.values(bundle).find(
        (c) => c.type === 'asset' && c.fileName.endsWith('.html'),
      )
      if (!html || html.type !== 'asset') return
      let source = String(html.source)
      for (const file of cssFiles) {
        const chunk = bundle[file]
        if (chunk.type !== 'asset') continue
        const css = String(chunk.source)
        source = source.replace(
          new RegExp(`<link[^>]+href="[^"]*${file.split('/').pop()}"[^>]*>`),
          `<style>${css}</style>`,
        )
        delete bundle[file]
      }
      html.source = source
    },
  }
}

// Deployed at https://mousa-alfaify.github.io/ (user root page) -> base '/'
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), inlineCss()],
  resolve: {
    // Preact keeps the component model but cuts runtime bootstrap from ~60kB
    // gzipped to ~5kB — the difference between a sluggish and an instant
    // first interaction on a mid-range phone.
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/client': 'preact/compat/client',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/preact')) return 'runtime'
        },
      },
    },
  },
})
