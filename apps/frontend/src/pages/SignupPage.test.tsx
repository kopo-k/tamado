import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router'
import { SignupPage } from './SignupPage'
import { LoginPage } from './LoginPage'

describe('SignupPage', () => {
  const renderSignupPage = () => {
    render(
      <BrowserRouter>
        <SignupPage />
      </BrowserRouter>
    )
  }

  // UI表示テスト
  describe('UI表示', () => {
    it('ページタイトルが表示される', () => {
      renderSignupPage()
      expect(
        screen.getByRole('heading', { name: /新規登録/i })
      ).toBeInTheDocument()
    })

    it('メールアドレス入力欄が表示される', () => {
      renderSignupPage()
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    })

    it('パスワード入力欄が表示される', () => {
      renderSignupPage()
      expect(screen.getByPlaceholderText(/8文字以上/i)).toBeInTheDocument()
    })

    it('パスワード確認入力欄が表示される', () => {
      renderSignupPage()
      expect(screen.getByPlaceholderText(/再入力/i)).toBeInTheDocument()
    })

    it('パスワード入力欄がtype="password"である', () => {
      renderSignupPage()
      const passwordInput = screen.getByPlaceholderText(/8文字以上/i)
      expect(passwordInput).toHaveAttribute('type', 'password')
    })

    it('パスワード確認入力欄がtype="password"である', () => {
      renderSignupPage()
      const confirmInput = screen.getByPlaceholderText(/再入力/i)
      expect(confirmInput).toHaveAttribute('type', 'password')
    })

    it('登録ボタンが表示される', () => {
      renderSignupPage()
      expect(
        screen.getByRole('button', { name: /登録/i })
      ).toBeInTheDocument()
    })

    it('ログインリンクが表示される', () => {
      renderSignupPage()
      expect(
        screen.getByRole('link', { name: /ログイン/i })
      ).toBeInTheDocument()
    })

    it('メイン画面へのリンクが表示される', () => {
      renderSignupPage()
      expect(
        screen.getByRole('link', { name: /メイン画面に戻る/i })
      ).toBeInTheDocument()
    })
  })

  // インタラクションテスト
  describe('インタラクション', () => {
    it('メールアドレスを入力できる', async () => {
      const user = userEvent.setup()
      renderSignupPage()

      const emailInput = screen.getByPlaceholderText(/email/i)
      await user.type(emailInput, 'newuser@example.com')

      expect(emailInput).toHaveValue('newuser@example.com')
    })

    it('パスワードを入力できる', async () => {
      const user = userEvent.setup()
      renderSignupPage()

      const passwordInput = screen.getByPlaceholderText(/8文字以上/i)
      await user.type(passwordInput, 'securepassword123')

      expect(passwordInput).toHaveValue('securepassword123')
    })

    it('パスワード確認を入力できる', async () => {
      const user = userEvent.setup()
      renderSignupPage()

      const confirmInput = screen.getByPlaceholderText(/再入力/i)
      await user.type(confirmInput, 'securepassword123')

      expect(confirmInput).toHaveValue('securepassword123')
    })

    it('ログインリンクをクリックするとログインページに遷移する', async () => {
      const user = userEvent.setup()

      render(
        <MemoryRouter initialEntries={['/signup']}>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      )

      await user.click(screen.getByRole('link', { name: /ログイン/i }))

      expect(
        screen.getByRole('heading', { name: /ログイン/i })
      ).toBeInTheDocument()
    })
  })

  // アクセシビリティテスト
  describe('アクセシビリティ', () => {
    it('メールアドレス入力欄にラベルが関連付けられている', () => {
      renderSignupPage()
      const emailInput = screen.getByPlaceholderText(/email/i)
      expect(emailInput).toHaveAttribute('id', 'signup-email')
    })

    it('パスワード入力欄にラベルが関連付けられている', () => {
      renderSignupPage()
      const passwordInput = screen.getByPlaceholderText(/8文字以上/i)
      expect(passwordInput).toHaveAttribute('id', 'signup-password')
    })

    it('パスワード確認入力欄にラベルが関連付けられている', () => {
      renderSignupPage()
      const confirmInput = screen.getByPlaceholderText(/再入力/i)
      expect(confirmInput).toHaveAttribute('id', 'signup-confirm-password')
    })

    it('メールアドレス入力欄にautocomplete属性がある', () => {
      renderSignupPage()
      const emailInput = screen.getByPlaceholderText(/email/i)
      expect(emailInput).toHaveAttribute('autocomplete', 'email')
    })

    it('パスワード入力欄にautocomplete属性がある', () => {
      renderSignupPage()
      const passwordInput = screen.getByPlaceholderText(/8文字以上/i)
      expect(passwordInput).toHaveAttribute('autocomplete', 'new-password')
    })
  })
})
