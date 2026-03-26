import { useState } from 'react'
import { Menu, Plus, AlertCircle } from 'lucide-react'
import { Link } from 'react-router'
import { useStreamStore } from '@/stores/useStreamStore'
import { useUIStore } from '@/stores/useUIStore'

export function Header() {
  const addStream = useStreamStore(s => s.addStream)
  const openSidebar = useUIStore(s => s.openSidebar)

  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  function handleAddStream() {
    if (!url.trim()) return
    setError('')

    const success = addStream(url)
    if (success) {
      setUrl('')
    } else {
      setError('URLが無効です。YouTubeまたはTwitchのURLを入力してください。')
      setUrl('')
    }
  }

  return (
    <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-apple-border px-4 py-3 dark:bg-apple-dark-bg-secondary/80 dark:border-apple-dark-border">
      <div className="flex items-center justify-between gap-4">
        {/* 左側: メニュー + ロゴ */}
        <div className="flex items-center gap-2">
          <button
            onClick={openSidebar}
            aria-label="メニューを開く"
            className="p-2.5 text-apple-text-secondary hover:text-apple-text-primary dark:text-apple-dark-text-secondary dark:hover:text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-apple-bg-secondary dark:hover:bg-apple-dark-card"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="text-lg font-semibold text-apple-blue">
            Tamado
          </Link>
        </div>

        {/* URL入力エリア */}
        <div className="flex-1 max-w-xl flex flex-col gap-1">
          <div className="flex gap-2">
            <label htmlFor="stream-url" className="sr-only">配信URL</label>
            <input
              id="stream-url"
              type="text"
              placeholder="YouTubeまたはTwitchのURLを入力"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                if (error) setError('')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddStream()
              }}
              className={`flex-1 px-4 py-2 bg-white border rounded-lg text-sm focus:outline-none transition-all duration-300 ${
                error
                  ? 'border-apple-red focus:border-apple-red'
                  : 'border-apple-border focus:border-apple-blue dark:border-apple-dark-border dark:focus:border-apple-dark-blue'
              } dark:bg-apple-dark-bg-secondary dark:text-apple-dark-text-primary dark:placeholder-apple-dark-text-secondary`}
            />
            <button
              onClick={handleAddStream}
              aria-label="配信を追加"
              className="flex items-center gap-1.5 px-4 py-2 bg-apple-blue hover:bg-apple-blue/90 hover:shadow-apple-lg dark:bg-apple-dark-blue dark:hover:bg-apple-dark-blue/90 rounded-lg transition-all duration-300 text-sm font-medium text-white cursor-pointer min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              追加
            </button>
          </div>
          {/* エラーメッセージ */}
          {error && (
            <div
              role="alert"
              className="flex items-center gap-1.5 text-xs text-apple-red dark:text-apple-dark-red"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {error}
            </div>
          )}
        </div>

        {/* 右側: ボタン（認証実装後に有効化） */}
        {/* <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-2 border border-apple-border dark:border-apple-dark-border rounded-lg text-sm hover:bg-apple-bg-secondary hover:border-apple-blue/30 dark:hover:bg-apple-dark-card dark:hover:border-apple-dark-blue/50 transition-all duration-300"
          >
            ログイン
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 bg-apple-blue/10 border border-apple-blue/20 dark:bg-apple-dark-blue/20 dark:border-apple-dark-blue/30 rounded-lg text-sm text-apple-blue dark:text-apple-dark-blue hover:bg-apple-blue/20 hover:shadow-apple dark:hover:bg-apple-dark-blue/30 transition-all duration-300"
          >
            新規登録
          </Link>
        </div> */}
      </div>
    </header>
  )
}
