import { X } from 'lucide-react'
import type { Stream } from '@/hooks/useStreams'

type StreamTileProps = {
  stream: Stream
  onRemove: () => void
}

export function StreamTile({ stream, onRemove }: StreamTileProps) {
  return (
    <div className="relative group rounded-lg overflow-hidden border border-apple-border dark:border-apple-dark-border shadow-apple">
      <iframe
        src={stream.embedUrl}
        title={`${stream.platform} player`}
        className="w-full aspect-video"
        allowFullScreen
        allow="autoplay; encrypted-media"
      />
      <button
        onClick={onRemove}
        aria-label="削除"
        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
