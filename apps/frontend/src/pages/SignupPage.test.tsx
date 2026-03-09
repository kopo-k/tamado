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

  it('ページタイトルが表示される', () => {
    renderSignupPage()
    expect(screen.getByRole('heading', { name: /新規登録/i })).toBeInTheDocument()
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

  it('登録ボタンが表示される', () => {
    renderSignupPage()
    expect(screen.getByRole('button', { name: /登録/i })).toBeInTheDocument()
  })

  it('ログインリンクが表示される', () => {
    renderSignupPage()
    expect(screen.getByRole('link', { name: /ログイン/i })).toBeInTheDocument()
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

    // 「ログイン」リンクをクリック
    await user.click(screen.getByRole('link', { name: /ログイン/i }))

    // ログインページに遷移したことを確認
    expect(screen.getByRole('heading', { name: /ログイン/i })).toBeInTheDocument()
  })
})
