import { Link } from 'react-router'
import { Mail, Lock, Eye } from 'lucide-react'

export function LoginPage() {
return (
    <div className="min-h-screen bg-apple-bg text-apple-textPrimary dark:bg-appleDark-bg dark:text-appleDark-textPrimary flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-apple-card border border-apple-border dark:bg-appleDark-card dark:border-appleDark-border rounded-2xl shadow-apple-lg">

        <h1 className="text-2xl font-bold text-center mb-8">ログイン</h1>

        <form className="space-y-6">

          <div className="space-y-2">
            <label htmlFor="login-email" className="flex items-center gap-2 text-sm text-apple-textSecondary dark:text-appleDark-textSecondary">
              <Mail className="w-4 h-4" aria-hidden="true" />
              メールアドレス
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-apple-bgSecondary border border-apple-border dark:bg-appleDark-bgSecondary dark:border-appleDark-border rounded-lg focus:outline-none focus:border-apple-blue dark:focus:border-appleDark-blue focus:ring-2 focus:ring-apple-blue/20"
              placeholder="email@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="login-password" className="flex items-center gap-2 text-sm text-apple-textSecondary dark:text-appleDark-textSecondary">
              <Lock className="w-4 h-4" aria-hidden="true" />
              パスワード
            </label>
            <div className="relative">
              <input
                id="login-password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-apple-bgSecondary border border-apple-border dark:bg-appleDark-bgSecondary dark:border-appleDark-border rounded-lg focus:outline-none focus:border-apple-blue dark:focus:border-appleDark-blue focus:ring-2 focus:ring-apple-blue/20"
                placeholder="8文字以上"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-apple-textSecondary hover:text-apple-textPrimary dark:text-appleDark-textSecondary dark:hover:text-white cursor-pointer p-1"
              >
                {<Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-gray-400 text-apple-textSecondary hover:text-apple-textPrimary dark:text-appleDark-textSecondary dark:hover:text-white">
              パスワードを忘れた方
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-apple-blue hover:bg-apple-blue/90 dark:bg-appleDark-blue dark:hover:bg-appleDark-blue/90 disabled:opacity-50 rounded-lg font-medium transition-colors text-white"
          >
            {'ログイン'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-apple-textSecondary dark:text-appleDark-textSecondary">
          アカウントをお持ちでない方は{' '}
          <Link to="/signup" className="text-apple-blue hover:text-apple-blue/80 dark:text-appleDark-blue">
            新規登録
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-apple-textSecondary hover:text-apple-textPrimary dark:text-appleDark-textSecondary dark:hover:text-white">
            ← メイン画面に戻る
          </Link>
        </div>
      </div>
    </div>
  )
}

