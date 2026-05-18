import { X, Volume2, VolumeX } from 'lucide-react'
import type { Stream } from '@/stores/useStreamStore'

type StreamTileProps = {
  stream: Stream
  onRemove: () => void
  onToggleMute?: () => void
  isDragging?: boolean
}

export function StreamTile({ stream, onRemove, onToggleMute, isDragging }: StreamTileProps) {
  // 自動レイアウト適用時（heightが設定されている）は親の高さを埋める
  // 手動配置時は従来通り16:9アスペクト比を維持
  const hasAutoLayout = stream.height !== undefined
  const iframeClass = hasAutoLayout ? 'w-full h-full' : 'w-full aspect-video'
  const isUnmuted = !stream.isMuted

  // プラットフォーム別の色
  const platformColor = stream.platform === 'youtube' ? 'border-red-500 dark:border-red-500 animate-pulse-border-youtube' : 'border-purple-500 dark:border-purple-500 animate-pulse-border-twitch'

  return (
    <div className={`relative group rounded-lg overflow-hidden border-2 shadow-apple transition-all duration-300 ${
      isUnmuted ? platformColor : 'border-apple-border dark:border-apple-dark-border'
    } ${hasAutoLayout ? 'h-full' : ''}`}
    aria-label={isUnmuted ? '音声ON' : '音声OFF'}
    role="region"
    data-platform={stream.platform}
    >
      <iframe
        src={stream.embedUrl}
        title={`${stream.platform} player`}
        className={iframeClass}
        style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
        allowFullScreen
        allow="autoplay; encrypted-media"
      />

      {/* 音声切替ボタン */}
      {onToggleMute && (
        <button
          onClick={onToggleMute}
          aria-label={isUnmuted ? '音声をOFFにする' : '音声をONにする'}
          className={`absolute bottom-2 left-2 p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
            isUnmuted
              ? 'bg-apple-blue hover:bg-apple-blue/90 dark:bg-apple-dark-blue dark:hover:bg-apple-dark-blue/90 text-white'
              : 'bg-black/60 hover:bg-black/80 text-white'
          } opacity-0 group-hover:opacity-100`}
        >
          {isUnmuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      )}

      {/* 削除ボタン */}
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
