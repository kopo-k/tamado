import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Plus } from 'lucide-react'

export function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-apple-bg text-apple-text-primary dark:bg-apple-dark-bg dark:text-apple-dark-text-primary relative overflow-hidden">
      {/* ライトモード背景効果 */}
      <div className="block dark:hidden fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-light-gradient opacity-90" />
        <div className="absolute inset-0 light-grid" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-light-purple-glow" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-light-pink-glow" />
      </div>

      {/* ダークモード背景 */}
      <div className="hidden dark:block fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-apple-dark-bg" />
        <div className="absolute inset-0 cyber-grid" />
      </div>

      {/* サイドバー */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* ヘッダー */}
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

      {/* メインコンテンツ */}
      <main role="main" className="relative z-10">
        <EmptyState />
      </main>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 mb-4 rounded-full bg-apple-bg-secondary dark:bg-apple-dark-bg-secondary flex items-center justify-center">
        <Plus className="w-8 h-8 text-apple-text-secondary dark:text-apple-dark-text-secondary" />
      </div>
      <h2 className="text-xl font-semibold text-apple-text-primary dark:text-apple-dark-text-primary mb-2">
        配信を追加してください
      </h2>
      <p className="text-apple-text-secondary dark:text-apple-dark-text-secondary max-w-md">
        上部の入力欄にYouTubeまたはTwitchのURLを入力して、配信を追加しましょう
      </p>
    </div>
  )
}
