import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { Header } from './Header'

describe('Header', () => {
  it('ヘッダーが表示される', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('ロゴが表示される', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    expect(screen.getByText('Tamado')).toBeInTheDocument()
  })

  it('URL入力欄が表示される', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    expect(screen.getByPlaceholderText(/youtube/i)).toBeInTheDocument()
  })

  it('追加ボタンが表示される', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    expect(screen.getByRole('button', { name: /追加/i })).toBeInTheDocument()
  })
})
