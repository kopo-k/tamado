import { renderHook, act } from '@testing-library/react'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('light', 'dark')
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  )

  describe('初期状態', () => {
    it('システム設定がダークの場合、darkテーマになる', () => {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      const { result } = renderHook(() => useTheme(), { wrapper })
      expect(result.current.theme).toBe('dark')
    })

    it('システム設定がライトの場合、lightテーマになる', () => {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      const { result } = renderHook(() => useTheme(), { wrapper })
      expect(result.current.theme).toBe('light')
    })
  })

  describe('テーマ切り替え', () => {
    it('toggleThemeでテーマが切り替わる', () => {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      const { result } = renderHook(() => useTheme(), { wrapper })
      expect(result.current.theme).toBe('dark')

      act(() => {
        result.current.toggleTheme()
      })
      expect(result.current.theme).toBe('light')

      act(() => {
        result.current.toggleTheme()
      })
      expect(result.current.theme).toBe('dark')
    })
  })

  describe('永続化', () => {
    it('テーマがlocalStorageに保存される', () => {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      const { result } = renderHook(() => useTheme(), { wrapper })

      act(() => {
        result.current.toggleTheme()
      })

      expect(localStorage.getItem('theme')).toBe('light')
    })

    it('localStorageに保存されたテーマが復元される', () => {
      localStorage.setItem('theme', 'light')

      const { result } = renderHook(() => useTheme(), { wrapper })
      expect(result.current.theme).toBe('light')
    })
  })

  describe('HTML要素', () => {
    it('html要素にテーマクラスが適用される', () => {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      renderHook(() => useTheme(), { wrapper })
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  describe('エラー', () => {
    it('ThemeProvider外で使うとエラーが発生する', () => {
      expect(() => {
        renderHook(() => useTheme())
      }).toThrow('useTheme must be used within a ThemeProvider')
    })
  })
})
