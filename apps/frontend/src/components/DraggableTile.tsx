import { useState, useCallback } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { GripVertical, Maximize2 } from 'lucide-react'
import { StreamTile } from '@/components/ui/StreamTile'
import { useStreamStore } from '@/stores/useStreamStore'
import type { Stream } from '@/stores/useStreamStore'

type DraggableTileProps = {
  stream: Stream
}

export function DraggableTile({ stream }: DraggableTileProps) {
  const removeStream = useStreamStore(s => s.removeStream)
  const updateStreamSize = useStreamStore(s => s.updateStreamSize)
  const [isResizing, setIsResizing] = useState(false)
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: stream.id,
  })

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = stream.width ?? 480
    const startHeight = stream.height ?? 270

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY
      updateStreamSize(stream.id, startWidth + deltaX, startHeight + deltaY)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [stream.id, stream.width, stream.height, updateStreamSize])

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${stream.x + (transform?.x ?? 0)}px`,
    top: `${stream.y + (transform?.y ?? 0)}px`,
    width: stream.width ? `${stream.width}px` : '480px',
    height: stream.height ? `${stream.height}px` : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="group">
      {/* ドラッグハンドル */}
      <div
        {...listeners}
        role="button"
        aria-label="ドラッグして移動"
        tabIndex={0}
        className="absolute top-2 left-2 p-2.5 bg-black/60 hover:bg-black/80 rounded-full cursor-grab z-10 min-w-[44px] min-h-[44px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <GripVertical className="w-5 h-5 text-white" />
      </div>

      <StreamTile
        stream={stream}
        onRemove={() => removeStream(stream.id)}
        isDragging={isDragging || isResizing}
      />

      {/* リサイズハンドル */}
      <div
        role="button"
        aria-label="リサイズ"
        tabIndex={0}
        onMouseDown={handleResizeStart}
        className="absolute bottom-2 right-2 p-2.5 bg-black/60 hover:bg-black/80 rounded-full cursor-se-resize z-10 min-w-[44px] min-h-[44px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <Maximize2 className="w-5 h-5 text-white" />
      </div>
    </div>
  )
}
