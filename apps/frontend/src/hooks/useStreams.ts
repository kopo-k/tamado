import { useState } from 'react'

export type Stream = {
  id: string
  platform: 'youtube' | 'twitch'
  videoId: string
  embedUrl: string
}

type AddStreamInput = {
  platform: 'youtube' | 'twitch'
  videoId: string
  embedUrl: string
}

export function useStreams() {
  const [streams, setStreams] = useState<Stream[]>([])

  function addStream(input: AddStreamInput) {
    setStreams(prev => [...prev, { ...input, id: crypto.randomUUID() }])
  }

  function removeStream(id: string) {
    setStreams(prev => prev.filter(s => s.id !== id))
  }

  return { streams, addStream, removeStream }
}
