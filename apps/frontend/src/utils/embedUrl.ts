export function getEmbedUrl(platform: string, videoId: string): string | null {
  switch (platform) {
    case 'youtube':
      return `https://www.youtube.com/embed/${videoId}`
    case 'twitch':
      return `https://player.twitch.tv/?channel=${videoId}&parent=${window.location.hostname}`
    default:
      return null
  }
}
