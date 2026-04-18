import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { ApiError } from '@/lib/api'

export function SignupPage() {
  const navigate = useNavigate()
  const register = useAuthStore(s => s.register)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('パスワードが一致しません')
      return
    }
    if (password.length < 8) {
      setError('パスワードは8文字以上で入力してください')
      return
    }

    setIsLoading(true)
    try {
      await register({ email, password })
      navigate('/')
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('登録に失敗しました')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-apple-bg text-apple-text-primary dark:bg-apple-dark-bg dark:text-apple-dark-text-primary flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-apple-card border border-apple-border dark:bg-apple-dark-card dark:border-apple-dark-border rounded-2xl shadow-apple-lg">

        <h1 className="text-2xl font-bold text-center mb-8">新規登録</h1>

        {error && (
          <div
            role="alert"
            className="mb-6 px-4 py-3 text-sm rounded-lg bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900"
          >
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div className="space-y-2">
            <label htmlFor="signup-email" className="flex items-center gap-2 text-sm text-apple-text-secondary dark:text-apple-dark-text-secondary">
              <Mail className="w-4 h-4" aria-hidden="true" />
              メールアドレス
            </label>
            <input
              id="signup-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-apple-bg-secondary border border-apple-border dark:bg-apple-dark-bg-secondary dark:border-apple-dark-border rounded-lg focus:outline-none focus:border-apple-blue dark:focus:border-apple-dark-blue focus:ring-2 focus:ring-apple-blue/20"
              placeholder="email@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-password" className="flex items-center gap-2 text-sm text-apple-text-secondary dark:text-apple-dark-text-secondary">
              <Lock className="w-4 h-4" aria-hidden="true" />
              パスワード
            </label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-apple-bg-secondary border border-apple-border dark:bg-apple-dark-bg-secondary dark:border-apple-dark-border rounded-lg focus:outline-none focus:border-apple-blue dark:focus:border-apple-dark-blue focus:ring-2 focus:ring-apple-blue/20"
                placeholder="8文字以上"
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                aria-label={showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-apple-text-secondary hover:text-apple-text-primary dark:text-apple-dark-text-secondary dark:hover:text-white cursor-pointer p-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-confirm-password" className="flex items-center gap-2 text-sm text-apple-text-secondary dark:text-apple-dark-text-secondary">
              <Lock className="w-4 h-4" aria-hidden="true" />
              パスワード（確認）
            </label>
            <div className="relative">
              <input
                id="signup-confirm-password"
                type={showConfirm ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-apple-bg-secondary border border-apple-border dark:bg-apple-dark-bg-secondary dark:border-apple-dark-border rounded-lg focus:outline-none focus:border-apple-blue dark:focus:border-apple-dark-blue focus:ring-2 focus:ring-apple-blue/20"
                placeholder="パスワードを再入力"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(s => !s)}
                aria-label={showConfirm ? 'パスワードを隠す' : 'パスワードを表示'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-apple-text-secondary hover:text-apple-text-primary dark:text-apple-dark-text-secondary dark:hover:text-white cursor-pointer p-1"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-apple-blue hover:bg-apple-blue/90 dark:bg-apple-dark-blue dark:hover:bg-apple-dark-blue/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors text-white"
          >
            {isLoading ? '登録中...' : '登録する'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-apple-text-secondary dark:text-apple-dark-text-secondary">
          すでにアカウントをお持ちの方は{' '}
          <Link to="/login" className="text-apple-blue hover:text-apple-blue/80 dark:text-apple-dark-blue">
            ログイン
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-apple-text-secondary hover:text-apple-text-primary dark:text-apple-dark-text-secondary dark:hover:text-white">
            ← メイン画面に戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
