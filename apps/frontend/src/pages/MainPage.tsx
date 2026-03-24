import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { EmptyState } from '@/components/ui/EmptyState'
import { StreamTile } from '@/components/ui/StreamTile'
import { useStreams } from '@/hooks/useStreams'
import { parseStreamUrl } from '@/utils/parseUrl'
import { getEmbedUrl } from '@/utils/embedUrl'

export function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { streams, addStream, removeStream } = useStreams()

  function handleAddStream(url: string): boolean {
    const parsed = parseStreamUrl(url)
    if (!parsed) return false
    const embedUrl = getEmbedUrl(parsed.platform, parsed.id)
    if (!embedUrl) return false
    addStream({ platform: parsed.platform, videoId: parsed.id, embedUrl })
    return true
  }

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
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-dark-purple-glow" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-dark-cyan-glow" />
      </div>

      {/* サイドバー */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* ヘッダー */}
      <Header
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onAddStream={handleAddStream}
      />

      {/* メインコンテンツ */}
      <main role="main" className="relative z-10">
        {streams.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {streams.map(stream => (
              <StreamTile
                key={stream.id}
                stream={stream}
                onRemove={() => removeStream(stream.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
