import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { LoginPage } from './LoginPage'

describe('Loginpage', () => {
  const renderLoginPage = () => {
    render(
      <BrowserRouter>
        <LoginPage/>
      </BrowserRouter>
    )
  } 

    // ログインページのUI表示テスト

  it('ページが表示される', () => {
    renderLoginPage()

    // 「ログイン」という見出しが表示されているか確認
    expect(
      screen.getByRole('heading', { name: /ログイン/i })
    ).toBeInTheDocument()
  })

  it('メールアドレス入力欄が表示される', () => {
    renderLoginPage()

    // メール入力欄（placeholderに「メール」）が表示されているか
    expect(
      screen.getByPlaceholderText(/メール/i)
    ).toBeInTheDocument()
  })

  it('パスワード入力欄が表示される', () => {
    renderLoginPage()

    // パスワード入力欄が表示されているか
    expect(
      screen.getByPlaceholderText(/パスワード/i)
    ).toBeInTheDocument()
  })

  it('ログインボタンが表示される', () => {
    renderLoginPage()

    // 「ログイン」ボタンが表示されているか
    expect(
      screen.getByRole('button', { name: /ログイン/i })
    ).toBeInTheDocument()
  })

  it('新規登録リンクが表示される', () => {
    renderLoginPage()

    // 「新規登録」リンクが表示されているか
    expect(
      screen.getByRole('link', { name: /新規登録/i })
    ).toBeInTheDocument()
  })

  it('パスワードリセットリンクが表示される', () => {
    renderLoginPage()

    // パスワードリセットリンクが表示されているか
    expect(
      screen.getByRole('link', { name: /パスワード/i })
    ).toBeInTheDocument()
  })
})

