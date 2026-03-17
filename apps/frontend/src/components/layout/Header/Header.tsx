import { Menu, Plus } from 'lucide-react'
import { Link } from 'react-router'

type HeaderProps = {
  onOpenSidebar?: () => void
}

export function Header({
  onOpenSidebar
}: HeaderProps) {
  return (
    <header className="bg-apple-card border-b border-apple-border px-4 py-3 dark:bg-apple-dark-card dark:border-apple-dark-border">
      <div className="flex items-center justify-between gap-4">
        {/* 左側: メニュー + ロゴ */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSidebar}
            aria-label="メニューを開く"
            className="p-2 text-apple-text-secondary hover:text-apple-text-primary rounded-lg hover:bg-apple-bg-secondary dark:text-apple-dark-text-secondary dark:hover:bg-apple-dark-bg-secondary"
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
              className="flex-1 px-4 py-2 bg-white border border-apple-border rounded-lg text-sm focus:outline-none transition-all duration-300"
            />

            <button
              aria-label="配信を追加"
              className="flex items-center gap-1.5 px-4 py-2 bg-apple-blue hover:bg-apple-blue/90 hover:shadow-apple-lg dark:bg-apple-dark-blue dark:hover:bg-apple-dark-blue/90 rounded-lg transition-all duration-300 text-sm font-medium text-white cursor-pointer min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              追加
            </button>
          </div>
        </div>

        {/* 右側: ボタン */}
        <div className="flex items-center gap-2">
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
        </div>
      </div>
    </header>
  )
}
