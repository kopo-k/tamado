import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router'
import { LoginPage } from './LoginPage'
import { SignupPage } from './SignupPage'

describe('LoginPage', () => {
  const renderLoginPage = () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )
  }

  // UI表示テスト
  describe('UI表示', () => {
    it('ページタイトルが表示される', () => {
      renderLoginPage()
      expect(
        screen.getByRole('heading', { name: /ログイン/i })
      ).toBeInTheDocument()
    })

    it('メールアドレス入力欄が表示される', () => {
      renderLoginPage()
      expect(
        screen.getByPlaceholderText(/email@example.com/i)
      ).toBeInTheDocument()
    })

    it('パスワード入力欄が表示される', () => {
      renderLoginPage()
      expect(
        screen.getByPlaceholderText(/8文字以上/i)
      ).toBeInTheDocument()
    })

    it('パスワード入力欄がtype="password"である', () => {
      renderLoginPage()
      const passwordInput = screen.getByPlaceholderText(/8文字以上/i)
      expect(passwordInput).toHaveAttribute('type', 'password')
    })

    it('ログインボタンが表示される', () => {
      renderLoginPage()
      expect(
        screen.getByRole('button', { name: /ログイン/i })
      ).toBeInTheDocument()
    })

    it('新規登録リンクが表示される', () => {
      renderLoginPage()
      expect(
        screen.getByRole('link', { name: /新規登録/i })
      ).toBeInTheDocument()
    })

    it('パスワードリセットリンクが表示される', () => {
      renderLoginPage()
      expect(
        screen.getByRole('link', { name: /パスワード/i })
      ).toBeInTheDocument()
    })

    it('メイン画面へのリンクが表示される', () => {
      renderLoginPage()
      expect(
        screen.getByRole('link', { name: /メイン画面に戻る/i })
      ).toBeInTheDocument()
    })
  })

  // インタラクションテスト
  describe('インタラクション', () => {
    it('メールアドレスを入力できる', async () => {
      const user = userEvent.setup()
      renderLoginPage()

      const emailInput = screen.getByPlaceholderText(/email@example.com/i)
      await user.type(emailInput, 'test@example.com')

      expect(emailInput).toHaveValue('test@example.com')
    })

    it('パスワードを入力できる', async () => {
      const user = userEvent.setup()
      renderLoginPage()

      const passwordInput = screen.getByPlaceholderText(/8文字以上/i)
      await user.type(passwordInput, 'password123')

      expect(passwordInput).toHaveValue('password123')
    })

    it('新規登録リンクをクリックすると新規登録ページに遷移する', async () => {
      const user = userEvent.setup()

      render(
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </MemoryRouter>
      )

      await user.click(screen.getByRole('link', { name: /新規登録/i }))

      expect(
        screen.getByRole('heading', { name: /新規登録/i })
      ).toBeInTheDocument()
    })
  })

  // アクセシビリティテスト
  describe('アクセシビリティ', () => {
    it('メールアドレス入力欄にラベルが関連付けられている', () => {
      renderLoginPage()
      const emailInput = screen.getByPlaceholderText(/email@example.com/i)
      expect(emailInput).toHaveAttribute('id', 'login-email')
    })

    it('パスワード入力欄にラベルが関連付けられている', () => {
      renderLoginPage()
      const passwordInput = screen.getByPlaceholderText(/8文字以上/i)
      expect(passwordInput).toHaveAttribute('id', 'login-password')
    })

    it('メールアドレス入力欄にautocomplete属性がある', () => {
      renderLoginPage()
      const emailInput = screen.getByPlaceholderText(/email@example.com/i)
      expect(emailInput).toHaveAttribute('autocomplete', 'email')
    })

    it('パスワード入力欄にautocomplete属性がある', () => {
      renderLoginPage()
      const passwordInput = screen.getByPlaceholderText(/8文字以上/i)
      expect(passwordInput).toHaveAttribute('autocomplete', 'current-password')
    })
  })
})
