import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { EmptyState } from '@/components/ui/EmptyState'
import { DraggableTile } from '@/components/DraggableTile'
import { useStreamStore } from '@/stores/useStreamStore'

export function MainPage() {
  const streams = useStreamStore(s => s.streams)
  const updateStreamPosition = useStreamStore(s => s.updateStreamPosition)

  function handleDragEnd(event: DragEndEvent) {
    const { active, delta } = event
    updateStreamPosition(active.id as string, delta.x, delta.y)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
        <Sidebar />

        {/* ヘッダー */}
        <Header />

        {/* メインコンテンツ */}
        <main role="main" className="relative z-10">
          {streams.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="p-4 relative h-[calc(100vh-64px)]">
              {streams.map(stream => (
                <DraggableTile
                  key={stream.id}
                  stream={stream}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </DndContext>
  )
}
