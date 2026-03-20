import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router'
import { ThemeProvider } from './hooks/ThemeProvider'
import App from './App'

describe('App', () => {
  const renderApp = () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    )
  }

  describe('スモークテスト', () => {
    it('アプリがクラッシュせずに起動する', () => {
      expect(() => renderApp()).not.toThrow()
    })

    it('ヘッダーが表示される', () => {
      renderApp()
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })
  })

  describe('ルーティング', () => {
    it('不正なURLはMainPageにリダイレクトされる', () => {
      render(
        <MemoryRouter initialEntries={['/invalid-url']}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </MemoryRouter>
      )
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('/login でLoginPageが表示される', () => {
      render(
        <MemoryRouter initialEntries={['/login']}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </MemoryRouter>
      )
      expect(screen.getByRole('heading', { name: /ログイン/i })).toBeInTheDocument()
    })

    it('/signup でSignupPageが表示される', () => {
      render(
        <MemoryRouter initialEntries={['/signup']}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </MemoryRouter>
      )
      expect(screen.getByRole('heading', { name: /新規登録/i })).toBeInTheDocument()
    })
  })
})
