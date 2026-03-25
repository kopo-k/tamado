import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router'
import { useUIStore } from '@/stores/useUIStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  const renderSidebar = (options: { isOpen?: boolean } = {}) => {
    const { isOpen = true } = options
    useUIStore.setState({ isSidebarOpen: isOpen })
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
    useUIStore.setState({ isSidebarOpen: false })
    useThemeStore.setState({ theme: 'light' })
  })

  // UI表示テスト
  describe('UI表示', () => {
    it('isOpen が true のときサイドバーが表示される', () => {
      renderSidebar({ isOpen: true })
      expect(screen.getByRole('complementary')).toBeInTheDocument()
    })

    it('isOpen が false のときサイドバーが画面外にある', () => {
      renderSidebar({ isOpen: false })
      const sidebar = screen.getByRole('complementary')
      expect(sidebar).toHaveClass('-translate-x-full')
    })

    it('メニュータイトルが表示される', () => {
      renderSidebar()
      expect(screen.getByText('メニュー')).toBeInTheDocument()
    })

    it('閉じるボタンが表示される', () => {
      renderSidebar()
      expect(screen.getByRole('button', { name: /閉じる/i })).toBeInTheDocument()
    })

    it('テーマ切り替えボタンが表示される', () => {
      renderSidebar()
      expect(screen.getByRole('button', { name: /ダークモード|ライトモード/i })).toBeInTheDocument()
    })

    it('自動レイアウトボタンが表示される', () => {
      renderSidebar()
      expect(screen.getByRole('button', { name: /自動レイアウト/i })).toBeInTheDocument()
    })

    it('レイアウト保存ボタンが表示される', () => {
      renderSidebar()
      expect(screen.getByRole('button', { name: /保存/i })).toBeInTheDocument()
    })

    it('レイアウト読み込みボタンが表示される', () => {
      renderSidebar()
      expect(screen.getByRole('button', { name: /読込/i })).toBeInTheDocument()
    })

    it('盛り上がり検知トグルが表示される', () => {
      renderSidebar()
      expect(screen.getByRole('switch', { name: /盛り上がり検知/i })).toBeInTheDocument()
    })

    it('ユーザー情報エリアが表示される', () => {
      renderSidebar()
      expect(screen.getByTestId('user-info')).toBeInTheDocument()
    })

    it('ゲストユーザー表示がある', () => {
      renderSidebar()
      expect(screen.getByText('ゲスト')).toBeInTheDocument()
      expect(screen.getByText('ログインしていません')).toBeInTheDocument()
    })
  })

  // インタラクションテスト
  describe('インタラクション', () => {
    it('閉じるボタンをクリックするとサイドバーが閉じる', async () => {
      const user = userEvent.setup()
      renderSidebar({ isOpen: true })

      await user.click(screen.getByRole('button', { name: /閉じる/i }))
      expect(useUIStore.getState().isSidebarOpen).toBe(false)
    })

    it('オーバーレイをクリックするとサイドバーが閉じる', async () => {
      const user = userEvent.setup()
      renderSidebar({ isOpen: true })

      const overlay = document.querySelector('.backdrop-blur-sm')
      if (overlay) {
        await user.click(overlay)
        expect(useUIStore.getState().isSidebarOpen).toBe(false)
      }
    })

    it('盛り上がり検知トグルをクリックすると状態が変わる', async () => {
      const user = userEvent.setup()
      renderSidebar()

      const toggle = screen.getByRole('switch', { name: /盛り上がり検知/i })
      expect(toggle).toHaveAttribute('aria-checked', 'false')

      await user.click(toggle)
      expect(toggle).toHaveAttribute('aria-checked', 'true')

      await user.click(toggle)
      expect(toggle).toHaveAttribute('aria-checked', 'false')
    })

    it('テーマ切り替えボタンをクリックするとテーマが変わる', async () => {
      const user = userEvent.setup()
      renderSidebar()

      const darkModeButton = screen.getByRole('button', { name: /ダークモード/i })
      await user.click(darkModeButton)

      expect(useThemeStore.getState().theme).toBe('dark')
      expect(screen.getByRole('button', { name: /ライトモード/i })).toBeInTheDocument()
    })
  })

  // アクセシビリティテスト
  describe('アクセシビリティ', () => {
    it('サイドバーに適切なロールがある', () => {
      renderSidebar()
      expect(screen.getByRole('complementary')).toBeInTheDocument()
    })

    it('閉じるボタンにaria-labelがある', () => {
      renderSidebar()
      const closeButton = screen.getByRole('button', { name: /閉じる/i })
      expect(closeButton).toHaveAttribute('aria-label', '閉じる')
    })

    it('盛り上がり検知トグルにrole="switch"がある', () => {
      renderSidebar()
      expect(screen.getByRole('switch', { name: /盛り上がり検知/i })).toBeInTheDocument()
    })

    it('盛り上がり検知トグルにaria-checkedがある', () => {
      renderSidebar()
      const toggle = screen.getByRole('switch', { name: /盛り上がり検知/i })
      expect(toggle).toHaveAttribute('aria-checked')
    })
  })
})
