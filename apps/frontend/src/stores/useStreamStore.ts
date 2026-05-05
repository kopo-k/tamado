import { create } from 'zustand'
import { parseStreamUrl } from '@/utils/parseUrl'
import { getEmbedUrl } from '@/utils/embedUrl'
import { calculateGridLayout } from '@/hooks/useAutoLayout'

export type Stream = {
  id: string
  platform: 'youtube' | 'twitch'
  videoId: string
  embedUrl: string
  x: number
  y: number
  width?: number
  height?: number
}

// サイズ制限
const MIN_WIDTH = 200
const MIN_HEIGHT = 150
const MAX_WIDTH = 1920
const MAX_HEIGHT = 1080

type StreamStore = {
  streams: Stream[]
  addStream: (url: string) => boolean
  removeStream: (id: string) => void
  updateStreamPosition: (id: string, deltaX: number, deltaY: number) => void
  updateStreamSize: (id: string, width: number, height: number) => void
  applyAutoLayout: (containerWidth: number, containerHeight: number, gap?: number) => void
  setStreams: (streams: Stream[]) => void
}

export const useStreamStore = create<StreamStore>((set) => ({
  streams: [],

  addStream: (url: string) => {
    const parsed = parseStreamUrl(url)
    if (!parsed) return false
    const embedUrl = getEmbedUrl(parsed.platform, parsed.id)
    if (!embedUrl) return false

    set(state => ({
      streams: [...state.streams, {
        id: crypto.randomUUID(),
        platform: parsed.platform,
        videoId: parsed.id,
        embedUrl,
        x: 0,
        y: 0,
      }],
    }))
    return true
  },

  removeStream: (id: string) => {
    set(state => ({
      streams: state.streams.filter(s => s.id !== id),
    }))
  },

  updateStreamPosition: (id: string, deltaX: number, deltaY: number) => {
    set(state => ({
      streams: state.streams.map(s =>
        s.id === id ? { ...s, x: s.x + deltaX, y: s.y + deltaY } : s
      ),
    }))
  },

  updateStreamSize: (id: string, width: number, height: number) => {
    const clampedWidth = Math.min(Math.max(width, MIN_WIDTH), MAX_WIDTH)
    const clampedHeight = Math.min(Math.max(height, MIN_HEIGHT), MAX_HEIGHT)

    set(state => ({
      streams: state.streams.map(s =>
        s.id === id ? { ...s, width: clampedWidth, height: clampedHeight } : s
      ),
    }))
  },

  setStreams: (streams: Stream[]) => {
    set({ streams })
  },

  applyAutoLayout: (containerWidth: number, containerHeight: number, gap: number = 0) => {
    set(state => {
      if (state.streams.length === 0) return state

      const layout = calculateGridLayout(
        state.streams.length,
        containerWidth,
        containerHeight,
        gap
      )

      return {
        streams: state.streams.map((stream, index) => ({
          ...stream,
          x: layout.positions[index].x,
          y: layout.positions[index].y,
          width: layout.positions[index].width,
          height: layout.positions[index].height,
        })),
      }
    })
  },
}))
