import { test, expect } from '@playwright/test'

function uniqueEmail(): string {
  return `e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`
}

test.describe('認証フロー', () => {
  test('サインアップ → ログアウト → 再ログイン', async ({ page }) => {
    const email = uniqueEmail()
    const password = 'password123'

    // サインアップ
    await page.goto('/signup')
    await page.getByLabel('メールアドレス').fill(email)
    await page.locator('#signup-password').fill(password)
    await page.locator('#signup-confirm-password').fill(password)
    await page.getByRole('button', { name: '登録する' }).click()

    // メイン画面にリダイレクト
    await expect(page).toHaveURL('/')

    // ヘッダーにメールアドレスが表示される（sm以上の画面）
    await expect(page.getByText(email)).toBeVisible()

    // ログアウト
    await page.getByRole('button', { name: 'ログアウト' }).click()
    await expect(page.getByRole('link', { name: 'ログイン' })).toBeVisible()

    // 再ログイン
    await page.getByRole('link', { name: 'ログイン' }).click()
    await expect(page).toHaveURL('/login')
    await page.getByLabel('メールアドレス').fill(email)
    await page.locator('#login-password').fill(password)
    await page.getByRole('button', { name: 'ログイン' }).click()

    // メイン画面に戻り、ログイン状態
    await expect(page).toHaveURL('/')
    await expect(page.getByText(email)).toBeVisible()
  })

  test('重複メールでサインアップするとエラーが表示される', async ({ page }) => {
    const email = uniqueEmail()
    const password = 'password123'

    // 一度目: 登録成功
    await page.goto('/signup')
    await page.getByLabel('メールアドレス').fill(email)
    await page.locator('#signup-password').fill(password)
    await page.locator('#signup-confirm-password').fill(password)
    await page.getByRole('button', { name: '登録する' }).click()
    await expect(page).toHaveURL('/')

    // ログアウトして再度サインアップ画面へ
    await page.getByRole('button', { name: 'ログアウト' }).click()
    await page.goto('/signup')

    // 同じメールで登録 → エラー
    await page.getByLabel('メールアドレス').fill(email)
    await page.locator('#signup-password').fill(password)
    await page.locator('#signup-confirm-password').fill(password)
    await page.getByRole('button', { name: '登録する' }).click()

    await expect(page.getByRole('alert')).toContainText('既に使用されています')
    await expect(page).toHaveURL('/signup')
  })

  test('間違ったパスワードでログインするとエラーが表示される', async ({ page }) => {
    const email = uniqueEmail()
    const password = 'password123'

    // 登録
    await page.goto('/signup')
    await page.getByLabel('メールアドレス').fill(email)
    await page.locator('#signup-password').fill(password)
    await page.locator('#signup-confirm-password').fill(password)
    await page.getByRole('button', { name: '登録する' }).click()
    await expect(page).toHaveURL('/')
    await page.getByRole('button', { name: 'ログアウト' }).click()

    // 間違ったパスワードでログイン
    await page.goto('/login')
    await page.getByLabel('メールアドレス').fill(email)
    await page.locator('#login-password').fill('wrong-password')
    await page.getByRole('button', { name: 'ログイン' }).click()

    await expect(page.getByRole('alert')).toContainText('正しくありません')
    await expect(page).toHaveURL('/login')
  })

  test('パスワード不一致でサインアップするとエラー表示される', async ({ page }) => {
    await page.goto('/signup')
    await page.getByLabel('メールアドレス').fill(uniqueEmail())
    await page.locator('#signup-password').fill('password123')
    await page.locator('#signup-confirm-password').fill('password456')
    await page.getByRole('button', { name: '登録する' }).click()

    await expect(page.getByRole('alert')).toContainText('一致しません')
  })
})
