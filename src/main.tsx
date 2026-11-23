import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LangProvider } from './lib/lang'

const container = document.getElementById('root')!

const tree = (
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
)

// The build prerenders the Arabic edition into #root, so production hydrates
// existing markup and dev renders from empty.
if (container.firstElementChild) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
