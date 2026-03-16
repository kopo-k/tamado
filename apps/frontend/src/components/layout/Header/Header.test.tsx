import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router'
import { Header } from '.'

describe('Header', () => {
  const defaultProps = {
    onOpenSidebar: vi.fn(),
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

  it('メニューボタンをクリックすると onOpenSidebar が呼ばれる', async () => {
    const onOpenSidebar = vi.fn()
    const user = userEvent.setup()

    renderHeader({ onOpenSidebar })

    // メニューボタン（Menu アイコンのボタン）をクリック
    const menuButtons = screen.getAllByRole('button')
    const menuButton = menuButtons.find(btn => !btn.textContent?.includes('追加'))
    if (menuButton) {
      await user.click(menuButton)
      expect(onOpenSidebar).toHaveBeenCalledTimes(1)
    }
  })

  it('ログインリンクが表示される', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /ログイン/i })).toBeInTheDocument()
  })

  it('新規登録リンクが表示される', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /新規登録/i })).toBeInTheDocument()
  })

  it('URL入力欄に値を入力できる', async () => {
    const user = userEvent.setup()
    renderHeader()

    const input = screen.getByPlaceholderText(/youtube/i)
    await user.type(input, 'https://www.youtube.com/watch?v=test')

    expect(input).toHaveValue('https://www.youtube.com/watch?v=test')
  })
})
