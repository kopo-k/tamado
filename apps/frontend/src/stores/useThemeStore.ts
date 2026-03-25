import { create } from 'zustand'

type Theme = 'light' | 'dark'

type ThemeStore = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  initTheme: () => void
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(theme)
  localStorage.setItem('theme', theme)
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: getInitialTheme(),

  toggleTheme: () => {
    set(state => {
      const newTheme: Theme = state.theme === 'dark' ? 'light' : 'dark'
      applyTheme(newTheme)
      return { theme: newTheme }
    })
  },

  setTheme: (theme: Theme) => {
    applyTheme(theme)
    set({ theme })
  },

  initTheme: () => {
    const theme = getInitialTheme()
    applyTheme(theme)
    set({ theme })
  },
}))
