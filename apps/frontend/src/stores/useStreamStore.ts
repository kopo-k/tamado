import { create } from 'zustand'
import { parseStreamUrl } from '@/utils/parseUrl'
import { getEmbedUrl } from '@/utils/embedUrl'

export type Stream = {
  id: string
  platform: 'youtube' | 'twitch'
  videoId: string
  embedUrl: string
  x: number
  y: number
}

type StreamStore = {
  streams: Stream[]
  addStream: (url: string) => boolean
  removeStream: (id: string) => void
  updateStreamPosition: (id: string, deltaX: number, deltaY: number) => void
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
}))
