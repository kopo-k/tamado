import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router'
import { useStreamStore } from '@/stores/useStreamStore'
import { useUIStore } from '@/stores/useUIStore'
import { Header } from './Header'

describe('Header', () => {
  const renderHeader = () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
    useStreamStore.setState({ streams: [] })
    useUIStore.setState({ isSidebarOpen: false })
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

    // 認証実装後に有効化
    // it('ログインリンクが表示される', () => {
    //   renderHeader()
    //   expect(screen.getByRole('link', { name: /ログイン/i })).toBeInTheDocument()
    // })

    // it('新規登録リンクが表示される', () => {
    //   renderHeader()
    //   expect(screen.getByRole('link', { name: /新規登録/i })).toBeInTheDocument()
    // })
  })

  // インタラクションテスト
  describe('インタラクション', () => {
    it('メニューボタンをクリックするとサイドバーが開く', async () => {
      const user = userEvent.setup()
      renderHeader()

      await user.click(screen.getByRole('button', { name: /メニューを開く/i }))
      expect(useUIStore.getState().isSidebarOpen).toBe(true)
    })

    it('URL入力欄に値を入力できる', async () => {
      const user = userEvent.setup()
      renderHeader()

      const input = screen.getByPlaceholderText(/youtube/i)
      await user.type(input, 'https://www.youtube.com/watch?v=test')
      expect(input).toHaveValue('https://www.youtube.com/watch?v=test')
    })

    it('追加ボタンをクリックするとストリームが追加される', async () => {
      const user = userEvent.setup()
      renderHeader()

      const input = screen.getByPlaceholderText(/youtube/i)
      await user.type(input, 'https://www.youtube.com/watch?v=test')
      await user.click(screen.getByRole('button', { name: /追加/i }))

      expect(useStreamStore.getState().streams).toHaveLength(1)
    })

    it('追加成功後に入力欄がクリアされる', async () => {
      const user = userEvent.setup()
      renderHeader()

      const input = screen.getByPlaceholderText(/youtube/i)
      await user.type(input, 'https://www.youtube.com/watch?v=test')
      await user.click(screen.getByRole('button', { name: /追加/i }))

      expect(input).toHaveValue('')
    })

    it('追加失敗時にエラーメッセージが表示される', async () => {
      const user = userEvent.setup()
      renderHeader()

      const input = screen.getByPlaceholderText(/youtube/i)
      await user.type(input, 'invalid-url')
      await user.click(screen.getByRole('button', { name: /追加/i }))

      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('空のURLで追加ボタンを押してもストリームが追加されない', async () => {
      const user = userEvent.setup()
      renderHeader()

      await user.click(screen.getByRole('button', { name: /追加/i }))

      expect(useStreamStore.getState().streams).toHaveLength(0)
    })

    it('Enterキーで追加できる', async () => {
      const user = userEvent.setup()
      renderHeader()

      const input = screen.getByPlaceholderText(/youtube/i)
      await user.type(input, 'https://www.youtube.com/watch?v=test{Enter}')

      expect(useStreamStore.getState().streams).toHaveLength(1)
    })
  })
})
