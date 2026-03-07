import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('ヘッダーが表示される', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('ロゴが表示される', () => {
    render(<Header />)
    expect(screen.getByText('Tamado')).toBeInTheDocument()
  })

  it('URL入力欄が表示される', () => {
    render(<Header />)
    expect(screen.getByPlaceholderText(/youtube/i)).toBeInTheDocument()
  })

  it('追加ボタンが表示される', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: /追加/i })).toBeInTheDocument()
  })
})