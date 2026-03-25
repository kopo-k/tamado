import { useDraggable } from '@dnd-kit/core'
import { GripVertical } from 'lucide-react'
import { StreamTile } from '@/components/ui/StreamTile'
import { useStreamStore } from '@/stores/useStreamStore'
import type { Stream } from '@/stores/useStreamStore'

type DraggableTileProps = {
  stream: Stream
}

export function DraggableTile({ stream }: DraggableTileProps) {
  const removeStream = useStreamStore(s => s.removeStream)
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: stream.id,
  })

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${stream.x + (transform?.x ?? 0)}px`,
    top: `${stream.y + (transform?.y ?? 0)}px`,
    width: '480px',
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
        isDragging={isDragging}
      />
    </div>
  )
}
