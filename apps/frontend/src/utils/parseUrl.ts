type ParseResult = {
  platform: 'youtube' | 'twitch'
  id: string
} | null

export function parseStreamUrl(url: string): ParseResult {
  if (!url) return null

  // YouTube: youtube.com/watch?v=VIDEO_ID
  if (url.includes('youtube.com/watch')) {
    try {
      const params = new URL(url).searchParams
      const videoId = params.get('v')
      if (videoId) return { platform: 'youtube', id: videoId }
    } catch {
      return null
    }
  }

  // YouTube: youtube.com/live/LIVE_ID
  if (url.includes('youtube.com/live')) {
    const liveId = url.split('/live/')[1]?.split('?')[0]
    if (liveId) return { platform: 'youtube', id: liveId }
  }

  // YouTube: youtu.be/VIDEO_ID
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    if (videoId) return { platform: 'youtube', id: videoId }
  }

  // Twitch: twitch.tv/CHANNEL_NAME
  if (url.includes('twitch.tv/')) {
    const channelId = url.split('twitch.tv/')[1]?.split('?')[0]
    if (channelId) return { platform: 'twitch', id: channelId }
  }

  return null
}
