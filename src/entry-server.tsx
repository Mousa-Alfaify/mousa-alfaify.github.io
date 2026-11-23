import { renderToString } from 'preact-render-to-string'
import App from './App'
import { LangProvider } from './lib/lang'

/** Renders the Arabic edition — the primary one — into static HTML at build time. */
export function render() {
  return renderToString(
    <LangProvider>
      <App />
    </LangProvider>,
  )
}
