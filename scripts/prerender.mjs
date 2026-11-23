import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = resolve(root, 'dist/index.html')
const serverEntry = resolve(root, 'dist-ssr/entry-server.js')

if (!existsSync(serverEntry)) {
  console.error('prerender: missing SSR bundle at dist-ssr/entry-server.js')
  process.exit(1)
}

const { render } = await import(pathToFileURL(serverEntry).href)
const markup = render()

let html = readFileSync(htmlPath, 'utf8')
if (!html.includes('<div id="root"></div>')) {
  console.error('prerender: could not find the root container in dist/index.html')
  process.exit(1)
}
html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
writeFileSync(htmlPath, html)
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })

console.log(`prerender: injected ${(markup.length / 1024).toFixed(1)} kB of static markup`)
