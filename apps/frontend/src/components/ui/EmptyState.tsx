import { FaYoutube, FaTwitch } from 'react-icons/fa'

/**
 * 配信がない時の空状態表示
 */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="text-center">
        {/* タイトル */}
        <h2 className="text-2xl font-bold mb-3 text-apple-blue dark:text-apple-dark-blue">
          動画・配信を追加
        </h2>

        {/* 説明文 */}
        <p className="text-apple-text-secondary dark:text-apple-dark-text-secondary text-sm mb-8 max-w-sm mx-auto">
          上の入力欄にYouTubeやTwitchのURLを貼り付けて、
          <span className="text-apple-blue dark:text-apple-dark-blue">同時視聴</span>
          できます
        </p>

        {/* プラットフォームアイコン */}
        <div className="flex items-center justify-center gap-6">
          {/* YouTube */}
          <div className="flex items-center gap-1.5 text-apple-text-secondary dark:text-apple-dark-text-secondary">
            <FaYoutube className="w-5 h-5 text-apple-red dark:text-apple-dark-red" />
            <span className="text-sm">YouTube</span>
          </div>

          {/* Twitch */}
          <div className="flex items-center gap-1.5 text-apple-text-secondary dark:text-apple-dark-text-secondary">
            <FaTwitch className="w-5 h-5 text-purple-500" />
            <span className="text-sm">Twitch</span>
          </div>
        </div>

        {/* ヒントテキスト */}
        <p className="mt-10 text-xs text-apple-text-secondary dark:text-apple-dark-text-secondary">
          複数の配信をドラッグ&ドロップで自由に配置できます
        </p>
      </div>
    </div>
  )
}
