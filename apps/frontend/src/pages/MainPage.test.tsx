import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router'
import { useUIStore } from '@/stores/useUIStore'
import { useStreamStore } from '@/stores/useStreamStore'
import { MainPage } from './MainPage'

describe('MainPage', () => {
  const renderMainPage = () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    useUIStore.setState({ isSidebarOpen: false })
    useStreamStore.setState({ streams: [] })
  })

  // UI表示テスト
  describe('UI表示', () => {
    it('ページが表示される', () => {
      renderMainPage()
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('Headerが表示される', () => {
      renderMainPage()
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('メインコンテンツ領域が存在する', () => {
      renderMainPage()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('サイドバーが存在する', () => {
      renderMainPage()
      expect(screen.getByRole('complementary')).toBeInTheDocument()
    })
  })

  // 初期状態テスト
  describe('初期状態', () => {
    it('初期状態でサイドバーは閉じている', () => {
      renderMainPage()
      const sidebar = screen.getByRole('complementary')
      expect(sidebar).toHaveClass('-translate-x-full')
    })

    it('配信がない時はEmptyStateが表示される', () => {
      renderMainPage()
      expect(screen.getByText(/動画・配信を追加/i)).toBeInTheDocument()
    })

    it('EmptyStateに説明文が表示される', () => {
      renderMainPage()
      expect(screen.getByText(/YouTubeやTwitchのURL/i)).toBeInTheDocument()
    })
  })

  // インタラクションテスト
  describe('インタラクション', () => {
    it('メニューボタンをクリックするとサイドバーが開く', async () => {
      const user = userEvent.setup()
      renderMainPage()

      const sidebar = screen.getByRole('complementary')
      expect(sidebar).toHaveClass('-translate-x-full')

      const menuButton = screen.getByRole('button', { name: /メニューを開く/i })
      await user.click(menuButton)

      expect(sidebar).not.toHaveClass('-translate-x-full')
    })

    it('サイドバーの閉じるボタンをクリックするとサイドバーが閉じる', async () => {
      const user = userEvent.setup()
      useUIStore.setState({ isSidebarOpen: true })
      renderMainPage()

      const closeButton = screen.getByRole('button', { name: /閉じる/i })
      await user.click(closeButton)

      const sidebar = screen.getByRole('complementary')
      expect(sidebar).toHaveClass('-translate-x-full')
    })

    it('オーバーレイをクリックするとサイドバーが閉じる', async () => {
      const user = userEvent.setup()
      useUIStore.setState({ isSidebarOpen: true })
      renderMainPage()

      const overlay = document.querySelector('.backdrop-blur-sm')
      if (overlay) {
        await user.click(overlay)
      }

      const sidebar = screen.getByRole('complementary')
      expect(sidebar).toHaveClass('-translate-x-full')
    })
  })

  // 自動レイアウトテスト
  describe('自動レイアウト', () => {
    it('autoLayoutRequestedがtrueになるとストリームの位置が更新される', async () => {
      // ストリームを追加
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test2')

      renderMainPage()

      // 自動レイアウトをリクエスト
      useUIStore.getState().requestAutoLayout()

      // 少し待ってから確認（useEffectの実行を待つ）
      await new Promise(resolve => setTimeout(resolve, 50))

      // ストリームの位置が更新されている
      const streams = useStreamStore.getState().streams
      expect(streams[0].width).toBeDefined()
      expect(streams[0].height).toBeDefined()

      // リクエストがリセットされている
      expect(useUIStore.getState().autoLayoutRequested).toBe(false)
    })

    it('ストリームが0個の場合でも自動レイアウトリクエストはリセットされる', async () => {
      renderMainPage()

      useUIStore.getState().requestAutoLayout()

      await new Promise(resolve => setTimeout(resolve, 50))

      expect(useUIStore.getState().autoLayoutRequested).toBe(false)
    })
  })
})
