import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  }

  const renderSidebar = (props = {}) => {
    render(
      <BrowserRouter>
        <Sidebar {...defaultProps} {...props} />
      </BrowserRouter>
    )
  }

  it('isOpen が true のときサイドバーが表示される', () => {
    renderSidebar({ isOpen: true })
    expect(screen.getByRole('complementary')).toBeInTheDocument()
  })

  it('閉じるボタンが表示される', () => {
    renderSidebar()
    expect(screen.getByRole('button', { name: /閉じる/i })).toBeInTheDocument()
  })

  it('テーマ切り替えボタンが表示される', () => {
    renderSidebar()
    expect(screen.getByRole('button', { name: /ダークモード|ライトモード/i })).toBeInTheDocument()
  })

  it('レイアウト保存ボタンが表示される', () => {
    renderSidebar()
    expect(screen.getByRole('button', { name: /保存/i })).toBeInTheDocument()
  })

  it('レイアウト読み込みボタンが表示される', () => {
    renderSidebar()
    expect(screen.getByRole('button', { name: /読込/i })).toBeInTheDocument()
  })

  it('ユーザー情報エリアが表示される', () => {
    renderSidebar()
    expect(screen.getByTestId('user-info')).toBeInTheDocument()
  })

  it('閉じるボタンをクリックすると onClose が呼ばれる', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    renderSidebar({ onClose })

    await user.click(screen.getByRole('button', { name: /閉じる/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
