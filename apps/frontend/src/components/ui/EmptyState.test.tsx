import { render, screen } from '@testing-library/react'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  const renderEmptyState = () => {
    render(<EmptyState />)
  }

  // UI表示テスト
  describe('UI表示', () => {
    it('タイトルが表示される', () => {
      renderEmptyState()
      expect(screen.getByText(/動画・配信を追加/i)).toBeInTheDocument()
    })

    it('説明文が表示される', () => {
      renderEmptyState()
      expect(screen.getByText(/YouTubeやTwitchのURL/i)).toBeInTheDocument()
    })

    it('同時視聴できることが説明されている', () => {
      renderEmptyState()
      expect(screen.getByText(/同時視聴/i)).toBeInTheDocument()
    })

    it('YouTubeプラットフォームが表示される', () => {
      renderEmptyState()
      expect(screen.getByText('YouTube')).toBeInTheDocument()
    })

    it('Twitchプラットフォームが表示される', () => {
      renderEmptyState()
      expect(screen.getByText('Twitch')).toBeInTheDocument()
    })

    it('ヒントテキストが表示される', () => {
      renderEmptyState()
      expect(screen.getByText(/ドラッグ&ドロップ/i)).toBeInTheDocument()
    })
  })

  // アクセシビリティテスト
  describe('アクセシビリティ', () => {
    it('見出しが適切なレベルで表示される', () => {
      renderEmptyState()
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })
  })
})
