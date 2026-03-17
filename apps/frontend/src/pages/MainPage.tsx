import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Plus } from 'lucide-react'

export function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-apple-bg dark:bg-apple-dark-bg">
      <Header onOpenSidebar={handleOpenSidebar} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      <main className="p-4">
        {/* EmptyState: 配信がない時の表示 */}
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
