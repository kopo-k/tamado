import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from '@/hooks/useTheme'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onAutoLayout: vi.fn(),
    onOpenSaveModal: vi.fn(),
    onOpenLoadModal: vi.fn(),
  }

  const renderSidebar = (props = {}) => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Sidebar {...defaultProps} {...props} />
        </ThemeProvider>
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
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
      expect(
        screen.getByRole('button', { name: /閉じる/i })
      ).toBeInTheDocument()
    })

    it('テーマ切り替えボタンが表示される', () => {
      renderSidebar()
      expect(
        screen.getByRole('button', { name: /ダークモード|ライトモード/i })
      ).toBeInTheDocument()
    })

    it('自動レイアウトボタンが表示される', () => {
      renderSidebar()
      expect(
        screen.getByRole('button', { name: /自動レイアウト/i })
      ).toBeInTheDocument()
    })

    it('レイアウト保存ボタンが表示される', () => {
      renderSidebar()
      expect(
        screen.getByRole('button', { name: /保存/i })
      ).toBeInTheDocument()
    })

    it('レイアウト読み込みボタンが表示される', () => {
      renderSidebar()
      expect(
        screen.getByRole('button', { name: /読込/i })
      ).toBeInTheDocument()
    })

    it('盛り上がり検知トグルが表示される', () => {
      renderSidebar()
      expect(
        screen.getByRole('switch', { name: /盛り上がり検知/i })
      ).toBeInTheDocument()
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
    it('閉じるボタンをクリックすると onClose が呼ばれる', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()

      renderSidebar({ onClose })

      await user.click(screen.getByRole('button', { name: /閉じる/i }))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('オーバーレイをクリックすると onClose が呼ばれる', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()

      renderSidebar({ onClose, isOpen: true })

      // オーバーレイは backdrop-blur-sm クラスを持つ div
      const overlay = document.querySelector('.backdrop-blur-sm')
      if (overlay) {
        await user.click(overlay)
        expect(onClose).toHaveBeenCalledTimes(1)
      }
    })

    it('自動レイアウトボタンをクリックすると onAutoLayout と onClose が呼ばれる', async () => {
      const onAutoLayout = vi.fn()
      const onClose = vi.fn()
      const user = userEvent.setup()

      renderSidebar({ onAutoLayout, onClose })

      await user.click(screen.getByRole('button', { name: /自動レイアウト/i }))
      expect(onAutoLayout).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('レイアウト保存ボタンをクリックすると onOpenSaveModal と onClose が呼ばれる', async () => {
      const onOpenSaveModal = vi.fn()
      const onClose = vi.fn()
      const user = userEvent.setup()

      renderSidebar({ onOpenSaveModal, onClose })

      await user.click(screen.getByRole('button', { name: /保存/i }))
      expect(onOpenSaveModal).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('レイアウト読み込みボタンをクリックすると onOpenLoadModal と onClose が呼ばれる', async () => {
      const onOpenLoadModal = vi.fn()
      const onClose = vi.fn()
      const user = userEvent.setup()

      renderSidebar({ onOpenLoadModal, onClose })

      await user.click(screen.getByRole('button', { name: /読込/i }))
      expect(onOpenLoadModal).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledTimes(1)
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

    it('テーマ切り替えボタンをクリックするとテキストが変わる', async () => {
      const user = userEvent.setup()
      renderSidebar()

      // 初期状態は「ダークモード」
      const darkModeButton = screen.getByRole('button', { name: /ダークモード/i })
      expect(darkModeButton).toBeInTheDocument()

      await user.click(darkModeButton)

      // クリック後は「ライトモード」
      expect(
        screen.getByRole('button', { name: /ライトモード/i })
      ).toBeInTheDocument()
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
      const toggle = screen.getByRole('switch', { name: /盛り上がり検知/i })
      expect(toggle).toBeInTheDocument()
    })

    it('盛り上がり検知トグルにaria-checkedがある', () => {
      renderSidebar()
      const toggle = screen.getByRole('switch', { name: /盛り上がり検知/i })
      expect(toggle).toHaveAttribute('aria-checked')
    })
  })
})
