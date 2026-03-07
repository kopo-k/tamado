import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import App from './App'

describe('App スモークテスト', () => {
  it('アプリがクラッシュせずに起動する', () => {
    expect(() => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )
    }).not.toThrow()
  })

  it('ヘッダーが表示される', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByRole('banner')).toBeInTheDocument() // <header> = banner role
  })
})
