import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { useThemeStore } from './stores/useThemeStore'
import './index.css'
import App from './App.tsx'

// 初期テーマを適用
useThemeStore.getState().initTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
