import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router'
import { Header } from './Header'

describe('Header', () => {
  const defaultProps = {
    onOpenSidebar: vi.fn(),
    onAddStream: vi.fn(),
  }

  const renderHeader = (props = {}) => {
    render(
      <BrowserRouter>
        <Header {...defaultProps} {...props} />
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // UI表示テスト
  describe('UI表示', () => {
    it('ヘッダーが表示される', () => {
      renderHeader()
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('ロゴが表示される', () => {
      renderHeader()
      expect(screen.getByText('Tamado')).toBeInTheDocument()
    })

    it('URL入力欄が表示される', () => {
      renderHeader()
      expect(screen.getByPlaceholderText(/youtube/i)).toBeInTheDocument()
    })

    it('追加ボタンが表示される', () => {
      renderHeader()
      expect(screen.getByRole('button', { name: /追加/i })).toBeInTheDocument()
    })

    it('ログインリンクが表示される', () => {
      renderHeader()
      expect(screen.getByRole('link', { name: /ログイン/i })).toBeInTheDocument()
    })

    it('新規登録リンクが表示される', () => {
      renderHeader()
      expect(screen.getByRole('link', { name: /新規登録/i })).toBeInTheDocument()
    })
  })

  // インタラクションテスト
  describe('インタラクション', () => {
    it('メニューボタンをクリックすると onOpenSidebar が呼ばれる', async () => {
      const onOpenSidebar = vi.fn()
      const user = userEvent.setup()

      renderHeader({ onOpenSidebar })

      await user.click(screen.getByRole('button', { name: /メニューを開く/i }))
      expect(onOpenSidebar).toHaveBeenCalledTimes(1)
    })

    it('URL入力欄に値を入力できる', async () => {
      const user = userEvent.setup()
      renderHeader()

      const input = screen.getByPlaceholderText(/youtube/i)
      await user.type(input, 'https://www.youtube.com/watch?v=test')
      expect(input).toHaveValue('https://www.youtube.com/watch?v=test')
    })

    it('追加ボタンをクリックすると onAddStream が呼ばれる', async () => {
      const onAddStream = vi.fn().mockReturnValue(true)
      const user = userEvent.setup()

      renderHeader({ onAddStream })

      const input = screen.getByPlaceholderText(/youtube/i)
      await user.type(input, 'https://www.youtube.com/watch?v=test')
      await user.click(screen.getByRole('button', { name: /追加/i }))

      expect(onAddStream).toHaveBeenCalledWith('https://www.youtube.com/watch?v=test')
    })

    it('追加成功後に入力欄がクリアされる', async () => {
      const onAddStream = vi.fn().mockReturnValue(true)
      const user = userEvent.setup()

      renderHeader({ onAddStream })

      const input = screen.getByPlaceholderText(/youtube/i)
      await user.type(input, 'https://www.youtube.com/watch?v=test')
      await user.click(screen.getByRole('button', { name: /追加/i }))

      expect(input).toHaveValue('')
    })

    it('追加失敗時にエラーメッセージが表示される', async () => {
      const onAddStream = vi.fn().mockReturnValue(false)
      const user = userEvent.setup()

      renderHeader({ onAddStream })

      const input = screen.getByPlaceholderText(/youtube/i)
      await user.type(input, 'invalid-url')
      await user.click(screen.getByRole('button', { name: /追加/i }))

      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('空のURLで追加ボタンを押しても onAddStream が呼ばれない', async () => {
      const onAddStream = vi.fn()
      const user = userEvent.setup()

      renderHeader({ onAddStream })

      await user.click(screen.getByRole('button', { name: /追加/i }))

      expect(onAddStream).not.toHaveBeenCalled()
    })

    it('Enterキーで追加できる', async () => {
      const onAddStream = vi.fn().mockReturnValue(true)
      const user = userEvent.setup()

      renderHeader({ onAddStream })

      const input = screen.getByPlaceholderText(/youtube/i)
      await user.type(input, 'https://www.youtube.com/watch?v=test{Enter}')

      expect(onAddStream).toHaveBeenCalledWith('https://www.youtube.com/watch?v=test')
    })
  })
})
