import { useThemeStore } from './useThemeStore'

describe('useThemeStore', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('light', 'dark')
    useThemeStore.setState({ theme: 'light' })
  })

  it('toggleThemeでテーマが切り替わる', () => {
    useThemeStore.getState().toggleTheme()
    expect(useThemeStore.getState().theme).toBe('dark')

    useThemeStore.getState().toggleTheme()
    expect(useThemeStore.getState().theme).toBe('light')
  })

  it('toggleThemeでlocalStorageに保存される', () => {
    useThemeStore.getState().toggleTheme()
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('toggleThemeでhtml要素にクラスが適用される', () => {
    useThemeStore.getState().toggleTheme()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)
  })

  it('setThemeでテーマを直接設定できる', () => {
    useThemeStore.getState().setTheme('dark')
    expect(useThemeStore.getState().theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('initThemeでlocalStorageから復元される', () => {
    localStorage.setItem('theme', 'dark')
    useThemeStore.getState().initTheme()
    expect(useThemeStore.getState().theme).toBe('dark')
  })
})
